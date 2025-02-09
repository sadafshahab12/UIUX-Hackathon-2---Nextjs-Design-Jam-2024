"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { CountContext, ProductType, SlugType } from "@/app/type/dataType";
import { CiSquarePlus } from "react-icons/ci";
import CustomerReview from "@/app/components/ui/CustomerReview";
import { CiSquareMinus } from "react-icons/ci";
import { ProductContext } from "@/app/components/context/ProductContext";
import SocialIcons from "@/app/components/ui/SocialIcons";
import RelatedPro from "@/app/components/Products/RelatedPro";
import LoadingPage from "../loading";
import Errpage from "../errpage";

const SingleProduct = () => {
  const router = useRouter();
  const { slug }: SlugType = useParams();
  const {
    count,
    countDecrement,
    countIncrement,
    addToCart,
    handleAddToWishlist,
  } = useContext(ProductContext) as CountContext;
  const [singleProduct, setSingleProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImgIndex, setSelectImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();

  // State variables for rental functionality
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");

  // Handlers for rental date changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentalStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentalEndDate(e.target.value);
  };

  // Helper function to calculate rental days
  const calculateRentalDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    if (diffTime < 0) return 0; // invalid date range
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function to calculate the total rental price
  const calculateRentalPrice = (
    start: string,
    end: string,
    rentalPricePerDay: number
  ) => {
    const days = calculateRentalDays(start, end);
    return days * rentalPricePerDay;
  };

  // Handler for adding a rental product to the cart

  useEffect(() => {
    const fetchSingleProductData = async () => {
      try {
        if (slug) {
          const groqQuery = `*[_type == "furniture"]{
            _id,
            title,
            tags,
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
          const fetchedData = await client.fetch(groq`${groqQuery}`);
          const findProduct = fetchedData.find(
            (singleProductData: ProductType) =>
              singleProductData.slug.current === slug
          );
          if (findProduct) {
            setSingleProduct([findProduct]);
          } else {
            setSingleProduct([]);
          }
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
        setError(
          "We're really sorry, but we couldn't find the product you were looking for."
        );
      } finally {
        setTimeout(() => {
          setLoading(false); // After 5 seconds, stop loading
        }, 1500);
      }
    };
    fetchSingleProductData();
  }, [slug]);

  const handleAddToCartRental = (product: ProductType) => {
    const rentalDays = calculateRentalDays(rentalStartDate, rentalEndDate);

    if (rentalDays <= 0) {
      alert("Please select a valid rental period.");
      return;
    }

    const totalRentalPrice = calculateRentalPrice(
      rentalStartDate,
      rentalEndDate,
      product.rentalPricePerDay ?? 0
    );

    // Create a rental product object with the necessary data
    const rentalProduct = {
      id: product._id, // Send the product ID
      title: product.title,
      rental: {
        startDate: rentalStartDate,
        endDate: rentalEndDate,
        totalDays: rentalDays,
        totalPrice: totalRentalPrice,
      },
      isRental: true,
      imageUrls: product.imageUrls, // Add the imageUrls here
      rentalPricePerDay: product.rentalPricePerDay,
      quantity: count, // Add the quantity here
    };

    // Convert the rentalProduct object into a JSON string and encode it for the URL
    const queryString = new URLSearchParams({
      product: JSON.stringify(rentalProduct), // Send the entire object as a string
    }).toString();

    // Navigate to the rental cart page with the rentalProduct data in the query string
    router.push(`/rental-cart?${queryString}`);
  };

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return <Errpage error={error} />;
  }

  return (
    <>
      {singleProduct.map((singleFurniture: ProductType, index: number) => {
        const discountPrice =
          (singleFurniture.price * singleFurniture.dicountPercentage) / 100;
        const discountedPrice = singleFurniture.price - discountPrice;

        const titleCase =
          singleFurniture.tags[0].charAt(0).toUpperCase() +
          singleFurniture.tags[0].slice(1).toLowerCase();
        const titleCaseArray = (tag: string) => {
          return tag
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("");
        };
        return (
          <div key={index} className="md:mt-[5rem] xs:mt-[4rem] mt-[3.8rem]">
            {/* Breadcrumbs */}
            <div>
              <ul className="flex-no-center sm:gap-7 xs:gap-5 gap-3 bg-[#F9F1E7] py-5 sm:px-24 xs:px-12 xss:px-5 px-3">
                <li>
                  <Link
                    href="/"
                    className="font-medium text-gray sm:text-16 text-14"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    width={10}
                    height={10}
                  />
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="font-light text-gray sm:text-16 text-14"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    width={10}
                    height={10}
                  />
                </li>
                <li>|</li>
                <li className="sm:text-16 text-14">{singleFurniture.title}</li>
              </ul>
            </div>

            {/* Main Product View */}
            <div className="product-view lg:py-10 py-8 lg:px-14 sm:px-8 xs:px-10 px-5 flex md:flex-row flex-col gap-5 ">
              {/* Product Images */}
              <div className="part1 flex sm:flex-row flex-col-reverse gap-4 md:justify-self-auto justify-self-center">
                <div className="img-col1 lg:space-y-5 sm:space-y-3 space-y-0 sm:block flex-center sm:gap-4 gap-3">
                  {singleFurniture.imageUrls
                    .slice(0, 4)
                    .map((url: string, index: number) => (
                      <div
                        key={index}
                        className={`md:w-[100px] sm:w-[80px] xs:w-[100px] xss:w-[70px] w-[60px] md:h-[100px] sm:h-[80px] xs:h-[100px] xss:h-[70px] h-[60px] p-1 sm:rounded-[10px] rounded-[8px] cursor-pointer border border-slate-800 ${
                          index === selectedImgIndex
                            ? "border-2 border-[#B88E2F]"
                            : "bg-[#F9F1E7]"
                        }`}
                        onClick={() => setSelectImageIndex(index)}
                      >
                        <Image
                          src={url}
                          alt={`Image of ${singleFurniture.title}`}
                          width={500}
                          height={500}
                          className="w-full h-full object-contain sm:rounded-[8px] rounded-[6px]"
                          loading="lazy"
                        />
                      </div>
                    ))}
                </div>

                <div className="img-col2">
                  <div className="bg-[#B88E2F] lg:w-[480px] md:w-[350px] sm:w-[500px] w-full lg:h-[500px] md:h-[440px] xs:h-[400px] xss:h-[300px] h-[200px] cursor-pointer rounded-[10px] p-2">
                    <Image
                      src={singleFurniture.imageUrls[selectedImgIndex]}
                      width={500}
                      height={500}
                      alt="img"
                      className="w-full h-full object-cover rounded-[8px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="part2 md:space-y-4 space-y-2">
                <h1 className="lg:text-42 xs:text-38 xss:text-30 text-28 font-semibold">
                  {singleFurniture.title}
                </h1>
                <div className="flex-no-center gap-10">
                  <p className="discounted-price lg:text-22 sm:text-18 text-16 text-slate-700">
                    ${discountedPrice}
                  </p>
                  <p className="original-price sm:text-14 text-12 text-gray-400 line-through">
                    {`${!singleFurniture.isNew && singleFurniture.dicountPercentage > 0 ? `$${singleFurniture.price}` : ""}`}
                  </p>
                </div>
                <div>
                  <p
                    className={`${singleFurniture.isStock ? "text-green-700" : "text-red-500"}`}
                  >
                    {singleFurniture.isStock
                      ? `Stock : ${singleFurniture.stock}`
                      : "Out of Stock"}
                  </p>
                </div>

                <CustomerReview />

                <div className="flex-between sm:flex-row flex-col gap-4 w-full">
                  <p
                    className={`${singleFurniture.availableForRental ? "inline" : "hidden"} text-12 bg-gradient-to-br from-slate-800 to-black text-white py-1 px-3 rounded-xl sm:w-auto w-full text-center`}
                  >
                    {singleFurniture.availableForRental === true
                      ? "Available for Rental"
                      : ""}
                  </p>
                  <p
                    className={`text-sm bg-yellow-500 py-1 px-4 rounded-2xl sm:w-auto w-full text-center ${singleFurniture.rentalPricePerDay ? "block" : "hidden"}`}
                  >
                    Rental Price: ${singleFurniture.rentalPricePerDay}
                  </p>
                </div>

                <div>
                  <p className="lg:text-14 sm:text-12 text-10 lg:leading-7 sm:leading-6 leading-5 text-justify">
                    {singleFurniture.description}
                  </p>
                </div>

                {/* Purchase Buttons */}
                <div className="buttons grid xss:grid-cols-3 grid-cols-2 lg:gap-5 gap-3 pt-4 w-full">
                  <div className="flex-center gap-4 border border-slate-800 p-2 rounded-md w-full">
                    <button onClick={countDecrement}>
                      <CiSquareMinus className="lg:w-8 w-6 lg:h-8 h-6" />
                    </button>
                    <p>{count}</p>
                    <button onClick={countIncrement}>
                      <CiSquarePlus className="lg:w-8 w-6 lg:h-8 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(singleFurniture, count)}
                    className="border border-slate-800 py-3 lg:px-4 px-2 rounded-md lg:text-16 md:text-14 text-12 w-full"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() => handleAddToWishlist(singleFurniture, count)}
                    className="border border-slate-800 py-3 lg:px-4 px-2 rounded-md lg:text-16 md:text-14 text-12 w-full xss:col-auto col-span-2"
                  >
                    Add to WishList
                  </button>
                </div>
                <div className="py-8">
                  {/* Rental Options (Shown only if availableForRental is true) */}
                  {singleFurniture.availableForRental && (
                    <div className="rental-options p-4 border border-slate-800  rounded-md">
                      <h3 className="sm:text-lg text-14 font-semibold mb-4">
                        Rent This Product
                      </h3>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm">Rental Start Date: </label>
                        <input
                          type="date"
                          value={rentalStartDate}
                          onChange={handleStartDateChange}
                          className="border border-slate-800  p-2 rounded-md w-full md:text-lg text-14"
                        />

                        <label className="text-sm">Rental End Date: </label>
                        <input
                          type="date"
                          value={rentalEndDate}
                          onChange={handleEndDateChange}
                          className="border border-slate-800  p-2 rounded-md w-full md:text-lg text-14"
                        />
                      </div>
                      <div className="md:mt-10 mt-5 sm:text-lg text-14  flex sm:flex-row flex-col gap-4 justify-between">
                        <p>
                          Total Rental Days:{" "}
                          {calculateRentalDays(rentalStartDate, rentalEndDate)}
                        </p>
                        <p>
                          Total Rental Price: $
                          {calculateRentalPrice(
                            rentalStartDate,
                            rentalEndDate,
                            singleFurniture.rentalPricePerDay ?? 0
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCartRental(singleFurniture)}
                        className="mt-3 border  bg-yellow-500 py-2 px-4 rounded-md text-14 w-full"
                      >
                        Rent Now
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-400 lg:py-5 py-3"></div>
                <div className="text-16 text-gray grid grid-cols-[1fr_1fr_5fr] mt-5">
                  <div className="lg:space-y-4 space-y-2 lg:text-16 text-14 grid">
                    <li className="list-none">SKU</li>
                    <li className="list-none">Tags</li>
                    <li className="list-none">Category</li>
                    <li className="list-none">Share</li>
                  </div>
                  <div className="lg:space-y-4 space-y-2 justify-items-center">
                    <li className="list-none">:</li>
                    <li className="list-none">:</li>
                    <li className="list-none">:</li>
                    <li className="list-none">:</li>
                  </div>
                  <div className="lg:space-y-4 space-y-3 lg:text-16 text-14">
                    <li className="list-none">SS001</li>
                    <li className="list-none">{titleCase}</li>
                    <div className="flex-no-center gap-2">
                      {singleFurniture.tags
                        .slice(1)
                        .map((tag: string, index: number) => (
                          <li key={index} className="list-none">
                            {titleCaseArray(tag)}
                            {index < singleFurniture.tags.length - 2 && ","}
                          </li>
                        ))}
                    </div>
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-b border-gray-400 lg:my-8 my-4"></div>
            <div className="lg:px-[10rem] sm:px-[4rem] xss:px-[2rem] px-[1.5rem] xs:space-y-7 space-y-3">
              <div className="flex-center xs:flex-row flex-col lg:gap-10 xs:gap-8 gap-2">
                <h1 className="lg:text-22 text-18 font-semibold">
                  Description
                </h1>
                <p className="lg:text-22 sm:text-16 text-14 text-gray">
                  Additional Information
                </p>
                <p className="lg:text-22 sm:text-16 text-14 text-gray">
                  Reviews [5]
                </p>
              </div>
              <div className="lg:text-16 xss:text-14 text-12 text-gray leading-6">
                <p className="text-justify">{singleFurniture.description}</p>
              </div>
            </div>

            {/* Additional Images */}
            <div className="images flex-center sm:flex-row flex-col sm:gap-8 gap-4 md:px-[5rem] px-[2rem] py-5">
              {singleFurniture.imageUrls
                .slice(0, 2)
                .map((furniture: string, index: number) => (
                  <div
                    key={index}
                    className="lg:w-[605px] sm:w-[550px] xs:w-[400px] w-[270px] lg:h-[348px] sm:h-[300px] xs:h-[250px] h-[150px] bg-[#fdcf96] rounded-[10px] p-2"
                  >
                    <Image
                      src={furniture}
                      alt="sofa-img"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  </div>
                ))}
            </div>

            <div className="border-b border-gray-400 sm:my-5 my-2"></div>

            {/* Related Products */}
            <div className="lg:p-10 p-5">
              <h1 className="sm:text-34 xss:text-28 text-24 font-semibold text-center pb-5">
                Related Products
              </h1>
              <div className="RP-card grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:justify-items-start sm:justify-items-center justify-items-stretch gap-4">
                <RelatedPro />
              </div>
              <div className="button text-center mt-10">
                <Button
                  variant={"outline"}
                  className="rounded-none border border-[#B88E2F] font-semibold text-16 px-10 text-[#B88E2F] hover:text-[#d6a637] transition duration-300"
                  onClick={() => route.push("/shop")}
                >
                  Show More
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleProduct;
