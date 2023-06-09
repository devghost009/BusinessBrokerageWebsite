import React from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./StatCard.module.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
const StatCard = ({ item, title, bgChange, className = "" }) => {
  const check = parseFloat(item?.value);
  return (
    <div
      style={
        bgChange == true
          ? {
              background: "var(--dashboard-main-color)",
              color: "var(--white-color)",
            }
          : {
              background: "var(--white-color)",
              color: "var(--text-color-black)",
            }
      }
      className={[classes.statCard_main, className].join(" ")}
    >
      <Row>
        <Col lg={8}>
          <div className={classes.leftSectionMain}>
            <h6>{title}</h6>
            <h5>{item}</h5>
          </div>
        </Col>
        <Col className={classes.right_col} lg={4}>
          <div
            style={
              bgChange == true
                ? { background: "#0089DD" }
                : { background: "var(--dashboard-main-color)" }
            }
            className={classes.upDown_arrow_main}
          >
            {bgChange == true ? (
              <TrendingDownIcon className={classes.updown_icon} />
            ) : (
              <TrendingUpIcon className={classes.updown_icon} />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatCard;
