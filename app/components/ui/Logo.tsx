import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/logo.png"
        width={500}
        height={500}
        alt="logo"
        className="w-[50px] h-[32px] object-cover"
      />
    </>
  );
};

export default Logo;
