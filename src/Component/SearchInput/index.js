import React from "react";
import { BiSearch } from "react-icons/bi";
import { Input } from "../Input/Input";

function SearchInput({
  value,
  setter,
  placeholder = "Search",
  customStyle = {
    height: "43px",
    border: "1px solid #2A353D",
    borderRadius: "3px",
    width: "250px",
    padding: "0px",
  },
  inputStyle = {
    padding: "8px 14px",
    fontSize: "14px",
  },
}) {
  return (
    <Input
      setter={setter}
      value={value}
      customStyle={customStyle}
      inputStyle={inputStyle}
      placeholder={placeholder}
      rightIcon={<BiSearch size={22} color={"var(--placeholder-color)"} />}
    />
  );
}

export default SearchInput;
