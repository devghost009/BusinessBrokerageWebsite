import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaRegHandshake } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { imageUrl, ReturnFormatedNumber } from "../../config/apiUrl";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./BrokerInfoModal.module.css";

const BrokerInfoModal = ({ show, setShow, data }) => {
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      borderRadius="20px"
      width="652px"
      borderLine={false}
      modalClass={[classes.brokerInfoModal]}>
      <Row>
        <Col md={12}>
          <div className={classes.brokerInfoHeader}>
            <h3>Broker Detail</h3>
          </div>
        </Col>
        <Col md={12} className={classes.brokerImgCol}>
          <div className={classes.brokerImgDiv}>
            <img src={`${imageUrl}${data?.photo}`} />
          </div>
        </Col>
        <Col className={classes.brokerInfoCol}>
          <h5>
            {data?.firstName} {data?.lastName} |{data?.designation}
          </h5>
          <div className={classes.brokerDesc}>
            <p>{data?.description}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <a
            href={`tel:${data?.officeContact}`}
            className={classes.iconWithValue}>
            <FiPhone />
            <p>{`Office : ${ReturnFormatedNumber(data?.officeContact)}`}</p>
          </a>

          {data?.cell && (
            <a href={`tel:${data?.cell}`} className={classes.iconWithValue}>
              <FiPhone />
              <p>{`Cell : ${ReturnFormatedNumber(data?.cell)}`}</p>
            </a>
          )}
        </Col>
        <Col md={6}>
          {data?.deskContact && (
            <a
              href={`tel:${data?.deskContact}`}
              className={classes.iconWithValue}>
              <FiPhone />
              <p>{`Desk : ${ReturnFormatedNumber(data?.deskContact)}`}</p>
            </a>
          )}
          <a href={`mailto:${data?.email}`} className={classes.iconWithValue}>
            <MdOutlineEmail />
            <p>{`${data?.email}`}</p>
          </a>
        </Col>
        <Col md={6}>
          <a href={`tel:${data?.contact}`} className={classes.iconWithValue}>
            <FiPhone />
            <p>{`Personal : ${ReturnFormatedNumber(data?.contact)}`}</p>
          </a>
          {data?.meetingLink && (
            <a
              href={`${data?.meetingLink}`}
              className={classes.iconWithValue}
              target="_blank">
              <FaRegHandshake />
              <p>Schedule a Meeting</p>
            </a>
          )}
        </Col>
      </Row>
    </ModalSkeleton>
  );
};

export default BrokerInfoModal;
