import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { saveLoginUserData } from "../../store/auth/authSlice";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./SignUpModal.module.css";
import validator from "validator";
import CustomPhoneInput from "../../Component/CustomPhoneInput";

const SignUpModal = ({ show, setShow, showLogin }) => {
  const fcmToken = useSelector((state) => state?.authReducer?.fcmToken);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = apiHeader();

  const handleSignUp = async () => {
    const url = BaseURL("auth/signup");
    let params = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm: confirmPassword,
      contact: `+${contact}`,
    };
    if (!validator.isMobilePhone(params["contact"])) {
      return toast.warn("Your mobile number is not valid.");
    }

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }
    if (params["password"]?.length < 8) {
      return toast.error("Password must contain min 8 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    for (let key in params) {
      if (params[key] === "" || params[key] === undefined) {
        return toast.error("Please fill all the required fields!");
      }
    }
    params = {
      ...params,
      fcmToken,
    };
    setLoading(true);
    const response = await Post(url, params, headers);
    if (response !== undefined) {
      await dispatch(saveLoginUserData(response?.data));
      toast.success("Successfully Signed up");
      setShow(false);
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
    .modal-content{
      border-radius:16px !important;
    }
    `}</style>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        modalClass={[classes.signupModal, "customScroll"].join(" ")}
        width={"752px"}
      >
        <Row>
          <Col md={12}>
            <div className={classes.SignupText}>
              <h3>SIGN UP</h3>
            </div>
          </Col>
          <Col md={12}>
            <div className={[classes.inputCol]}>
              <Input
                placeholder="First Name"
                value={firstName}
                setter={setFirstName}
              />
            </div>
            <div className={[classes.inputCol]}>
              <Input
                placeholder="Last Name"
                value={lastName}
                setter={setLastName}
              />
            </div>
            <div className={[classes.inputCol]}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                setter={setEmail}
              />
            </div>

            <div className={[classes.inputCol]}>
              <CustomPhoneInput
                value={contact}
                setter={setContact}
                label={false}
              />
            </div>
            <div className={[classes.inputCol]}>
              <Input
                placeholder="Password"
                value={password}
                setter={setPassword}
                type="password"
              />
            </div>
            <div className={[classes.inputCol]}>
              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                setter={setConfirmPassword}
                type="password"
              />
            </div>

            <Button
              className={classes.SignupBtn}
              label={loading ? "submitting..." : "SIGN UP"}
              onClick={handleSignUp}
              disabled={loading}
            />
            <div
              onClick={() => {
                setShow(false);
                showLogin(true);
              }}
              className={[classes.SignUpDiv]}
            >
              Already have an account?
              <span className={[classes.SignUpText]}> Login</span>
            </div>
          </Col>
        </Row>
      </ModalSkeleton>
    </>
  );
};

export default SignUpModal;
