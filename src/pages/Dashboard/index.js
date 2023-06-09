import React, { useEffect, useState } from "react";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import classes from "./Dashboard.module.css";
import StatCard from "../../Component/StatCard";
import { Row, Col } from "react-bootstrap";
import LatestActivitiesSection from "../../Component/LatestAndEmailSection/LatestActivitiesSection";
import TableSkeleton from "../../Component/TableSkeleton";
import PaginationComponent from "../../Component/PaginationComponent";
import NoData from "../../Component/NoData/NoData";
import { BaseURL, recordsLimit } from "../../config/apiUrl";
import { Get } from "../../Axios/AxiosFunctions";
import { useSelector } from "react-redux";
import { Button } from "../../Component/Button/Button";
import { useNavigate } from "react-router-dom";
import ViewMemoModal from "../../modals/ViewMemoModal";
import { CgNotes } from "react-icons/cg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state?.authReducer);

  const [inquiedListing, setInquiedListing] = useState([]);
  const [latestActivities, setLatestActivities] = useState([]);
  const [inquiedListingCurrentPage, setinquiedListingCurrentPage] = useState(1);
  const [inquiedListingTotalCount, setinquiedListingTotalCount] = useState(1);
  const [inquiedListingLaoding, setinquiedListingLaoding] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMemoModal, setViewMemoModal] = useState(false);

  const interestListingApiUrl = BaseURL(
    `users/interested-listings/${user?._id}`
  );
  const latestActivitiesApiUrl = BaseURL(`notifications`);

  const getDashboardAllApisData = async () => {
    setLoading(true);
    const [interestedListing, notifications] = await Promise.all([
      Get(`${interestListingApiUrl}?page=1&limit=${recordsLimit}`, accessToken),
      Get(`${latestActivitiesApiUrl}`, accessToken),
    ]);
    if (interestedListing !== undefined) {
      setInquiedListing(interestedListing?.data?.leads);
      setinquiedListingTotalCount(
        interestedListing?.data?.totalCount / recordsLimit
      );
    }
    if (notifications !== undefined) {
      setLatestActivities(notifications?.data?.data?.notifications);
    }
    setLoading(false);
  };

  const getInquiedListing = async (pageNo) => {
    setinquiedListingLaoding(true);
    const response = await Get(
      `${interestListingApiUrl}?page=${pageNo}&limit=${recordsLimit}`,
      accessToken
    );
    if (response !== undefined) {
      setInquiedListing(response?.data?.leads);
      setinquiedListingTotalCount(response?.data?.totalCount / recordsLimit);
    }
    setinquiedListingLaoding(false);
  };

  useEffect(() => {
    getDashboardAllApisData();
  }, []);

  return (
    <SideBarSkeleton>
      <style>{`
      .table100-body{
        height:400px;
      }
      .table100-body table{
        height:100%;
      }
      .table100-body td {
        padding-block: 18px;
      }
      .column1{
        padding-left: 16px;
      }
      .table100.ver1 .table100-body tr{
        margin:15px;
      }
      .table100 .table100-head tr {
        margin: 0 15px;
      }

        @media screen and (max-width:1250px){
      .table100-head, .table100-body{
        width:1000px;
      }
      .table100.ver1{
        overflow-x:scroll !important;
      }
    }

        @media screen and (max-width:992px){
      .table100-head, .table100-body{
        width:900px;
      }
     
    }
    
      `}</style>
      <div className={classes.container_main}>
        <div className={classes.main_heading}>
          <h3>Dashboard</h3>
        </div>
        <Row className="gy-3 justify-content-center">
          <Col className={classes.statCard_col} lg={4} md={6} sm={6}>
            <StatCard
              item={user?.ownedBusiness?.length}
              title="Total Listing"
              className={classes.statCard}
            />
          </Col>
          <Col className={classes.statCard_col} lg={4} md={6} sm={6}>
            <StatCard
              item={user?.ndaSigned?.length}
              title="Total NDA Signed"
              bgChange={true}
              className={classes.statCard}
            />
          </Col>
          <Col className={classes.statCard_col} lg={4} md={6}>
            <StatCard
              item={user?.ndaSubmitted?.length}
              title="Total NDA not Signed"
              className={classes.statCard}
            />
          </Col>
        </Row>

        <Row className={classes.sectionTwo_row}>
          <Col lg={12}>
            <div className={classes.main_heading}>
              <h4>Latest Activities</h4>
            </div>
            <div className={classes.latestActivities_main}>
              <div className={[classes.latestActivities_inner].join(" ")}>
                {latestActivities?.length < 1 ? (
                  <Row>
                    <NoData
                      text="No Latest Activities"
                      className={classes.noDataColor}
                    />
                  </Row>
                ) : (
                  <Row className={classes.latestActivities_row}>
                    {latestActivities?.map((item) => {
                      return (
                        <Col lg={12}>
                          <LatestActivitiesSection item={item} />
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row className={classes.table_main_row}>
          <div className={[classes.mainContainer]}>
            <div className={classes.headerContainer}>
              <h3>Inquired Listings</h3>
            </div>
            <div class="table100 ver1 m-b-110">
              <div class="table100-head">
                <table>
                  <thead>
                    <tr class="row100 head">
                      <th
                        class="cell100 column1"
                        style={{ width: "20%", textAlign: "start" }}>
                        Title
                      </th>
                      <th
                        class="cell100 column3"
                        style={{ width: "10%", textAlign: "start" }}>
                        Gross Sales
                      </th>
                      <th
                        class="cell100 column4"
                        style={{ width: "10%", textAlign: "start" }}>
                        Cash Flow
                      </th>
                      <th
                        class="cell100 column5"
                        style={{ width: "10%", textAlign: "start" }}>
                        Price
                      </th>

                      <th
                        class="cell100 column5"
                        style={{ width: "10%", textAlign: "start" }}>
                        Cash Flow
                      </th>
                      <th
                        class="cell100 column5"
                        style={{ width: "15%", textAlign: "start" }}>
                        City
                      </th>
                      <th
                        class="cell100 column5"
                        style={{ width: "10%", textAlign: "start" }}>
                        Status
                      </th>
                      <th
                        class="cell100 column5"
                        style={{ width: "15%", textAlign: "start" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              {loading ? (
                <TableSkeleton rowsCount={recordsLimit} colsCount={7} />
              ) : (
                <div class="table100-body js-pscroll ps ps--active-y">
                  <table>
                    <tbody>
                      {inquiedListing?.length > 0 ? (
                        inquiedListing?.map((item, index) => (
                          <tr class="row100 body">
                            <td
                              class="cell100 column1"
                              style={{ width: "20%", textAlign: "start" }}>
                              {item?.listingID?.title}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{ width: "10%", textAlign: "start" }}>
                              {`${item?.buyer?.firstName} ${item?.buyer?.lastName}`}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{
                                width: "10%",
                                textAlign: "start",
                              }}>
                              ${item?.listingID?.grossSales}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{
                                width: "10%",
                                textAlign: "start",
                              }}>
                              ${item?.listingID?.askingPrice}
                            </td>

                            <td
                              class="cell100 column4"
                              style={{
                                width: "10%",
                                textAlign: "start",
                              }}>
                              ${item?.listingID?.cashFlow}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{
                                width: "15%",
                                textAlign: "start",
                              }}>
                              {item?.listingID?.city}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{
                                width: "10%",
                                textAlign: "start",
                              }}>
                              {item?.status}
                            </td>
                            <td
                              class="cell100 column4"
                              style={{
                                width: "15%",
                                textAlign: "start",
                              }}>
                              <div className={classes.btnsDiv}>
                                <Button
                                  title={"view Memo"}
                                  label={<CgNotes size={18} color={"#fff"} />}
                                  className={classes.viewMemoBtn}
                                  onClick={() => {
                                    setSelectedListing(item);
                                    setViewMemoModal(true);
                                  }}
                                />
                                <Button
                                  label={"View Details"}
                                  onClick={() =>
                                    navigate(
                                      `/buy-a-business/${item?.listingID?.slug}`
                                    )
                                  }
                                  className={classes.viewDetailsBtn}
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <NoData
                          text={"No Listing Found"}
                          className={classes.noDataColor}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {inquiedListing?.length > 0 && (
              <div className={[classes.paginationDiv]}>
                <PaginationComponent
                  totalPages={Math.ceil(inquiedListingTotalCount)}
                  currentPage={inquiedListingCurrentPage}
                  setCurrentPage={(e) => {
                    setinquiedListingCurrentPage(e);
                    getInquiedListing(e);
                  }}
                  defaultActiveColor={"var(--dashboard-main-color)"}
                />
              </div>
            )}
          </div>
        </Row>
      </div>
      {viewMemoModal && (
        <ViewMemoModal
          show={viewMemoModal}
          setShow={setViewMemoModal}
          data={selectedListing}
        />
      )}
    </SideBarSkeleton>
  );
};

export default Dashboard;
