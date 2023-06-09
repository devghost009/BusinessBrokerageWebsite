import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./button.module.css";

export const Button = ({
  label,
  customStyle,
  onClick,
  disabled,
  children,
  leftIcon,
  width,
  background,
  color,
  rightIcon,
  className,
  ...props
}) => {
  let styleObject = Object.assign({}, customStyle);

  return (
    <>
      <button
        className={` ${classes.btn} ${className} }`}
        style={customStyle && customStyle}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        {...props}
      >
        {leftIcon && leftIcon}
        {label && label}
        {children && children}
        {rightIcon && rightIcon}
      </button>
    </>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
  customStyle: {},
};
