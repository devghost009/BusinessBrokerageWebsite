import React from "react";
import { Container } from "react-bootstrap";
import styles from "./HeroSection.module.css";
const HeroSection = ({
  children,
  containerClass,
  customClass,
  style,
  defaultContainer = false,
}) => {
  return (
    <div
      className={[styles.heroSection, customClass && customClass].join(" ")}
      style={style}>
      <Container
        className={[
          !defaultContainer && styles.container,
          containerClass && containerClass,
        ].join(" ")}>
        {children}
      </Container>
    </div>
  );
};

export default HeroSection;
