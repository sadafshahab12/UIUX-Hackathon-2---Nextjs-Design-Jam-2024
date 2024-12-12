import React from "react";
import Hero from "../components/ui/Hero";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../components/ui/InfoCard";
import ContactForm from "../components/ui/ContactForm";
import { poppins } from "../fonts/font";
import Properties from "../components/ui/Properties";

const Contact = () => {
  return (
    <>
      <div>
        <Hero title="Contact" navLink="/contact" navName="Contact" />
      </div>
      <div className={`${poppins.className} lg:p-14 sm:p-10 p-5`}>
        <div className=" text-center">
          <h1 className="md:text-36 xs:text-30 xss:text-24 text-20 font-semibold">
            Get In Touch With Us
          </h1>
          <p className="sm:text-16 text-12 text-gray lg:w-[60%] md:w-[80%] w-[90%] mx-auto mt-3">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:gap-10 sm:gap-5 gap-2 lg:p-24 sm:p-18 xs:p-4   p-2">
          <div className="contact-info lg:p-10 sm:p-8 p-4 lg:space-y-8 sm:space-y-5 space-y-3">
            <InfoCard
              icon={faLocationDot}
              title="Address"
              info="236 5th SE Avenue, New York NY10000, United States"
            />
            <InfoCard
              icon={faPhone}
              title="Phone"
              info="Mobile: +(84) 546-6789 Hotline: +(84) 456-6789"
            />
            <InfoCard
              icon={faClock}
              title="Working Time"
              info="Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00"
            />
          </div>
          <div className="contact-form lg:p-10 xss:p-5 p-2">
            <ContactForm />
          </div>
        </div>
      </div>
      <Properties />
    </>
  );
};

export default Contact;
