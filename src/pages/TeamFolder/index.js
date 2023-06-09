import React, { useEffect, useState } from "react";
import { Get } from "../../Axios/AxiosFunctions";
import SideBarSkeleton from "../../Component/SideBarSkeleton";
import { BaseURL } from "../../config/apiUrl";
import classes from "./TeamFolder.module.css";
import { useSelector } from "react-redux";
import FolderAndFileBox from "../../Component/FolderAndFileBox";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Component/Loader";
import NoData from "../../Component/NoData/NoData";
import SearchInput from "../../Component/SearchInput";

const TeamFolder = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authReducer?.accessToken);

  const [allFolders, setAllFolders] = useState([]);
  const [loading, setLoading] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllTeamFolder();
  }, []);

  const getAllTeamFolder = async () => {
    const url = BaseURL("data-room");
    setLoading(true);
    const response = await Get(url, token);
    if (response !== undefined) {
      setAllFolders(response?.data?.data?.listingFolders);
    }
    setLoading(false);
  };

  let tempListingFolders = [...allFolders];
  if (search?.length > 1) {
    tempListingFolders = allFolders?.filter((item) =>
      item?.name?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }

  return (
    <>
      <div>
        <SideBarSkeleton>
          <div className={[classes.mainContainer]}>
            {loading ? (
              <Loader />
            ) : (
              <div className={[classes.foldersDiv]}>
                <div className={[classes.headerContainer]}>
                  <h3>Data Room</h3>
                </div>
                <div className={[classes.mainFoldersDiv]}>
                  <div className={[classes.headerContainer]}>
                    <h5>Listings</h5>
                    <SearchInput
                      setter={(e) => {
                        setSearch(e);
                      }}
                      value={search}
                      placeholder={"Search"}
                    />
                  </div>
                  {tempListingFolders?.length == 0 ? (
                    <NoData
                      text="No Folders Found"
                      className={classes.noData}
                    />
                  ) : (
                    <div className={classes.folderBox}>
                      {tempListingFolders?.map((item, i) => (
                        <div className={classes.folderInnerBox}>
                          <FolderAndFileBox
                            key={i}
                            data={item}
                            onClick={() =>
                              navigate(`/team-folder/${item?._id}`)
                            }
                            allowDelete={false}
                            allowEdit={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SideBarSkeleton>
      </div>
    </>
  );
};

export default TeamFolder;
