import React from "react";
import styles from "./AboutTeam.module.css";
import { imageUrl, ReturnFormatedNumber } from "../../config/apiUrl";
import ShowMoreShowLessText from "../ShowMoreShowLess";
const AboutTeam = ({ item, imgClass }) => {
  return (
    <div className={styles.aboutTeam_main}>
      <div
        className={`${[styles.aboutTeam_img, imgClass && imgClass].join(" ")}`}>
        <img src={`${imageUrl}${item?.photo}`} />
      </div>
      <h4>{`${item?.firstName} ${item?.lastName}`}</h4>

      <div className={styles.aboutTeam_content}>
        <h6>{item?.designation}</h6>
        <p className={styles.site}>{item?.email}</p>
        <p className={styles.office}>
          <span>Office:</span>
          <a href={`tel:${ReturnFormatedNumber(item?.officeContact)}`}>
            {ReturnFormatedNumber(item?.officeContact)}
          </a>
        </p>
        <p className={styles.desk}>
          <span>Desk:</span>
          <a href={`tel:${ReturnFormatedNumber(item?.deskContact)}`}>
            {ReturnFormatedNumber(item?.deskContact)}
          </a>
        </p>
        {item?.contact && (
          <p className={styles.cell}>
            <span>Cell:</span>
            <a href={`tel:${ReturnFormatedNumber(item?.contact)}`}>
              {ReturnFormatedNumber(item?.contact)}
            </a>
          </p>
        )}
        <p className={styles.para}>
          <ShowMoreShowLessText text={item?.description} visibility={250} />
        </p>
      </div>
    </div>
  );
};

export default AboutTeam;
