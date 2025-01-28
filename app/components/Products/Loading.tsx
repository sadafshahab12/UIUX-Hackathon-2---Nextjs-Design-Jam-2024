import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  const card = Array.from({ length: 8 });
  return (
    <>

      {card.map((_, index) => (
        <div
          key={index}
          className="lg:w-[285px] md:w-[350px] sm:w-[300px] w:[250px] min-h-[30rem] space-y-2 bg-slate-100 p-2 rounded-md"
        >
          <div>
            <Skeleton className="w-full lg:h-[301px] md:h-[350px] h-[250px]  " />
          </div>

          <div className="h-[8.5rem]  w-full space-y-3">
            <Skeleton className=" h-10 w-full" />
            <Skeleton className="h-0 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}

    </>
  );
};

export default Loading;
