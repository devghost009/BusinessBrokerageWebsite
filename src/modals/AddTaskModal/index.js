import React from "react";
import classes from "./AddTaskModal.module.css";
import ModalSkeleton from "../ModalSkeleton";
import { Input } from "../../Component/Input/Input";
import { TextArea } from "../../Component/TextArea";
import { Button } from "../../Component/Button/Button";
const AddTaskModal = ({ show, setShow }) => {
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        borderRadius="20px"
        width="734px"
        borderLine={false}
      >
        <div className={classes.add_task_main}>
          <h4>Add Task</h4>
          <div className={classes.input_main}>
            <Input
              customStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0px 5px 25px #52575D0F",
                padding: "10px",
              }}
              inputStyle={{ borderColor: "none" }}
              placeholder={"Task Name"}
            />
          </div>
          <div className={classes.input_main}>
            <Input
              customStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0px 5px 25px #52575D0F",
                padding: "10px",
              }}
              inputStyle={{ borderColor: "none" }}
              placeholder={"Assigned To"}
            />
          </div>
          <div className={classes.input_main}>
            <TextArea
              customStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0px 5px 25px #52575D0F",
                padding: "10px 10px 10px 25px",
              }}
              inputStyle={{ borderColor: "none" }}
              placeholder={"Discription"}
            />
          </div>
          <div className={classes.add_task_btn_main}>
            <Button className={classes.add_task_btn} label={"Add Task"} />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AddTaskModal;
