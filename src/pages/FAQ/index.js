import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./FAQ.module.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import HeroSection from "../../Component/HeroSection/HeroSection";
import { useSelector } from "react-redux";

const Faq = () => {
  const cmsData = useSelector((state) => state?.commonReducer?.cms?.faqs) || [];

  const sellersFaqs = cmsData?.data?.sellerFaqs;
  const buyersFaqs = cmsData?.data?.buyerFaqs;

  const [accordFlag, setAccordFlag] = useState(null);
  const [accordFlag1, setAccordFlag1] = useState(null);
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      test(eventKey, 1)
    );

    return <div onClick={decoratedOnClick}>{children}</div>;
  }
  function CustomToggle1({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      test(eventKey, 2)
    );

    return <div onClick={decoratedOnClick}>{children}</div>;
  }
  const test = (eventKey, flagForColumn) => {
    if (accordFlag != eventKey) {
      flagForColumn == 1 && setAccordFlag(eventKey);
      flagForColumn == 2 && setAccordFlag1(eventKey);
    } else if (accordFlag == eventKey) {
      flagForColumn == 1 && setAccordFlag(null);
      flagForColumn == 2 && setAccordFlag1(null);
    }
  };

  const accordionsArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div>
      <Header />
      <HeroSection customClass={[classes.heroBackground]}>
        <div className={[classes.heroContainer]}>
          <h1 className={[classes.heroHeader]}>Frequently Asked Questions</h1>
        </div>
      </HeroSection>

      <Container className={classes.main_conti}>
        <Row className={classes.main_row}>
          <Col lg={6} md={12}>
            <div className={classes.accordion_col}>
              <h4>BUYER QUESTIONS</h4>
              <p>
                Access items without owning them by renting them from people in
                your neighbourhood in a few easy steps.
              </p>

              <Accordion>
                {buyersFaqs?.map((item) => {
                  return (
                    <Card className={classes.card_main}>
                      <Card.Header
                        style={{ backgroundColor: "unset", border: 0 }}>
                        <CustomToggle1 eventKey={item}>
                          <div className={classes.accord_head}>
                            <h6
                              style={{
                                margin: 0,
                                color: accordFlag1 == item && "#02528A",
                              }}>
                              {item?.question}
                            </h6>
                            {accordFlag1 == item ? (
                              <ArrowDropUpIcon
                                style={{ color: "#02528A" }}
                                className={classes.open_accord}
                              />
                            ) : (
                              <ArrowDropDownIcon style={{ color: "#D8D8D8" }} />
                            )}
                          </div>
                        </CustomToggle1>
                      </Card.Header>
                      <Accordion.Collapse eventKey={item}>
                        <Card.Body>{item?.answer}</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className={classes.accordion_col}>
              <h4>SELLER QUESTIONS</h4>
              <p>
                Access items without owning them by renting them from people in
                your neighbourhood in a few easy steps.
              </p>

              <Accordion>
                {sellersFaqs?.map((item) => {
                  return (
                    <Card className={classes.card_main}>
                      <Card.Header
                        style={{ backgroundColor: "unset", border: 0 }}>
                        <CustomToggle eventKey={item}>
                          <div className={classes.accord_head}>
                            <h6
                              style={{
                                margin: 0,
                                color: accordFlag == item && "#02528A",
                              }}>
                              {item?.question}
                            </h6>
                            {accordFlag == item ? (
                              <ArrowDropUpIcon
                                style={{ color: "#02528A" }}
                                className={classes.open_accord}
                              />
                            ) : (
                              <ArrowDropDownIcon style={{ color: "#D8D8D8" }} />
                            )}
                          </div>
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={item}>
                        <Card.Body>{item?.answer}</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Faq;
