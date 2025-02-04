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
import PlaceOrder from "../form-actions/PlaceOrder";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(
    ProductContext
  ) as CountContext;

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
  });

  // Error state for each field
  const [errors, setErrors] = useState<{ [key: string]: string }>({
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
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Required fields
    if (!customerData.firstName)
      newErrors.firstName = "First name is required.";
    if (!customerData.lastName) newErrors.lastName = "Last name is required.";
    if (!customerData.email) newErrors.email = "Email is required.";
    if (!customerData.phone) newErrors.phone = "Phone number is required.";
    if (!customerData.streetAddress)
      newErrors.streetAddress = "Street address is required.";
    if (!customerData.city) newErrors.city = "City is required.";
    if (!customerData.zipCode) newErrors.zipCode = "Zip code is required.";

    // Email format check
    if (customerData.email && !/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone number format (basic check)

    return newErrors;
  };

  // Handle form submit
  const { user } = useUser(); // Get user from Clerk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user ? user.id : ""; // Get user ID (empty if not logged in)
    console.log(userId);
    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    // Add user ID to customer data
    const updatedCustomerData = { ...customerData, userId };

    // Proceed with placing the order
    await PlaceOrder(cartItems, updatedCustomerData);
    Swal.fire({
      title: "Order Placed!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
    // Reset form if no errors
    setCustomerData({
      userId: "",
      _id: "",
      firstName: "",
      lastName: "",
      country: "Sri Lanka",
      streetAddress: "",
      city: "",
      province: "",
      zipCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
    });
    setErrors({});
    setCartItems([]);
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
                        Rs. {discountedPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                <Button
                  onClick={handleSubmit}
                  variant="outline"
                  className="lg:px-14 px-12 rounded-lg border-black"
                >
                  Place order
                </Button>
                <Button
                  variant="outline"
                  className="lg:px-14 px-12 rounded-lg border-black"
                >
                  Make Payment
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
