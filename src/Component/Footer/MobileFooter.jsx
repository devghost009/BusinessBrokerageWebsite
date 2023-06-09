import React from "react";
import classes from "./MobileFooter.module.css";
import { Col, Row } from "react-bootstrap";
import { footerLogo, footerLogoOutline } from "../../constant/imagePath";
import { NavLink, useNavigate } from "react-router-dom";

const MobileFooter = ({ cmsData }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.footer_overlay}></div>
      <Row className={`g-0 ${[classes.footer_row].join(" ")}`}>
        <Col md={12}>
          <div className={classes.logoContainer}>
            <img src={footerLogoOutline} />
          </div>
        </Col>
        <Col md={12} className={classes.footerHeader}>
          <h1>BETTERING LIVES THROUGH BUSINESS TRANSITIONS</h1>
        </Col>
        <Col md={12}>
          <div className={classes.footerLinks}>
            <NavLink className={classes.footerNavLinks} to="/buy-a-business">Buy a Business</NavLink>.
            <NavLink className={classes.footerNavLinks} to="/sell-business">Sell Your Business</NavLink>.
            <NavLink className={classes.footerNavLinks} to="/contact-us">Contact Us</NavLink>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MobileFooter;
