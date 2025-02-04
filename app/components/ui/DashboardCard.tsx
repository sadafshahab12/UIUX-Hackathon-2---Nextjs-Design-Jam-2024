import { Card } from "@/components/ui/card";
import React from "react";

const DashboardCard = ({ items , qty}: { items: string, qty?:number | string }) => {
  return (
    <>
        <div className="card bg-gray-200 p-4 rounded-lg mt-10 ">
             <Card className="w-full h-[150px] flex items-center justify-center flex-col gap-2">
               <h1 className="text-xl font-bold text-gray-400">{items}</h1>
               <p>{qty}</p>
             </Card>
           </div>
    </>
  );
};

export default DashboardCard;
