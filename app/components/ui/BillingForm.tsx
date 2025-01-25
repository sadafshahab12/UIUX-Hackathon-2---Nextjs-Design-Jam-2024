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

const BillingForm = () => {
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
  })

  const handleInputChange = ()=>{
    
  }
  return (
    <div>
      <form action="">
        <div className="flex-no-center lg:gap-5 gap-3">
          <div className="leading-[4rem] lg:mb-4 mb-2 w-full ">
            <Label htmlFor="fname" className="text-16 font-medium ">
              First Name
            </Label>
            <Input
              type="text"
              id="fname"
              className="border-[#9F9F9F] py-7 w-full"
            />
          </div>
          <div className="leading-[4rem]  lg:mb-4 mb-2 w-full">
            <Label htmlFor="lname" className="text-16 font-medium">
              Last Name
            </Label>
            <Input type="text" id="lname" className="border-[#9F9F9F] py-7 " />
          </div>
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="compName">Company Name (Optional)</Label>
          <Input type="text" id="compName" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="count/Reg">Country / Region</Label>
          <Select>
            <SelectTrigger className="w-full py-7">
              <SelectValue placeholder="SriLanka" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pakistan">Pakistan</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="korea">Korea</SelectItem>
              <SelectItem value="america">America</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="address">Street address</Label>
          <Input type="text" id="address" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="town">Town / City</Label>
          <Input type="text" id="town" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="province">Province</Label>
          <Input type="text" id="province" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="code">ZIP code</Label>
          <Input type="text" id="code" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="num">Phone</Label>
          <Input type="number" id="num" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem]  lg:mb-4 mb-2">
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" className="border-[#9F9F9F] py-7" />
        </div>
        <div className="leading-[4rem] my-10">
          <Input
            type="text"
            className="border-[#9F9F9F] py-7 pl-4"
            placeholder="Additional information"
          />
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
