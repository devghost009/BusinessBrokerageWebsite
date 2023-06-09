import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import classes from "./Email.module.css";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { RiSendPlaneFill, RiFileExcel2Line } from "react-icons/ri";
import { BiFilter } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { TbSend } from "react-icons/tb";
import {
  BsTrash,
  BsImage,
  BsFileEarmarkWord,
  BsFileEarmark,
} from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import { ProfileImg, team1 } from "../../constant/imagePath";
import { Button } from "../../Component/Button/Button";
import SingleRoomInbox from "../../Component/SingleRoomInbox";
import NoData from "../../Component/NoData/NoData";
import { Input } from "../../Component/Input/Input";
import { TextArea } from "../../Component/TextArea";
import MailSkeleton from "../../Component/MailSkeleton/MailSkeleton";
import { toast } from "react-toastify";
import AreYouSureModal from "../../modals/AreYouSureModal";
import { VscFilePdf } from "react-icons/vsc";
import parse from "html-react-parser";
import DateRangeForEmailModal from "../../modals/DateRangeForEmailModal";
import moment from "moment";

function FileDownload({ item }) {
  function bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }

  return (
    <a
      href={`data:${item?.contentType};base64,${bufferToBase64(
        item?.content?.data
      )}`}
      download
      className={classes.fileInnerMain}>
      <div className={classes.fileInner}>
        <div className={classes.fileIconHead}>
          {["png", "jpg", "jpeg", "jfif"].includes(
            item?.filename?.split(".")[1]
          ) ? (
            <BsImage size={45} color={"red"} />
          ) : item?.filename?.split(".")[1] == "pdf" ? (
            <VscFilePdf size={45} color={"red"} />
          ) : ["doc", "docx"].includes(item?.filename?.split(".")[1]) ? (
            <BsFileEarmarkWord size={45} color={"red"} />
          ) : (
            <RiFileExcel2Line size={45} color={"red"} />
          )}
        </div>
        <p>{item?.filename}</p>
      </div>
    </a>
  );
}

