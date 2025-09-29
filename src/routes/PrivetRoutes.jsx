import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate } from "react-router-dom";
const PrivetRoutes = ({children}) => {
  const { user, loading } = UseAuth();
  if (loading) {
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>;
  }
  if(!user){
    return <Navigate to={'/login'}></Navigate>
  }
  return children;
};

export default PrivetRoutes;
