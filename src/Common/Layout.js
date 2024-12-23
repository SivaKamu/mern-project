import React from "react";
import Header from "../Common/Header"; // Import Header component

const Layout = ({ children, isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pass the isLoggedIn prop to Header if needed */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Content (children components) */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
