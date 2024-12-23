import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authData";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-8"
        />
        <span className="text-lg font-bold">My App</span>
      </div>

      <nav className="flex space-x-6">
        <a href="#" className="hover:underline">
          Dashboard
        </a>
        <a href="#" className="hover:underline">
          Stock Values
        </a>
        <a href="#" className="hover:underline">
          Fundamental Overview
        </a>
        <a href="#" className="hover:underline">
          Crypto Currency
        </a>
        <a href="#" className="hover:underline">
          Foreign Exchange
        </a>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded text-white font-bold hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
