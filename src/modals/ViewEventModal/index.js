import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { imageUrl } from "../../config/apiUrl";
import ModalSkeletonWithHeaderBg from "../ModalSkeletonWithHeaderBg";
import classes from "./ViewEventModal.module.css";

const ViewEventModal = ({ show, setShow, data }) => {
  return (
    <>
      <ModalSkeletonWithHeaderBg
        show={show}
        setShow={setShow}
        width={"750px"}
        borderRadius={"10px"}
        header={"Event Detail"}
      >
        <Row className="gy-2">
          <Col md={6}>
            <div className={classes.viewEventMain}>
              <p className={classes.mainHead}>Name:</p>
              <p className={classes.text}>{data?.name}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className={classes.viewEventMain}>
              <p className={classes.mainHead}>Date:</p>
              <p className={classes.text}>
                {moment(data?.date).format("YYYY-MM-DD")}
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className={classes.viewEventMain}>
              <p className={classes.mainHead}>Time:</p>
              <p className={classes.timeText}>
                {moment(data?.date).format("hh:mm a")}
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div className={classes.viewEventMain}>
              <p className={classes.mainHead}>Venue:</p>
              <p className={classes.text}>{data?.venue}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className={classes.viewEventMain}>
              <p className={classes.mainHead}>Agenda:</p>
              <p className={classes.text}>{data?.agenda}</p>
            </div>
          </Col>

          <Col md={12}>
            <div>
              <p className={classes.mainHead}>Description:</p>
              <p className={classes.text}>{data?.description}</p>
            </div>
          </Col>
          <Col md={12}>
            <div>
              <p className={classes.mainHead}>Attendees:</p>
              <div className={classes.attendeesDiv}>
                {data?.attendees?.map((item, i) => {
                  return (
                    <div>
                      <div className={[classes.profileImg]}>
                        <img src={`${imageUrl}${item?.photo}`} alt="..." />
                      </div>
                      <p className={classes.text}>
                        {item?.firstName} {item?.lastName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div>
              <p className={classes.mainHead}>Customers:</p>
              <div className={classes.attendeesDiv}>
                {data?.customerAttendees?.map((item, i) => {
                  return (
                    <div>
                      <div className={[classes.profileImg]}>
                        <img src={`${imageUrl}${item?.photo}`} alt="..." />
                      </div>
                      <p className={classes.text}>
                        {item?.firstName} {item?.lastName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </ModalSkeletonWithHeaderBg>
    </>
  );
};

export default ViewEventModal;
