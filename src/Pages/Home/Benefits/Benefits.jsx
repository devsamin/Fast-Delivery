import React from "react";
import BenefitCard from "./BenefitCard";

export default function Benefits() {
  const features = [
    {
      title: "Live Parcel Tracking",
      desc: "Track your parcel anytime in real-time with accurate updates. Stay informed about every step of your delivery.",
      img: "https://img.icons8.com/fluency/96/track-order.png",
    },
    {
      title: "100% Safe Delivery",
      desc: "We ensure every parcel reaches safely without any damage. Trust us for reliable and secure deliveries.",
      img: "https://i.ibb.co.com/TB4xtYqW/Untitled-design-removebg-preview.png",
    },
    {
      title: "24/7 Call Center Support",
      desc: "Our dedicated team is available round the clock. Get help anytime through our responsive support center.",
      img: "https://img.icons8.com/fluency/96/customer-support.png",
    },
  ];

  return (
    <section data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <BenefitCard
              key={index}
              benefit={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
