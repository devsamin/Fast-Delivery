import React from "react";
import { Outlet } from "react-router-dom";
import authImg from "../assets/authImage.png";
import FastDeliveryLogo from "../Shared/FastDeliveryLogo/FastDeliveryLogo";

const AuthLayouts = () => {
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      {/* Logo */}
      <div>
        <FastDeliveryLogo />
      </div>

      {/* Auth Section */}
      <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
        {/* Image */}
        <div className="flex-1">
          <img src={authImg} alt="Auth Illustration" />
        </div>

        {/* Outlet */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
