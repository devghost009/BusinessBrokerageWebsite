import React from "react";
import classes from "./BuyABusinessAndFreeValuationComponent.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
const BuyABusinessAndFreeValuationComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.btn_section_bgImg}>
      <div className={classes.btn_img_overlay}></div>
      <div className={classes.btn_section_main}>
        <Container className={classes.container}>
          <Row className={classes.btn_section_row}>
            <Col className={classes.btn_section_col} lg={6} md={6} sm={12}>
              <div className={classes.btn_section_left}>
                <Button
                  label="buy a business"
                  className={classes.btn_section_leftCol}
                  onClick={() => navigate("/buy-a-business")}
                />
              </div>
            </Col>
            <Col className={classes.btn_section_col} lg={6} md={6} sm={12}>
              <div className={classes.btn_section_right}>
                <Button
                  label="get a free valuation"
                  className={classes.btn_section_rightCol}
                  onClick={() => navigate("/free-business-valuation")}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BuyABusinessAndFreeValuationComponent;
