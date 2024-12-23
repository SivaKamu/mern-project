import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData } from '../store/features/authData';
import { logout } from "../store/features/authData";
import { useNavigate } from "react-router-dom";
import StockChart from "../Charts/StockChart"; // Import the StockChart component
import FinancialChart from "../Charts/FinancialChart";
import CryptoCurrencyChart from "../Charts/CryptoCurrencyChart";
import ForeignExchange from "../Charts/ForeignExchange";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch stock data on component mount
  useEffect(() => {
   console.log("hi");
   dispatch(fetchStockData());
  }, [dispatch]);  // Adding dispatch to the dependency array to avoid stale closure
  
 // const stockData = useSelector((state) => state.authData.stockData);
  const isLoading = useSelector((state) => state.authData.isLoading);  // Optional: Loading state to show a loader

  //console.log(stockData); // Log stock data to see if it's being fetched properly

  // Logout handler
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
    navigate("/login");
  };

  const cryptoCurrencyData = {
    dates: ['2024-12-18', '2024-12-19', '2024-12-20', '2024-11-18', '2024-11-19', '2024-02-20', '2024-01-18', '2024-09-19', '2024-10-20'],
    ohlc: [
      { date: '2024-12-18', o: 2520.0, h: 2530.0, l: 2495.0, c: 2520.5 },
      { date: '2024-12-19', o: 2525.0, h: 2555.0, l: 2510.0, c: 2535.0 },
      { date: '2024-12-20', o: 2535.0, h: 2565.0, l: 2525.0, c: 2550.5 },
      { date: '2024-11-18', o: 2520.0, h: 2530.0, l: 2495.0, c: 2520.5 },
      { date: '2024-11-19', o: 2525.0, h: 2555.0, l: 2510.0, c: 2535.0 },
      { date: '2024-02-20', o: 2535.0, h: 2565.0, l: 2525.0, c: 2550.5 },
      { date: '2024-01-18', o: 2520.0, h: 2530.0, l: 2495.0, c: 2520.5 },
      { date: '2024-09-19', o: 2525.0, h: 2555.0, l: 2510.0, c: 2535.0 },
      { date: '2024-10-20', o: 2535.0, h: 2565.0, l: 2525.0, c: 2550.5 },
    ],
  };

  const fundamentalData = {
    Symbol: "TSLA",
    MarketCapitalization: "1351627833000", // Market Cap in dollars
    PERatio: "115.04", // P/E ratio
    RevenueTTM: "97150001000", // Revenue in dollars
    GrossProfitTTM: "20853000000", // Gross Profit in dollars
    EBITDA: "13244000000", // EBITDA in dollars
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1: Stock Values */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-160"> {/* Set height for the card */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Stock Values</span>
              <div className="relative">
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
                  aria-label="Stock Values Search"
                >
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            {/* StockChart inside the Stock Values card */}
            <div className="mt-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <StockChart />
              )}
            </div>
          </div>

          {/* Card 2: Fundamental Overview */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-160">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Fundamental Overview</span>
              <div className="relative">
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
                  aria-label="Fundamental Overview Search"
                >
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            {/* FinancialChart inside the Stock Values card */}
            <div className="mt-4">
              <FinancialChart fundamentalData={fundamentalData} />
            </div>
          </div>

          {/* Card 3: Crypto Currency */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-90">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Crypto Currency</span>
              <div className="relative">
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
                  aria-label="Crypto Currency Search"
                >
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            {/* Crypto Currency Chart inside the Crypto currency Values card */}
            <div className="mt-4">
              <CryptoCurrencyChart cryptoCurrencyData={cryptoCurrencyData} />
            </div>
          </div>

          {/* Card 4: Foreign Exchange */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-90">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Foreign Exchange</span>
              <div className="relative">
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
                  aria-label="Foreign Exchange Search"
                >
                  <option>Select</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            {/* Foreign Exchange Chart inside the Foreign currency Values card */}
            <div className="mt-4">
              <ForeignExchange />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
