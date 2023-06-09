import React from "react";
import styles from "./CareerOpportunities.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Button } from "../../Component/Button/Button";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CareerOpportunities = () => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.careers);
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <Header />
      <HeroSection customClass={[styles.heroBackground]}>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>Career Opportunities</h1>
        </div>
      </HeroSection>
      <Container className={styles.container}>
        <div className={styles.career_top_main}>
          <h3>{cmsData?.section1_title}</h3>
          <p>{cmsData?.section1_description}</p>
        </div>
      </Container>

      <div className={styles.container2_main}>
        <Container className={styles.container}>
          <h3>{cmsData?.section2_title}</h3>
          <Row className={[styles.card, styles.broker_left]}>
            <Col md={12}>
              <h4>{cmsData?.section2_subTitle1}</h4>
            </Col>
            <Col lg={9} md={12}>
              <p>{cmsData?.section2_description1}</p>
            </Col>
            <Col className={styles.apply_btn} lg={3}>
              <Button
                label="APPLY"
                className={styles.career_btn}
                onClick={() => navigate("/contact-us")}
              />
            </Col>
          </Row>
          <Row className={[styles.card, styles.broker_left]}>
            <Col md={12}>
              <h4>{cmsData?.section2_subTitle2}</h4>
            </Col>
            <Col lg={9} md={12}>
              <p>{cmsData?.section2_description2}</p>
            </Col>
            <Col className={styles.apply_btn} lg={3}>
              <Button
                label="APPLY"
                className={styles.career_btn}
                onClick={() => navigate("/contact-us")}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CareerOpportunities;
