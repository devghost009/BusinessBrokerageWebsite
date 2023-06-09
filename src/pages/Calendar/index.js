import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Get } from "../../Axios/AxiosFunctions";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import { BaseURL } from "../../config/apiUrl";
import ViewEventModal from "../../modals/ViewEventModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classes from "./Calendar.module.css";
import { Loader } from "../../Component/Loader";

function Calendar() {
  const { accessToken } = useSelector((state) => state?.authReducer);

  const [eventsDataLoading, setEventsDataLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  // view event modal
  const [viewEventModal, setViewEventModal] = useState(false);
  const [viewEventData, setViewEventData] = useState();

  const [month, setMonth] = useState(moment().format());

  const startDate = moment(month).startOf("month").format();
  const endDate = moment(month).endOf("month").format();

  // days count
  const daysCount = moment(startDate).daysInMonth();
  // start date
  const startOfWeek = moment(startDate).startOf("week").format();
  const startDateDiff = moment(startDate).diff(moment(startOfWeek), "day");
  // end date
  const endOfWeek = moment(endDate).endOf("week").format();
  const endDateDiff = moment(endOfWeek).diff(moment(endDate), "day");

  let arrayData = Array(daysCount + startDateDiff + endDateDiff).fill(0);
  const withoutBorderIndex = [6, 13, 20, 27, 34, 41];

  const getEvents = async () => {
    const url = BaseURL(
      `events/calendar?date=${moment(month)
        .startOf("month")
        .format("YYYY-MM-DD")}`
    );
    setEventsDataLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setEventsData(response?.data?.events);
    }
    setEventsDataLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, [month]);

  return (
    <SideBarSkeleton>
      <Container fluid className={classes.container}>
        <Row>
          <Col md={12}>
            <div className={classes.headingAndBtn}>
              <h3>Calendar</h3>
            </div>
          </Col>
          <Col md={12}>
            {eventsDataLoading ? (
              <Loader />
            ) : (
              <div className={[classes.mainCalendarDiv]}>
                <Header
                  setMonth={setMonth}
                  month={month}
                  setEventsData={setEventsData}
                />
                <DayName />
                <div className={classes.calendarBox}>
                  {arrayData?.map((item, index) => {
                    const filterEvents = eventsData?.filter(
                      (x) =>
                        moment(startDate)
                          .add(index - startDateDiff, "days")
                          .format("YYYY-MM-DD") ==
                        moment(x?.date).format("YYYY-MM-DD")
                    );
                    return (
                      <div
                        className={[
                          filterEvents?.length > 1
                            ? classes.multiEvents
                            : classes.DateBox,
                          moment(startDate)
                            .add(index - startDateDiff, "days")
                            .format("MMM") !== moment(startDate).format("MMM")
                            ? classes.dateDisabled
                            : "",
                        ].join(" ")}
                        style={{
                          borderRight:
                            !withoutBorderIndex.includes(index) &&
                            "1px solid #eaf0f4",
                          borderBottom: index <= 34 && "1px solid #eaf0f4",
                        }}
                      >
                        {filterEvents?.length > 0 ? (
                          filterEvents?.map((item, index) => (
                            <RenderEvents
                              data={item}
                              onClick={() => {
                                setViewEventData(item);
                                setViewEventModal(true);
                              }}
                            />
                          ))
                        ) : (
                          <span
                            className={
                              moment(startDate)
                                .add(index - startDateDiff, "days")
                                .format("MM-DD-YYYY") ===
                                moment().format("MM-DD-YYYY") &&
                              classes.todaysDate
                            }
                          >
                            {moment(startDate)
                              .add(index - startDateDiff, "days")
                              .format("D")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {viewEventModal && (
        <ViewEventModal
          show={viewEventModal}
          setShow={setViewEventModal}
          data={viewEventData}
        />
      )}
    </SideBarSkeleton>
  );
}

export default Calendar;

const Header = ({ setMonth, month, setEventsData }) => {
  return (
    <div className={classes?.headerContainer}>
      <span className={classes?.monthName}>
        {moment(month).format("MMMM, YYYY")}
      </span>
      <div>
        <IoIosArrowBack
          onClick={() => {
            setEventsData([]);
            // moment(StartDate).diff(moment(month), "month") > 0 &&
            setMonth(moment(month).add(-1, "months").format());
          }}
          style={{
            cursor: "pointer",
          }}
        />
        <IoIosArrowForward
          onClick={() => {
            setEventsData([]);
            setMonth(moment(month).add(1, "months").format());
          }}
          style={{
            marginLeft: 12,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

const DayName = () => {
  return (
    <div className={classes?.dayNameContainer}>
      {moment.weekdays().map((item, index) => (
        <span className={[classes?.dayContainer, classes?.day].join(" ")}>
          {item[0]}
          {item[1]}
          {item[2]}
        </span>
      ))}
    </div>
  );
};

const RenderEvents = ({ data, onClick }) => {
  return (
    <div className={[classes.renderEventsDiv]}>
      <p style={{ backgroundColor: data?.color }} onClick={onClick}>
        {data?.name}
      </p>
    </div>
  );
};
