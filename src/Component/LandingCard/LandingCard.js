import React from "react";
import styles from "./LandingCard.module.css";
const LandingCard = ({ image, text, icon }) => {
  return (
    <div className={styles.LandingCard_main}>
      <div className={styles.iconDiv}>{icon}</div>
      <h6 className="min_h6">{text}</h6>
    </div>
  );
};

export default LandingCard;
