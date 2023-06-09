import React from "react";
import classes from "./LatestAndEmailSection.module.css";
import { GoPrimitiveDot } from "react-icons/go";
import moment from "moment";
const LatestActivitiesSection = ({ item }) => {
  return (
    <div>
      <div className={classes.bullet_main}>
        <div className={[classes.date_main]}>
          <p>{moment(item?.createdAt).format("L")}</p>
        </div>
        <div className={classes.email_date_main}>
          <p className={classes.email_para}>
            {item?.seen == false && (
              <GoPrimitiveDot className={classes.bullet_icon_two} />
            )}
            {item?.message}
          </p>
        </div>

        <div className={classes.hr_line}></div>
      </div>
    </div>
  );
};

export default LatestActivitiesSection;
