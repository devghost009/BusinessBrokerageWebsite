import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AboutTeam from "../../Component/AboutTeam/AboutTeam";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import styles from "./AboutUs.module.css";
import CoreValueCard from "../../Component/CoreValueCard/CoreValueCard";
import CompanyHistory from "../../Component/CompanyHistory/CompanyHistory";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button } from "../../Component/Button/Button";

const AboutUs = () => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.about);

  const companyHistory = [
    {
      text: parse(`${cmsData?.section3_description}`),
      image: cmsData?.section3_image,
    },
    {
      text: parse(`${cmsData?.section4_description}`),
      image: cmsData?.section4_image,
    },
    {
      text: parse(`${cmsData?.section5_description}`),
      image: cmsData?.section5_image,
    },
  ];

  function moveToSection(id) {
    window.scrollTo(
      0,
      document.getElementById(id).getBoundingClientRect().top - 110
    );
  }

  return (
    <div>
      <Header />
      {/* hero-section */}
      <HeroSection>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>{cmsData?.section1_title}</h1>
          <Row className={[styles.heroSubHeaderDiv]}>
            <Col className={[styles.heroSubHeader]}>
              <Button
                className={styles.heroBtn}
                onClick={() => moveToSection("ourTeam")}>
                Our Team
              </Button>
            </Col>
            <Col
              className={[styles.heroSubHeader]}
              onClick={() => moveToSection("whoWeAre")}>
              <Button className={styles.heroBtn}>{"Who We Are"}</Button>
            </Col>
            <Col
              className={[styles.heroSubHeader]}
              onClick={() => moveToSection("coreValues")}>
              <Button className={styles.heroBtn}>Core Values</Button>
            </Col>
            <Col className={[styles.heroSubHeader]}>
              <Button
                className={styles.heroBtn}
                onClick={() => moveToSection("companyHistory")}>
                Company History
              </Button>
            </Col>
          </Row>
        </div>
      </HeroSection>
      {/* hero-section */}

      <div className={styles.aboutPage_bgColor}>
        {/* our-team */}
        <Container className={styles.team_container} id={"ourTeam"}>
          <h1>Our Team</h1>
          <Row className={styles.ourTeam_row}>
            {/* From CMS will uncomment when the website will deployed to live */}
            {cmsData?.ourTeam?.slice(0, 2).map((item, index) => (
              <>
                <Col md={0} lg={1} className={styles.dNone1200} />
                <Col key={index} md={6} xl={4} className={styles.our_teamCol}>
                  <AboutTeam item={item} imgClass={styles.team_image} />
                </Col>
                <Col md={0} lg={1} className={styles.dNone1200} />
              </>
            ))}
            {cmsData?.ourTeam?.slice(2)?.map((item, index) => (
              <Col key={index} md={6} xl={4} className={styles.our_teamCol}>
                <AboutTeam item={item} imgClass={styles.team_image} />
              </Col>
            ))}
            {/* From CMS will uncomment when the website will deployed to live */}
          </Row>
        </Container>
        {/* our-team */}

        {/* about-section */}
        <Container className={styles.container} id={"whoWeAre"}>
          <div className={styles.aboutSection_head}>
            <h1>{cmsData?.section2_title}</h1>
          </div>
          <div className={styles.AboutSection_main}>
            <p>{parse(`${cmsData?.section2_description}`)}</p>
          </div>
        </Container>
        {/* about-section */}
      </div>

      {/* core-value */}
      <Container className={styles.core_container} fluid id="coreValues">
        <h3>Core Values</h3>
        <Row className={styles.core_row}>
          {cmsData?.coreValues?.map((item, index) => {
            return (
              <Col className={styles.coreCol} key={index} lg={4} md={6} sm={12}>
                <CoreValueCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
      {/* core-value */}

      {/* conmpany-history */}
      <Container
        className={styles.companyHistory_container}
        fluid
        id={"companyHistory"}>
        <h3>{cmsData?.section3_title}</h3>
        {companyHistory?.map((item, index) => {
          return <CompanyHistory index={index} item={item} />;
        })}
      </Container>
      {/* conmpany-history */}
      <Footer />
    </div>
  );
};

export default AboutUs;
