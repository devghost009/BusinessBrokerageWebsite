import React from "react";
import styles from "./CoreValueCard.module.css";
import parse from "html-react-parser";

const CoreValueCard = ({ item }) => {
  return (
    <div className={styles.coreCard_main}>
      <h4>{item?.title}</h4>
      <p>{parse(`${item?.description}`)}</p>
    </div>
  );
};

export default CoreValueCard;
