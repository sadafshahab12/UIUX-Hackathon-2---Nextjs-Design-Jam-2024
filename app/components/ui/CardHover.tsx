import { SlugType } from "@/app/type/dataType";
import { Button } from "@/components/ui/button";
import {
  faArrowRightArrowLeft,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardHover = ({slug}: SlugType) => {
  return (
    <>
      <div className="hover-content absolute top-0 left-0  h-full  hover:bg-[#3A3A3A]  w-full flex-center flex-col opacity-0 hover:opacity-70 transition duration-300 ease-in-out z-10 px-7">
        <div className="button mb-10">
          <Link href={`/single-product/${slug}`}>
            <Button
              className="text-[#B88E2F] bg-white rounded-none px-10"
              variant={"outline"}
            >
              Details
            </Button>
          </Link>
        </div>
        <div className="icons flex-center sm:flex-row flex-col gap-4">
          <div className="flex-center gap-1 text-white cursor-pointer">
            <FontAwesomeIcon icon={faShareNodes} width={20} height={20} />
            <p className="text-[14px]">Share</p>
          </div>
          <Link href="/productcomparison">
            <div className="flex-center gap-1 text-white cursor-pointer">
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                width={20}
                height={20}
              />
              <p className="text-[14px]">Compare</p>
            </div>{" "}
          </Link>
          <div className="flex-center gap-1 text-white cursor-pointer">
            <Image
              src="/images/hovericon.png"
              width={20}
              height={20}
              alt="heart"
            />
            <p className="text-[14px]">Like</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHover;
