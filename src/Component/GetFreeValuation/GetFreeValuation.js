import React, { useEffect, useState } from "react";
import classes from "./GetFreeValuation.module.css";
import { Container } from "react-bootstrap";
const GetFreeValuation = ({ image, onClick }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setTimeout(() => setShow(!show), [4000]);

    return () => {
      clearTimeout(interval);
    };
  }, [show]);
  return (
    <div className={classes.getFree_main}>
      <Container className={classes.container}>
        <h2 onClick={onClick}>
          Click Here For A Free Valuation Of Your Business
        </h2>
        <div
          className={`${classes.getFree_sectionImg} ${
            classes["elementor-headline"]
          } ${classes["e-animated"]}
            ${classes["elementor-headline--style-highlight"]}
             ${!show && classes["e-hide-highlight"]}
            `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 150"
            preserveAspectRatio="none">
            <path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path>
          </svg>
        </div>
      </Container>
    </div>
  );
};

export default GetFreeValuation;
