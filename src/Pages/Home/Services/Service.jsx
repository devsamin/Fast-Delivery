import React from "react";

const Service = ({ service }) => {
    console.log(service);
  if (!service) return null; // Safety check to prevent undefined errors

  const { title, description, icon: Icon } = service;

  return (
    <div className="border p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300 text-center hover:bg-[#CAEB66]">
      <Icon className="text-4xl text-blue-500 mb-4 mx-auto" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Service;
