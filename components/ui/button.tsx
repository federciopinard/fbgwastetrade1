import React from "react";

export const Button = ({ children, className = "" }) => (
  <button className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`}>
    {children}
  </button>
);