"use client"
import {
  faChevronRight,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { poppins } from "../fonts/font";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RelatedProductCard from "../components/ui/RelatedProductCard";
import { useRouter } from "next/navigation";

const SingleProduct = () => {
  const route = useRouter();

  return (
    <>
      <div className={` ${poppins.className} md:mt-[5rem] xs:mt-[4rem] mt-[3.8rem]`}>
        <div>
          <ul className="flex-no-center sm:gap-7 xs:gap-5 gap-3 bg-[#F9F1E7] py-5 sm:px-24 xs:px-12 xss:px-5 px-3">
            <li>
              <Link href="/" className="font-medium text-gray sm:text-16 text-14">
                Home
              </Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faChevronRight} width={10} height={10} />
            </li>
            <li>
              <Link href="/shop" className="font-light text-gray sm:text-16 text-14">
                Shop
              </Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faChevronRight} width={10} height={10} />
            </li>
            <li>|</li>
            <li className="sm:text-16 text-14">Asgaard sofa</li>
          </ul>
        </div>
        <div className="product-view lg:py-10 py-8 lg:px-14 sm:px-8 xs:px-10 px-5 grid md:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 ">
          <div className="part1 flex sm:flex-row flex-col-reverse gap-4 md:justify-self-auto justify-self-center ">
            <div className="img-col1 lg:space-y-5 sm:space-y-3 space-y-0 sm:block flex-center  flex-wrap gap-4">
              <div className="md:w-[100px] sm:w-[80px] w-[120px] md:h-[100px] sm:h-[80px] h-[120px] p-2 rounded-[10px] bg-[#F9F1E7] cursor-pointer">
                <Image
                  src="/single-product/sp1.png"
                  alt="product-img"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:w-[100px] sm:w-[80px] w-[120px] md:h-[100px] sm:h-[80px] h-[120px] p-2 rounded-[10px] bg-[#F9F1E7] cursor-pointer">
                <Image
                  src="/single-product/sp2.png"
                  alt="product-img"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:w-[100px] sm:w-[80px] w-[120px] md:h-[100px] sm:h-[80px] h-[120px] p-2 rounded-[10px] bg-[#F9F1E7] cursor-pointer">
                <Image
                  src="/single-product/sp3.png"
                  alt="product-img"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:w-[100px] sm:w-[80px] w-[120px] md:h-[100px] sm:h-[80px] h-[120px] p-2 rounded-[10px] bg-[#F9F1E7] cursor-pointer">
                <Image
                  src="/single-product/sp4.png"
                  alt="product-img"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="img-col2">
              <div className="bg-[#F9F1E7] lg:w-[425px] md:w-[350px] sm:w-[500px] w-full lg:h-[500px] md:h-[440px] xs:h-[400px] xss:h-[300px] h-[200px] cursor-pointer rounded-[10px]">
                <Image
                  src="/single-product/sp5.png"
                  width={500}
                  height={500}
                  alt="img"
                  className="w-full h-full object-contain sm:object-bottom object-center"
                />
              </div>
            </div>
          </div>
          <div className="part2  sm:space-y-4 space-y-2 lg:ml-20 sm:ml-14 ml-0">
            <h1 className="lg:text-42 xs:text-38 xss:text-34 text-32 font-semibold">Asgaard sofa</h1>
            <p className="lg:text-22 sm:text-18 text-16 text-gray">Rs. 250,000.00</p>
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
            <div>
              <p className="lg:text-16 sm:text-14 text-12 sm:text-left text-justify">
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
              </p>
            </div>
            <div className="size space-y-4">
              <p className="text-[14px] text-gray ">Size</p>
              <div>
                <ul className="flex-no-center gap-4">
                  <li className="p-3 bg-[#B88E2F] text-[13px] rounded-[5px] lg:w-[2.5rem] w-[2rem] lg:h-[2.5rem] h-[2rem] flex-center">
                    L
                  </li>
                  <li className="p-3 bg-[#F9F1E7] text-[13px] rounded-[5px] lg:w-[2.5rem] w-[2rem] lg:h-[2.5rem] h-[2rem] flex-center">
                    XL
                  </li>
                  <li className="p-3 bg-[#F9F1E7] text-[13px] rounded-[5px] lg:w-[2.5rem] w-[2rem] lg:h-[2.5rem] h-[2rem] flex-center">
                    XS
                  </li>
                </ul>
              </div>
            </div>
            <div className="color space-y-4">
              <p className="text-14 text-gray">Color</p>
              <div className="flex-no-center gap-4">
                <p className="rounded-full bg-[#816DFA] lg:h-[30px] h-[25px] lg:w-[30px] w-[25px]"></p>
                <p className="rounded-full bg-black h-[25px] lg:w-[30px] w-[25px]"></p>
                <p className="rounded-full bg-[#B88E2F] h-[25px] lg:w-[30px] w-[25px]"></p>
              </div>
            </div>
            <div className="buttons flex-no-center xss:flex-row flex-col lg:gap-5 gap-3 pt-4">
              <Button
                variant={"outline"}
                className="border border-[#9F9F9F] lg:py-7 py-5 px-2 xs:rounded-[10px] rounded-[5px]  text-18 xss:w-auto w-full"
              >
                <div className="flex-no-center lg:gap-7 xss:gap-4 gap-10">
                  <p>-</p>
                  <p>1</p>
                  <p>+</p>
                </div>
              </Button>
              <Button
                className="border border-black lg:py-7 py-5 lg:px-10 sm:px-5 px-3 xs:rounded-[10px] rounded-[5px] ] text-18 xss:w-auto w-full"
                variant={"outline"}
                onClick={()=> route.push("/cart") }
              >
                Add To Cart
              </Button>
              <Button
                className="border border-black lg:py-7 py-5 lg:px-10 px-5 xs:rounded-[10px] rounded-[5px] text-18 xss:w-auto w-full"
                variant={"outline"}
                onClick={()=> route.push("/productcomparison")}
              >
                + Compare
              </Button>
            </div>
            <div className="border-b border-gray-400 lg:py-5 py-3"></div>
            <div className="text-16 text-gray grid grid-cols-[1fr_1fr_5fr] mt-5">
              <div className="lg:space-y-4 space-y-2 lg:text-16 text-14 grid">
                <p>SKU</p>
                <p>Tags</p>
                <p>Category</p>
                <p>Share</p>
              </div>
              <div className="lg:space-y-4 space-y-2 justify-items-center">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="lg:space-y-4 space-y-3 lg:text-16 text-14">
                <p>SS001</p>
                <p>Sofas</p>
                <p>Sofa, Chair, Home, Shop</p>
                <div className="social-icons flex-no-center gap-4">
                  <Image
                    src="/social-icon/akar-icons_facebook-fill.png"
                    alt="social-icon"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/social-icon/akar-icons_linkedin-box-fill.png"
                    alt="social-icon"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/social-icon/ant-design_twitter-circle-filled.png"
                    alt="social-icon"
                    width={22}
                    height={22}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-400 lg:my-8 my-4 "></div>
        <div className="lg:px-[10rem] sm:px-[4rem] xss:px-[2rem] px-[1.5rem] xs:space-y-7 space-y-3">
          <div className="flex-center xs:flex-row flex-col lg:gap-10 xs:gap-8 gap-2">
            <h1 className="lg:text-22 text-18 font-semibold">Description</h1>
            <p className="lg:text-22 sm:text-16 text-14 text-gray">Additional Information</p>
            <p className="lg:text-22 sm:text-16 text-14 text-gray">Reviews [5]</p>
          </div>
          <div className="lg:text-16 xss:text-14 text-12 text-gray space-y-4 ">
            <p className="text-justify">
              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
              portable active stereo speaker takes the unmistakable look and
              sound of Marshall, unplugs the chords, and takes the show on the
              road.
            </p>
            <p className="text-justify">
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of
              vintage styled engineering. Setting the bar as one of the loudest
              speakers in its class, the Kilburn is a compact, stout-hearted
              hero with a well-balanced audio which boasts a clear midrange and
              extended highs for a sound that is both articulate and pronounced.
              The analogue knobs allow you to fine tune the controls to your
              personal preferences while the guitar-influenced leather strap
              enables easy and stylish travel.
            </p>
          </div>
        </div>
        <div className="images flex-center sm:flex-row flex-col sm:gap-8 gap-4 md:px-[5rem] px-[2rem] py-5">
          <div className="lg:w-[605px] sm:w-[550px]  xs:w-[400px] w-[270px] lg:h-[348px] sm:h-[300px] xs:h-[250px] h-[150px] bg-[#F9F1E7] rounded-[10px] ">
            <Image
              src="/single-product/sofa1.png"
              alt="sofa-img"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="lg:w-[605px] sm:w-[550px]  xs:w-[400px] w-[270px] lg:h-[348px] sm:h-[300px] xs:h-[250px] h-[150px] bg-[#F9F1E7] rounded-[10px] ">
            <Image
              src="/single-product/sofa2.png"
              alt="sofa-img"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="border-b border-gray-400 sm:my-5 my-2"></div>
        <div className="lg:p-10 p-5">
          <h1 className="sm:text-34 xss:text-28 text-24 font-semibold text-center pb-5">
            Related Products
          </h1>
          <div className="RP-card grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:justify-items-start sm:justify-items-center justify-items-stretch gap-4">
            <RelatedProductCard
              RPImg="/related-produtcs/product1.png"
              productTitle="Syltherine"
              productType="Stylish cafe chair"
              priceWithDiscount="Rp 2.500.000"
              originalPrice="Rp 3.500.000"
              discount="-30%"
            />
            <RelatedProductCard
              RPImg="/related-produtcs/product2.png"
              productTitle="Leviosa"
              productType="Stylish cafe chair"
              priceWithDiscount="Rp 2.500.000"
            />
            <RelatedProductCard
              RPImg="/related-produtcs/product3.png"
              productTitle="Lolito"
              productType="Luxury big sofa"
              priceWithDiscount="Rp 7.000.000"
              originalPrice="Rp 14.000.000"
              discount="-50%"
            />
            <RelatedProductCard
              RPImg="/related-produtcs/product4.jpg"
              productTitle="Respira"
              productType="Outdoor bar table and stool"
              priceWithDiscount="Rp 500.000"
              discount="New"
            />
          </div>
          <div className="button text-center mt-10">
            <Button
              variant={"outline"}
              className="rounded-none border border-[#B88E2F]  font-semibold text-16 px-10 text-[#B88E2F] hover:text-[#d6a637] transition duration-300"
              onClick={()=> route.push("/shop")}
            >
              Show More
            </Button>
          </div>
        </div>
      </div>
 
    </>
  );
};

export default SingleProduct;
