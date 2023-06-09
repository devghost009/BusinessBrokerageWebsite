import React from "react";
import { Container } from "react-bootstrap";
import classes from "./DesktopFooter.module.css";
import { footerLogo, footerLogoOutline } from "../../constant/imagePath";
import { NavLink, useNavigate } from "react-router-dom";

const DesktopFooter = ({ containerClass, cmsData }) => {
  return (
    <div
      className={classes.footer__main}
    >
      <section className={classes.footerSection}>
        <Container
          fluid
          className={[classes.footerContainer, containerClass].join(" ")}
        >
          <div className={classes.footerDiv}>
            <div className={classes.logoDiv}>
              <img src={footerLogoOutline} />
            </div>
            <div className={classes.allLinksMain}>
              <NavLink className={classes.footerNavLinks} to="/buy-a-business">
                Buy a Business
              </NavLink>
              <NavLink className={classes.footerNavLinks} to="/sell-business">
                Sell Your Business
              </NavLink>
              <NavLink className={classes.footerNavLinks} to="/contact-us">
                Contact Us
              </NavLink>
            </div>
          </div>
          <div className={classes.footerHeader}>
            <h1>BETTERING LIVES THROUGH BUSINESS TRANSITIONS</h1>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DesktopFooter;
