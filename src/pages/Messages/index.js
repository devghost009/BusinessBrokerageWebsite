import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Get } from "../../Axios/AxiosFunctions";
import { Loader } from "../../Component/Loader";
import NoData from "../../Component/NoData/NoData";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import { apiUrl, BaseURL, imageUrl, recordsLimit } from "../../config/apiUrl";
import { GalleryImage } from "../../constant/imagePath";
import classes from "./Messages.module.css";
import PaginationComponent from "../../Component/PaginationComponent";
import { useLocation } from "react-router-dom";
import { Button } from "../../Component/Button/Button";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import { IoChevronBackSharp } from "react-icons/io5";
import SearchInput from "../../Component/SearchInput";
import useDebounce from "../../CustomHooks/useDebounce";

const RenderChatMessage = ({ item, userData }) => {
  const decideChatUser = item?.from == userData?._id;
  return (
    <>
      {decideChatUser ? (
        <div className={classes.single_msg_right}>
          <div className={classes.msg_text_main}>
            <div className={classes.msg_text}>
              <p>{item?.message?.text}</p>
            </div>
            <p className={classes.msgSendTime_right}>
              {" "}
              {moment(item?.createdAt).format("hh:mm a")}
            </p>
          </div>
          <div className={classes.chatAvatar_main}>
            <img
              style={
                item?.message?.user?.avatar == null
                  ? { padding: "15px", borderRadius: "0px" }
                  : {}
              }
              src={`${imageUrl}${item?.message?.user?.avatar}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = GalleryImage;
              }}
            />
          </div>
        </div>
      ) : (
        <div className={classes.single_msg}>
          <div className={classes.chatAvatar_main}>
            <img
              style={
                item?.message?.user?.avatar == null
                  ? { padding: "15px", borderRadius: "0px" }
                  : {}
              }
              src={`${imageUrl}${item?.message?.user?.avatar}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = GalleryImage;
              }}
            />
          </div>

          <div className={classes.msg_text_main}>
            <div className={classes.msg_text}>
              <p>{item?.message?.text}</p>
            </div>
            <p className={classes.msgSendTime}>
              {moment(item?.createdAt).format("hh:mm a")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const SendInput = ({ sendMsg, scrollToBottom }) => {
  const [messageText, setMessageText] = useState("");

  return (
    <div className={classes.chatInput_box}>
      <input
        onKeyPress={async (e) => {
          if (e.key == "Enter") {
            await sendMsg(messageText);
            await scrollToBottom();
            setMessageText("");
          }
        }}
        type="text"
        placeholder="Type Your Message Here..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <div className={classes.input_icon}>
        <span
          onClick={async () => {
            await sendMsg(messageText);
            await scrollToBottom();
            setMessageText("");
          }}
          className={classes.snd_btn}>
          <RiSendPlaneFill className={classes.send_icon} />
        </span>
      </div>
    </div>
  );
};

const RoomBox = ({
  item,
  setChatsPage,
  setChatsData,
  setSelectedRoom,
  selectedRoom,
}) => {
  const userData = useSelector((state) => state?.authReducer?.user);
  const decideRoomUser = item?.users?.find(
    (e) => e?.userId?._id !== userData?._id
  )?.userId;

  const decideGroupData = !["group", "one-to-one"].includes(item?.reference);
  const image =
    (item?.reference == "lead-group" && item?.lead?.buyer?.photo) ||
    (item?.reference == "business-group" && item?.business?.images[0]) ||
    (["one-to-one", "group"].includes(item?.reference) &&
      decideRoomUser?.photo);

  const title =
    (["business-group", "lead-group"].includes(item?.reference) &&
      item?.title) ||
    (["one-to-one", "group"].includes(item?.reference) &&
      `${decideRoomUser?.firstName} ${decideRoomUser?.lastName}`);

  return (
    <div
      className={[
        classes.singleRoom_head,
        selectedRoom?._id == item?._id && classes.selectedRoom,
      ].join(" ")}
      onClick={() => {
        setChatsPage(1);
        setChatsData([]);
        setSelectedRoom(item);
      }}>
      <div className={classes.singleRoom_main}>
        <div className={classes.avatar_main}>
          <img
            style={
              image == null ? { padding: "18px", borderRadius: "0px" } : {}
            }
            src={`${imageUrl}${image}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = GalleryImage;
            }}
          />
        </div>
        <div className={classes.roomDetails}>
          <div className={classes.info_main}>
            <h6 className={classes.userName}>{title}</h6>
            {decideGroupData && (
              <span className={classes.names}>
                {item?.reference == "business-group"
                  ? item?.users
                      ?.map(
                        (e) => `${e?.userId?.firstName} ${e?.userId?.lastName}`
                      )
                      ?.join(", ")
                  : `${item?.lead?.buyer?.firstName} ${item?.lead?.buyer?.lastName}`}
              </span>
            )}
            <div className={classes.lastMsg}>
              <p>{item?.lastMessage?.text}</p>
            </div>
          </div>
          <p className={classes.date}>
            {moment(item?.lastMessage?.updatedAt).format("DD MMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

const RenderChats = ({
  chatsData,
  chatsLoading,
  sendMsg,
  scrollToBottom,
  msgEndRef,
  selectedRoom,
  chatsTotalCount,
  setPageNo,
  pageNo,
  getAllchats,
}) => {
  const userData = useSelector((state) => state?.authReducer?.user);

  return (
    <div className={classes.chat_main}>
      {chatsLoading ? (
        <Loader />
      ) : (
        <div className={classes.scroller_height}>
          {selectedRoom?.reference == "business-group" && (
            <div className={classes.chat_header}>
              <div className={classes.chat_useImg}>
                <img src={`${imageUrl}${selectedRoom?.business?.images[0]}`} />
              </div>

              <h4>{selectedRoom?.title}</h4>
              <p className={classes.description}>Listing Group</p>
            </div>
          )}
          {chatsTotalCount > 1 && chatsTotalCount >= pageNo && (
            <div className={classes.loadMoreBtnDiv}>
              <Button
                label={"Load More"}
                className={classes.loadMoreBtn}
                onClick={() => {
                  const incPage = ++pageNo;
                  getAllchats(incPage);
                  setPageNo(incPage);
                }}
              />
            </div>
          )}
          <div className={classes.allChat_main}>
            {chatsData?.map((item, i) => {
              return (
                <>
                  {i == 0 ? (
                    <div className={classes.msg_day}>
                      <div className={classes.day}>
                        <p>{moment(item?.createdAt).format("DD MMM YYYY")}</p>
                      </div>
                    </div>
                  ) : (
                    moment(chatsData[i - 1]?.createdAt).format(
                      "DD MMM YYYY"
                    ) !==
                      moment(chatsData[i]?.createdAt).format("DD MMM YYYY") && (
                      <div className={classes.msg_day}>
                        <div className={classes.day}>
                          <p>{moment(item?.createdAt).format("DD MMM YYYY")}</p>
                        </div>
                      </div>
                    )
                  )}
                  <div className={classes.message_main}>
                    <RenderChatMessage userData={userData} item={item} />
                  </div>
                </>
              );
            })}
            <SendInput sendMsg={sendMsg} scrollToBottom={scrollToBottom} />
          </div>
          <div ref={msgEndRef} />
        </div>
      )}
    </div>
  );
};

const RenderRooms = ({
  setChatsData,
  setChatsPage,
  setSelectedRoom,
  selectedRoom,
  roomsData,
  roomsLoading,
  roomsPage,
  roomsTotalCount,
  setRoomsPage,
  search,
  setSearch,
}) => {
  return (
    <div className={classes.allRooms_main}>
      <div className={classes.searchInputDiv}>
        <SearchInput
          value={search}
          setter={setSearch}
          placeholder={"Search"}
          customStyle={{ width: "100%", boxShadow: "none" }}
          inputStyle={{
            border: "1px solid #000",
            padding: "8px",
          }}
        />
      </div>
      {roomsLoading ? (
        <Loader />
      ) : roomsData?.length == 0 ? (
        <NoData />
      ) : (
        <>
          <div className={classes.roomsBox}>
            {roomsData?.map((item, index) => {
              return (
                <>
                  <RoomBox
                    key={index}
                    item={item}
                    setChatsData={setChatsData}
                    setChatsPage={setChatsPage}
                    setSelectedRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                  />
                </>
              );
            })}
          </div>
          {roomsData?.length > 0 && (
            <div className={classes.pagination}>
              <PaginationComponent
                totalPages={Math.ceil(roomsTotalCount / recordsLimit)}
                setCurrentPage={setRoomsPage}
                currentPage={roomsPage}
                defaultActiveColor={"var(--dashboard-main-color)"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Messages = () => {
  const token = useSelector((state) => state?.authReducer?.accessToken);
  const userData = useSelector((state) => state?.authReducer?.user);

  const [isMobile, setIsMobile] = useState(false);

  const roomDataFromLocation = useLocation()?.state;
  // get all rooms state
  const [roomsData, setRoomsData] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsPage, setRoomsPage] = useState(1);
  const [roomsTotalCount, setRoomsTotalCount] = useState(1);
  // get all chats state
  const [chatsData, setChatsData] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [chatsPage, setChatsPage] = useState(1);
  const [chatsTotalCount, setChatsTotalCount] = useState(1);
  // selected room state
  const [selectedRoom, setSelectedRoom] = useState(null);

  // search for room
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 500);

  const msgEndRef = useRef(null);
  const socket = useRef(null);
  // scroll to bottom
  function scrollToBottom() {
    msgEndRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  // get all rooms
  const getAllRoom = async (page = roomsPage) => {
    const apiUrl = BaseURL(
      `chats?page=${page}&limit=${recordsLimit}&type=all&search=${search}`
    );
    setRoomsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setRoomsData(response?.data?.data?.data);
      setRoomsTotalCount(response?.data?.data?.totalCount);
    }
    setRoomsLoading(false);
  };
  // get all chats
  const getAllchats = async (page = chatsPage) => {
    const apiUrl = BaseURL(
      `chats/messages/${selectedRoom?._id}?page=${page}&limit=${recordsLimit}`
    );
    page == 1 && setChatsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setChatsData([...response?.data?.data?.reverse(), ...chatsData]);
      setChatsTotalCount(Math.ceil(response?.data?.totalCount / recordsLimit));
    }
    page == 1 && setChatsLoading(false);
    page == 1 && scrollToBottom();
  };
  // for selected room
  useEffect(() => {
    if (selectedRoom !== null) {
      getAllchats();
      socket.current?.emit("mark-as-read", {
        roomId: selectedRoom?.id,
        userId: userData?._id,
      });
      socket.current?.emit("join", {
        id: userData?._id,
        roomId: selectedRoom?._id,
      });
      socket.current?.on("msg", (msg, room) => {
        if (selectedRoom?._id == room && msg.user?._id !== userData?._id) {
          setChatsData((prev) => [...prev, msg]);
          socket.current.emit("mark-as-read", {
            roomId: selectedRoom?.id,
            userId: userData?._id,
          });
          scrollToBottom();
        }
      });
    }
  }, [selectedRoom]);
  // For Location Room
  useEffect(() => {
    if (roomDataFromLocation) {
      setSelectedRoom(roomDataFromLocation);
    }
  }, [roomDataFromLocation]);
  // send message
  const sendMsg = (e) => {
    if (e?.trim() == "") {
      return;
    }
    const msg = {
      from: userData?._id,
      message: {
        text: e,
        user: {
          _id: userData?._id,
          avatar: userData?.photo,
          userName: `${userData.firstName} ${userData.lastName}`,
        },
      },
      createdAt: moment().format(),
    };
    const newData = [...chatsData];
    newData.push({ ...msg, roomId: selectedRoom?._id });
    setChatsData(newData);
    socket.current?.emit("msg", {
      ...msg,
      roomId: selectedRoom?._id,
    });

    return;
  };
  // chat join
  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
    socket.current = io(apiUrl, { transports: ["websocket"] });
    socket.current?.emit("join", { id: userData?._id });

    return () => {
      socket.current.emit("disconnected", { _id: userData?._id });
    };
  }, []);
  // rooms pagination
  useEffect(() => {
    getAllRoom(roomsPage);
  }, [roomsPage]);

  useEffect(() => {
    getAllRoom(1);
  }, [debounceSearchTerm]);

  return (
    <>
      <SideBarSkeleton>
        <div className={classes.main_container}>
          <div className={classes.main_header}>
            <div className={classes.heading}>
              <h4>Messages</h4>
            </div>
          </div>
          <Row>
            {isMobile ? (
              <>
                {selectedRoom == null ? (
                  <Col md={12}>
                    <RenderRooms
                      setChatsData={setChatsData}
                      setChatsPage={setChatsPage}
                      setSelectedRoom={setSelectedRoom}
                      selectedRoom={selectedRoom}
                      roomsData={roomsData}
                      roomsLoading={roomsLoading}
                      roomsPage={roomsPage}
                      roomsTotalCount={roomsTotalCount}
                      setRoomsPage={setRoomsPage}
                      setSearch={setSearch}
                      search={search}
                    />
                  </Col>
                ) : (
                  <Col md={12}>
                    <IoChevronBackSharp
                      size={30}
                      className={classes.mb10}
                      onClick={() => {
                        setSelectedRoom(null);
                      }}
                    />
                    <RenderChats
                      selectedRoom={selectedRoom}
                      sendMsg={sendMsg}
                      scrollToBottom={scrollToBottom}
                      msgEndRef={msgEndRef}
                      chatsData={chatsData}
                      chatsLoading={chatsLoading}
                      chatsTotalCount={chatsTotalCount}
                      setPageNo={setChatsPage}
                      pageNo={chatsPage}
                      getAllchats={getAllchats}
                    />
                  </Col>
                )}
              </>
            ) : (
              <>
                <Col lg={4} xxl={3}>
                  <RenderRooms
                    setChatsData={setChatsData}
                    setChatsPage={setChatsPage}
                    setSelectedRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                    roomsData={roomsData}
                    roomsLoading={roomsLoading}
                    roomsPage={roomsPage}
                    roomsTotalCount={roomsTotalCount}
                    setRoomsPage={setRoomsPage}
                    setSearch={setSearch}
                    search={search}
                  />
                </Col>
                <Col lg={8} xxl={9}>
                  {selectedRoom ? (
                    <RenderChats
                      selectedRoom={selectedRoom}
                      sendMsg={sendMsg}
                      scrollToBottom={scrollToBottom}
                      msgEndRef={msgEndRef}
                      chatsData={chatsData}
                      chatsLoading={chatsLoading}
                      chatsTotalCount={chatsTotalCount}
                      setPageNo={setChatsPage}
                      pageNo={chatsPage}
                      getAllchats={getAllchats}
                    />
                  ) : (
                    <div className={classes.chat_main}>
                      <NoData text="No Room Selected" />
                    </div>
                  )}
                </Col>
              </>
            )}
          </Row>
        </div>
      </SideBarSkeleton>
    </>
  );
};

export default Messages;
