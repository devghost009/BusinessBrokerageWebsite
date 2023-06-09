import React, { useState } from "react";
import Style from "./AfterLoginHeader.module.css";
import { Container, } from "react-bootstrap";
import { useSelector } from "react-redux";
import { imageUrl } from "../../config/apiUrl";

export const AfterLoginHeader = ({ className }) => {
  const { user } = useSelector((state) => state?.authReducer);

  return (
    <Container className={`${[Style.navbarContainer, className].join(" ")}`}>

      <div className={[Style.profileImg]}>
        <img src={`${imageUrl}${user?.photo}`} alt="..." />
      </div>
    </Container>
  );
};
