import React from "react";
import classes from "./LatestAndEmailSection.module.css";
import { GoPrimitiveDot } from "react-icons/go";
import moment from "moment";
import parse from "html-react-parser";
const LatestAndEmailSection = ({ item }) => {
  return (
    <div className={classes.bullet_main}>
      <div className={classes.email_date_main}>
        <p className={classes.email_para}>
          <GoPrimitiveDot className={classes.bullet_icon} /> {item?.from}
        </p>
        <div className={classes.dateTime_main}>
          <p>{moment(item?.date).format("L")}</p>
          <p>{moment(item?.date).format("LT")}</p>
        </div>
      </div>
      <p className={classes.notification_text}>
        <p className={classes.notification_text}>{parse(item?.textAsHtml)}</p>
      </p>

      <div className={classes.hr_line}></div>
    </div>
  );
};

export default LatestAndEmailSection;
