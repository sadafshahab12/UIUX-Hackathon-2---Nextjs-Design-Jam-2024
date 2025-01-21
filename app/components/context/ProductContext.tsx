"use client";
import { CountContext, ProductProviderType, ProductType } from "@/app/type/dataType";
import { createContext, useState } from "react";

export const ProductContext = createContext<ProductType | undefined | CountContext>(undefined);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [count, setCount] = useState<number>(1);
  const countIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const countDecrement = () => {
    setCount((prevCount) => (prevCount <= 1 ? 1 : prevCount - 1));
  };

  return (
    <ProductContext.Provider value={{count,countDecrement,countIncrement }}>
      <div>{children}</div>
    </ProductContext.Provider>
  );
};
