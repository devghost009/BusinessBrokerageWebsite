import "./assets/Styles/style.css";
import "./assets/Styles/table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useDispatch, useSelector } from "react-redux";
import "react-modern-drawer/dist/index.css";

import { apiUrl, BaseURL } from "./config/apiUrl";
import Lottie from "lottie-react";
import { Get } from "./Axios/AxiosFunctions";
import { setAllCategories, setAllCmsData } from "./store/common/commonSlice";
import { updateUser, signOutRequest } from "./store/auth/authSlice";
import startLoader from "./assets/animation/startLoader.json";

import ProtectedRouter from "./Helper/ProtectedRoute";
import ScrollToTop from "./Helper/ScrollToTop";
import { io } from "socket.io-client";
import SupportChat from "./Component/SupportChat";
// Lazy Imports

// Before Login Routes
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SellBusiness = lazy(() => import("./pages/SellBusiness/SellBusiness"));
const CareerOpportunities = lazy(() =>
  import("./pages/CareerOpportunities/CareerOpportunities.js")
);
const BusinessValuation = lazy(() =>
  import("./pages/BusinessValuation/BusinessValuation")
);
const FAQ = lazy(() => import("./pages/FAQ"));
const Services = lazy(() => import("./pages/Services"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Listing = lazy(() => import("./pages/Listing/Listing"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const PreferedBusinessForm = lazy(() => import("./pages/PreferedBusinessForm"));
const NDAForm = lazy(() => import("./pages/NDAForm"));
const TeamFolder = lazy(() => import("./pages/TeamFolder"));
const ViewTeamFolderDetail = lazy(() =>
  import("./pages/TeamFolder/ViewTeamFolderDetail")
);

// After Login Routes

const ListingDetail = lazy(() => import("./pages/ListingDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Calendar = lazy(() => import("./pages/Calendar"));
const MyListing = lazy(() => import("./pages/MyListing"));
const InquiredListings = lazy(() => import("./pages/InquiredListings"));
const Messages = lazy(() => import("./pages/Messages"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LottieLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
    <Lottie
      style={{
        width: "30%",
        height: "30%",
      }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
      loop={true}
      autoplay={true}
      animationData={startLoader}
    />
  </div>
);

function App() {
  const { accessToken, isLogin, user, fcmToken } = useSelector(
    (state) => state?.authReducer
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const socket = useRef(null);

  const logout = async () => {
    socket.current = io(apiUrl);
    socket.current.emit("logout", { _id: user?._id, fcmToken });
    await dispatch(signOutRequest());
  };

  const getMe = async () => {
    const url = BaseURL("users/profile");
    const response = await Get(url, accessToken, false, async (e) => {
      if (e?.response?.status == 401) {
        await logout();
        toast.error("Your account has been DeActivated by the admin");
      }
    });
    if (response !== undefined) {
      await dispatch(updateUser(response?.data?.data));
    }
  };

  const setCmsData = (response) => {
    const res = response?.data?.data;

    if (res !== undefined) {
      dispatch(
        setAllCmsData({
          home: res?.find((item) => item?.pageName == "home"),
          about: res?.find((item) => item?.pageName == "about"),
          buyAbusiness: res?.find((item) => item?.pageName == "listing"),
          sellYourBusiness: res?.find(
            (item) => item?.pageName == "sellYourBusiness"
          ),
          footer: res?.find((item) => item?.pageName == "footer"),
          services: res?.find((item) => item?.pageName == "services"),
          contactUs: res?.find((item) => item?.pageName == "contact"),
          careers: res?.find((item) => item?.pageName == "careerOpportunities"),
          faqs: res?.find((item) => item?.pageName == "faqs"),
        })
      );
    }
  };

  async function setAllDataIntoRedux() {
    const [categories, resData] = await Promise.all([
      Get(BaseURL("categories"), null, false),
      Get(BaseURL("cms/page/all/new?all=true")),
    ]);

    if (categories?.data !== undefined) {
      dispatch(setAllCategories(categories?.data));
    }
    if (resData?.data !== undefined) {
      setCmsData(resData);
    }
    setLoading(false);
  }

  useEffect(() => {
    // getToken();
    setAllDataIntoRedux();
    if (isLogin) {
      getMe();
    }
  }, []);

  if (loading) {
    return <LottieLoader />;
  }

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LottieLoader />}>
          <Routes>
            {/* Before Login Routes */}
            <Route path="/" exact element={<LandingPage />} />

            <Route path="/buy-a-business" exact element={<Listing />} />
            <Route path="/about" exact element={<AboutUs />} />
            <Route path="/sell-business" exact element={<SellBusiness />} />
            <Route path="/careers" exact element={<CareerOpportunities />} />
            <Route
              path="/prefered-business-valuation"
              exact
              element={<PreferedBusinessForm />}
            />
            <Route
              path="/free-business-valuation"
              exact
              element={<BusinessValuation />}
            />
            <Route path="/services" exact element={<Services />} />
            <Route path="/faq" exact element={<FAQ />} />
            <Route path="/contact-us" exact element={<ContactUs />} />

            {/* Before Login Routes */}

            {/* After Login Routes */}
            <Route
              path="/dashboard"
              exact
              element={<ProtectedRouter element={<Dashboard />} />}
            />
            <Route
              path="/calendar"
              exact
              element={<ProtectedRouter element={<Calendar />} />}
            />
            <Route
              path="/my-listing"
              exact
              element={<ProtectedRouter element={<MyListing />} />}
            />
            {/* NDA Form */}
            <Route path="/sign-nda" exact element={<NDAForm />} />

            <Route
              path="/inquired-listing"
              exact
              element={<ProtectedRouter element={<InquiredListings />} />}
            />

            <Route
              path="/buy-a-business/:id"
              exact
              element={<ProtectedRouter element={<ListingDetail />} />}
            />

            <Route
              path="/team-folder"
              exact
              element={<ProtectedRouter element={<TeamFolder />} />}
            />
            <Route
              path="/team-folder/:id"
              exact
              element={<ProtectedRouter element={<ViewTeamFolderDetail />} />}
            />
            <Route
              path="/messages"
              exact
              element={<ProtectedRouter element={<Messages />} />}
            />
            <Route
              path="/update-profile"
              exact
              element={<ProtectedRouter element={<EditProfile />} />}
            />
            <Route
              path="/update-password"
              exact
              element={<ProtectedRouter element={<UpdatePassword />} />}
            />

            <Route path="*" element={<NotFound />} />

            {/* After Login Routes */}
          </Routes>
          <SupportChat />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
