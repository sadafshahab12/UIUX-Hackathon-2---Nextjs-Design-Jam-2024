import { CustomerData } from "@/app/type/dataType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const BillingForm = ({
  customerData,
  handleInputChange,
  handleCountryChange,
  handleSubmit,
  errors,
}: {
  customerData: CustomerData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountryChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: { [key: string]: string };  // Updated type for errors
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex-no-center lg:gap-5 gap-3">
          <div className="leading-[4rem] lg:mb-4 mb-2 w-full ">
            <Label htmlFor="firstName" className="text-16 font-medium ">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              value={customerData.firstName}
              onChange={handleInputChange}
              className="border-[#9F9F9F] py-7 px-5 w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="leading-[4rem] lg:mb-4 mb-2 w-full">
            <Label htmlFor="lastName" className="text-16 font-medium">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              value={customerData.lastName}
              onChange={handleInputChange}
              className="border-[#9F9F9F] py-7 px-5"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="country">Country / Region</Label>
          <Select
            value={customerData.country}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="w-full py-7 px-5">
              <SelectValue placeholder={customerData.country} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
              <SelectItem value="Pakistan">Pakistan</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="Korea">Korea</SelectItem>
              <SelectItem value="America">America</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            type="text"
            id="streetAddress"
            value={customerData.streetAddress}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
          )}
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="city">Town / City</Label>
          <Input
            type="text"
            id="city"
            value={customerData.city}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="province">Province</Label>
          <Input
            type="text"
            id="province"
            value={customerData.province}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.province && (
            <p className="text-red-500 text-sm mt-1">{errors.province}</p>
          )}
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            type="text"
            id="zipCode"
            value={customerData.zipCode}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
          )}
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            value={customerData.phone}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            value={customerData.email}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="leading-[4rem] my-10">
          <Input
            type="text"
            id="additionalInfo"
            value={customerData.additionalInfo}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5 pl-4"
            placeholder="Additional information"
          />
          {errors.additionalInfo && (
            <p className="text-red-500 text-sm mt-1">{errors.additionalInfo}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
