import React, { useEffect, useState } from "react";
import styles from "./SellBusinessCard.module.css";
import { Row, Col } from "react-bootstrap";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
const SellBusinessCard = ({ item, index }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    isMobileViewHook(setIsMobile);
  }, []);
  return (
    <div className={styles.SellBusinessCard_main}>
      <Row>
        {index % 2 == 1 && (
          <Col className={styles.SellBusinessCard_col} lg={6} md={12}>
            <div className={styles.SellBusinessCard_right}>
              <h3>{item?.title}</h3>
              <p>{item?.decription}</p>
            </div>
          </Col>
        )}
        <Col lg={6} md={12}>
          <div className={styles.SellBusinessCard_left}>
            <img src={item?.image} />
          </div>
        </Col>
        {index % 2 == 0 && (
          <Col className={styles.SellBusinessCard_col} lg={6} md={12}>
            <div className={styles.SellBusinessCard_right}>
              <h3>{item?.title}</h3>
              <p>{item?.decription}</p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SellBusinessCard;
