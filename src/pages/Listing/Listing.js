import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import HeroSection from "../../Component/HeroSection/HeroSection";
import styles from "./Listing.module.css";
import ListingCard from "../../Component/ListingCard/ListingCard";
import PaginationComponent from "../../Component/PaginationComponent";
import { BaseURL, imageUrl } from "../../config/apiUrl";
import { Get } from "../../Axios/AxiosFunctions";
import NoData from "../../Component/NoData/NoData";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../modals/LoginModal/LoginModal";
import SearchFilter from "../../Component/SearchFilter";
import { useSelector } from "react-redux";
import { Button } from "../../Component/Button/Button";
import SignUpModal from "../../modals/SignUpModal/SignUpModal";

const Listing = () => {
  const navigate = useNavigate();
  const cmsData = useSelector(
    (state) => state?.commonReducer?.cms?.buyAbusiness
  );
  const limit = 16;
  // filters
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  // data
  const [allBusiness, setAllBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  // modal state
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  // broker info
  const [brokerInfoModal, setBrokerInfoModal] = useState(false);
  const [selectedBrokerData, setSelectedBrokerData] = useState(null);

  const getAllBusiness = async (
    pageNo = page,
    cat = undefined,
    price = undefined
    // city = undefined
  ) => {
    const params = {
      page: pageNo,
      limit,
      ...(price && { price }),
      ...(cat && { category: cat?._id }),
    };

    const searchParams = new URLSearchParams(params);
    const url = BaseURL(`business/public?${searchParams.toString()}`);

    setLoading(true);
    const response = await Get(url);
    if (response !== undefined) {
      setAllBusiness(response?.data?.business);
      setTotalPages(response?.data?.results);
      setPage(pageNo);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllBusiness();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection>
        <div className={[styles.heroContainer]}>
          <h1 className={[styles.heroHeader]}>{cmsData?.section1_title}</h1>
          <h6 className={[styles.heroSubHeader]}>
            {cmsData?.section1_subTitle}
          </h6>
          <p className={[styles.heroContent]}>
            {cmsData?.section1_description}{" "}
          </p>
          <Button
            label={"Get a Prefered Business"}
            className={styles.heroBtn}
            onClick={() => navigate("/prefered-business-valuation")}
          />
        </div>
      </HeroSection>

      {/* filter */}
      <div className={styles.dropdown_main}>
        <div>
          <SearchFilter
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            onSearch={getAllBusiness}
          />
        </div>
      </div>
      {/* filter */}

      {/* card-section */}
      <Container fluid className={styles.listingCard_container}>
        <div className={styles.card_head}>
          <h3>{cmsData?.section2_title}</h3>
          <p>{cmsData?.section2_description}</p>
        </div>
        <Row className={styles.listingMain_row}>
          {loading ? (
            Array.apply(null, { length: limit })?.map((item) => {
              return (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                  xl={3}
                  className={styles.listingCard_row}>
                  <div className="SkeletonContainer"></div>
                </Col>
              );
            })
          ) : allBusiness?.length > 0 ? (
            allBusiness?.map((item, index) => {
              return (
                <Col
                  className={styles.listingCard_row}
                  key={index}
                  lg={4}
                  md={6}
                  sm={6}
                  xl={3}>
                  <ListingCard
                    data={item}
                    setLogin={setLoginModal}
                    setSignUp={setSignUpModal}
                    setBrokerData={setSelectedBrokerData}
                    showBrokerModal={setBrokerInfoModal}
                  />
                </Col>
              );
            })
          ) : (
            <NoData text={"No Business Found"} />
          )}
        </Row>
        {/* card-section */}

        {totalPages > limit && (
          <div className={styles.card_pagination}>
            <PaginationComponent
              currentPage={page}
              setCurrentPage={(e) => {
                getAllBusiness(e, category, price);
              }}
              totalPages={Math.ceil(totalPages / limit)}
            />
          </div>
        )}
      </Container>
      {loginModal && (
        <LoginModal
          show={loginModal}
          setShow={setLoginModal}
          showSignUp={setSignUpModal}
        />
      )}
      {signUpModal && (
        <SignUpModal
          show={signUpModal}
          setShow={setSignUpModal}
          showLogin={setLoginModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default Listing;
