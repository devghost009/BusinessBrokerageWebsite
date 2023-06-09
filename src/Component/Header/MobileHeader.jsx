import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./MobileHeader.module.css";
import { footerLogo, Logo } from "../../constant/imagePath";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiBook2Fill } from "react-icons/ri";
import { IoIosBusiness } from "react-icons/io";
import { AiFillContacts, AiFillShop } from "react-icons/ai";
import { IoCall, IoHome, IoLogIn, IoLogOut } from "react-icons/io5";
import { BsBriefcaseFill } from "react-icons/bs";
import {
  MdDesignServices,
  MdOutlineDashboardCustomize,
  MdSpaceDashboard,
} from "react-icons/md";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/apiUrl";
import { io } from "socket.io-client";
import { signOutRequest } from "../../store/auth/authSlice";
import LoginModal from "../../modals/LoginModal/LoginModal";
import SignUpModal from "../../modals/SignUpModal/SignUpModal";
import { FaQuestion } from "react-icons/fa";

export const MobileHeader = ({ customStyle, logo = Logo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, fcmToken, isLogin } = useSelector(
    (state) => state?.authReducer
  );
  const socket = io(apiUrl);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  // current page url path name
  const currentPage = window.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const RenderListItem = ({ icon, text, customClass, path, href }) => {
    return (
      <div
        className={[classes.listItem, customClass].join(" ")}
        onClick={() => {
          if (path.toLowerCase() == "logout") {
            socket.emit("logout", user?._id, fcmToken);
            dispatch(signOutRequest());
            navigate("/");
          } else if (path.toLowerCase() == "login") {
            setOpenLogin(true);
          } else {
            navigate(path, { state: { href } });
          }
        }}
      >
        {icon}
        <span className={classes.listItemText}>{text}</span>
      </div>
    );
  };

  return (
    <>
      <div className={classes.headerMainDiv} id={"navMobileHeader"}>
        <div className={classes.header} style={{ ...customStyle }}>
          <div className={classes.imageContainer}>
            <img src={logo} className={classes.logo} alt="logo" />
          </div>
          <GiHamburgerMenu
            className={classes.hamburger}
            onClick={() => {
              toggleDrawer();
            }}
          />
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerUserSection}>
              <>
                <img
                  src={footerLogo}
                  className={classes.drawerLogo}
                  alt="logo"
                />
              </>
            </div>
            <div className={classes.drawerList}>
              <>
                <RenderListItem
                  icon={<IoHome />}
                  text={"Home"}
                  customClass={currentPage == "/" && classes.activeItem}
                  path={"/"}
                />
                <RenderListItem
                  icon={<RiBook2Fill />}
                  text={"About Us"}
                  customClass={currentPage == "/about" && classes.activeItem}
                  path={"/about"}
                />
                <RenderListItem
                  icon={<AiFillShop />}
                  text={"Buy A Business"}
                  customClass={currentPage == "/buy-a-business" && classes.activeItem}
                  path={"/buy-a-business"}
                />
                <RenderListItem
                  icon={<IoIosBusiness />}
                  text={"Sell Your Business"}
                  customClass={
                    currentPage == "/sell-business" && classes.activeItem
                  }
                  path={"/sell-business"}
                />
                <RenderListItem
                  icon={<FaQuestion />}
                  text={"FAQ"}
                  customClass={currentPage == "/faq" && classes.activeItem}
                  path={"/faq"}
                />
                <RenderListItem
                  icon={<MdDesignServices />}
                  text={"Services"}
                  customClass={currentPage == "/services" && classes.activeItem}
                  path={"/services"}
                />
                <RenderListItem
                  icon={<AiFillContacts />}
                  text={"Contact Us"}
                  customClass={
                    currentPage == "/contact-us" && classes.activeItem
                  }
                  path={"/contact-us"}
                />
                <RenderListItem
                  icon={<BsBriefcaseFill />}
                  text={"Career"}
                  customClass={currentPage == "/careers" && classes.activeItem}
                  path={"/careers"}
                />
                <hr
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                  }}
                />
                {isLogin ? (
                  <>
                    <RenderListItem
                      icon={<MdSpaceDashboard />}
                      text={"Dasboard"}
                      customClass={
                        currentPage == "/dashboard" && classes.activeItem
                      }
                      path={"/dashboard"}
                    />
                    <RenderListItem
                      icon={<IoLogOut />}
                      text={"logout"}
                      path={"logout"}
                    />
                  </>
                ) : (
                  <RenderListItem
                    icon={<IoLogIn />}
                    text={"Login"}
                    path={"login"}
                  />
                )}
                <RenderListItem
                  icon={<IoCall />}
                  text={"844-4-BIZBKR"}
                  path={"call"}
                />
              </>
            </div>
          </div>
        </Drawer>
        {openLogin && (
          <LoginModal
            show={openLogin}
            setShow={setOpenLogin}
            showSignUp={setOpenSignUp}
          />
        )}

        {openSignUp && (
          <SignUpModal
            showLogin={setOpenLogin}
            show={openSignUp}
            setShow={setOpenSignUp}
          />
        )}
      </div>
    </>
  );
};

MobileHeader.propTypes = {
  customStyle: PropTypes.object,
};

MobileHeader.defaulProps = {};
