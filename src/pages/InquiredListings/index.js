import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Get } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import NoData from "../../Component/NoData/NoData";
import PaginationComponent from "../../Component/PaginationComponent";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import TableSkeleton from "../../Component/TableSkeleton";
import { BaseURL, recordsLimit } from "../../config/apiUrl";
import classes from "./InquiredListings.module.css";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import ViewMemoModal from "../../modals/ViewMemoModal";

const InquiredListings = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useSelector((state) => state?.authReducer);
  const [inquiredListing, setInquiredListing] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMemoModal, setViewMemoModal] = useState(false);

  const getInquiredListings = async () => {
    const url = BaseURL(
      `users/interested-listings/${user?._id}?page=${page}&limit=${recordsLimit}`
    );
    setLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setInquiredListing(response?.data?.leads);
      setTotalPages(response?.data?.totalCount);
    }
    setLoading(false);
  };
  useEffect(() => {
    getInquiredListings();
  }, [page]);

  return (
    <SideBarSkeleton>
      <style>{`
      .table100-body{
        max-height:calc(100vh - 330px);
        height:calc(100vh - 330px);
      }
      .table100-body table{
        height:100%;
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
        width:100%;
      }   
    }
      @media screen and (max-width:900px){
      .table100-head, .table100-body{
        width:900px;
      }   
    }
      
     
      `}</style>
      <div className={[classes.mainContainer]}>
        <div className={classes.listing_head}>
          <h4>Inquired Listings</h4>
        </div>
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th
                    class="cell100 column1"
                    style={{ width: "20%", textAlign: "left" }}
                  >
                    Name
                  </th>
                  <th
                    class="cell100 column1"
                    style={{ width: "18%", textAlign: "left" }}
                  >
                    Company
                  </th>
                  <th
                    class="cell100 column2"
                    style={{ width: "15%", textAlign: "left" }}
                  >
                    Price
                  </th>
                  <th
                    class="cell100 column4"
                    style={{ width: "10%", textAlign: "left" }}
                  >
                    Sales
                  </th>
                  <th
                    class="cell100 column3"
                    style={{ width: "12%", textAlign: "center" }}
                  >
                    Cash Flow
                  </th>
                  <th
                    class="cell100 column5"
                    style={{ width: "10%", textAlign: "start" }}
                  >
                    Status
                  </th>
                  <th
                    class="cell100 column5"
                    style={{ width: "15%", textAlign: "center" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <div class="table100-body js-pscroll ps ps--active-y">
            <table>
              <tbody>
                {loading ? (
                  <TableSkeleton rowsCount={recordsLimit} colsCount={7} />
                ) : inquiredListing?.length > 0 ? (
                  inquiredListing?.map((item, index) => (
                    <tr class="row100 body">
                      <td
                        class="cell100 column1"
                        style={{ width: "20%", textAlign: "left" }}
                      >
                        {item?.listingID?.title}
                      </td>
                      <td
                        class="cell100 column1"
                        style={{ width: "18%", textAlign: "left" }}
                      >
                        {item?.listingID?.companyName}
                      </td>
                      <td
                        class="cell100 column2"
                        style={{
                          width: "15%",
                          textAlign: "left",
                        }}
                      >
                        ${item?.listingID?.askingPrice}
                      </td>
                      <td
                        class="cell100 column4"
                        style={{ width: "10%", textAlign: "left" }}
                      >
                        ${item?.listingID?.grossSales}
                      </td>
                      <td
                        class="cell100 column4"
                        style={{ width: "12%", textAlign: "center" }}
                      >
                        ${item?.listingID?.cashFlow}
                      </td>

                      <td
                        class="cell100 column5"
                        style={{ width: "10%", textAlign: "start" }}
                      >
                        {item?.status}
                      </td>
                      <td
                        class="cell100 column5"
                        style={{ width: "15%", textAlign: "end" }}
                      >
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
                    text={"No Inquired Listings Found"}
                    className={classes.noDataColor}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
        {inquiredListing?.length > 0 && (
          <div className={[classes.paginationDiv]}>
            <PaginationComponent
              totalPages={Math.ceil(totalPages / recordsLimit)}
              currentPage={page}
              setCurrentPage={setPage}
              defaultActiveColor={"var(--dashboard-main-color)"}
            />
          </div>
        )}
        {viewMemoModal && (
          <ViewMemoModal
            show={viewMemoModal}
            setShow={setViewMemoModal}
            data={selectedListing}
          />
        )}
      </div>
    </SideBarSkeleton>
  );
};

export default InquiredListings;
