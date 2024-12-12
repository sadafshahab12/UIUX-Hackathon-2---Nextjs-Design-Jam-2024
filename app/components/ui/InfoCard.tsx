import React from "react";
import { TInfoCard } from "@/app/fonts/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { poppins } from "@/app/fonts/font";
const InfoCard = ({ icon, title, info }: TInfoCard) => {
  return (
    <div className={`${poppins.className} flex sm:gap-5 gap-2`}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} width={20} height={20} />
      </div>
      <div className="info p-4">
        <h1 className="lg:text-20 xss:text-18 text-16 font-semibold">
          {title}
        </h1>
        <p className="lg:text-16 xss:text-14 text-12">{info}</p>
      </div>
    </div>
  );
};

export default InfoCard;
