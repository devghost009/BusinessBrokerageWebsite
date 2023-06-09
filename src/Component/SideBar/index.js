import React, { useState } from "react";
import classes from "./SideBar.module.css";
import { HiOutlineClipboardList } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { logoWhite } from "../../constant/imagePath";
import { SideBarMenu } from "../../config/DummyData";
import { FiHome } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsFolder } from "react-icons/bs";
import { TbLogout, TbTemplate } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../config/apiUrl";
import { io } from "socket.io-client";
import { signOutRequest } from "../../store/auth/authSlice";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiFillLock } from "react-icons/ai";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activePath = useLocation().pathname;
  const { user, fcmToken } = useSelector((state) => state?.authReducer);

  const RenderItem = ({ icon, title, subMenu = [] }) => {
    const navigate = useNavigate();
    const active = useLocation()?.pathname;
    const [subnav, setSubnav] = useState(false);
    const subActive = subMenu.find((item, index) => item?.path == active);
    const showSubnav = () => setSubnav(!subnav);
    const currentPath = SideBarMenu.find((item) => item?.name == title)?.path;
    return (
      <>
        <div
          className={[
            classes?.listItemContainer,
            currentPath == active && classes?.active,
            subActive && classes?.subActive,
            subnav && classes?.marginZero,
          ].join(" ")}
          onClick={() => {
            if (subMenu?.length > 0) {
              showSubnav(!subnav);
            } else {
              navigate(currentPath);
            }
          }}>
          {icon}
          <span>{title}</span>
          {subMenu?.length > 0 &&
            (subnav ? (
              <RiArrowUpSFill
                size={20}
                color={"white"}
                className={classes?.dropDownIcon}
              />
            ) : (
              <RiArrowDownSFill
                size={20}
                color={"white"}
                className={classes?.dropDownIcon}
              />
            ))}
        </div>
        {subnav &&
          subMenu.map((item, index) => {
            return (
              <div
                className={[
                  classes?.innerItemContainer,
                  item?.path == active && classes?.active,
                ].join(" ")}
                key={index}
                onClick={() => {
                  navigate(item?.path);
                }}>
                {item?.icon}
                <span>{item.label}</span>
              </div>
            );
          })}
      </>
    );
  };

  const socket = useRef(null);

  const logout = () => {
    socket.current = io(apiUrl);
    socket.current.emit("logout", { _id: user?._id, fcmToken });
    dispatch(signOutRequest());
    navigate("/");
  };

  return (
    <div className={classes?.mainContainer}>
      <div className={classes?.logoContainer}>
        <img src={logoWhite} onClick={() => navigate("/")} alt="..." />
      </div>
      <RenderItem
        icon={<FiHome size={22} color={"var(--sidebar-text-color)"} />}
        title={"Dashboard"}
      />
      <RenderItem
        icon={
          <HiOutlineClipboardList
            size={22}
            color={"var(--sidebar-text-color)"}
          />
        }
        title={"Listing"}
        subMenu={[
          {
            label: "Inquired Listing",
            path: "/inquired-listing",
            icon: (
              <HiOutlineClipboardList
                size={22}
                color={"var(--sidebar-text-color)"}
              />
            ),
          },
          {
            label: "My Listing",
            path: "/my-listing",
            icon: (
              <HiOutlineClipboardList
                size={22}
                color={"var(--sidebar-text-color)"}
              />
            ),
          },
        ]}
      />
      <RenderItem
        icon={
          <IoChatbubbleEllipsesOutline
            size={22}
            color={"var(--sidebar-text-color)"}
          />
        }
        title={"Calendar"}
      />

      <RenderItem
        icon={<BsFolder size={20} color={"var(--sidebar-text-color)"} />}
        title={"BBS Team Folder"}
      />
      <RenderItem
        icon={
          <VscListUnordered size={22} color={"var(--sidebar-text-color)"} />
        }
        title={"Messages"}
      />
      <RenderItem
        icon={<CgProfile size={22} color={"var(--sidebar-text-color)"} />}
        title={"Update Profile"}
      />
      <RenderItem
        icon={<AiFillLock size={20} color={"var(--sidebar-text-color)"} />}
        title={"Update Password"}
      />
      <div className={[classes?.listItemContainer].join(" ")} onClick={logout}>
        <TbLogout size={22} color={"var(--sidebar-text-color)"} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
