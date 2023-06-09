import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import SellBusinessCard from "../../Component/SellBusinessCard/SellBusinessCard";
import classes from "./Services.module.css";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { useSelector } from "react-redux";
import { imageUrl } from "../../config/apiUrl";
import {
  FaMoneyCheckAlt,
  FaRegHandshake,
  FaRegIdCard,
  FaRegLightbulb,
  FaRegMoneyBillAlt,
  FaUserEdit,
  FaWineBottle,
} from "react-icons/fa";
import { BsGraphUp, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineMonitor } from "react-icons/md";

const Services = () => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.services);

  const sellBusinessArray = [
    {
      image: `${imageUrl}${cmsData?.section1_image}`,
      title: cmsData?.section1_title,
      decription: cmsData?.section1_description,
    },
    {
      image: `${imageUrl}${cmsData?.section2_image}`,
      title: cmsData?.section2_title,
      decription: cmsData?.section2_description,
    },
    {
      image: `${imageUrl}${cmsData?.section3_image}`,
      title: cmsData?.section3_title,
      decription: cmsData?.section3_description,
    },
  ];

  return (
    <>
      <Header />
      <HeroSection customClass={[classes.heroBackground]}>
        <div className={[classes.heroContainer]}>
          <h1 className={[classes.heroHeader]}>Services</h1>
        </div>
      </HeroSection>

      {/* sellBusiness */}
      <Container className={classes.text_conti}>
        {sellBusinessArray?.map((item, index) => {
          return <SellBusinessCard item={item} index={index} />;
        })}
      </Container>
      {/* sellBusiness */}

      <Container className={classes.text_conti}>
        <Row>
          <Col>
            <h3>{cmsData?.section4_title}</h3>
            <p className={classes.servicesText}>
              {cmsData?.section4_description}
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={classes.ball_conti}>
        <Row>
          <Col lg={12} className={classes.ball_col}>
            {cmsData?.services?.map((item, index) => {
              return (
                <>
                  <div className={classes.div_twenty}>
                    <div className={classes.iconDiv}>
                      {servicesArray[index]}
                    </div>
                    <h4>{item?.title}</h4>
                  </div>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Services;

const servicesArray = [
  <FaMoneyCheckAlt size={60} color={"var(--main-color)"} />,
  <FaRegLightbulb size={60} color={"var(--main-color)"} />,
  <BsGraphUp size={60} color={"var(--main-color)"} />,
  <FaRegMoneyBillAlt size={60} color={"var(--main-color)"} />,

  <FaWineBottle size={60} color={"var(--main-color)"} />,
  <FaUserEdit size={60} color={"var(--main-color)"} />,
  <FaRegHandshake size={60} color={"var(--main-color)"} />,

  <MdOutlineMonitor size={60} color={"var(--main-color)"} />,

  <FaRegIdCard size={60} color={"var(--main-color)"} />,
  <BsCurrencyDollar size={60} color={"var(--main-color)"} />,
];
