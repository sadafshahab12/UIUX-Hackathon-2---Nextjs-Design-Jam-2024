import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { poppins } from "@/app/fonts/font";
const MyPagination = () => {
  return (
    <>
      <div className={`${poppins.className} `}>
        <Pagination>
          <PaginationContent className="flex-center sm:gap-7 gap-4">
            <PaginationItem>
              <PaginationLink
                href="#"
                className={` text-center sm:rounded-[10px] rounded-[5px] sm:px-6 px-4 sm:py-6 py-4 sm:text-18  text-16 font-light border-none`}
                isActive
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className=" bg-[#F9F1E7] *:text-center sm:rounded-[10px] rounded-[5px] sm:px-6 px-4 sm:py-6 py-4 sm:text-18  text-16 font-light border-none"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className=" bg-[#F9F1E7] *:text-center sm:rounded-[10px] rounded-[5px] sm:px-6 px-4 sm:py-6 py-4 sm:text-18  text-16 font-light border-none"
              >
                3
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                className=" bg-[#F9F1E7] *:text-center sm:rounded-[10px] rounded-[5px] sm:px-6 px-4 sm:py-6 py-4 sm:text-18  text-16 font-light border-none"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default MyPagination;
