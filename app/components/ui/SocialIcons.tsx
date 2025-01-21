import Image from "next/image";
import React from "react";

const SocialIcons = () => {
  return (
    <>
      <div className="social-icons flex-no-center gap-4">
        <Image
          src="/social-icon/akar-icons_facebook-fill.png"
          alt="social-icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Image
          src="/social-icon/akar-icons_linkedin-box-fill.png"
          alt="social-icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Image
          src="/social-icon/ant-design_twitter-circle-filled.png"
          alt="social-icon"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default SocialIcons;
