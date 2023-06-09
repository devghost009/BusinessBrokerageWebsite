import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import ModalSkeletonWithHeaderBg from "../ModalSkeletonWithHeaderBg";
import classes from "./CreateFolderModal.module.css";

const CreateFolderModal = ({
  show,
  setShow,
  handleSubmit,
  data,
  isLoading = false,
  parentRoles,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (data !== undefined) {
      setName(data?.name);
    }
  }, [data]);

  const HandleSubmitData = () => {
    if (name == "") {
      return toast.error(`Folder name is required`);
    }
    handleSubmit({
      name,
    });
  };

  return (
    <div>
      <ModalSkeletonWithHeaderBg
        show={show}
        setShow={setShow}
        width="700px"
        borderRadius="20px"
        header={`${data == undefined ? "Create" : "Edit"} Folder`}
      >
        <div className={classes.container}>
          <Row className={classes.row}>
            <Col md={12}>
              <Input
                setter={setName}
                value={name}
                placeholder={"Folder name"}
                label={"Folder Name"}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
                customStyle={{
                  boxShadow: "0px 0 5px 2px #0000000d",
                  borderRadius: "10px",
                }}
              />
            </Col>
          </Row>
          <div className={classes.btn_main}>
            <Button
              onClick={() => HandleSubmitData()}
              className={classes.btn}
              label={
                isLoading
                  ? "Submitting..."
                  : data == null
                  ? "Create Folder"
                  : "Edit Folder"
              }
              disabled={isLoading}
            />
          </div>
        </div>
      </ModalSkeletonWithHeaderBg>
    </div>
  );
};

export default CreateFolderModal;
