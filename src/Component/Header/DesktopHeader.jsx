import React, { useRef, useState } from "react";
import { Navbar, Nav, Container, OverlayTrigger } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Style from "./DesktopHeader.module.css";
import { Logo } from "../../constant/imagePath";
import LoginModal from "../../modals/LoginModal/LoginModal";
import SignUpModal from "../../modals/SignUpModal/SignUpModal";
import { IoLogInOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { apiUrl, imageUrl } from "../../config/apiUrl";
import { signOutRequest } from "../../store/auth/authSlice";
import { io } from "socket.io-client";

const DesktopHeader = ({
  logo = Logo,
  backgroundColor,
  containerClass,
  className,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const { isLogin, user, fcmToken } = useSelector(
    (state) => state?.authReducer
  );

  const socket = useRef(null);

  const logout = () => {
    socket.current = io(apiUrl);
    socket.current.emit("logout", { _id: user?._id, fcmToken });
    dispatch(signOutRequest());
    navigate("/");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${[Style.header, className].join(" ")}`}
      style={{ backgroundColor: backgroundColor }}
      id={"navDesktopHeader"}
    >
      <Container
        className={`${[Style.navbarContainer, containerClass].join(" ")}`}
      >
        <div className={Style.main_logo_main} onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`mx-auto ${[Style.gapCustm].join(" ")}`} gap={5}>
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/buy-a-business"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Buy a Business
              </NavLink>
              <NavLink
                to="/sell-business"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Sell Your Business
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Faq
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/careers"
                className={({ isActive }) =>
                  isActive
                    ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                    : `${[Style.nabarLinks]}`
                }
              >
                Careers
              </NavLink>
            </>
          </Nav>

          <div className={Style.dflex}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a href="tel:8444249257" className={Style.header_right}>
                844-4-BIZKR{" "}
                <MdCall
                  className={[Style.headerIconSize]}
                  color={"var(--main-color)"}
                />
              </a>
            </div>
            {isLogin ? (
              <>
                <OverlayTrigger
                  trigger={["click"]}
                  overlay={
                    <div className={Style.profileOverlay}>
                      <div>
                        <NavLink
                          to="/dashboard"
                          className={[Style.overlayLink]}
                        >
                          Dashboard
                        </NavLink>
                        <p className={[Style.overlayLink]} onClick={logout}>
                          Logout
                        </p>
                      </div>
                    </div>
                  }
                  placement={"bottom"}
                  show={show}
                  onToggle={() => setShow(!show)}
                >
                  <div className={[Style.profileImg]}>
                    <img src={`${imageUrl}${user?.photo}`} alt="..." />
                  </div>
                </OverlayTrigger>
              </>
            ) : (
              <div>
                <p
                  className={Style.header_right}
                  onClick={() => setOpenLogin(true)}
                >
                  CLIENT LOGIN{" "}
                  <IoLogInOutline
                    className={[Style.headerIconSize]}
                    color={"var(--main-color)"}
                  />
                </p>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

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
    </Navbar>
  );
};

export default DesktopHeader;
