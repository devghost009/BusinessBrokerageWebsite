import React from "react";
import styles from "./BuyAndSale.module.css";
import { Button } from "../../Component/Button/Button";
const BuyAndSale = ({ image, heading, text, btn_text, onClick, icon }) => {
  return (
    <div className={styles.buyAndSale__main}>
      <div className={styles.buyAndSale__content}>
        <div className={styles.iconDiv} onClick={onClick}>
          {icon}
        </div>
        <h3>{heading}</h3>
        <p>{text}</p>
        <div className={styles.BuyAndSale_btn}>
          <Button
            label={btn_text}
            className={styles.BuyAndSale_btn_inner}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyAndSale;
