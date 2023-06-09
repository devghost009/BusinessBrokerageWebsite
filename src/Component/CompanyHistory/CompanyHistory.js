import React from "react";
import styles from "./CompanyHistory.module.css";
import { Row, Col } from "react-bootstrap";
import { imageUrl } from "../../config/apiUrl";
const CompanyHistory = ({ item, index }) => {
  return (
    <div key={index} className={styles.CompanyHistory_main}>
      <Row className={styles.CompanyHistory_row}>
        {index % 2 == 0 && (
          <Col lg={6} md={12} className={styles.textDescCol}>
            <p> {item?.text}</p>
          </Col>
        )}
        <Col className={styles.CompanyHistory_right_col} lg={6} md={12}>
          <div className={styles.CompanyHistory_right}>
            <div
              style={{ marginLeft: index % 2 == 0 && "auto" }}
              className={styles.CompanyHistory_image}>
              <img className="img-fluid" src={`${imageUrl}${item?.image}`} />
            </div>
          </div>
        </Col>

        {index % 2 == 1 && (
          <Col lg={6} md={12} className={styles.textDescCol}>
            <p> {item?.text}</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CompanyHistory;
