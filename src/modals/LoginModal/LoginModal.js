import React, { useState } from "react";
import classes from "./LoginModal.module.css";
import { Col, Row } from "react-bootstrap";
import { Input } from "../../Component/Input/Input";
import { Button } from "../../Component/Button/Button";
import { toast } from "react-toastify";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { useDispatch, useSelector } from "react-redux";
import { saveLoginUserData } from "../../store/auth/authSlice";
import ModalSkeleton from "../ModalSkeleton";
import { Link } from "react-router-dom";
import validator from "validator";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const LoginModal = ({ show, setShow, showSignUp }) => {
  const fcmToken = useSelector((state) => state?.authReducer?.fcmToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [forgetLoading, setForgetLoading] = useState(false);

  const dispatch = useDispatch();
  const headers = apiHeader();

  const handleLogin = async () => {
    let params = {
      email,
      password,
    };
    if (params["password"]?.length < 8) {
      return toast.error("Password must contain min 8 characters");
    }

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }

    for (let key in params) {
      if (params[key] === "") {
        return toast.error("Please fill all the required fields!");
      }
    }
    params = {
      ...params,
      fcmToken,
    };
    const url = BaseURL("auth/login");
    setLoading(true);
    const response = await Post(url, params, headers);
    if (response !== undefined) {
      await dispatch(saveLoginUserData(response?.data));
      setShow(false);
      toast.success("Successfully Login");
    }
    setLoading(false);
  };

  const handleForget = async () => {
    const params = {
      email,
    };

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }

    if (params["email"] === "" || params["email"] == null) {
      return toast.error("Please fill all the email field!");
    }
    const url = BaseURL("auth/forgotPassword");
    setForgetLoading(true);
    const response = await Post(url, params, headers);
    if (response !== undefined) {
      toast.success("Successfully Submitted.Please Check Your Email");
      setForgetPasswordModal(false);
    }
    setForgetLoading(false);
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
        modalClass={[classes.loginModal]}
        width={"752px"}
      >
        {forgetPasswordModal ? (
          <Row>
            <Col md={12} className={classes.fogetPassHeaderCol}>
              <MdOutlineArrowBackIosNew
                color={"var(--main-color)"}
                size={26}
                className={classes.backIcon}
                onClick={() => {
                  setEmail("");
                  setForgetPasswordModal(false);
                }}
              />
              <div className={classes.loginText}>
                <h3>Forget Password</h3>
              </div>
            </Col>
            <Col md={12}>
              <div className={[classes.inputCol]}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  setter={setEmail}
                  label={"Email"}
                />
              </div>
            </Col>
            <Col md={12} className={[classes.btnCol]}>
              <Button
                label={forgetLoading ? "Submitting..." : "Submit"}
                onClick={handleForget}
                disabled={forgetLoading}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={12}>
              <div className={classes.loginText}>
                <h3>SIGN IN</h3>
              </div>
            </Col>
            <Col md={12}>
              <div className={[classes.inputCol]}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  setter={setEmail}
                  label={"Email"}
                />
              </div>
              <div className={[classes.inputCol]}>
                <Input
                  placeholder="Password"
                  value={password}
                  setter={setPassword}
                  type="password"
                  label={"Password"}
                />
                <div className={classes.forgetPasswordDiv}>
                  <p
                    className={[classes.forgetPasswordText]}
                    onClick={() => {
                      setEmail("");
                      setForgetPasswordModal(true);
                    }}
                  >
                    Forgot your password?
                  </p>
                </div>
              </div>
              <Button
                className={classes.loginBtn}
                label={loading ? "submitting..." : "SIGN IN"}
                onClick={handleLogin}
                disabled={loading}
              />
              <div
                onClick={() => {
                  setShow(false);
                  showSignUp(true);
                }}
                className={[classes.SignUpDiv]}
              >
                Don't have an account?
                <span className={[classes.SignUpText]}> Sign Up</span>
              </div>
            </Col>
          </Row>
        )}
      </ModalSkeleton>
    </>
  );
};

export default LoginModal;
