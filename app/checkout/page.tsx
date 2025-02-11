"use client";
import React, { useContext, useState } from "react";
import Hero from "../components/ui/Hero";
import { poppins } from "../fonts/font";
import { Button } from "@/components/ui/button";
import BillingForm from "../components/ui/BillingForm";
import Properties from "../components/ui/Properties";
import { ProductContext } from "../components/context/ProductContext";
import { CountContext, SanityCustomerType } from "../type/dataType";
import Image from "next/image";

import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";
import { createClient } from "next-sanity";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(
    ProductContext
  ) as CountContext;
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
  const total = cartItems.reduce((total, item) => {
    const discount = (item.price * item.dicountPercentage) / 100; // Calculate discount
    const discountedPrice = item.price - discount; // Apply discount
    return total + discountedPrice * item.quantity; // Multiply by quantity and add to total
  }, 0);

  // Form state
  const [customerData, setCustomerData] = useState<SanityCustomerType>({
    userId: "",
    _id: "",
    firstName: "",
    lastName: "",
    country: "Sri Lanka", // default country
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "",
  });

  // Error state for each field
  const [errors] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    zipCode: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerData({ ...customerData, [id]: value });
    console.log("Field value:", value); // Log the field value
  };

  const handleCountryChange = (value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  // Validate form fields

  // Handle form submit
  const { user } = useUser(); // Get user from Clerk
  const handleClearCart = () => {
    setCartItems([]);
  };
  const handlePlaceOrder = async () => {
    // Check if customer data is complete
    if (
      !customerData.firstName ||
      !customerData.lastName ||
      !customerData.email ||
      !customerData.phone ||
      !customerData.streetAddress ||
      !customerData.city ||
      !customerData.zipCode ||
      !customerData.country ||
      !customerData.province
    ) {
      Swal.fire("Error", "Please fill all customer data fields.", "error");
      return; // Stop execution if customer data is incomplete
    }

    // Check if there are no products in the cart
    if (cartItems.length === 0) {
      Swal.fire(
        "Error",
        "Your cart is empty. Please add products to your cart.",
        "error"
      );
      return; // Stop execution if no products are in the cart
    }

    const clientCreate = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: "2025-01-18",
      useCdn: true,
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    });

    try {
      // Create customer document in Sanity (if it doesn't exist)
      const customerDoc = await clientCreate.create({
        _type: "customer",
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        streetAddress: customerData.streetAddress,
        city: customerData.city,
        zipCode: customerData.zipCode,
        country: customerData.country,
        province: customerData.province,
        additionalInfo: customerData.additionalInfo,
        clerkUserId: user?.id,
      });

      // Create the order document
      const orderData = {
        _type: "order",
        customer: { _type: "reference", _ref: customerDoc._id }, // Reference to customer
        cartItems: cartItems.map((item) => ({
          _type: "reference",
          _ref: item._id, // Reference to the furniture product
        })),
        quantities: cartItems.map((item) => item.quantity), // Include quantities in a separate array
        totalPrice: total,
        paymentMethod: paymentMethod,
        status: "pending", // Default order status
      };

      // Send the order data to Sanity
      const response = await clientCreate.create(orderData);

      if (response) {
        Swal.fire(
          "Order Placed!",
          "Your order has been successfully placed.",
          "success"
        );
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      Swal.fire("Error", "There was an issue placing your order.", "error");
      console.log(error);
    } finally {
      handleClearCart();
      setCustomerData({
        userId: "",
        _id: "",
        firstName: "",
        lastName: "",
        country: "Sri Lanka", // default country
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        email: "",
        additionalInfo: "",
        paymentMethod: "",
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
              customerData={customerData}
              handleInputChange={handleInputChange}
              handleCountryChange={handleCountryChange}
              handleSubmit={handlePlaceOrder}
              errors={errors}
            />
          </div>

          <div className="product-details lg:p-20 md:p-10 p-5">
            <div className="lg:space-y-10 space-y-4">
              <div className="flex-between lg:text-24 text-20 font-semibold">
                <h3>Product</h3>
                <h3>Subtotal</h3>
              </div>
              {cartItems.map((item, index) => {
                const discount = (item.price * item.dicountPercentage) / 100;
                const discountedPrice = item.price - discount;
                return (
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
                        ${discountedPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex-between">
                <p className="lg:text-16 text-14">Subtotal</p>
                <p className="flex-between lg:text-16 text-14 font-light">
                  ${total}
                </p>
              </div>
              <div className="flex-between">
                <p className="lg:text-16 text-14">Total</p>
                <p className="flex-between lg:text-24 sm:text-22 text-20 font-bold text-[#B88E2F]">
                  ${total}
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
                  <input
                    type="radio"
                    id="pay1"
                    name="payment"
                    value={"Direct Bank Transfer"}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="pay1" className="lg:text-16 text-14">
                    Direct Bank Transfer
                  </label>
                </div>
                <div className="flex-no-center gap-4 text-gray mb-3">
                  <input
                    type="radio"
                    id="pay2"
                    name="payment"
                    value={"Cash On Delivery"}
                    onChange={handlePaymentChange}
                  />
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
                <Button
                  onClick={handlePlaceOrder}
                  variant="outline"
                  className="lg:px-14 px-12 rounded-lg border-black"
                >
                  Place order
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
