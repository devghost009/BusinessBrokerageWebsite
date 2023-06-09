import React from "react";
import classes from "./loader.module.css";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import startLoader from "../../assets/animation/startLoader.json";

export const Loader = ({ animationPath = startLoader, className='' }) => {
  return (
    <>
      <div className={`${classes.loaderContainer} ${className}`}>
        <Lottie
          style={{
            width: "30%",
            height: "30%",
          }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          loop={true}
          autoplay={true}
          animationData={animationPath}
        />
      </div>
    </>
  );
};

Loader.propTypes = {
  animationPath: PropTypes.string,
};
