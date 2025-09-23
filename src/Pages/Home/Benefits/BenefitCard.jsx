import React from "react";

export default function BenefitCard({ benefit }) {
    const { title, desc, img } = benefit;
  return (
    <div className="card lg:card-side bg-base-200 shadow-xl p-6">
      <figure>
        <img
          src={img}
          alt={title}
          className="w-28 h-28 object-contain"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
