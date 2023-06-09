import React, { useState } from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import styles from "./BusinessValuation.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { TextArea } from "../../Component/TextArea";
import { toast } from "react-toastify";
import HeroSection from "../../Component/HeroSection/HeroSection";
import validator from "validator";
import CustomPhoneInput from "../../Component/CustomPhoneInput";

const BusinessValuation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const params = {
      firstName,
      lastName,
      businessName,
      contact: `+${phone}`,
      email,
      message,
      type: "free-business-evaluation",
    };

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }

    if (!validator.isMobilePhone(params["contact"], ["en-US"])) {
      return toast.warn("Your mobile number is not valid.");
    }

    for (var key in params) {
      if (params[key] == "" || params[key] == null) {
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
      setBusinessName("");
    }
    setIsLoading(false);
  };
  return (
    <>
      <Header />
      <HeroSection customClass={[styles.heroBackground]}>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>Free Business Valuation</h1>
        </div>
      </HeroSection>
      <Container className={styles.container}>
        <div className={styles.BusinessValuation_main}>
          <h1>Business Valuation Form</h1>
          <p>
            Welcome to our Free Business Valuation form! Times are changing, and
            the priorities of many owners are changing with them. Like many
            small business owners, you may be asking yourself what your options
            are moving forward. As a company of entrepreneur-minded individuals,
            we are here to help guide business owners through the trials and
            tribulations of selling. We believe the first and most critical step
            in selling your business is finding the business’s value.
          </p>
          <p>
            Therefore, our very simple valuation model is a simplified variation
            of the valuation methodology used by top business appraisers and
            analysts in the broader M&A market. Firstly, we utilize background
            and operational inputs to determine an appropriate range of
            valuation multiples. Secondly, we then use the multiples range,
            along with the business’s prior-year Seller Discretionary Earnings
            (SDE), to provide your company with a range of potential values.
          </p>
          <p>
            Now, simply input your contact information and let our valuation
            experts do the rest to get started! We will contact you for
            additional details to get the best results and highest sales for
            your business.
          </p>
          <p>
            For a more in-depth discussion, we also provide a free consultation
            designed to discuss the valuation and what steps can be taken to
            improve the value of the business. To learn more about this
            consultation, reach out to one of our brokers once you have received
            your analysis to discuss the requirements and benefits!
          </p>
        </div>

        <div className={styles.form_main}>
          <Row className={styles.form_row}>
            <Col lg={12}>
              <div className={styles.input_main}>
                <Input
                  value={firstName}
                  setter={setFirstName}
                  placeholder={"First Name"}
                />
              </div>
              <div className={styles.input_main}>
                <Input
                  value={lastName}
                  setter={setLastName}
                  placeholder={"Last Name"}
                />
              </div>
              <div className={styles.input_main}>
                <Input
                  value={businessName}
                  setter={setBusinessName}
                  placeholder={"Business Name"}
                />
              </div>
              <div className={styles.input_main}>
                <CustomPhoneInput
                  label={false}
                  value={phone}
                  setter={setPhone}
                  disableDropdown={false}
                  allCountries={true}
                />
              </div>
              <div className={styles.input_main}>
                <Input value={email} setter={setEmail} placeholder={"Email"} />
              </div>
              <div className={styles.input_main}>
                <TextArea
                  value={message}
                  setter={setMessage}
                  placeholder={"Your Message"}
                />
              </div>

              <div className={styles.submit_btn_main}>
                <Button
                  label={isLoading ? "loading..." : "SUBMIT INFORMATION"}
                  className={styles.submit_btn}
                  disabled={isLoading}
                  onClick={handleSubmit}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default BusinessValuation;
