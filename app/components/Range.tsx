import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import { TagType } from "../type/dataType";

const fetchDataByTag = async () => {
  const groqQuery = groq`*[_type == "furniture"] {
    "imageUrls": productImage[].asset->url,
    tags
  }`;
  const fetchData = await client.fetch(groqQuery);
  return fetchData;
};

const Range = async () => {
  const getData = await fetchDataByTag();

  // Filter and limit to 3 items
  const filteredData = getData
    .filter((TagProduct: TagType) => {
      return TagProduct.tags?.some((tag) =>
        ["bed", "living room", "dining table"].includes(tag)
      );
    })
    .slice(1, 4); // Get only the first 3 items

  return (
    <div className="range-img flex-center flex-wrap sm:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center justify-self-center lg:gap-20 sm:gap-14 gap-10 pt-8">
      {filteredData?.map((TagProduct: TagType, index: number) => {
        // Ensure that tags and imageUrls are available
        if (!TagProduct.tags || !TagProduct.imageUrls?.length) return null;

        // Find a matching tag
        const matchedTag = TagProduct.tags.find((tag) =>
          ["bed", "living room", "dining table"].includes(tag)
        );
        if (!matchedTag) return null;

        return (
          <div key={index}>
            <div className="lg:w-[380px] sm:w-[320px] xs:w-[450px] xss:w-[330px] w-[280px] lg:h-[480px] md:h-[450px] xss:h-[430px] h-[300px] rounded-[10px]">
              <Image
                src={TagProduct.imageUrls[1]}
                alt="range-img"
                width={500}
                height={800}
                className="w-full h-full object-cover object-center rounded-[10px]"
              />
            </div>
            <p className="md:text-22 text-20 font-semibold md:pt-5 pt-2 text-center rounded-[10px]">
              {matchedTag}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Range;
