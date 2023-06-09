import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Get } from "../../Axios/AxiosFunctions";
import NoData from "../../Component/NoData/NoData";
import PaginationComponent from "../../Component/PaginationComponent";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import TableSkeleton from "../../Component/TableSkeleton";
import { BaseURL, recordsLimit } from "../../config/apiUrl";
import classes from "./MyListing.module.css";
import PoperComponent from "../../Component/PopperComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Component/Button/Button";

const MyListing = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useSelector((state) => state?.authReducer);
  const [myListing, setMyListing] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedListing, setSelectedListing] = useState(null);

  const [openPopper, setOpenPopper] = useState(false);
  const anchorRef = React.useRef(null);
  const [indexMap, setIndexMap] = useState(null);

  const getMyListing = async () => {
    const url = BaseURL(
      `users/owned-listings/${user?._id}?page=${page}&limit=${recordsLimit}`
    );
    setLoading(true);
    const response = await Get(url, accessToken);
    if (response !== undefined) {
      setMyListing(response?.data?.ownedBusiness);
      setTotalPages(response?.data?.totalCount);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMyListing();
  }, [page]);

  const handleToggle = () => {
    setOpenPopper((prevOpen) => !prevOpen);
  };

  const handleClick = (flag) => {
    if (flag == "View") {
      navigate(`/buy-a-business/${selectedListing?._id}`);
    }
  };

  useEffect(() => {
    if (!openPopper) setSelectedListing(null);
  }, [openPopper]);
  return (
    <SideBarSkeleton>
      <style>{`
      .table100-body{
        max-height:calc(100vh - 330px);
        height:calc(100vh - 330px);
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
          <h4>My Listings</h4>
        </div>
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th
                    class="cell100 column1"
                    style={{ width: "20%", textAlign: "left" }}>
                    Title
                  </th>
                  <th
                    class="cell100 column5"
                    style={{ width: "18%", textAlign: "center" }}>
                    Company
                  </th>
                  <th
                    class="cell100 column2"
                    style={{ width: "15%", textAlign: "left" }}>
                    Price
                  </th>
                  <th
                    class="cell100 column4"
                    style={{ width: "10%", textAlign: "left" }}>
                    Sales
                  </th>
                  <th
                    class="cell100 column3"
                    style={{ width: "12%", textAlign: "center" }}>
                    Cash Flow
                  </th>

                  <th
                    class="cell100 column5"
                    style={{ width: "15%", textAlign: "start" }}>
                    Status
                  </th>
                  <th
                    class="cell100 column5"
                    style={{ width: "5%", textAlign: "end" }}>
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
                ) : myListing?.length > 0 ? (
                  myListing?.map((item, index) => (
                    <tr class="row100 body">
                      <td
                        class="cell100 column1"
                        style={{ width: "20%", textAlign: "left" }}>
                        {item?.title}
                      </td>
                      <td
                        class="cell100 column4"
                        style={{ width: "18%", textAlign: "center" }}>
                        {item?.companyName}
                      </td>
                      <td
                        class="cell100 column2"
                        style={{
                          width: "15%",
                          textAlign: "left",
                        }}>
                        ${item?.askingPrice}
                      </td>
                      <td
                        class="cell100 column4"
                        style={{ width: "10%", textAlign: "left" }}>
                        ${item?.grossSales}
                      </td>
                      <td
                        class="cell100 column4"
                        style={{ width: "12%", textAlign: "center" }}>
                        ${item?.cashFlow}
                      </td>

                      <td
                        class="cell100 column5"
                        style={{ width: "15%", textAlign: "start" }}>
                        {item?.status}
                      </td>
                      <td
                        class="cell100 column5"
                        style={{ width: "5%", textAlign: "end" }}>
                        <Button
                          label={"View Details"}
                          onClick={() =>
                            navigate(`/buy-a-business/${item?.slug}`)
                          }
                          className={classes.viewDetailsBtn}
                        />
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
        </div>
        {myListing?.length > 0 && (
          <div className={[classes.paginationDiv]}>
            <PaginationComponent
              totalPages={Math.ceil(totalPages / recordsLimit)}
              currentPage={page}
              setCurrentPage={setPage}
              defaultActiveColor={"var(--dashboard-main-color)"}
            />
          </div>
        )}
        <PoperComponent
          handleClick={handleClick}
          open={openPopper}
          setOpen={setOpenPopper}
          anchorRef={anchorRef}
          data={[
            // 'View',
            "Offering Memo",
            "Data Room",
          ]}
        />
      </div>
    </SideBarSkeleton>
  );
};

export default MyListing;
