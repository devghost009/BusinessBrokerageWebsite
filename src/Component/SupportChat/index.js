import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { apiUrl, BaseURL } from "../../config/apiUrl";
import { saveSupportChatUserData } from "../../store/chatSupport/chatSupportSlice";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Loader } from "../Loader";
import { TextArea } from "../TextArea";
import classes from "./SupportChat.module.css";
import moment from "moment";
import { toast } from "react-toastify";

function SupportChat() {
  const dispatch = useDispatch();
  const { user, accessToken, room } = useSelector(
    (state) => state?.chatSupportReducer
  );

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const isChatInitiated = room !== null ? true : false;
  const [selectedRoom, setSelectedRoom] = useState(room);
  const [IsLoadingChats, setIsLoadingChats] = useState(false);
  const msgEndRef = useRef(null);

  // For Message Sent
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);

  //
  const socket = useRef(null);

  const startChat = async () => {
    const url = BaseURL("chats/guest-chat");
    const body = {
      firstName,
      message,
    };
    for (let key in body) {
      if (body[key] == "") {
        return toast.error("Please fill all the fields");
      }
    }
    setSubmitLoader(true);
    const response = await Post(url, body);
    if (response !== undefined) {
      dispatch(saveSupportChatUserData(response?.data));
      setSelectedRoom(response?.data?.data?.room);

      setMessages([
        {
          message: response?.data?.data?.room?.lastMessage,
          room: response?.data?.data?.room?._id,
          from: response?.data?.data?.user?._id,
        },
      ]);
    }
    setSubmitLoader(false);
  };

  const getMessages = async () => {
    const url = BaseURL(`chats/messages/${selectedRoom?._id}`);
    setIsLoadingChats(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setMessages(response?.data?.data?.reverse());
      setIsLoadingChats(false);
    }
    setIsLoadingChats(false);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);
  useEffect(() => {
    if (user) {
      socket.current = io(`${apiUrl}`, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 180000,
        reconnectionDelayMax: 300000,
      });
      socket.current.emit("join", { id: user?._id });
    }
    return () => {};
  }, [user]);

  useEffect(() => {
    if (selectedRoom !== null) {
      getMessages();
      socket.current.emit("chatJoin", {
        roomId: selectedRoom?._id,
        id: user?._id,
      });
      socket.current.emit("mark-as-read", {
        userId: user?._id,
        roomId: selectedRoom?._id,
      });
      socket.current.on("msg", (msg, room) => {
        if (selectedRoom?._id === room && msg?.user !== user?._id) {
          setMessages((prev) => [...prev, msg]);
          socket.current.emit("mark-as-read", {
            userId: user?._id,
            roomId: selectedRoom?._id,
          });
          scrollToBottom();
        }
      });
    }
  }, []);

  const sendMessage = async (msg) => {
    const msgData = {
      from: user?._id,
      message: {
        text: msg,
        user: user?._id,
      },
      createdAt: moment().format(),
    };
    const newData = [...messages, { ...msgData, roomId: selectedRoom?._id }];
    setMessages(newData);
    delete msgData.createdAt;
    socket.current?.emit("msg", {
      ...msgData,
      roomId: selectedRoom?._id,
    });
  };

  function scrollToBottom() {
    msgEndRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.supportChatBox}>
        <div
          className={classes.supportChatBtn}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoCloseOutline className={classes.icon} />
          ) : (
            <BsFillChatDotsFill className={classes.icon} />
          )}
        </div>
        {isOpen && (
          <div className={classes.chatBox}>
            <div className={classes.header}>
              <h6>Ask Business Brokerage Services</h6>
            </div>
            <div
              className={[
                classes.chats,
                !isChatInitiated && classes.notInitialized,
              ].join(" ")}>
              {isChatInitiated ? (
                <>
                  {IsLoadingChats ? (
                    <Loader />
                  ) : (
                    <>
                      {messages?.map((item, i) => {
                        return (
                          <>
                            {/*  */}
                            {i == 0 ? (
                              <div className={classes.msg_day}>
                                <div className={classes.day}>
                                  <p>
                                    {moment(item?.createdAt).format(
                                      "DD MMM YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              moment(message[i - 1]?.createdAt).format(
                                "DD MMM YYYY"
                              ) !==
                                moment(message[i]?.createdAt).format(
                                  "DD MMM YYYY"
                                ) && (
                                <div className={classes.msg_day}>
                                  <div className={classes.day}>
                                    <p>
                                      {moment(item?.createdAt).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                            {/*  */}

                            {item?.from == user?._id ? (
                              <>
                                <div className={classes.rightMsg}>
                                  <p>{item?.message?.text}</p>
                                  <span>
                                    {moment(item?.createdAt).format("hh:mm a")}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={classes.leftMsg}>
                                  <p>{item?.message?.text}</p>
                                  <span>
                                    {moment(item?.createdAt).format("hh:mm a")}
                                  </span>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}
                      <div ref={msgEndRef} />
                    </>
                  )}
                </>
              ) : (
                <Container fluid style={{ padding: "0px" }}>
                  <Row className="gy-2 gx-0">
                    <Col md={12}>
                      <h5 className={classes.heading}>
                        Start chat with support
                      </h5>
                    </Col>
                    <Col md={12}>
                      <Input
                        setter={setFirstName}
                        value={firstName}
                        placeholder={"User Name"}
                        inputStyle={{
                          padding: "12px 20px",
                          fontFamily: "Open-Sans-regular",
                        }}
                      />
                    </Col>
                    <Col md={12}>
                      <TextArea
                        setter={setMessage}
                        value={message}
                        placeholder={"Message"}
                        customStyle={{
                          padding: "12px 20px",
                          fontFamily: "Open-Sans-regular",
                        }}
                      />
                    </Col>
                    <Col md={12} className={classes.submitBtnCol}>
                      <Button
                        label={submitLoader ? "Submitting..." : "Submit"}
                        onClick={startChat}
                        disabled={submitLoader}
                      />
                    </Col>
                  </Row>
                </Container>
              )}
              {isChatInitiated && (
                <div className={classes.inputBox}>
                  <input
                    onChange={(e) => setValue(e?.target?.value)}
                    value={value}
                    placeholder={"Enter your message here"}
                    onKeyPress={(e) => {
                      if (["Enter", "NumpadEnter"].includes(e.code)) {
                        sendMessage(value);
                        setValue("");
                      }
                    }}
                  />
                  <IoIosSend
                    className={classes.sendIcon}
                    size={25}
                    onClick={() => {
                      sendMessage(value);
                      setValue("");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SupportChat;
