import React from "react";
import { Skeleton } from "@/components/ui/skeleton";  // Import Shadcn UI Skeleton

const SkeletonBox = ({ className }: { className: string }) => {
  return <Skeleton className={className} />;
};

const LoadingPage = () => {
  const skeletonArray = Array.from({ length: 4 });

  return (
    <div className="my-20">
      {/* Navigation Skeleton */}
      <ul className="flex items-center sm:gap-7 xs:gap-5 gap-3 bg-gray-200 py-5 sm:px-24 xs:px-12 xss:px-5 px-3">
        {skeletonArray.map((_, index) => (
          <SkeletonBox key={index} className="w-32 h-8" />
        ))}
      </ul>

      {/* Product View Skeleton */}
      <div className="product-view lg:py-10 py-8 lg:px-14 sm:px-8 xs:px-10 px-5 flex md:flex-row flex-col gap-5">
        {/* Images */}
        <div className="part1 flex sm:flex-row flex-col-reverse gap-4">
          <div className="img-col1 flex sm:flex-col sm:space-y-3 gap-3">
            {skeletonArray.map((_, index) => (
              <SkeletonBox
                key={index}
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] p-1"
              />
            ))}
          </div>
          <SkeletonBox className="lg:w-[480px] w-full lg:h-[500px] h-[200px] p-2" />
        </div>

        {/* Details */}
        <div className="part2 md:space-y-4 space-y-3 w-full">
          <SkeletonBox className="w-full md:h-28 h-12" />
          <div className="flex gap-5">
            <SkeletonBox className="w-1/2 h-6 md:h-12" />
            <SkeletonBox className="w-1/2 h-6 md:h-12" />
          </div>
          <SkeletonBox className="h-6 md:h-12 w-full" />
          {[...Array(7)].map((_, i) => (
            <SkeletonBox key={i} className="h-2 w-full" />
          ))}
          <SkeletonBox className="h-10 w-full" />
          <div className="grid xss:grid-cols-3 grid-cols-2 gap-3">
            {[...Array(3)].map((_, i) => (
              <SkeletonBox key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="lg:px-40 sm:px-16 px-8 space-y-4">
        <SkeletonBox className="h-6 w-full" />
        {[...Array(5)].map((_, i) => (
          <SkeletonBox key={i} className="h-4 w-full" />
        ))}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {skeletonArray.map((_, index) => (
            <SkeletonBox key={index} className="h-60 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
