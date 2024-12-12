import React from "react";
import CheckOutCard from "./CheckOutCard";

const Properties = () => {
  return (
    <>
      <div className="properties bg-[#FAF3EA] flex-center  md:h-[270px] xs:h-[220px] h-[350px]">
        <div className="grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1  lg:gap-5 sm:gap-14 gap-8 lg:justify-items-center justify-items-start ">
          <CheckOutCard
            src="/checkouticon/trophy 1.png"
            title="High Quality"
            tag="crafted from top materials"
          />
          <CheckOutCard
            src="/checkouticon/guarantee.png"
            title="Warranty Protection"
            tag="Over 2 years"
          />
          <CheckOutCard
            src="/checkouticon/Vector.png"
            title="Free Shipping"
            tag="Order over 150 $"
          />
          <CheckOutCard
            src="/checkouticon/customer-support.png"
            title="24 / 7 Support"
            tag="Dedicated support"
          />
        </div>
      </div>
    </>
  );
};

export default Properties;
