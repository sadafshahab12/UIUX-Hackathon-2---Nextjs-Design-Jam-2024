import { Button } from "@/components/ui/button";
import React from "react";
import { poppins } from "./fonts/font";
import Range from "./components/Range";
import OurProducts from "./components/OurProducts";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className={`${poppins.className} md:mt-[4rem] mt-[3.8rem]`}>
        <div className="bg-[url('/images/home-bg.jpg')] md:h-[720px] sm:h-[600px] h-[500px] w-full bg-cover bg-no-repeat bg-center flex-no-center  justify-end xs:pr-14 xs:p-0 p-5">
          <div className="bg-[#FFF3E3] md:p-10 p-8 md:space-y-8 space-y-5 md:w-[560px] w-[400px] sm:mt-14 mt-0 rounded-[10px]">
            <div className="space-y-3">
              <p className="md:text-16 text-14 font-semibold">New Arrival</p>
              <h1 className="md:text-[52px] xs:text-40 xss:text-34 text-26 font-bold text-[#B88E2F]">
                Discover Our New Collection
              </h1>
              <p className="md:text-16 xs:text-14 text-10 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
            <div>
              <Button className="bg-[#B88E2F]  md:text-16 text-10 font-bold rounded-none border-none  text-white md:px-14 px-12 md:py-7 py-[1.5rem]">
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
        <div className="range lg:px-20 md:px-12 px-5 ">
          <div className="text-center md:px-10 xs:px-5 px-2  md:pt-10 pt-8 md:pb-5 pb-3">
            <h1 className="md:text-30 xs:text-26 xss:text-24 text-20 font-bold md:pb-5 pb-3">
              Browse The Range
            </h1>
            <p className="md:text-18 xss:text-16 text-14 text-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <Range />
          </div>
          <div>
            <OurProducts />
          </div>
        </div>
        <div className="bg-[#FCF8F3] flex-center lg:flex-row flex-col">
          <div className="content lg:p-5 p-10">
            <h1 className="text-[#3A3A3A] xs:text-38 text-30 font-bold lg:text-left text-center lg:pb-0 pb-3">
              50+ Beautiful rooms inspiration
            </h1>
            <p className="lg:pb-10 pb-5 xs:text-16 text-14 lg:text-left text-center">
              Our designer already made a lot of beautiful prototipe of rooms
              that inspire you
            </p>
            <div className=" lg:text-left text-center">
              <Button className="bg-[#B88E2F]  text-16 font-bold rounded-none border-none  text-white px-12 py-6">
                Explore More
              </Button>
            </div>
          </div>
          <div className="images flex lg:justify-start justify-center gap-4 relative">
            <div className="absolute lg:right-14 right-10 top-[40%] -translate-y-[50%]">
              <div className="bg-white shadow-md rounded-full h-12 w-12 flex-center">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  width={20}
                  height={20}
                  className="text-[#B88E2F] text-[1.5rem] cursor-pointer"
                />
              </div>
            </div>
            <div className="relative">
              <div className="lg:w-[400px] xss:w-full w-[250px] lg:h-[580px] xss:h-[500px] h-[350px] ">
                <Image
                  src="/ad-img/ad1.png"
                  alt="adimg"
                  width={500}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-end absolute lg:bottom-5 bottom-20 left-5">
                <div className="inner-tag bg-[#FFFFFFB8] p-7">
                  <div className=" flex-between">
                    <p className="text-[#616161]">01</p>
                    <p>
                      <Image
                        src="/images/Vector 1.png"
                        alt="line"
                        width={20}
                        height={20}
                      />
                    </p>
                    <p className="text-[#616161]">Bed Room</p>
                  </div>
                  <div>
                    <h1 className="text-26 font-semibold text-[#3A3A3A]">
                      Inner Peace
                    </h1>
                  </div>
                </div>
                <div className="arrow-icon bg-[#B88E2F] text-white py-2 px-3 cursor-pointer">
                  <FontAwesomeIcon icon={faArrowRight} width={20} height={20} />
                </div>
              </div>
            </div>
            <div className="sm:block hidden">
              <div className="lg:w-[372px] w-full lg:h-[486px] h-[450px]">
                <Image
                  src="/ad-img/ad2.png"
                  alt="adimg"
                  width={500}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="dots lg:flex-no-center flex-center gap-4 py-4">
                <div className="border border-[#B88E2F] p-1  rounded-full cursor-pointer">
                  <p className="bg-[#B88E2F]  h-[10px] w-[10px]  rounded-full"></p>
                </div>
                <p className="bg-[#D8D8D8]  h-[10px] w-[10px]  rounded-full cursor-pointer"></p>
                <p className="bg-[#D8D8D8]  h-[10px] w-[10px]  rounded-full cursor-pointer"></p>
                <p className="bg-[#D8D8D8]  h-[10px] w-[10px]  rounded-full cursor-pointer"></p>
              </div>
            </div>
            <div className="md:block hidden">
              <div className="w-[50px] h-[486px]">
                <Image
                  src="/ad-img/ad3.png"
                  alt="adimg"
                  width={500}
                  height={800}
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="setup lg:p-10 p-5">
          <div className="text-center">
            <p className="text-18 font-semibold">Share your setup with</p>
            <h1 className="text-28 font-bold">#FuniroFurniture</h1>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-[11rem_11rem_12rem] md:grid-cols-[11rem_11rem_12rem_9rem] lg:grid-cols-[3rem_18rem_13.75rem_12rem_13rem]  sm:grid-rows-2 gap-5 justify-self-center
          "
          >
            <div className="img lg:block hidden  before: h-[382px] sm:align-bottom self-end">
              <Image
                src="/setup/setup1.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-right object-cover"
              />
            </div>
            <div className="img lg:w-full sm:w-[180px] w-full lg:h-[200px] sm:h-[150px] h-[260px] sm:self-end  ">
              <Image
                src="/setup/setup2.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img lg:w-full lg:h-[300px] sm:w-[180px] sm:h-[250px] h-[260px] row-span-3 sm:self-center">
              <Image
                src="/setup/setup3.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img h-[260px] sm:self-end">
              <Image
                src="/setup/setup4.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img lg:w-full w-[150px] lg:h-[433px] h-[320px] self-end md:block hidden">
              <Image
                src="/setup/setup5.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img  lg:w-[115px] lg:h-[260px] sm:w-[180px] w-full h-[210px]">
              <Image
                src="/setup/setup6.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover object-right"
              />
            </div>
            <div className="img lg:w-[220px] sm:w-[189px] w-full h-[160px] sm:justify-self-end">
              <Image
                src="/setup/setup7.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img lg:w-full w-[150px]  h-[242px] md:block hidden">
              <Image
                src="/setup/setup8.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img lg:block hidden  h-[130px] ">
              <Image
                src="/setup/setup9.png"
                alt="setup"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