const Email = () => {
  const token = useSelector((state) => state?.authReducer?.accessToken);

  const [allTempelates, setAllTempelates] = useState([]);
  const [emailType, setEmailType] = useState("INBOX");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [selectedMail, setSelectedMail] = useState(undefined);
  const [searchStatus, setSearchStatus] = useState("ALL");
  const [isApiCall, setIsApiCall] = useState(false);
  const [show, setShow] = useState(false);
  const [singleMainUid, setSingleMainUid] = useState();
  const [sendTo, setSendTo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [openMsgBox, setOpenMsgBox] = useState("");
  const [attachment, setAttachment] = useState([{}]);

  const [dates, setDates] = useState([
    moment().startOf("week").format("YYYY-MM-DD"),
    moment().endOf("week").format("YYYY-MM-DD"),
  ]);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const getAllTempelates = async (
    type = searchStatus,
    startDate = dates[0],
    endDate = dates[1]
  ) => {
    const apiUrl = BaseURL(
      `mails/?search=${type}&mood=${emailType}&from=${startDate}&to=${endDate}`
    );
    setIsLoading(true);
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setAllTempelates(response?.data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllTempelates();
  }, [emailType]);

  const handleDeleteMain = async () => {
    const apiUrl = BaseURL(`mails/delete`);
    const body = {
      uids: singleMainUid,
    };
    setIsApiCall(true);
    const response = await Post(apiUrl, body, apiHeader(token));
    if (response !== undefined) {
      setAllTempelates(
        allTempelates.filter((item) => item?.uid !== singleMainUid)
      );
      setIsApiCall(false);
      setSelectedMail(null);
      toast.success("Mail Delete successfully");
      setShow(false);
    } else {
      setIsApiCall(false);
    }
  };

  const handleSendMain = async () => {
    const apiUrl = BaseURL(`mails/send-email`);
    const body = {
      email: sendTo,
      subject: subject,
      message: description,
    };
    for (var key in body) {
      if (body[key] == "" || body[key] == null || body[key] == undefined) {
        if (body[key] == "email") {
          return toast.error(`Please fill send To field`);
        } else {
          return toast.error(`Please fill ${key} field`);
        }
      }
    }

    setIsSending(true);
    const formData = new FormData();
    formData.append("email", sendTo);
    formData.append("subject", subject);
    formData.append("description", description);

    const response = await Post(apiUrl, formData, apiHeader(token, true));
    if (response !== undefined) {
      toast.success("Email send successfully");
      setSendTo("");
      setSubject("");
      setDescription("");
      setAttachment([{}]);
      setIsSending(false);
    } else {
      setIsSending(false);
    }
  };

  const sidebarMenu = [
    {
      title: "Inbox",
      slug: "INBOX",
      icon: <FiHome className={classes.icon} />,
    },
    { title: "Sent", slug: "SENT", icon: <TbSend className={classes.icon} /> },
    {
      title: "Draft",
      slug: "DRAFTS",
      icon: <BsFileEarmark className={classes.icon} />,
    },
    { title: "Junk", slug: "JUNK", icon: <BsTrash className={classes.icon} /> },
    {
      title: "Deleted",
      slug: "DELETED",
      icon: <BsTrash className={classes.icon} />,
    },
  ];

  return (
    <>
      <SideBarSkeleton>
        <div className={classes.mainContainer}>
          <div className={classes.mainHeading}>
            <h3>Email</h3>
          </div>

          <Row>
            <Col lg={2}>
              <div className={classes.sideBar_main}>
                <Button
                  onClick={() => {
                    setSearchStatus("ALL");
                    setOpenMsgBox("open");
                  }}
                  className={classes.message_btn}>
                  New Message
                  <span>
                    <RiSendPlaneFill className={classes.send_icon} />
                  </span>
                </Button>

                <div className={classes.list_main}>
                  {sidebarMenu?.map((item) => (
                    <div
                      onClick={() => {
                        setSearchStatus("ALL");
                        setAllTempelates([]);
                        setSelectedMail(null);
                        setOpenMsgBox("");
                        setEmailType(item?.slug);
                      }}
                      className={
                        emailType == item?.slug
                          ? classes.list_innerClick
                          : classes.list_inner
                      }>
                      {item?.icon}
                      <p>{item?.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className={classes.room_main}>
                <>
                  <div className={classes.inboxHead_main}>
                    <div className={classes.inboxHead_inner}>
                      {emailType == "INBOX" ? (
                        <FiHome className={classes.Home_icon} />
                      ) : emailType == "DRAFTS" ? (
                        <BsFileEarmark className={classes.Home_icon} />
                      ) : emailType == "SENT" ? (
                        <TbSend className={classes.Home_icon} />
                      ) : emailType == "JUNK" ? (
                        <BsTrash className={classes.Home_icon} />
                      ) : emailType == "DELETED" ? (
                        <BsTrash className={classes.Home_icon} />
                      ) : (
                        ""
                      )}
                      <h6>
                        {emailType == "INBOX"
                          ? "Inbox"
                          : emailType == "DRAFTS"
                          ? "Draft"
                          : emailType == "SENT"
                          ? "Sent"
                          : emailType == "JUNK"
                          ? "Junk"
                          : emailType == "DELETED"
                          ? "Deleted"
                          : ""}
                      </h6>
                    </div>
                    <BiFilter
                      onClick={() => setIsOpenFilterModal(true)}
                      className={classes.filterIcon}
                    />
                  </div>

                  <div className={classes.hr_line}></div>

                  {emailType == "INBOX" && (
                    <div className={classes.allAndUnread}>
                      <Row className="text-center gx-0">
                        <Col lg={6}>
                          <div
                            onClick={() => {
                              setSelectedMail(null);
                              setSearchStatus("ALL");
                              getAllTempelates("ALL");
                            }}
                            className={[
                              classes.all,
                              searchStatus == "ALL" && classes.after_click,
                            ].join(" ")}>
                            <p>All</p>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div
                            onClick={() => {
                              setSelectedMail(null);
                              setSearchStatus("UNSEEN");
                              getAllTempelates("UNSEEN");
                            }}
                            className={[
                              classes.unRead,
                              searchStatus == "UNSEEN" && classes.after_click,
                            ].join(" ")}>
                            <p>Unread</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {searchStatus == "ALL" ? (
                    isLoading ? (
                      <>
                        {Array(5)
                          .fill(0)
                          ?.map((item, i) => (
                            <MailSkeleton key={i} />
                          ))}
                      </>
                    ) : allTempelates?.length == 0 ? (
                      <NoData
                        text="No Emails Found"
                        className={classes.templateNodata}
                      />
                    ) : (
                      allTempelates?.map((item, index) => {
                        return (
                          <SingleRoomInbox
                            key={index}
                            onClick={() => {
                              if (emailType == "DRAFTS") {
                                const descriptionHtmlToText =
                                  item?.textAsHtml.replace(/<[^>]+>/g, "");
                                setDescription(descriptionHtmlToText);
                                setSubject(item?.subject || "");
                                setSelectedMail(item);
                                setOpenMsgBox("open");
                              } else {
                                setOpenMsgBox("");
                                setSelectedMail(item);
                              }
                            }}
                            item={item}
                            selectedMail={selectedMail}
                            handleDeleteMain={handleDeleteMain}
                            setShow={setShow}
                            setSingleMainUid={setSingleMainUid}
                          />
                        );
                      })
                    )
                  ) : isLoading ? (
                    <>
                      {Array(5)
                        .fill(0)
                        ?.map((item, i) => (
                          <MailSkeleton key={i} />
                        ))}
                    </>
                  ) : allTempelates?.length == 0 ? (
                    <NoData
                      text="No Emails Found"
                      className={classes.templateNodata}
                    />
                  ) : (
                    allTempelates?.map((item, index) => {
                      return (
                        <SingleRoomInbox
                          key={index}
                          onClick={() => setSelectedMail(item)}
                          item={item}
                          selectedMail={selectedMail}
                        />
                      );
                    })
                  )}
                </>
              </div>
            </Col>

            <Col md={6}>
              <div className={classes.rightBox}>
                <Row className="gx-0">
                  {selectedMail == null && openMsgBox == "" ? (
                    <Col md={12}>
                      <NoData text="Not Selected Yet" />
                    </Col>
                  ) : openMsgBox == "open" ? (
                    <>
                      <Col md={12}>
                        <h5 className={classes.heading}>New Message</h5>
                      </Col>
                      <Col md={12} className={classes.mb31}>
                        <Input
                          label={"Send To"}
                          value={sendTo}
                          setter={setSendTo}
                          placeholder={"Email"}
                        />
                      </Col>
                      <Col md={12} className={classes.mb31}>
                        <Input
                          label={"Subject"}
                          value={subject}
                          setter={setSubject}
                        />
                      </Col>
                      <Col md={12} className={classes.mb31}>
                        <TextArea
                          label={"Description"}
                          value={description}
                          setter={setDescription}
                          className={classes.textArea}
                        />
                      </Col>

                      <Col md={12}>
                        <Button
                          onClick={handleSendMain}
                          label={isSending ? "Sending Message" : "Send Message"}
                          rightIcon={
                            <IoIosSend
                              size={20}
                              style={{ marginLeft: "10px" }}
                            />
                          }
                          disabled={isSending}
                          className={classes.sendBtn}
                        />
                      </Col>
                    </>
                  ) : (
                    <Col md={12}>
                      <div className={classes.emailHeader}>
                        <div className={classes.image_main}>
                          <img src={team1} />
                        </div>
                        <div className={classes.nameAndMail_main}>
                          <h6>{selectedMail?.subject}</h6>
                          <p>{selectedMail?.from}</p>
                        </div>
                      </div>

                      <div className={classes.email_content}>
                        <div className={classes.fileMain}>
                          <Row>
                            {emailType == "INBOX" &&
                              selectedMail?.attachments?.map((item) => {
                                return (
                                  <Col md={3}>
                                    <FileDownload item={item} />
                                  </Col>
                                );
                              })}
                          </Row>
                        </div>
                        <p className={classes.email_text}>
                          {parse(selectedMail?.textAsHtml)}
                        </p>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <AreYouSureModal
          subTitle={`Do you want to delete this mail ?`}
          show={show}
          setShow={setShow}
          onClick={handleDeleteMain}
          isApiCall={isApiCall}
        />
        <DateRangeForEmailModal
          show={isOpenFilterModal}
          setShow={setIsOpenFilterModal}
          setDates={setDates}
          dates={dates}
          handleSubmit={() => getAllTempelates()}
          isLoading={isLoading}
        />
      </SideBarSkeleton>
    </>
  );
};

export default Email;
