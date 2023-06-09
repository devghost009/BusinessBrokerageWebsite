import React from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import styles from "./SellBusiness.module.css";
import { curveLine } from "../../constant/imagePath";
import SellBusinessCard from "../../Component/SellBusinessCard/SellBusinessCard";
import { Container } from "react-bootstrap";
import GetFreeValuation from "../../Component/GetFreeValuation/GetFreeValuation";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageUrl } from "../../config/apiUrl";
import { Button } from "../../Component/Button/Button";
const SellBusiness = () => {
  const cmsData = useSelector(
    (state) => state?.commonReducer?.cms?.sellYourBusiness
  );
  const navigate = useNavigate();
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
    {
      image: `${imageUrl}${cmsData?.section4_image}`,
      title: cmsData?.section4_title,
      decription: cmsData?.section4_description,
    },
  ];
  return (
    <>
      <Header />
      <HeroSection customClass={[styles.heroBackground]}>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>Sell Your Business</h1>
          <Button
            className={[styles.heroBtn]}
            onClick={() => navigate("/free-business-valuation")}>
            Get A Free Valuation Of Your Business
          </Button>
        </div>
      </HeroSection>

      {/* sellBusiness */}
      <Container className={styles.container}>
        {sellBusinessArray?.map((item, index) => {
          return <SellBusinessCard item={item} index={index} />;
        })}
      </Container>
      {/* sellBusiness */}

      {/* get-free */}
      <GetFreeValuation
        image={curveLine}
        onClick={() => navigate("/free-business-valuation")}
      />
      <Footer />
    </>
  );
};

export default SellBusiness;
