"use client";
import React, { useContext, useState } from "react";
import Hero from "../components/ui/Hero";
import { poppins } from "../fonts/font";
import { Button } from "@/components/ui/button";
import BillingForm from "../components/ui/BillingForm";
import Properties from "../components/ui/Properties";
import { ProductContext } from "../components/context/ProductContext";
import { CountContext } from "../type/dataType";
import Image from "next/image";

const Checkout = () => {
  const { cartItems } = useContext(ProductContext) as CountContext;
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka", // default country
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (!formData.firstName) newErrors.push("First Name is required");
    if (!formData.lastName) newErrors.push("Last Name is required");
    if (!formData.streetAddress) newErrors.push("Street Address is required");
    if (!formData.city) newErrors.push("City is required");
    if (!formData.province) newErrors.push("Province is required");
    if (!formData.zipCode) newErrors.push("ZIP Code is required");
    if (!formData.phone) newErrors.push("Phone is required");
    if (!formData.email) newErrors.push("Email is required");

    setErrors(newErrors);
    if (newErrors.length === 0) {
      // Simulate placing an order
      console.log("Order placed successfully with data:", formData);
      alert("Order placed successfully!");
      // Reset form (optional)
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "Sri Lanka",
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        email: "",
        additionalInfo: "",
      });
    }
  };
  return (
    <>
      <div>
        <Hero title="Checkout" navName="Checkout" navLink="/checkout" />
        <div className={`${poppins.className} grid sm:grid-cols-2 grid-cols-1`}>
          <div className="billing-details lg:p-20 md:p-10 p-5">
            <h1 className="lg:text-36 sm:text-32 text-24 sm:text-left text-center font-semibold mb-3">
              Billing details
            </h1>
            <BillingForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleCountryChange={handleCountryChange}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          </div>
          <div className="product-details lg:p-20 md:p-10 p-5">
            <div className="lg:space-y-10 space-y-4">
              <div className="flex-between lg:text-24 text-20 font-semibold">
                <h3>Product</h3>
                <h3>Subtotal</h3>
              </div>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <div className="flex-between">
                    <div className="flex-no-center gap-4">
                      <div className="w-[6rem] h-[6rem] rounded-md">
                        <Image
                          src={item.imageUrls[0]}
                          alt={item.slug.current}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <p className="lg:text-16 text-14">
                        <span className="text-[#9F9F9F]">{item.title}</span> x{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="lg:text-16 text-14 font-light">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex-between">
                <p className="lg:text-16 text-14">Subtotal</p>
                <p className="flex-between lg:text-16 text-14 font-light">
                  Rs. {total}
                </p>
              </div>
              <div className="flex-between">
                <p className="lg:text-16 text-14">Total</p>
                <p className="flex-between lg:text-24 sm:text-22 text-20 font-bold text-[#B88E2F]">
                  Rs. {total}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-400 lg:my-5 my-3"></div>
            <div className="payment lg:space-y-8 space-y-5">
              <div className="flex-no-center gap-4 mb-3">
                <p className="b-circle"></p>
                <p className="lg:text-16 text-14">Direct Bank Transfer</p>
              </div>
              <div>
                <p className="lg:text-16 text-14 text-gray mb-3">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              </div>

              <div>
                <div className="flex-no-center gap-4 text-gray mb-3">
                  <input type="radio" id="pay1" name="payment" />
                  <label htmlFor="pay1" className="lg:text-16 text-14">
                    Direct Bank Transfer
                  </label>
                </div>
                <div className="flex-no-center gap-4 text-gray mb-3">
                  <input type="radio" id="pay2" name="payment" />
                  <label htmlFor="pay2" className="lg:text-16 text-14">
                    Cash On Delivery
                  </label>
                </div>
              </div>
              <div>
                <p className="lg:text-16 text-14 font-light mb-3">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <span className="font-semibold">privacy policy</span>.
                </p>
              </div>
              <div className="sm:text-center text-left flex-no-center gap-5">
                <Button onClick={handleSubmit}
                  variant="outline"
                  className="lg:px-14 px-12 rounded-lg border-black"
                >
                  Place order
                </Button>
                <Button
                  variant="outline"
                  className="lg:px-14 px-12 rounded-lg border-black"
                >
                  Place For Rent
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Properties />
      </div>
    </>
  );
};

export default Checkout;
