import React, { Suspense } from "react";
import RentalCheckOut from "../components/RentalCheckOut";

const RentalCheckOutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RentalCheckOut />
    </Suspense>
  );
};

export default RentalCheckOutPage;
