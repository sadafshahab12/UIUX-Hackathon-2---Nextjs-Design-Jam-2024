import { poppins } from "@/app/fonts/font";
import Image from "next/image";
import React from "react";
import { TPostCard } from "@/app/fonts/interface";
const PostCard = ({ postImg, postTitle }: TPostCard) => {
  return (
    <>
      <div
        className={`${poppins.className} grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 items-center lg:gap-7 gap-2`}
      >
        <div className="post-img w-[80px] h-[80px] xs:justify-self-start justify-self-center rounded-lg">
          <Image
            src={postImg}
            alt="post-img"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
          />
        </div>
        <div className="post-content lg:col-span-1 sm:col-span-3 xs:col-span-2  lg:space-y-3 space-y-2 cursor-pointer">
          <h1 className="text-[14px] font-medium">{postTitle}</h1>
          <p className="date text-gray text-[12px]">03 Aug 2022</p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
