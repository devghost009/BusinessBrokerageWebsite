import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Patch } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { ProfileWithEditButton } from "../../Component/ProfileWithEditButton";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import { TextArea } from "../../Component/TextArea";
import {
  apiHeader,
  BaseURL,
  formRegEx,
  formRegExReplacer,
  imageUrl,
} from "../../config/apiUrl";
import UpdateProfileModal from "../../modals/UpdateProfileModal";
import { updateUser } from "../../store/auth/authSlice";
import classes from "./EditProfile.module.css";
const EditProfile = () => {
  const { accessToken: token, user } = useSelector(
    (state) => state?.authReducer
  );
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user ? user?.firstName : "");
  const [photo, setPhoto] = useState(user ? user?.photo : "");
  const [lastName, setLastName] = useState(user ? user?.lastName : "");
  const [description, setDescription] = useState(user ? user?.description : "");
  const [city, setCity] = useState(user ? user?.city : "");
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleUpdateUser = async () => {
    const url = BaseURL("users/updateMe");
    let params = {
      firstName,
      lastName,
    };
    for (let key in params) {
      if (params[key] == "" || params[key] == undefined) {
        return toast.error(
          `Please fill the ${key
            ?.replace(formRegEx, formRegExReplacer)
            .toLowerCase()} field`
        );
      }
    }
    params = {
      ...params,
      description,
      city,
    };
    setLoading(true);
    const response = await Patch(url, params, apiHeader(token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.user));
      toast.success("Successfully Updated");
    }
    setLoading(false);
  };
  const uploadImg = async (e) => {
    const url = BaseURL("users/updatePhoto");
    const formData = new FormData();
    formData.append("photo", e);
    const response = await Patch(url, formData, apiHeader(token, true));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.user));
      toast.success("Profile picture updated successfully");
      setPhoto(response?.data?.user?.photo);
      setIsOpenModal(false);
    }
  };
  return (
    <>
      <SideBarSkeleton>
        <div className={classes.mainContainer}>
          <div className={classes.headerContainer}>
            <h3>Update Profile</h3>
          </div>
          <Row>
            <Col md={12} className={classes.imgCol}>
              <ProfileWithEditButton
                updateImage={photo}
                setUpdateImage={setPhoto}
                onClick={() =>
                  window.open(
                    typeof photo == "object"
                      ? URL.createObjectURL(photo)
                      : `${imageUrl}${photo}`,
                    "_blank"
                  )
                }
              />
              <Button
                label={"Upload Profile"}
                onClick={() => setIsOpenModal(true)}
                className={classes.updateProfileBtn}
              />
            </Col>
            <Col md={6} className={classes.inputCol}>
              <Input
                placeholder={"Fisrt Name"}
                value={firstName}
                setter={setFirstName}
                label={"Fisrt Name"}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
                customStyle={{
                  boxShadow: "0px 0 5px 2px #0000000d",
                  borderRadius: "10px",
                  border: "none",
                }}
              />
            </Col>
            <Col md={6} className={classes.inputCol}>
              <Input
                placeholder={"Last Name"}
                value={lastName}
                setter={setLastName}
                label={"Last Name"}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
                customStyle={{
                  boxShadow: "0px 0 5px 2px #0000000d",
                  borderRadius: "10px",
                  border: "none",
                }}
              />
            </Col>
            <Col md={6} className={classes.inputCol}>
              <Input
                placeholder={"Email"}
                value={user?.email}
                setter={() => {}}
                label={"Email"}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
                customStyle={{
                  boxShadow: "0px 0 5px 2px #0000000d",
                  borderRadius: "10px",
                  border: "none",
                  opacity: "0.4",
                }}
                disabled={true}
              />
            </Col>
            <Col md={6} className={classes.inputCol}>
              <Input
                placeholder={"City"}
                value={city}
                setter={setCity}
                label={"City"}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
                customStyle={{
                  boxShadow: "0px 0 5px 2px #0000000d",
                  borderRadius: "10px",
                  border: "none",
                }}
              />
            </Col>

            <Col md={12} className={classes.inputCol}>
              <TextArea
                placeholder={"Description"}
                value={description}
                setter={setDescription}
                label={"Description"}
                className={classes.desc}
                labelStyle={{
                  color: "var(--dashboard-main-color)",
                  textTransform: "capitalize",
                  fontFamily: "Open-Sans-bold",
                  fontSize: "16px",
                }}
              />
            </Col>
            <Col md={12} className={classes.btnCol}>
              <Button
                label={loading ? "updating..." : "Update"}
                disabled={loading}
                onClick={handleUpdateUser}
              />
            </Col>
          </Row>
        </div>
      </SideBarSkeleton>
      {isOpenModal && (
        <UpdateProfileModal
          show={isOpenModal}
          setPhoto={setPhoto}
          photo={photo}
          setShow={setIsOpenModal}
          handleSubmit={uploadImg}
        />
      )}
    </>
  );
};

export default EditProfile;
