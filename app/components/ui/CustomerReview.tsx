import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CustomerReview = () => {
  return (
    <>
      <div className="reviews flex-no-center sm:gap-4 gap-2">
        <div className="star-icons text-[#FFC700] flex-no-center sm:gap-2 gap-1 ">
          <FontAwesomeIcon icon={faStar} width={17} height={17} />
          <FontAwesomeIcon icon={faStar} width={17} height={17} />
          <FontAwesomeIcon icon={faStar} width={17} height={17} />
          <FontAwesomeIcon icon={faStar} width={17} height={17} />
          <FontAwesomeIcon icon={faStarHalf} width={17} height={17} />
        </div>
        <div>
          <p>|</p>
        </div>
        <div>
          <p className="sm:text-[13px] text-12 text-gray">5 Customer Review</p>
        </div>
      </div>
    </>
  );
};

export default CustomerReview;
