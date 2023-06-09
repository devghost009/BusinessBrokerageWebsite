import React from "react";
import styles from "./ListingCard.module.css";
import { Button } from "../../Component/Button/Button";
import { imageUrl } from "../../config/apiUrl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FeaturedListing } from "../../constant/imagePath";
const ListingCard = ({ data, setLogin, showBrokerModal, setBrokerData }) => {
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  const navigate = useNavigate();
  return (
    <div className={[styles.mainCardDiv]}>
      {data?.isFeatured && (
        <div className={styles.featuredImgDiv}>
          <img src={FeaturedListing} alt="..." />
        </div>
      )}
      <div className={styles.listing_card}>
        <div className={styles.ListingCard_img}>
          <img src={`${imageUrl}${data?.dummyImage}`} />
        </div>
        <div className={styles.listing_card_label}>
          <p>{data?.status}</p>
        </div>
        <div className={styles.middle_content}>
          <p className="customPara">{data?.title}</p>
          <h4>${data?.businessOpportunity?.toLocaleString()}</h4>
        </div>
      </div>
      <div className={styles.listing_card_btn}>
        <Button
          label={"DETAILS"}
          onClick={() => {
            if (!isLogin) {
              setLogin(true);
            } else navigate(`/buy-a-business/${data?.slug}`);
          }}
          className={styles.card_btn}
        />
      </div>
    </div>
  );
};

export default ListingCard;
