import React from "react";
import classes from "./SelectImage.module.css";
import { FiUpload } from "react-icons/fi";
const SelectImage = ({
  placeholder,
  image,
  inputSetter,
  inputValue,
  fileValue,
  fileSetter,
}) => {
  return (
    <div className={classes.SelectImage_main}>
      <div className={classes.image_main}>
        <img src={fileValue ? URL.createObjectURL(fileValue) : image} />
      </div>
      <input
        value={inputValue}
        onChange={(e) => inputSetter(e.target.value)}
        type={"text"}
        placeholder={placeholder}
      />
      <div className={classes.image_upload}>
        <div className={classes.select_icon}>
          <label for="file-input">
            <FiUpload className={classes.upload_icon} />
          </label>
        </div>
        <div className={classes.file_main}>
          <input
            onChange={(e) => fileSetter(e.target.files[0])}
            id="file-input"
            type={"file"}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectImage;
