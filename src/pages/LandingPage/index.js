import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import classes from "./LandingPage.module.css";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { curveLine } from "../../constant/imagePath";
import { Button } from "../../Component/Button/Button";
import HeroSection from "../../Component/HeroSection/HeroSection";
import BuyAndSale from "../../Component/BuyAndSale/BuyAndSale";
import LandingCard from "../../Component/LandingCard/LandingCard";
import GetFreeValuation from "../../Component/GetFreeValuation/GetFreeValuation";
import BuyABusinessAndFreeValuationComponent from "../../Component/BuyABusinessAndFreeValuationComponent";
import { useSelector } from "react-redux";
import { imageUrl } from "../../config/apiUrl";
import { AiFillShop } from "react-icons/ai";
import { MdCloudCircle, MdSell } from "react-icons/md";
import { FaHandsHelping, FaMoneyCheckAlt } from "react-icons/fa";
import { IoIosRibbon } from "react-icons/io";

export default function LandingPage() {
  const navigate = useNavigate();
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.home);

  const BuyAndSaleArray = [
    {
      heading: cmsData?.section2_title1,
      text: cmsData?.section2_description1,
      btn_text: "start your search",
      icon: <AiFillShop size={60} color={"var(--main-color)"} />,
    },
    {
      heading: cmsData?.section2_title2,
      text: cmsData?.section2_description2,
      btn_text: "start your journey",
      icon: <MdSell size={60} color={"var(--main-color)"} />,
    },
  ];

  return (
    <>
      <style>{`
      .rec-dot_active{
        background-color: #02528a80 ;
        box-shadow: 0 0 1px 3px var(--main-color);
      }
      .rec-dot_active:hover{
        box-shadow: 0 0 1px 3px var(--main-color);
      }
      `}</style>
      <div className={classes.landingPage}>
        {/* Hero Section */}
        <Header backgroundColor={"var(--white-color)"} />
        <div className={classes.landingPage}>
          <HeroSection
            customClass={classes.heroSection}
            style={{
              backgroundImage: `url(${imageUrl}${cmsData?.section1_image})`,
            }}>
            <div className={[classes.heroContainer]}>
              <h1 className={[classes.heroHeader]}>
                {cmsData?.section1_title}
              </h1>

              <h6 className={[classes.heroSubHeader]}>
                {cmsData?.section1_subTitle}
              </h6>
              <p className={[classes.heroContent]}>
                {cmsData?.section1_description}
              </p>
              <Button
                className={classes.heroBtn}
                label={"CONTACT US"}
                onClick={() => navigate("/contact-us")}
              />
            </div>
          </HeroSection>

          <div className={classes.BuyAndSale__main}>
            <Container className={classes.container}>
              <Row>
                {BuyAndSaleArray?.map((item, index) => {
                  return (
                    <Col className={classes.BuyAndSale_col} key={index} lg={6}>
                      <BuyAndSale
                        // image={item?.image}
                        icon={item?.icon}
                        heading={item?.heading}
                        text={item?.text}
                        btn_text={item?.btn_text}
                        onClick={() =>
                          navigate(
                            item?.heading == "Buy A Business"
                              ? "buy-a-business"
                              : "/sell-business"
                          )
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>

          {/* landing_about */}
          <div className={classes.landing__about}>
            <Container className={classes.container}>
              <Row>
                <Col lg={7}>
                  <div className={classes.aboutCol_left}>
                    <div>
                      <h3>{cmsData?.section3_title}</h3>
                      <p>{cmsData?.section3_description}</p>
                    </div>
                    <div className={classes.about__btn}>
                      <Button
                        label="learn more about us"
                        className={classes.about_btn_inner}
                        onClick={() => navigate("/about")}
                      />
                    </div>
                  </div>
                </Col>

                <Col lg={5}>
                  <div className={classes.aboutCol_right}>
                    <img
                      className="img-fluid"
                      src={`${imageUrl}${cmsData?.section3_image}`}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          {/* landing_about */}

          {/* card-section */}
          <div className={classes.cardSection__main}>
            <Container className={classes.container}>
              <Row>
                {cmsData?.homeServices?.map((item, index) => {
                  return (
                    <Col
                      className={classes.LandingCard_col}
                      key={index}
                      lg={3}
                      md={6}
                      sm={12}>
                      <LandingCard
                        image={`${imageUrl}${item?.image}`}
                        text={item?.title}
                        icon={landingCardIcons[index]}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
          {/* card-section */}

          {/* text-slider */}
          <div className={classes.text_silder_main}>
            <Container className={classes.container}>
              <Carousel showArrows={false} enableAutoPlay={true}>
                {cmsData?.reviews?.map((item, index) => {
                  return (
                    <div key={item?.id}>
                      <div className={classes.text_silder_content}>
                        <h3>{item?.title}</h3>
                        <p>{item?.description}</p>

                        <div className={classes.text_silder_bottom}>
                          <p>{item?.userName}</p>
                          <p>{item?.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </Container>
          </div>
          {/* text-slider */}

          {/* btn_section */}
          <BuyABusinessAndFreeValuationComponent />
          {/* btn_section */}

          <div className={classes.BuyAndSale_head}>
            <Container className={classes.container}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className={classes.BuyAndSale_leftCol}>
                    <h3>{cmsData?.section5_title1}</h3>
                    <p>{cmsData?.section5_description1}</p>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className={classes.BuyAndSale_rightCol}>
                    <h3>{cmsData?.section5_title2}</h3>
                    <p>{cmsData?.section5_description2}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* button_section */}

          {/* get-free */}
          <GetFreeValuation
            image={curveLine}
            onClick={() => navigate("/free-business-valuation")}
          />
          {/* get-free */}
        </div>
        <Footer />
      </div>
    </>
  );
}

const landingCardIcons = [
  <FaMoneyCheckAlt size={60} color={"var(--main-color)"} />,
  <FaHandsHelping size={60} color={"var(--main-color)"} />,
  <MdCloudCircle size={60} color={"var(--main-color)"} />,
  <IoIosRibbon size={60} color={"var(--main-color)"} />,
];
