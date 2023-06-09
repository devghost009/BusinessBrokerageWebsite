import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { DropDown } from "../DropDown/DropDown";
import { Input } from "../Input/Input";
import styles from "./SearchFilter.module.css";

const SearchFilter = ({ onSearch, price, setPrice, category, setCategory }) => {
  const categories = useSelector((state) => state?.commonReducer?.categories);

  const dropdownRef = useRef(null);

  return (
    <>
      <style>{`
        .DropdownOptionContainer__indicator{
          padding:8px 0;
        }
        
    `}</style>
      <div className={styles.dropdown_main}>
        <Container className={styles.dropdown_container}>
          <div className={styles.dropdown_row}>
            <Row className="align-items-center gx-0">
              <Col md={4} sm={12}>
                <div>
                  <Input
                    placeholder="Price"
                    customStyle={{
                      border: "none",
                      background: "#fff",
                      color: "#474747",
                      "font-family": "Open-Sans-bold",
                      "font-size": "14px",
                      color: "#000",
                    }}
                    customClass={styles.inputClass}
                    value={price}
                    setter={setPrice}
                    onEnterClick={() => {
                      if (!dropdownRef.current) {
                        return;
                      }
                      dropdownRef.current.focus();
                      dropdownRef.current.onMenuOpen();
                    }}
                  />
                </div>
              </Col>
              <Col md={4} sm={12}>
                <div>
                  <DropDown
                    selectRef={dropdownRef}
                    placeholder="Category"
                    customStyle={{
                      border: "none",
                      background: "#fff",
                      color: "#474747",
                    }}
                    placeholderColor={"var(--main-color)"}
                    options={categories}
                    optionLabel={"name"}
                    optionValue={"name"}
                    setter={(e) => {
                      setCategory(e);
                      onSearch(1, e, price);
                    }}
                    isClearable={true}
                    value={category}
                  />
                </div>
              </Col>

              <Col md={4} sm={12}>
                <div className={styles.btnDiv}>
                  <Button
                    label="Search"
                    onClick={() => onSearch(1, category, price)}
                    className={styles.dropdown_btn}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SearchFilter;
