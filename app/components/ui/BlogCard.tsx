import { poppins } from "@/app/fonts/font";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TBlogCard } from "@/app/fonts/interface";
const BlogCard = ({ cardImg, cardTitle, iconTag }: TBlogCard) => {
  return (
    <div className={`${poppins.className} space-y-4`}>
      <div className="image  md:rounded-[10px] rounded-[5px]">
        <Image
          src={cardImg}
          alt="blog-img"
          width={500}
          height={500}
          className="lg:w-[817px] w-[800px] lg:h-[500px] sm:h-[400px] h-[300px] object-cover  rounded-[10px]"
        />
      </div>
      <div className="blog-icon flex-no-center gap-7 ">
        <div className="flex-no-center gap-2">
          <Image
            src="/blog-icon/dashicons_admin-users.png"
            alt="blog-img"
            width={500}
            height={300}
            className="ld:w-[20px] w-[16px] lg:h-[20px] h-[16px] object-cover"
          />
          <p className="lg:text-16 text-14 text-gray">Admin</p>
        </div>
        <div className="flex-no-center gap-2">
          <Image
            src="/blog-icon/uis_calender.png"
            alt="blog-img"
            width={500}
            height={300}
            className="w-[20px] h-[20px] object-cover"
          />
          <p className="lg:text-16 text-14 text-gray">14 Oct 2022</p>
        </div>
        <div className="flex-no-center gap-2">
          <Image
            src="/blog-icon/ci_tag.png"
            alt="blog-img"
            width={500}
            height={300}
            className="w-[20px] h-[20px] object-cover"
          />
          <p className="lg:text-16 text-14 text-gray">{iconTag}</p>
        </div>
      </div>
      <div className="content space-y-2">
        <h1 className="lg:text-28 text-24 font-semibold">{cardTitle}</h1>
        <p className="text-gray lg:text-[15px] text-12 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris
          vitae ultricies leo integer malesuada nunc. In nulla posuere
          sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices
          mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis
          molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit
          libero. Pellentesque elit ullamcorper dignissim cras tincidunt.
          Pharetra et ultrices neque ornare aenean euismod elementum.
        </p>
        <Button variant="link" className="underline">
          Read More
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
