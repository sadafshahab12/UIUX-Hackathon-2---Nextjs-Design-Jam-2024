"use client";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/app/type/dataType";
import { useEffect, useState } from "react";
import CardHover from "../ui/CardHover";

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array: ProductType[]) => {
  const shuffledArray = array.slice(); // Copy the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const fetchProductData = async () => {
  const groqQuery = `*[_type == "furniture"]{
    title,tags,
    isNew, 
    availableForRental,
    stock,
    description,
    dicountPercentage,
    "imageUrls": productImage[].asset->url,
    slug,
    isStock,
    price,
    rentalPricePerDay
  }`;
  try {
    const fetch = await client.fetch(groq`${groqQuery}`);
    return fetch;
  } catch (error) {
    console.error(`Error in Fetching home product data : ${error}`);
    return [];
  }
};

const RelatedPro = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductData();
        const shuffledData = shuffleArray(data); // Shuffle the data here
        setProduct(shuffledData);
      } catch (error) {
        console.error(`Error in Fetching data ${error}`);
      }
    };
    getData();
  }, []);

  return (
    <>
      {product.slice(0, 4).map((furniture: ProductType, index: number) => {
        const discountPrice =
          (furniture.price * furniture.dicountPercentage) / 100;
        const discounted = furniture.price - discountPrice;
        return (
          <div
            key={index}
            className="lg:w-[285px] md:w-[350px] sm:w-[300px] w:[250px] relative group transition duration-300 ease-in-out"
          >
            <div className="relative">
              <div className="w-full lg:h-[301px] md:h-[350px] h-[250px] cursor-pointer">
                <Image
                  src={furniture.imageUrls[0]}
                  alt="RP-img"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              {(furniture.isNew || furniture.dicountPercentage > 0) && (
                <div
                  className={`discount sm:h-[3rem] h-[2.5rem] sm:w-[3rem] w-[2.5rem] rounded-full flex-center text-white absolute top-3 right-5 ${furniture.isNew === true ? "bg-[#2EC1AC]" : "bg-[#E97171]"}`}
                >
                  <p className="sm:text-14 text-12">
                    {furniture.isNew
                      ? "New"
                      : `${furniture.dicountPercentage}%`}
                  </p>
                </div>
              )}
            </div>
            <div className="content bg-[#F4F5F7] py-3 px-5 space-y-3 h-[8.5rem]">
              <h1 className="md:text-18 text-14 font-semibold">
                {furniture.title}
              </h1>
              <div className="flex-between">
                <p className="sm:text-16 text-14 font-medium">{discounted}</p>
                <p className="sm:text-14 text-14 text-gray line-through">
                  {!furniture.isNew && furniture.dicountPercentage > 0
                    ? furniture.price
                    : ""}
                </p>
              </div>
              <div className="flex-between">
                <p
                  className={`text-10 bg-gradient-to-br from-slate-800 to-black text-white py-1 px-3 rounded-xl ${furniture.availableForRental === true ? "inline" : "hidden"}`}
                >
                  {furniture.availableForRental === true
                    ? "Available for Rent"
                    : ""}
                </p>
                <p
                  className={`text-12 ${furniture.isStock ? "text-green-700" : "text-red-500"}`}
                >
                  {furniture.isStock
                    ? `Stock : ${furniture.stock}`
                    : "Out of Stock"}
                </p>
              </div>
            </div>
            <CardHover slug={furniture.slug.current} />
          </div>
        );
      })}
    </>
  );
};

export default RelatedPro;
