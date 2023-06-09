import React, { useState } from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import styles from "./PreferedBusiness.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import InputClasses from "../../Component/Input/input.module.css";
import { useSelector } from "react-redux";
import {
  apiHeader,
  BaseURL,
  formRegEx,
  formRegExReplacer,
} from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { toast } from "react-toastify";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { DropDown } from "../../Component/DropDown/DropDown";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import CustomPhoneInput from "../../Component/CustomPhoneInput";
import CustomPhoneInputClasses from "../../Component/CustomPhoneInput/CustomPhoneInput.module.css";

const PreferedBusinessForm = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authReducer?.accessToken);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [currentOccupation, setCurrentOccupation] = useState("");
  const [available, setAvailable] = useState({ label: "No", value: false });
  const [ownedBusiness, setOwnedBusiness] = useState(null);
  const [lookingForBusiness, setLookingForBusiness] = useState(null);
  const [purchasingBusiness, setPurchasingForBusiness] = useState("");
  const [assist, setAssist] = useState("");
  const [playForPurchase, setPlayForPurchase] = useState("");
  const [cashDown, setCashDown] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [bankruptcy, setBankruptcy] = useState({ label: "No", value: false });
  const [misdemeanor, setMisdemeanor] = useState({ label: "No", value: false });
  const [claimsOrJudgments, setClaimsOrJudgments] = useState({
    label: "No",
    value: false,
  });
  const [totalCash, setTotalCash] = useState("");
  const [accountPayable, setAccountPayable] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [payableToBanks, setPayableToBanks] = useState("");
  const [retirementFunds, setRetirementFunds] = useState("");
  const [mortgageHome, setMortgageHome] = useState("");
  const [homeEquity, setHomeEquity] = useState("");
  const [mortgageRealEstate, setMortgageRealEstate] = useState("");
  const [totalRealEstateEquity, setTotalRealEstateEquity] = useState("");
  const [otherLiabilities, setOtherLiabilities] = useState("");
  const [businessInterests, setBusinessInterests] = useState("");
  const [totalLiabilities, setTotalLiabilities] = useState("");
  const [otherAssets, setOtherAssests] = useState("");
  const [netWorth, setNetWorth] = useState("");
  const [totalAssets, setTotalAssets] = useState("");
  const [totalLiablitiesAndNetWorth, setTotalLiablitiesAndNetWorth] =
    useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    let params = {
      email,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      postalCode,
      contact: `+${phone}`,
      currentBusiness: currentOccupation,
      ownedBusiness,
      lookingForBusiness,
      planPurchasingBusiness: purchasingBusiness,
      businessAssistance: assist,
      planPayingPurchase: playForPurchase,
      cashRange: cashDown,
      creditScore: creditScore,
      totalCash,
      accountsPayable: accountPayable,
      totalStock: totalStock,
      payables: payableToBanks,
      retirementFunds,
      mortgage: mortgageHome,
      homeEquity: homeEquity,
      otherMortgages: mortgageRealEstate,
      totalEquity: totalRealEstateEquity,
      otherLiabilities,
      businessEquity: businessInterests,
      totalLiabilities,
      otherAssets,
      netWorth,
      totalAssets,
      liabilitesNetWorth: totalLiablitiesAndNetWorth,
    };

    if (!validator.isEmail(params["email"])) {
      return toast.warn("Your Email is not valid.");
    }

    if (!validator.isMobilePhone(params["contact"], ["en-US"])) {
      return toast.warn("Your mobile number is not valid.");
    }
    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        return toast.error(
          `Please fill the ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} field`
        );
      } else if (Number(params[key]) === 0) {
        return toast.error(
          `Please enter valid number for ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} field`
        );
      }
    }

    params = {
      ...params,
      spouseName,
      streetAddress2,
      planningToRelocate: available?.value,
      bankruptcy: bankruptcy?.value,
      felony: misdemeanor?.value,
      currentClaims: claimsOrJudgments?.value,
    };
    const apiUrl = BaseURL("valuation/create");
    setIsLoading(true);
    const response = await Post(apiUrl, params, apiHeader());
    if (response !== undefined) {
      toast.success("Free business valuation request created successfully");
      setIsLoading(false);
      navigate(-1);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <>
      <style>{`
        .${CustomPhoneInputClasses.phoneLabel}, .${InputClasses.labelText} {
          font-size:24px;
        }
    `}</style>
      <Header />
      <HeroSection customClass={[styles.heroBackground]}>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>Prefered Business Valuation</h1>
        </div>
      </HeroSection>
      <Container className={styles.container}>
        <div className={styles.form_main}>
          <Row className={styles.form_row}>
            <Col md={12}>
              <div className={styles.input_main}>
                <Input
                  value={email}
                  setter={setEmail}
                  label={"Email"}
                  placeholder={"Email"}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className={styles.input_main}>
                <Input
                  value={firstName}
                  setter={setFirstName}
                  label={"First Name"}
                  placeholder={"First Name"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={lastName}
                  setter={setLastName}
                  label={"Last Name"}
                  placeholder={"Last Name"}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={styles.input_main}>
                <Input
                  value={spouseName}
                  setter={setSpouseName}
                  label={"Spouse Name [Optional]"}
                  placeholder={"Spouse Name"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={streetAddress}
                  setter={setStreetAddress}
                  label={"Street Address"}
                  placeholder={"Street Address"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={streetAddress2}
                  setter={setStreetAddress2}
                  label={"Street Address 2 [Optional]"}
                  placeholder={"Street Address 2"}
                />
              </div>
            </Col>
            {/* City, State, Postal */}
            <Col md={4}>
              <div className={styles.input_main}>
                <Input
                  value={city}
                  setter={setCity}
                  label={"City"}
                  placeholder={"City"}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.input_main}>
                <Input
                  value={state}
                  setter={setState}
                  label={"State/Region"}
                  placeholder={"State/Region"}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.input_main}>
                <Input
                  value={postalCode}
                  setter={setPostalCode}
                  label={"Postal Code"}
                  placeholder={"Postal Code"}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={styles.input_main}>
                <CustomPhoneInput
                  label={"Phone Number"}
                  value={phone}
                  setter={setPhone}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={styles.input_main}>
                <Input
                  value={currentOccupation}
                  setter={setCurrentOccupation}
                  label={"Current Occupation / Business"}
                  placeholder={"Current Occupation / Business"}
                />
              </div>
            </Col>
            {/* Dropdown */}
            <Col md={12}>
              <div className={styles.input_main}>
                <DropDown
                  value={available}
                  setter={setAvailable}
                  label={"Available / Planning to relocate"}
                  placeholder={"Available / Planning to relocate"}
                  labelClassName={styles.dropdownLabel}
                  customStyle={{ padding: "4px 0px 4px 6px" }}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </div>
            </Col>
            {/* Have You  */}
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={ownedBusiness}
                  setter={setOwnedBusiness}
                  label={"Have you owned a business before? If so, what?"}
                  placeholder={"Have you owned a business before? If so, what?"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={lookingForBusiness}
                  setter={setLookingForBusiness}
                  label={"How long have you been looking for a business?"}
                  placeholder={"How long have you been looking for a business?"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={purchasingBusiness}
                  setter={setPurchasingForBusiness}
                  label={"When do you plan on purchasing a business?"}
                  placeholder={"When do you plan on purchasing a business?"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={assist}
                  setter={setAssist}
                  label={
                    "Who will assist you in business operation [Family, Partner]"
                  }
                  placeholder={
                    "Who will assist you in business operation [Family, Partner]"
                  }
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={playForPurchase}
                  setter={setPlayForPurchase}
                  label={"How do you plan to play for the purchase?"}
                  placeholder={"How do you plan to play for the purchase?"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={cashDown}
                  setter={(e) => {
                    if (e < 0) {
                    } else setCashDown(e);
                  }}
                  label={"What is your cash down payment range?"}
                  placeholder={"What is your cash down payment range?"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={creditScore}
                  setter={(e) => {
                    if (e < 0) {
                    } else setCreditScore(e);
                  }}
                  label={"What is your credit score?"}
                  placeholder={"What is your credit score?"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <DropDown
                  value={bankruptcy}
                  setter={setBankruptcy}
                  label={"Has ever filed for bankruptcy?"}
                  placeholder={"Has ever filed for bankruptcy?"}
                  labelClassName={styles.dropdownLabel}
                  customStyle={{ padding: "4px 0px 4px 6px" }}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <DropDown
                  value={misdemeanor}
                  setter={setMisdemeanor}
                  label={"Have you ever had misdemeanor/felony"}
                  placeholder={"Have you ever had misdemeanor/felony"}
                  labelClassName={styles.dropdownLabel}
                  customStyle={{ padding: "4px 0px 4px 6px" }}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <DropDown
                  value={claimsOrJudgments}
                  setter={setClaimsOrJudgments}
                  label={"Do you have any current legal claims/judgments"}
                  placeholder={"Do you have any current legal claims/judgments"}
                  labelClassName={styles.dropdownLabel}
                  customStyle={{ padding: "4px 0px 4px 6px" }}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalCash}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalCash(e);
                  }}
                  label={"Total cash on hand/in bank"}
                  placeholder={"Total cash on hand/in bank"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={accountPayable}
                  setter={(e) => {
                    if (e < 0) {
                    } else setAccountPayable(e);
                  }}
                  label={"Accounts Payable"}
                  placeholder={"Accounts Payable"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalStock}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalStock(e);
                  }}
                  label={"Total Stock Value"}
                  placeholder={"Total Stock Value"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={payableToBanks}
                  setter={(e) => {
                    if (e < 0) {
                    } else setPayableToBanks(e);
                  }}
                  label={"Notes payable to banks"}
                  placeholder={"Notes payable to banks"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={retirementFunds}
                  setter={(e) => {
                    if (e < 0) {
                    } else setRetirementFunds(e);
                  }}
                  label={"Total Retirement funds"}
                  placeholder={"Total Retirement funds"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={mortgageHome}
                  setter={(e) => {
                    if (e < 0) {
                    } else setMortgageHome(e);
                  }}
                  label={"Mortgage on homestead"}
                  placeholder={"Mortgage on homestead"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={homeEquity}
                  setter={(e) => {
                    if (e < 0) {
                    } else setHomeEquity(e);
                  }}
                  label={"Home equity"}
                  placeholder={"Home equity"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={mortgageRealEstate}
                  setter={(e) => {
                    if (e < 0) {
                    } else setMortgageRealEstate(e);
                  }}
                  label={"Mortgages on real estate [other]"}
                  placeholder={"Mortgages on real estate [other]"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalRealEstateEquity}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalRealEstateEquity(e);
                  }}
                  label={"Total real estate equity"}
                  placeholder={"Total real estate equity"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={otherLiabilities}
                  setter={(e) => {
                    if (e < 0) {
                    } else setOtherLiabilities(e);
                  }}
                  label={"other liabilities"}
                  placeholder={"other liabilities"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={businessInterests}
                  setter={(e) => {
                    if (e < 0) {
                    } else setBusinessInterests(e);
                  }}
                  label={"Business Interests & Equity"}
                  placeholder={"Business Interests & Equity"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalLiabilities}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalLiabilities(e);
                  }}
                  label={"Total liabilities"}
                  placeholder={"Total liabilities"}
                  type={"number"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={otherAssets}
                  setter={(e) => {
                    if (e < 0) {
                    } else setOtherAssests(e);
                  }}
                  label={"Other Assets"}
                  placeholder={"Other Assets"}
                  type={"number"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={netWorth}
                  setter={(e) => {
                    if (e < 0) {
                    } else setNetWorth(e);
                  }}
                  label={"Net Worth"}
                  placeholder={"Net Worth"}
                  type={"number"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalAssets}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalAssets(e);
                  }}
                  label={"Total Assets"}
                  placeholder={"Total Assets"}
                  type={"number"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={styles.input_main}>
                <Input
                  value={totalLiablitiesAndNetWorth}
                  setter={(e) => {
                    if (e < 0) {
                    } else setTotalLiablitiesAndNetWorth(e);
                  }}
                  label={"Total Liablities and net worth"}
                  placeholder={"Total Liablities and net worth"}
                  type={"number"}
                />
              </div>
            </Col>

            <div className={styles.submit_btn_main}>
              <Button
                label={isLoading ? "SUBMITING..." : "SUBMIT"}
                disabled={isLoading}
                className={styles.submit_btn}
                onClick={handleSubmit}
              />
            </div>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PreferedBusinessForm;
