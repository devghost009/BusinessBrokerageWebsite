import React from "react";
import classes from "./CustomPhoneInput.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({
  label = "Contact",
  value,
  setter,
  labelClass,
  disableDropdown = true,
  allCountries = false,
}) => {
  return (
    <div>
      {label && (
        <p className={[classes.phoneLabel, labelClass && labelClass].join(" ")}>
          {label}
        </p>
      )}
      <PhoneInput
        inputClass={[classes.phoneInput]}
        containerClass={[classes.phoneInputContainer]}
        placeholder={"Phone"}
        country={"us"}
        onlyCountries={allCountries ? [] : ["us"]}
        enableSearch={true}
        disableDropdown={disableDropdown}
        value={value}
        onChange={(phone) => {
          setter(phone);
        }}
      />
    </div>
  );
};

export default CustomPhoneInput;
