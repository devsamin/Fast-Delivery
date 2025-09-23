import React from "react";

// Array of company logos
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

export default function ClientLogosMarquee() {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <div className="overflow-hidden bg-gray-50 py-6 ">
        <h3 className="text-center font-semibold text-3xl m-5 p-5">Our Trusted Clients</h3>
      <div className="animate-marquee whitespace-nowrap flex gap-16">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company ${index + 1}`}
            className="h-6 w-auto object-contain"
          />
        ))}
        {/* Repeat logos to make it continuous */}
        {logos.map((logo, index) => (
          <img
            key={`repeat-${index}`}
            src={logo}
            alt={`Company repeat ${index + 1}`}
            className="h-16 w-auto object-contain"
          />
        ))}
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
