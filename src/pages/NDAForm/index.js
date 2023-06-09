import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Checkbox } from "../../Component/Checkbox/Checkbox";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { Input } from "../../Component/Input/Input";
import { apiHeader, BaseURL, ReturnFormatedNumber } from "../../config/apiUrl";
import classes from "./NDAForm.module.css";
import { Radio } from "../../Component/Radio/Radio";
import Maps from "../../Component/MapAndPlaces";
import moment from "moment-timezone";

function NDAForm() {
  const navigate = useNavigate();
  const { state: refferedBusinessId } = useLocation();
  const { user, accessToken: accessToken } = useSelector(
    (state) => state.authReducer
  );
  // Personal Info
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  // Broker Info
  const [licensedBroker, setLicensedBroker] = useState("No");
  const [nameOfBroker, setNameOfBroker] = useState("");
  const [brokerCompanyName, setBrokerCompanyName] = useState("");
  // Location Preference
  const [locationPreference, setLocationPreference] = useState("");
  const [capitalAvailable, setCapitalAvailable] = useState("");
  const [currentOccupation, setCurrentOccupation] = useState("");
  const [typesOfBusiness, setTypesOfBusiness] = useState("");
  const [timeAlloc, setTimeAlloc] = useState("");
  const [minAnnualIncome, setMinAnnualIncome] = useState("");

  const [isAgree, setIsAgree] = useState([]);
  const [areYouAcknowledged, setAreYouAcknowledged] = useState([]);

  // Api States
  const [isSending, setIsSending] = useState(false);

  //
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  //
  // ip address
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data?.ip))
      .catch((error) => console.error(error));
  }, []);

  async function postNDAForm() {
    const url = BaseURL("leads/sign-nda");
    let params = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      contact: user?.contact,
      email: user?.email,
      refferedBusiness: refferedBusinessId,
      ...(licensedBroker == "Yes" && {
        brokerName: nameOfBroker,
        brokerCompanyName,
      }),
      areYouSure: isAgree?.length > 0 ? true : false,
      areYouAcknowledged: areYouAcknowledged?.length > 0,
    };

    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        return toast.error(`Please fill out ${key} field `);
      }
    }
    const userTimezone = moment?.tz?.guess();
    const now = moment()?.tz(userTimezone);
    const formattedDate = now.format("ddd, DD MMM YYYY [at] h:mm A z");

    params = {
      ...params,
      currentOccupation,
      businessInterested: typesOfBusiness,
      minAnnualIncomeNeeds: minAnnualIncome,
      licensedBroker: licensedBroker == "Yes" ? true : false,
      ...(licensedBroker == "No" && {
        brokerName: nameOfBroker,
        brokerCompanyName,
      }),
      timeAllocatedForBusiness: timeAlloc,
      // New Changes
      streetAddress: address,
      city,
      state,
      zipCode: Number(zipcode),
      preferredLocation: [locationPreference],
      capitalAvailable: [capitalAvailable],
      ip,
      signing_date: formattedDate,
    };

    setIsSending(true);
    const response = await Post(url, params, apiHeader(accessToken));
    if (response !== undefined) {
      setIsSending(false);
      toast.success(
        "Thank you for signing NDA; please visit this business as a customer only."
      );
      navigate(-1);
    } else {
      setIsSending(false);
    }
  }

  return (
    <div className={classes.page}>
      <Header backgroundColor={"var(--white-color)"} />
      {/* Non Disclosure Agreement */}
      <section className={classes.agreementSection}>
        <Container className={[classes.pageContainer]}>
          <Row className="gx-0">
            <Col md={12} className={classes.headingAndSubtitle}>
              <h2>NON-Disclosure Agreement</h2>
              <p>This is a non-disclosure agreement ["Agreement"] Between:</p>
            </Col>
            {/* Basic Fields Form */}
            <Col md={12}>
              <div md={12} className={classes.basicFieldsForm}>
                <Row>
                  <Col lg={5}>
                    <p className={`p18`}>
                      Business Brokerage Services, LLC a Colorado Corporation
                      (“the Brokerage”).
                    </p>
                  </Col>
                  <Col lg={2} className={[classes.andCol]}>
                    <p className={classes.and}>AND</p>
                  </Col>
                  <Col lg={5} className={[classes.afterEndColSection]}>
                    <p className={[classes.textJustify, "p18"].join(" ")}>
                      The undersigned individual and on behalf of undersigned’s
                      business entity, its officers, directors, partners,
                      shareholders, employees, agents, and advisors
                      (collectively the “Buyer”)
                    </p>
                  </Col>
                  <Col lg={5} className={classes.mt32}>
                    <div className={classes.orgDetails}>
                      <h6>Business Brokerage Services, LLC</h6>
                      <ul>
                        <li className={`p18`}>7651 Shaffer Parkway Suite B2</li>
                        <li className={`p18`}>Littleton, Colorado 80127</li>
                        <li className={`p18`}>ask@denverbbs.com</li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={2}></Col>
                  <Col lg={5} className={classes.mt32}>
                    <Container className={[classes.fields].join(" ")}>
                      <div className={classes.userDetails}>
                        <ul>
                          <li
                            className={`p18`}
                          >{`${user?.firstName} ${user?.lastName}`}</li>
                          <li className={`p18`}>
                            {ReturnFormatedNumber(user?.contact)}
                          </li>
                          <li className={`p18`}>{user?.email}</li>
                        </ul>
                      </div>
                    </Container>
                  </Col>
                </Row>
                <div className={classes.busRef}>
                  <span>Nda For/ Business Ref : </span>
                  <span>Upscale Gun Store - Denver Metro Area, Colorado</span>
                </div>
              </div>
              {/* End of Basic Fields Form */}
              <div md={12} className={classes.textAfterBasicForm}>
                <p className={[classes.textJustify, "p18"].join(" ")}>
                  Our agreement with the Seller requires that the Brokerage
                  obtain a Non-Disclosure Agreement and evidence of financial
                  ability/proof of funds from the Buyer before disclosing the
                  name, location, or any confidential information of the
                  Business(s). Any and all information obtained from the Buyer
                  will be kept confidential by the Brokerage. “Information” as
                  used in this Agreement will include the fact that the Business
                  is for sale, in addition to any/all proprietary, sensitive,
                  confidential data, and descriptive details provided about the
                  Business(s) by the Brokerage, Seller, or any other sources.
                  The Buyer agrees that ALL Information will be kept
                  confidential.
                </p>
                <h6>The Buyer acknowledges and agrees:</h6>
                <ul className={classes.confidentialDocsList}>
                  <li className={classes.redColorText}>
                    Not to contact the Seller or it’s landlords, franchisors,
                    employees, suppliers, or customers except through the
                    Brokerage. All correspondence, Inquiries, offers to
                    purchase, and negotiations relating to the purchase or lease
                    of any business presented by the Brokerage will be conducted
                    exclusively through the Brokerage.
                  </li>
                  <li>
                    Any information provided about the Business is proprietary,
                    sensitive, and confidential. The disclosure of any
                    information to any other party may be damaging to the
                    Business and/or Seller.
                  </li>
                  <li>
                    Not to disclose, for a period of 2 years following the date
                    of receipt of any information regarding any Business to any
                    other person who has not signed this Agreement, except to
                    secure the advice and recommendations of business advisors
                    (accountants or attorneys).
                  </li>
                  <li>
                    Not to circumvent or interfere with the Brokerage contract
                    with the Seller in any way. The Buyer understands that if
                    the Buyer or any agent thereof, interferes with the
                    Brokerage's contractual right its fee from the Seller, the
                    Buyer will be personally liable for any commission due to
                    the Brokerage. The Buyer understands that shoul the Buyer
                    become a manager, employee, or otherwise connected in any
                    way with the Business shown or offered to the Buyer for
                    sale, or should the Buyer buy, trade, lease or exchange any
                    of the Business that is disclosed to the Buyer, then a
                    commission will be due to the Brokerage from the Buyer.
                  </li>
                  <li>
                    The Buyer understands that if the Buyer purchases the
                    Business through the Brokerage, the Buyer will not be liable
                    for commissions to be paid to the Brokerage by Seller.
                  </li>
                  <li>
                    The Buyer acknowledges and agrees that all Information
                    regarding the Business is provided by the Seller or other
                    sources and is not verified in any way by the Brokerage. The
                    Brokerage has knowledge of the accuracy of the Information
                    and makes no warranty, expressed or implied, as to the
                    accuracy of the Information. Understanding that the Buyer
                    will make an independent verification of the Information
                    prior to the purchase of the business, the Buyer agrees that
                    the Brokerage is not responsible for the accuracy of any of
                    the Information that the Buyer receives or fails to receive
                    and that the Buyer agrees to indemnify and hold the
                    Brokerage and its agents harmless from any claims or damages
                    which may occur by reason of the inaccuracy or
                    incompleteness of any Information provided to the Buyer with
                    respect to the Business.
                  </li>
                  <li>
                    Should the Buyer decide to no longer pursue the purchase of
                    the Business, the Buyer will promptly advise the Brokerage
                    of this fact and will immediately return all proprietary,
                    sensitive, and confidential Information furnished to the
                    Buyer, without retaining copies, summaries, analyses, or
                    extracts.
                  </li>
                  <li>
                    The Buyer further agrees that any earnest money deposit made
                    for the purchase of this business will be held in trust with
                    Business Brokerage Services, LLC.
                  </li>
                  <li>
                    Business Brokerage Services is a Multiple-Person Firm that
                    has a “Success Fee” based upon a contract between Seller for
                    the sale, trade, lease, or transfer of the Seller's Business
                    and/or Property.
                  </li>
                  <li>
                    The Broker is a Transactional Broker/Intermediary. However,
                    the Brokerage, at its sole discretion with notice, may
                    assign different roles to different Brokers to assist the
                    Buyer or Seller reapectively.
                  </li>
                  <li>
                    The Buyer was provided “Brokerage Disclosure to Buyer
                    Definitions of Working Relationships.”
                  </li>
                </ul>
                <h6>
                  BROKERAGE DISCLOSURE TO BUYER DEFINITIONS OF WORKING
                  RELATIONSHIPS
                </h6>

                <p className={[classes.textJustify, "p18"].join(" ")}>
                  <span>Seller’s Agent:</span> A seller’s agent (or listing
                  agent) works solely on behalf of the seller to promote the
                  interests of the seller with the utmost good faith, loyalty
                  and fidelity. The agent negotiates on behalf of and acts as an
                  advocate for the seller. The seller’s agent must disclose to
                  potential buyers all adverse material facts actually known by
                  the seller’s agent about the property. A separate written
                  listing agreement is required which sets forth the duties and
                  obligations of the broker and the seller.
                </p>
                <p className={[classes.textJustify, "p18"].join(" ")}>
                  <span>Buyer’s Agent:</span> A buyer’s agent works solely on
                  behalf of the buyer to promote the interests of the buyer with
                  the utmost good faith, loyalty and fidelity. The agent
                  negotiates on behalf of and acts as an advocate for the buyer.
                  The buyer’s agent must disclose to potential sellers all
                  adverse material facts actually known by the buyer’s agent
                  including the buyer’s financial ability to perform the terms
                  of the transaction and, if a residential property, whether the
                  buyer intends to occupy the property. A separate written buyer
                  agency agreement is required which sets forth the duties and
                  obligations of the broker and the buyer.
                </p>
                <p className={[classes.textJustify, "p18"].join(" ")}>
                  <span>Transaction-Broker:</span> A transaction-broker assists
                  the buyer or seller or both throughout a real estate
                  transaction by performing terms of any written or oral
                  agreement, fully informing the parties, presenting all offers
                  and assisting the parties with any contracts, including the
                  closing of the transaction without being an agent or advocate
                  for any of the parties. A transaction-broker must use
                  reasonable skill and care in the performance of any oral or
                  written agreement, and must make the same disclosures as
                  agents about all adverse material facts actually known by the
                  transaction-broker concerning a property or a buyer’s
                  financial ability to perform the terms of a transaction and,
                  if a residential property, whether the buyer intends to occupy
                  the property. No written agreement is required.
                </p>
                <p className={[classes.textJustify, "p18"].join(" ")}>
                  <span>Customer:</span> A customer is a party to a real estate
                  transaction with whom the broker has no brokerage relationship
                  because such party has not engaged or employed the broker,
                  either as the party’s agent or as the party’s
                  transaction-broker.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={classes.followingInfo}>
        <Container className={[classes.pageContainer]}>
          <Row>
            {/* Broker Info */}
            <Col md={12} className={classes.mt20}>
              <h5>BROKER INFORMATION</h5>
            </Col>
            <Col md={12} className={classes.areYouBrokerText}>
              <p>Are you a broker, or in contract with one?</p>
            </Col>
            <Col md={12}>
              <div className={classes.inputDiv}>
                <div className={[classes.radioLicensedDiv]}>
                  <Radio
                    value={licensedBroker}
                    setValue={setLicensedBroker}
                    label={"Yes"}
                  />
                  <Radio
                    value={licensedBroker}
                    setValue={setLicensedBroker}
                    label={"No"}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Input
                  setter={setNameOfBroker}
                  value={nameOfBroker}
                  placeholder={"Broker Name"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Input
                  setter={setBrokerCompanyName}
                  value={brokerCompanyName}
                  placeholder={"Broker's Company Name"}
                />
              </div>
            </Col>
            <Col md={12}>
              <span className={`${classes.f16} ${classes.textBlue}`}>
                If you selected yes above, broker name and broker's company name
                is mandatory.
              </span>
            </Col>
            <Col md={12}>
              <h5>Personal Information [Optional]</h5>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Maps
                  setAddress={setAddress}
                  address={address}
                  setCoordinates={setCoordinates}
                  setPlaceDetail={(e) => {
                    setAddressDetail(e);
                    setCity(e?.city);
                    setState(e?.state);
                    setZipcode(e?.zipcode);
                  }}
                  type={"Places"}
                  placeholder={"Street Address"}
                  loader={
                    <Input placeholder={"Street Address"} type={"text"} />
                  }
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Input setter={setCity} value={city} placeholder={"City"} />
              </div>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Input setter={setState} value={state} placeholder={"State"} />
              </div>
            </Col>
            <Col md={6}>
              <div className={classes.inputDiv}>
                <Input
                  type="number"
                  setter={(e) => {
                    if (e < 0) {
                    } else setZipcode(e);
                  }}
                  value={zipcode}
                  placeholder={"Zipcode"}
                />
              </div>
            </Col>
            {/* Location Preference */}
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={setLocationPreference}
                      value={locationPreference}
                      placeholder={"Location Preference"}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={setCapitalAvailable}
                      value={capitalAvailable}
                      placeholder={"Capital Available for Purchase"}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={setCurrentOccupation}
                      value={currentOccupation}
                      placeholder={"Current Occupation"}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={setTypesOfBusiness}
                      value={typesOfBusiness}
                      placeholder={"Types of Business Interested In"}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={setTimeAlloc}
                      value={timeAlloc}
                      placeholder={"Allocation of Time Towards Business"}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className={classes.inputDiv}>
                    <Input
                      setter={(e) => {
                        if (e < 0) {
                        } else setMinAnnualIncome(e);
                      }}
                      value={minAnnualIncome}
                      placeholder={"Minimum Annual Income Needs"}
                      type="number"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <span className={`${classes.f16} ${classes.textBlue}`}>
                By proceeding, you agree that Business Brokerage Services may
                communicate with you via telephone, video, email, text messages,
                or other media and messaging applications. Message and data
                rates may apply. If you would like to opt out at any time,
                please send an email with "STOP" to{" "}
                <a
                  href="mailto:ask@denverbbs.com"
                  className={classes.emailLink}
                >
                  ask@denverbbs.com
                </a>
                .
              </span>
            </Col>
            <Col md={12} className={classes.agreementText}>
              <Checkbox
                value={areYouAcknowledged}
                setValue={setAreYouAcknowledged}
                label={
                  "I Acknowledge That I Have Read The Non-Disclosure Agreement And Brokerage Disclosure To Buyer Definitions Of Working Relationships Carefully And Fully Understand Them."
                }
                labelStyle={{ color: "var(--main-color)" }}
              />
            </Col>
            <Col md={12} className={[classes.checkCol]}>
              <Checkbox
                value={isAgree}
                setValue={setIsAgree}
                label={
                  "I Unconditionally Agree To All Terms And Conditions Of All The Points Above"
                }
                labelStyle={{ color: "var(--main-color)" }}
              />
            </Col>
            {/* Buyer Name 2 */}

            <Col md={12} className={classes.mt20}>
              <Button
                className={classes.submitBtn}
                disabled={isSending}
                onClick={postNDAForm}
              >
                {!isSending ? "Sign" : "Signing..."}
              </Button>
            </Col>
            <Col md={12} className={classes.personalInfoText}>
              <p className={classes.p16}>
                All Personal Information Received From Buyer Is Confidential And
                Shall Not Be Shared With Any Other Entities
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <div className={classes.mt50}>
        <Footer />
      </div>
    </div>
  );
}

export default NDAForm;
