import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import classes from "./ContactUs.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "../../Component/Button/Button";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Input } from "../../Component/Input/Input";
import { TextArea } from "../../Component/TextArea";
import { apiHeader, BaseURL, imageUrl } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { toast } from "react-toastify";
import HeroSection from "../../Component/HeroSection/HeroSection";
import validator from "validator";
import CustomPhoneInput from "../../Component/CustomPhoneInput";
import { useSelector } from "react-redux";
import { DropDown } from "../../Component/DropDown/DropDown";

const ContactUs = () => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.contactUs);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recommendFrom, setRecommendFrom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const params = {
      firstName,
      lastName,
      contact: `+${phone}`,
      email,
      message,
      recommendFrom: recommendFrom?.value,
      type: "contact-us",
    };

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }

    if (!validator.isMobilePhone(params["contact"], ["en-US"])) {
      return toast.warn("Your mobile number is not valid.");
    }

    for (var key in params) {
      if (
        params[key] == "" ||
        params[key] == null ||
        params[key] == undefined
      ) {
        return toast.error(`Please fill this ${key}`);
      }
    }
    const apiUrl = BaseURL("newsletters");
    setIsLoading(true);
    const response = await Post(apiUrl, params, apiHeader());
    if (response !== undefined) {
      toast.success("Successfully Submitted");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setRecommendFrom("");
    }
    setIsLoading(false);
  };

  const recommededOptions = [
    { label: "From a Friend", value: "From a Friend" },
    { label: "Google Search", value: "Google Search" },
    {
      label: "Our Listings (Newsletter/Email)",
      value: "Our Listings (Newsletter/Email)",
    },
    {
      label: "Social Media (Facebook, LinkedIn, Twitter)",
      value: "Social Media (Facebook, LinkedIn, Twitter)",
    },
  ];

  return (
    <>
      <Header />
      <HeroSection customClass={[classes.heroBackground]}>
        <div className={[classes.heroContainer]}>
          <h1 className={[classes.heroHeader]}>Contact Us</h1>
        </div>
      </HeroSection>

      <Container className={classes.first_sec_conti}>
        <Row className={classes.firstSec_row}>
          <Col md={12} lg={6}>
            <h1>{cmsData?.title}</h1>
            <p className={classes.textJustify}>{cmsData?.description}</p>
            <Row className={classes.mar_bot}>
              <Col md={6} lg={6}>
                <div className={classes.main_div_icon}>
                  <div className={classes.contact_icon}>
                    <PhonePausedIcon />
                  </div>
                  <div className={classes.mar_left}>
                    <p>Call Us:</p>

                    <a
                      href={`tel:${cmsData?.callUs[0]}`}
                      className={classes.link}>
                      {cmsData?.callUs[0]}
                    </a>
                    <a
                      href={`tel:${cmsData?.callUs[1]}`}
                      className={classes.link}>
                      {"844-4-BIZKR"}
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6}>
                <div className={classes.main_div_icon}>
                  <div className={classes.contact_icon}>
                    <LocationOnIcon />
                  </div>
                  <div className={classes.mar_left}>
                    <p>Visit Us:</p>
                    <p className={classes.link}>{cmsData?.visitUs}</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className={classes.mar_bot}>
              <Col md={6}>
                <div className={classes.main_div_icon}>
                  <div className={classes.contact_icon}>
                    <QuestionAnswerIcon />
                  </div>
                  <div className={classes.mar_left}>
                    <p>Have Questions?</p>
                    <a
                      href={`mailto:${cmsData?.haveQuestions}`}
                      target={"_blank"}
                      className={classes.link}>
                      {cmsData?.haveQuestions}
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className={classes.main_div_icon}>
                  <div className={classes.contact_icon}>
                    <CalendarMonthIcon />
                  </div>
                  <div className={classes.mar_left}>
                    <p>Hours of Operation:</p>
                    <span>{`${cmsData?.hoursOfOperation[0]?.days} (${cmsData?.hoursOfOperation[0]?.hours})`}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.2598000801963!2d-105.13945968467011!3d39.57629477947162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b83f12a610cb1%3A0x17e7672426b3cc8b!2sBusiness%20Brokerage%20Services%2C%20LLC!5e0!3m2!1sen!2s!4v1662501664838!5m2!1sen!2s"
              className={classes.map_main}
              style={{
                border: 0,
              }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </Col>
        </Row>
      </Container>
      <div className={classes.second_sec_conti}>
        <Container className={classes.first_sec_conti}>
          <Row className={classes.second_sec_row}>
            <Col lg={6}>
              <div className={classes.labels}>
                <h1>Contact Us</h1>
                <div className={classes.input_main}>
                  <Input
                    value={firstName}
                    setter={setFirstName}
                    // label={"First Name"}
                    placeholder={"First Name"}
                  />
                </div>

                <div className={classes.input_main}>
                  <Input
                    value={lastName}
                    setter={setLastName}
                    // label={"Last Name"}
                    placeholder={"Last Name"}
                  />
                </div>
                <div className={classes.input_main}>
                  <CustomPhoneInput
                    value={phone}
                    setter={setPhone}
                    label={false}
                    disableDropdown={false}
                    allCountries={true}
                  />
                </div>
                <div className={classes.input_main}>
                  <Input
                    value={email}
                    setter={setEmail}
                    // label={"Email"}
                    placeholder={"Email"}
                    type="email"
                  />
                </div>
                <div className={classes.input_main}>
                  <TextArea
                    value={message}
                    setter={setMessage}
                    // label={"Message"}
                    placeholder={"Your Message"}
                  />
                </div>
                <div className={classes.input_main}>
                  <DropDown
                    value={recommendFrom}
                    setter={setRecommendFrom}
                    placeholder={"Where You Heard About Us"}
                    options={recommededOptions}
                  />
                </div>
                <div className={classes.input_main}>
                  <Button
                    label={isLoading ? "Sending..." : "Send"}
                    disabled={isLoading}
                    onClick={handleSubmit}
                    customStyle={{ width: "100%" }}
                    className={classes.sendBtn}
                  />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className={classes.centered}>
                <div className={classes.img_div}>
                  <img src={`${imageUrl}${cmsData?.getInTouchImage}`} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
