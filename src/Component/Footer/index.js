import React, { useState, useEffect } from "react";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import PropTypes from "prop-types";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";
import { useSelector } from "react-redux";

const Footer = ({ containerClass }) => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.footer);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    isMobileViewHook(setIsMobile);
  }, [window.innerWidth]);

  return (
    <>
      {isMobile ? (
        <MobileFooter cmsData={cmsData} />
      ) : (
        <DesktopFooter containerClass={containerClass} cmsData={cmsData} />
      )}
    </>
  );
};

export default Footer;

Footer.propTypes = {
  containerClass: PropTypes.string,
};
