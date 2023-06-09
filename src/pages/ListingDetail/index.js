import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaDollarSign,
  FaMoneyCheckAlt,
  FaRegBuilding,
  FaRegMoneyBillAlt,
  FaUsers,
  FaInternetExplorer,
  FaYelp,
  FaCheck,
  FaUserTie,
  FaRegHandshake,
} from "react-icons/fa";
import { BiCube } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import Header from "../../Component/Header";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { Loader } from "../../Component/Loader";
import { apiHeader, BaseURL, imageUrl } from "../../config/apiUrl";
import classes from "./ListingDetail.module.css";
import { GoCheck } from "react-icons/go";
import { MdOutlineEmail, MdOutlineLiquor } from "react-icons/md";
// Icons
import {
  BsFillCheckCircleFill,
  BsFacebook,
  BsFillFlagFill,
  BsInstagram,
} from "react-icons/bs";
import { TbBuildingBank } from "react-icons/tb";
import { RiBankFill, RiLightbulbFlashLine } from "react-icons/ri";
import { BiTimeFive } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { FiMap, FiPhone } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import Maps from "../../Component/MapAndPlaces";
import { SiMicrosoftbing } from "react-icons/si";

const ListingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const { accessToken: accessToken, user } = useSelector(
    (state) => state?.authReducer
  );
  // nda status
  const [isLeadInterest, setIsLeadInterest] = useState(false);
  const [isNdaSigned, setIsNdaSigned] = useState(false);
  const [isNdaSubmit, setIsNdaSubmit] = useState(false);

  const [isVipUser, setIsVipUser] = useState(false);

  const fetchData = async () => {
    const url = BaseURL(`business/general/${id}`);

    setLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setData(response?.data?.data);
      setIsLeadInterest(
        response?.data?.data?.leadInterested?.includes(user?._id)
      );
      setIsNdaSigned(response?.data?.data?.ndaSigned?.includes(user?._id));
      setIsNdaSubmit(response?.data?.data?.ndaSubmitted?.includes(user?._id));
      setIsVipUser(response?.data?.data?.vipUsers?.includes(user?._id));
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const statsData = [
    {
      icon: <FaDollarSign />,
      name: `$${data?.businessOpportunity?.toLocaleString()}`,
      subTitle: "Business Opportunity",
    },
    {
      icon: <FaMoneyCheckAlt />,
      name: `$${data?.cashFlow?.toLocaleString()}`,
      subTitle: "Cash Flow",
    },
    {
      icon: <BiCube />,
      name: `$${data?.inventory?.toLocaleString()}`,
      subTitle: "Inventory",
    },
    {
      icon: <FaRegMoneyBillAlt />,
      name: `$${data?.grossSales?.toLocaleString()}`,
      subTitle: "Sales Revenue",
    },
    {
      icon: data?.amountType == "rent" ? <FaDollarSign /> : <FaRegBuilding />,
      name: `$${
        data?.amountType == "rent"
          ? data?.monthlyRent?.toLocaleString()
          : data?.realEstate?.toLocaleString()
      }`,
      subTitle: `${
        data?.amountType == "rent" ? "Monthly Rent" : "Real Estate"
      }`,
    },
    {
      icon: <FaUsers />,
      name: `${data?.fullTimeEmployees}FT/${data?.partTimeEmployees}PT`,
      subTitle: "Employees",
    },
  ];

  const showInterest = async () => {
    const url = BaseURL("leads");
    const params = {
      businessId: data?._id,
    };
    setInterestLoading(true);
    const response = await Post(url, params, apiHeader(accessToken));
    if (response !== undefined) {
      navigate("/sign-nda", { state: data?._id });
    }
    setInterestLoading(false);
  };

  const ReturnFormatedNumber = (number) => {
    let newNumber = number?.slice(2);
    newNumber = newNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) - $2 $3");
    return newNumber;
  };

  return (
    <div className={classes.page}>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Hero Section */}
          <HeroSection
            containerClass={[classes.mainContainer]}
            defaultContainer
            customClass={classes.HeroSectionBgImage}
          >
            <div className={[classes.heroContainer]}>
              <h1 className={[classes.heroHeader]}>{data?.title}</h1>
              {(isNdaSigned || isVipUser) && (
                <h6 className={[classes.heroSubHeader]}>
                  {data?.businessAddress}
                </h6>
              )}
              {!isNdaSigned && !isVipUser && (
                <Button
                  className={classes.heroBtn}
                  label={
                    interestLoading ? "loading..." : "CONFIDENTIALITY AGREEMENT"
                  }
                  onClick={() => {
                    isLeadInterest && !isNdaSubmit && !isNdaSigned
                      ? navigate("/sign-nda", { state: data?._id })
                      : showInterest();
                  }}
                  disabled={
                    (isLeadInterest && isNdaSubmit && !isNdaSigned) ||
                    interestLoading
                  }
                  customStyle={{
                    opacity:
                      ((isLeadInterest && isNdaSubmit && !isNdaSigned) ||
                        interestLoading) &&
                      "0.5",
                    cursor:
                      ((isLeadInterest && isNdaSubmit && !isNdaSigned) ||
                        interestLoading) &&
                      "no-drop",
                  }}
                />
              )}
            </div>
          </HeroSection>
          {/* Hero Section */}

          <Container className={[classes.mainContainer]}>
            {/* description */}
            <div className={[classes.contentSection]}>
              <h3 className={[classes.title]}>Business Description</h3>
              <p className={[classes.description]}>
                {isNdaSigned || isVipUser
                  ? data?.description
                  : data?.dummyDescription}
              </p>
            </div>
            {/* description */}
          </Container>

          {/* stats */}
          <div className={[classes.contentSection]}>
            <h3 className={[classes.title]}>Statistics</h3>
            <HeroSection
              // containerClass={[classes.mainContainer]}
              defaultContainer
              customClass={classes.StatsBgImage}
            >
              <div className={[classes.heroContainer]}>
                <Row>
                  {statsData?.slice(0, 3)?.map((item, i) => {
                    return (
                      <>
                        <Col
                          xs={6}
                          md={4}
                          lg={2}
                          className={[classes.mainStatsDiv]}
                        >
                          <CircleIconWithTitle
                            className={[classes.statsContainer]}
                            data={item}
                          />
                        </Col>
                        <Col
                          md={4}
                          lg={2}
                          className={[classes.statsEmptyCol]}
                        />
                      </>
                    );
                  })}
                  {statsData?.slice(3)?.map((item, i) => {
                    return (
                      <>
                        <Col
                          md={4}
                          lg={2}
                          className={[classes.statsEmptyCol]}
                        />
                        <Col
                          md={4}
                          xs={6}
                          lg={2}
                          className={[classes.mainStatsDiv]}
                        >
                          <CircleIconWithTitle
                            className={[classes.statsContainer]}
                            data={item}
                          />
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            </HeroSection>
          </div>
          {/* stats */}

          {/* Business Photo Gallery */}
          <section className={classes.businessGallerySection}>
            <h3>
              {isNdaSigned || isVipUser
                ? "Business Photo Gallery"
                : "Business Image"}
            </h3>
            <div className={classes.carousel}>
              <style>{`
                    .swiper-button-next,.swiper-button-prev { color: #eeeeeee6; }
                    .swiper-button-next:after,.swiper-button-prev:after {font-size:24px;font-weight:600 }
                    .swiper-pagination-bullet-active{background:var(--main-color);}
                    .swiper-pagination{position:static !important;}
                    `}</style>

              {isNdaSigned || isVipUser ? (
                <Swiper
                  watchSlidesProgress={true}
                  slidesPerView={3}
                  className="mySwiper"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
                  navigation={true}
                >
                  {data?.images?.map((item) => (
                    <SwiperSlide>
                      <div className={classes.imgBox}>
                        <img src={`${imageUrl}${item}`} alt="..." />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={classes.imgSingleBox}>
                  <img src={`${imageUrl}${data?.dummyImage}`} />
                </div>
              )}
            </div>
          </section>

          {/* Business Photo Gallery */}

          {/* Business Highlights */}
          <HeroSection
            defaultContainer
            customClass={classes.businessHighlightsSection}
            containerClass={[
              classes.mainContainer,
              classes.businessHighlightsMainDiv,
            ].join(" ")}
          >
            <Row className="gx-0">
              <Col md={12}>
                <h3>Business Highlights</h3>
              </Col>
              {data?.businessHighlights?.map((item, i) => (
                <Col md={6} key={i}>
                  <div className={classes.iconWithTitle}>
                    <BsFillCheckCircleFill /> <p>{item}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </HeroSection>
          {/* Business Highlights */}
          {/* Business Location */}
          {(isNdaSigned || isVipUser) && (
            <section className={classes.locationSection}>
              <h3>Business Location</h3>
              <h6 className={classes.mapTitle}>{data?.companyName}</h6>
              <Maps
                location={{
                  lng: data?.location?.coordinates[0],
                  lat: data?.location?.coordinates[1],
                }}
                className={classes.mapContainer}
                mapMarkerLabel={data?.title}
              />
            </section>
          )}
          {/* Business Location */}

          {/* Online Presence */}
          {(isNdaSigned || isVipUser) && (
            <div className={classes.onlinePresence}>
              <h3>Online Presence</h3>
              <HeroSection
                defaultContainer
                customClass={classes.onlinePresenceSection}
                containerClass={[classes.mainContainer]}
              >
                <div
                  className={` ${
                    data?.thirdPartyPresence?.length < 3
                      ? classes.socailCard1
                      : classes.socailCard
                  }`}
                >
                  {data?.thirdPartyPresence?.map((item, i) => {
                    let data = demoData?.onlinePresence?.find(
                      (innerItem) => innerItem?.key === item?.key
                    );
                    return (
                      <div className={classes.jCenter} key={i}>
                        <CircleIconWithTitle data={data} link={item?.link} />
                      </div>
                    );
                  })}
                </div>
              </HeroSection>
            </div>
          )}
          {/* Online Presence */}

          {/* Finanacials */}

          {(isNdaSigned || isVipUser) && (
            <div className={classes.finanacials}>
              <h3>Finanacials</h3>
              <Container className={classes.mainContainer}>
                <Row>
                  <Col lg={12}>{data?.financialsDescription}</Col>
                  {data?.financialsCSV1?.length > 0 &&
                  data?.financialsCSV2?.length > 0 ? (
                    <Col lg={12}>
                      <div className={classes.csvTable}>
                        <table>
                          <thead>
                            <tr>
                              <th className={classes.column1}>
                                {data?.financialsCSV1[0]?.column1}
                              </th>
                              <th className={classes.column2}>
                                {data?.financialsCSV1[0]?.column2}
                              </th>
                              <th className={classes.column3}>
                                {data?.financialsCSV1[0]?.column3}
                              </th>
                              <th className={classes.column4}>
                                {data?.financialsCSV1[0]?.column4}
                              </th>
                              <th className={classes.column5}>
                                {data?.financialsCSV1[0]?.column5}
                              </th>
                              <th className={classes.column6}>
                                {data?.financialsCSV1[0]?.column6}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.financialsCSV1?.slice(1)?.map((item) => {
                              return (
                                <tr>
                                  <td className={classes.column1}>
                                    {item?.column1}
                                  </td>
                                  <td className={classes.column2}>
                                    {item?.column2}
                                  </td>
                                  <td className={classes.column3}>
                                    {item?.column3}
                                  </td>
                                  <td className={classes.column4}>
                                    {item?.column4}
                                  </td>
                                  <td className={classes.column5}>
                                    {item?.column5}
                                  </td>
                                  <td className={classes.column6}>
                                    {item?.column6}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {/* {/ CSV 2 /} */}
                      <div className={[classes.csvTable].join(" ")}>
                        <table>
                          <thead>
                            <tr>
                              <th className={classes.column1}>
                                {data?.financialsCSV2[0]?.column1}
                              </th>
                              <th className={classes.column2}>
                                {data?.financialsCSV2[0]?.column2}
                              </th>
                              <th className={classes.column3}>
                                {data?.financialsCSV2[0]?.column3}
                              </th>
                              <th className={classes.column4}>
                                {data?.financialsCSV2[0]?.column4}
                              </th>
                              <th className={classes.column5}>
                                {data?.financialsCSV2[0]?.column5}
                              </th>
                              <th className={classes.column6}>
                                {data?.financialsCSV2[0]?.column6}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.financialsCSV2?.slice(1)?.map((item) => {
                              return (
                                <tr>
                                  <td className={classes.column1}>
                                    {item?.column1}
                                  </td>
                                  <td className={classes.column2}>
                                    {item?.column2}
                                  </td>
                                  <td className={classes.column3}>
                                    {item?.column3}
                                  </td>
                                  <td className={classes.column4}>
                                    {item?.column4}
                                  </td>
                                  <td className={classes.column5}>
                                    {item?.column5}
                                  </td>
                                  <td className={classes.column6}>
                                    {item?.column6}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  ) : (
                    <Col md={12}>
                      <div
                        className={
                          data?.financialsCSVImages?.length > 2
                            ? classes.finanacialsImages
                            : classes.finanacialsSingleImages
                        }
                      >
                        {data?.financialsCSVImages?.map((item) => (
                          <a
                            className={classes.imgDiv}
                            href={`${imageUrl}${item}`}
                            target={"_blank"}
                          >
                            <img src={`${imageUrl}${item}`} />
                          </a>
                        ))}
                      </div>
                    </Col>
                  )}
                </Row>
              </Container>
            </div>
          )}
          {/* Finanacials */}

          {/* Finanacials Analysis */}
          {(isNdaSigned || isVipUser) &&
            data?.financialsAnalysis?.length > 0 && (
              <section className={classes.finanacialsAnalysis}>
                <Container className={classes.mainContainer}>
                  <h3>Finanacials Analysis</h3>
                  <div className={classes.finanacialsImages}>
                    {data?.financialsAnalysis?.map((item, i) => {
                      return (
                        <a
                          className={classes.imgDiv}
                          href={`${imageUrl}${item}`}
                          target={"_blank"}
                        >
                          <img src={`${imageUrl}${item}`} alt="..." />
                        </a>
                      );
                    })}
                  </div>
                </Container>
              </section>
            )}
          {/* Finanacials Analysis */}

          {/* Pros and cons */}
          {(isNdaSigned || isVipUser) && (
            <HeroSection
              // containerClass={[classes.mainContainer]}
              defaultContainer
              customClass={classes.ProsConsBgImage}
            >
              <div className={[classes.heroContainer]}>
                <Row>
                  <Col md={6} className={[classes.prosCol]}>
                    <h3>Pros</h3>
                    {data?.pros?.map((item, i) => {
                      return (
                        <div key={i}>
                          <GoCheck />
                          <p>{item}</p>
                        </div>
                      );
                    })}
                  </Col>
                  <Col md={6} className={[classes.prosCol]}>
                    <h3>Cons</h3>
                    {data?.cons?.map((item, i) => {
                      return (
                        <div key={i}>
                          <GoCheck />
                          <p>{item}</p>
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </div>
            </HeroSection>
          )}
          {/* Pros and cons */}

          {/* Property Information */}
          {(isNdaSigned || isVipUser) && (
            <section className={classes.propertyInfoMain}>
              <div className={classes.header}>
                <Container className={classes.mainContainer}>
                  <div className={classes.propertyInfoContent}>
                    <h3>Property Information</h3>
                    <Row className={classes.headAndTitle}>
                      <Col md={5} className={classes.mb16}>
                        <h5>{data?.propertyInformation?.title}</h5>
                      </Col>
                      <Col md={7} className={classes.mb16}>
                        <p>{data?.propertyInformation?.description}</p>
                      </Col>
                      <Col md={5} className={classes.mb16}>
                        <h5>{data?.propertyInformation?.leaseRate}</h5>
                      </Col>
                      <Col md={7} className={classes.mb16}>
                        <p>{data?.propertyInformation?.leaseInformation}</p>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
              {data?.demographics?.length > 0 && (
                <div className={classes.imagesBoxes}>
                  <Container className={classes.mainContainer}>
                    <h3>Demographics for Colorado</h3>
                    <Row className="my-4">
                      {data?.demographics?.map((item, i) => (
                        <Col md={i < 2 ? 6 : 12} className={classes.imgCol}>
                          <div className={classes.imgDiv}>
                            <img src={`${imageUrl}${item}`} alt="..." />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              )}
            </section>
          )}
          {/* Property Information */}

          {/* Hours of Operation to Financing Options */}
          <div className={classes.propertyInfoSection}>
            <div className={classes.bgDivGreyColor}>
              <Container className={[classes.mainContainer]}>
                <IconWithTitleAndDescription
                  data={{
                    icon: <BiTimeFive />,
                    title: "HOURS OF OPERATION",
                  }}
                >
                  <Row className={classes.hrsOfOperation}>
                    {data?.hoursOfOperation?.map((item) => {
                      return (
                        <>
                          <Col md={3}>
                            <p>{item?.days}</p>
                          </Col>
                          <Col md={9}>
                            <p>{item?.hours}</p>
                          </Col>
                        </>
                      );
                    })}
                    <Col md={3}>
                      <p>Opportunity</p>
                    </Col>
                    <Col md={9}>
                      <p>{data?.hoursOfOperationOpportunity}</p>
                    </Col>
                  </Row>
                </IconWithTitleAndDescription>
              </Container>
            </div>
            {/* Owner Involvement */}
            {data?.ownerInvolvment?.length > 0 && (
              <div className={classes.bgDivwhiteColor}>
                <Container className={[classes.mainContainer]}>
                  <IconWithTitleAndDescription
                    data={{
                      icon: <FaUserTie />,
                      title: "OWNER INVOLVEMENT",
                    }}
                  >
                    <Row className={classes.hrsOfOperation}>
                      <Col md={12}>
                        <p>{data?.ownerInvolvment}</p>
                      </Col>
                    </Row>
                  </IconWithTitleAndDescription>
                </Container>
              </div>
            )}
            {/* No Of Employees */}
            <div className={classes.bgDivGreyColor}>
              <Container className={[classes.mainContainer]}>
                <IconWithTitleAndDescription
                  data={{
                    title: "NUMBER OF EMPLOYEES",
                    icon: <FaUsers />,
                  }}
                >
                  <Row className={classes.hrsOfOperation}>
                    {!(
                      data?.fullTimeEmployees == 0 ||
                      data?.partTimeEmployees == 0
                    ) && (
                      <>
                        <Col md={3}>
                          <p>Total Employees</p>
                        </Col>
                        <Col md={9}>
                          <p>
                            {data?.fullTimeEmployees + data?.partTimeEmployees}
                          </p>
                        </Col>
                      </>
                    )}
                    {data?.fullTimeEmployees !== 0 && (
                      <>
                        <Col md={3}>
                          <p>Full Time</p>
                        </Col>
                        <Col md={9}>
                          <p>{data?.fullTimeEmployees}</p>
                        </Col>
                      </>
                    )}
                    {data?.partTimeEmployees !== 0 && (
                      <>
                        <Col md={3}>
                          <p>Part Time</p>
                        </Col>
                        <Col md={9}>
                          <p>{data?.partTimeEmployees}</p>
                        </Col>
                      </>
                    )}
                  </Row>
                </IconWithTitleAndDescription>
              </Container>
            </div>
            {/* Reason For Selling */}
            {data?.reason?.length > 0 && (
              <div className={classes.bgDivwhiteColor}>
                <Container className={[classes.mainContainer]}>
                  <IconWithTitleAndDescription
                    data={{
                      icon: <BsFillFlagFill />,
                      title: "REASON FOR SELLING",
                    }}
                  >
                    <Row className={classes.hrsOfOperation}>
                      <Col md={12}>
                        <p>{data?.reason}</p>
                      </Col>
                    </Row>
                  </IconWithTitleAndDescription>
                </Container>
              </div>
            )}
            {/* Recent Improvements */}
            {data?.recentImprovements?.length > 0 && (
              <div className={classes.bgDivGreyColor}>
                <Container className={[classes.mainContainer]}>
                  <IconWithTitleAndDescription
                    data={{
                      icon: <RiLightbulbFlashLine />,
                      title: "RECENT IMPROVEMENTS",
                    }}
                    className={classes.recentImprIcon}
                  >
                    <Row className={classes.hrsOfOperation}>
                      {data?.recentImprovements?.map((item) => (
                        <Col sm={6} lg={3} className={classes.recentImprCol}>
                          <div className={classes.yearBox}>{item?.year}</div>
                          <ul>
                            {item?.features?.map((e, i) => (
                              <li key={i}>
                                <FaCheck />
                                <p>{e}</p>
                              </li>
                            ))}
                          </ul>
                        </Col>
                      ))}
                    </Row>
                  </IconWithTitleAndDescription>
                </Container>
              </div>
            )}
          </div>
          {/* Hours of Operation to Financing Options */}

          {/* Financing Options */}
          {(isNdaSigned || isVipUser) && (
            <div className={classes.financing}>
              <h3>Financing Options</h3>
              <HeroSection
                defaultContainer
                customClass={classes.financingOptionsSection}
              >
                <div
                  className={` ${
                    data?.financingOptions?.length < 3
                      ? classes.socailCard1
                      : classes.socailCard
                  }`}
                >
                  {data?.financingOptions?.map((item, i) => {
                    let data = demoData?.financingOptions?.find(
                      (innerItem) => innerItem?.key === item
                    );
                    return (
                      <div className={classes.jCenter} key={i}>
                        <CircleIconWithTitle data={data} />
                      </div>
                    );
                  })}
                </div>
              </HeroSection>
            </div>
          )}
          {/* Financing Options */}
          {/* Contact Us */}
          <section className={classes.contactUs}>
            <Container className={classes.mainContainer}>
              <h3>Contact Us</h3>
              <div className={classes.details}>
                <div className={classes.imgDiv}>
                  <img src={`${imageUrl}${data?.broker[0]?.photo}`} />
                </div>
                <div className={classes.right}>
                  <div>
                    <h5>
                      {data?.broker[0]?.firstName} {data?.broker[0]?.lastName} |
                      {data?.broker[0]?.designation}
                    </h5>
                    <p>{data?.broker[0]?.description}</p>
                  </div>
                  <Row className={classes.contactInfo}>
                    <Col md={6} lg={4}>
                      <a
                        href={`tel:${data?.broker[0]?.officeContact}`}
                        className={classes.iconWithValue}
                      >
                        <FiPhone />
                        <p>{`Office : ${ReturnFormatedNumber(
                          data?.broker[0]?.officeContact
                        )}`}</p>
                      </a>

                      {data?.broker[0]?.cell && (
                        <a
                          href={`tel:${data?.broker[0]?.cell}`}
                          className={classes.iconWithValue}
                        >
                          <FiPhone />
                          <p>{`Cell : ${ReturnFormatedNumber(
                            data?.broker[0]?.cell
                          )}`}</p>
                        </a>
                      )}
                    </Col>
                    <Col md={6} lg={4}>
                      {data?.broker[0]?.deskContact && (
                        <a
                          href={`tel:${data?.broker[0]?.deskContact}`}
                          className={classes.iconWithValue}
                        >
                          <FiPhone />
                          <p>{`Desk : ${ReturnFormatedNumber(
                            data?.broker[0]?.deskContact
                          )}`}</p>
                        </a>
                      )}
                      <a
                        href={`mailto:${data?.broker[0]?.email}`}
                        className={classes.iconWithValue}
                      >
                        <MdOutlineEmail />
                        <p>{`${data?.broker[0]?.email}`}</p>
                      </a>
                    </Col>
                    <Col md={6} lg={4}>
                      <a
                        href={`tel:${data?.broker[0]?.contact}`}
                        className={classes.iconWithValue}
                      >
                        <FiPhone />
                        <p>{`Personal : ${ReturnFormatedNumber(
                          data?.broker[0]?.contact
                        )}`}</p>
                      </a>
                      {data?.broker[0]?.meetingLink && (
                        <a
                          href={`${data?.broker[0]?.meetingLink}`}
                          className={classes.iconWithValue}
                          target="_blank"
                        >
                          <FaRegHandshake />
                          <p>Schedule a Meeting</p>
                        </a>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          </section>
          {/* Contact Us */}
        </>
      )}
    </div>
  );
};

export default ListingDetail;

function CircleIconWithTitle({ data, link, className }) {
  return (
    <div
      className={[classes.circleIconWithTitle, className && className].join(
        " "
      )}
    >
      <div
        onClick={() => {
          if (link) window.open(link);
        }}
      >
        {data?.icon}
      </div>
      <p>{data?.name}</p>
      {data?.subTitle && <span>{data?.subTitle}</span>}
    </div>
  );
}

function IconWithTitleAndDescription({ data, children, className }) {
  return (
    <Row className={[classes.propertyInfoBox, className && className]}>
      <Col md={12}>
        <h3>{data?.title}</h3>
      </Col>
      <Col md={3}>
        <div className={classes.iconDiv}>
          <CircleIconWithTitle
            data={{ icon: data?.icon }}
            className={classes.iconBox}
          />
        </div>
      </Col>
      <Col md={9}>{children}</Col>
      <div className={classes.btmSeparator} />
    </Row>
  );
}
// do not remove this object
const demoData = {
  financingOptions: [
    { name: "Conventional", key: "conventional", icon: <RiBankFill /> },
    { name: "SBA", key: "sba", icon: <TbBuildingBank /> },
    { name: "Cash", key: "cash", icon: <FaDollarSign /> },
  ],
  onlinePresence: [
    { name: "Google Map", key: "google-map", icon: <IoLocationSharp /> },
    { name: "Facebook", key: "facebook", icon: <BsFacebook /> },
    { name: "Yelp", key: "yelp", icon: <FaYelp /> },
    { name: "MapQuest", key: "map-quest", icon: <FiMap /> },
    { name: "Website", key: "website", icon: <FaInternetExplorer /> },
    { name: "Instagram", key: "instagram", icon: <BsInstagram /> },
    { name: "Drizzly", key: "drizzly", icon: <MdOutlineLiquor /> },
    {
      name: "Bing-Location",
      key: "bing-location",
      icon: <SiMicrosoftbing />,
    },
  ],
};
