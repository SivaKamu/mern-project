import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData,logout } from '../store/features/authData';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { homeData, isLoading } = useSelector((state) => state.authData); // Access data from Redux state

  useEffect(() => {
    dispatch(fetchHomeData()); // Dispatch the action to fetch home data
  }, [dispatch]);

    // Logout handler
    const handleLogout = () => {
      const refreshToken = localStorage.getItem("refreshToken");
      // Dispatch logout action to clear Redux state
      dispatch(logout(refreshToken));
  
      // Redirect to login page
      navigate("/login");
    };

  return (
    <div className="grid grid-cols-12 gap-4 p-2.5 h-screen">
      <div className="col-span-8 bg-green-500 p-4 text-white">
        <h1 className="text-3xl font-bold">Welcome to Our App!</h1>
        {isLoading ? (
          <p className="mt-4 text-lg">Loading...</p>
        ) : (
          <>
            <p className="mt-4 text-lg">
              {homeData ? `Message: ${homeData.message}` : "No data available."}
            </p>
            {homeData?.items && (
              <ul className="mt-4">
                {homeData.items.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <div className="col-span-4 p-4">
        <div className="mt-[30%]">
          <span className="font-bold text-2xl">Quick Links</span>
          <ul className="mt-6">
            <li className="my-2">
              <a href="/about" className="text-blue-500 hover:underline">
                About Us
              </a>
            </li>
            <li className="my-2">
              <a href="/contact" className="text-blue-500 hover:underline">
                Contact
              </a>
            </li>
            <li className="my-2">
              <a href="/services" className="text-blue-500 hover:underline">
                Our Services
              </a>
            </li>
          </ul>
          <div className="mt-10">
            <button className="w-full bg-blue-600 text-white p-2 rounded font-bold text-lg">
              Explore Now
            </button>
          </div>
        </div>
        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-2 rounded font-bold text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
