import Image from "next/image";
import React from "react";

const Range = () => {
  return (
    <>
      <div className="range-img flex-center flex-wrap sm:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center justify-self-center lg:gap-20 sm:gap-14 gap-10   pt-8">
        <div>
          <div className="lg:w-[380px] sm:w-[320px] xs:w-[450px] xss:w-[330px] w-[280px] lg:h-[480px] md:h-[450px] xss:h-[430px] h-[300px] rounded-[10px]">
            <Image
              src="/browserange/pic1.png"
              alt="range-img"
              width={500}
              height={800}
              className="w-full h-full object-cover object-center rounded-[10px]"
            />
          </div>
          <p className="md:text-22 text-20 font-semibold md:pt-5 pt-2 text-center rounded-[10px]">
            Dining
          </p>
        </div>
        <div>
          <div className="lg:w-[380px] sm:w-[320px] xs:w-[450px] xss:w-[330px] w-[280px] lg:h-[480px] md:h-[450px] xss:h-[430px] h-[300px] rounded-[10px]">
            <Image
              src="/browserange/pic2.png"
              alt="range-img"
              width={500}
              height={800}
              className="w-full h-full object-cover object-center rounded-[10px]"
            />
          </div>
          <p className="md:text-22 text-20 font-semibold md:pt-5 pt-2 text-center rounded-[10px]">
            Living
          </p>
        </div>
        <div>
          <div className="lg:w-[380px] sm:w-[320px] xs:w-[450px] xss:w-[330px] w-[280px] lg:h-[480px] md:h-[450px] xss:h-[430px] h-[300px] rounded-[10px]">
            <Image
              src="/browserange/pic3.png"
              alt="range-img"
              width={500}
              height={800}
              className="w-full h-full object-cover object-center rounded-[10px]"
            />
          </div>
          <p className="md:text-22 text-20 font-semibold md:pt-5 pt-2 text-center rounded-[10px]">
            Bedroom
          </p>
        </div>
      </div>
    </>
  );
};

export default Range;
