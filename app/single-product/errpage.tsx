import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Errpage = ({ error }: {error : string}) => {
  const route = useRouter();

  return (
    <>
      <div className="sm:h-[100vh] h-[80vh] flex-center mt-5 p-5">
        <div className="error-ui text-center flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-4xl font-bold">Oops! 😔</h1>
          <div className="w-[15rem] h-[10rem]">
            <Image
              src="/ErrorImage/error1.jpg"
              alt="error-img"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-red-500 sm:text-lg text-sm">{error}</p>
          <p className="sm:text-lg text-sm">
            Please try refreshing the page. We appreciate your patience! 🌸
          </p>
          <button
            onClick={() => route.push("/shop")}
            className="bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-900 transition ease-in duration-300 sm:text-lg text-sm"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </>
  );
};

export default Errpage;
