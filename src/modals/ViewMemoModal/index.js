import React from "react";
import NoData from "../../Component/NoData/NoData";
import ModalSkeletonWithHeaderBg from "../ModalSkeletonWithHeaderBg";
import classes from "./ViewMemoModal.module.css";
const ViewMemoModal = ({ show, setShow, data }) => {
  return (
    <>
      <ModalSkeletonWithHeaderBg
        show={show}
        setShow={setShow}
        width={"750px"}
        borderRadius={"10px"}
        header={"View Memorandom"}>
        <div className={classes.mainDiv}>
          {data?.memorandum ? (
            <p>{data?.memorandum}</p>
          ) : (
            <NoData
              text={"No Memo Random added yet"}
              className={classes.noMemo}
            />
          )}
        </div>
      </ModalSkeletonWithHeaderBg>
    </>
  );
};

export default ViewMemoModal;
