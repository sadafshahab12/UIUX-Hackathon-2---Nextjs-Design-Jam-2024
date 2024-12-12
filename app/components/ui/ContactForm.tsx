import { poppins } from "@/app/fonts/font";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContactForm = () => {
  return (
    <>
      <div className={` ${poppins.className} contact-form`}>
        <div className="lg:leading-[4rem] leading-[2.5rem] lg:mb-4 mb-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Abc"
            className="border-[#9F9F9F] py-7 px-4  "
          />
        </div>
        <div className="lg:leading-[4rem] leading-[2.5rem] lg:mb-4 mb-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            placeholder="Abc@def.com"
            className="border-[#9F9F9F] py-7 px-4"
          />
        </div>
        <div className="lg:leading-[4rem] leading-[2.5rem] lg:mb-4 mb-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            placeholder="This is an optional"
            className="border-[#9F9F9F] py-7 px-4"
          />
        </div>
        <div className="lg:leading-[4rem] leading-[2.5rem] lg:mb-4 mb-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Hi! i’d like to ask about"
            className="border-[#9F9F9F] py-7 px-4"
          />
        </div>
        <div>
          <Button className="bg-[#B88E2F] text-16 text-white mt-5 px-14">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
