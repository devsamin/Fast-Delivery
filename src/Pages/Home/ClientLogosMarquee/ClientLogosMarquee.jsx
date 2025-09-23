import React, { useState } from "react";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

export default function ClientLogosMarquee() {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="overflow-hidden bg-gray-50 py-6">
      <h3 className="text-3xl font-bold text-center mb-12">
        Our Trusted Clients
      </h3>
      <div
        className={`whitespace-nowrap flex gap-16 items-center ${
          isPaused ? "" : "animate-marquee"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company ${index + 1}`}
            className="h-6 w-auto object-contain"
          />
        ))}
      </div>

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
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
