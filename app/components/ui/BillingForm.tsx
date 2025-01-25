import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const BillingForm = ({
  formData,
  handleInputChange,
  handleCountryChange,
  handleSubmit,
  errors,
}: {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountryChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: string[];
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
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-[#9F9F9F] py-7 px-5 w-full"
            />
          </div>
          <div className="leading-[4rem] lg:mb-4 mb-2 w-full">
            <Label htmlFor="lastName" className="text-16 font-medium">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-[#9F9F9F] py-7 px-5"
            />
          </div>
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="companyName">Company Name (Optional)</Label>
          <Input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5 "
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="country">Country / Region</Label>
          <Select
            value={formData.country}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="w-full py-7 px-5">
              <SelectValue placeholder={formData.country} />
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
            value={formData.streetAddress}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="city">Town / City</Label>
          <Input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="province">Province</Label>
          <Input
            type="text"
            id="province"
            value={formData.province}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            type="text"
            id="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="number"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] lg:mb-4 mb-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5"
          />
        </div>
        <div className="leading-[4rem] my-10">
          <Input
            type="text"
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="border-[#9F9F9F] py-7 px-5 pl-4"
            placeholder="Additional information"
          />
        </div>
        {errors.length > 0 && (
          <div className="text-red-600 mb-4">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default BillingForm;
