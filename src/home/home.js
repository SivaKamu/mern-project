import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData, setSymbol, setTimeSeries, setFundamentalFunctions, fetchFinancialData } from '../store/features/authData';
import { logout } from "../store/features/authData";
import { useNavigate } from "react-router-dom";
import StockChart from "../Charts/StockChart";
import FinancialChart from "../Charts/FinancialChart";
import CryptoCurrencyChart from "../Charts/CryptoCurrencyChart";
import ForeignExchange from "../Charts/ForeignExchange";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeSeries = useSelector((state) => state.authData.timeSeries);
  const symbol = useSelector((state) => state.authData.symbol);

  const fundamentalFunctions = useSelector((state) => state.authData.fundamentalFunctions);

  console.log(timeSeries,symbol);

  useEffect(() => {
    dispatch(fetchStockData());
  }, []);

  const isLoading = useSelector((state) => state.authData.isLoading);

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
    navigate("/login");
  };


  const timeseriesData = [
    { value: "TIME_SERIES_INTRADAY", label: "Intraday (1min, 5min, etc.)" },
    { value: "TIME_SERIES_DAILY", label: "Daily" },
    { value: "TIME_SERIES_WEEKLY", label: "Weekly" },
    { value: "TIME_SERIES_MONTHLY", label: "Monthly" },
  ];

  const symbolsData = [
    { value: "RELIANCE", label: "Reliance" },
    { value: "TCS", label: "Tata Consultancy Service" },
    { value: "INFY", label: "Infosys" },
    { value: "AAPL", label: "Apple Inc" },
    { value: "TSLA", label: "Tesla" },
    { value: "AMZN", label: "Amazon" },
  ];

  const fundamentalFunctionData = [
    { value: "OVERVIEW", label: "Overview" },
    { value: "INCOME_STATEMENT", label: "Income Statement" },
    { value: "BALANCE_SHEET", label: "Balance Sheet" },
    { value: "CASH_FLOW", label: "Cash Flow" },
  ];

  const cryptoCurrencyData = {
    dates: ['2024-12-18', '2024-12-19', '2024-12-20'],
    ohlc: [
      { date: '2024-12-18', o: 2520.0, h: 2530.0, l: 2495.0, c: 2520.5 },
      { date: '2024-12-19', o: 2525.0, h: 2555.0, l: 2510.0, c: 2535.0 },
      { date: '2024-12-20', o: 2535.0, h: 2565.0, l: 2525.0, c: 2550.5 },
    ],
  };

  const fundamentalData = {
    Symbol: "TSLA",
    MarketCapitalization: "1351627833000",
    PERatio: "115.04",
    RevenueTTM: "97150001000",
    GrossProfitTTM: "20853000000",
    EBITDA: "13244000000",
  };

  const handleTimeseriesChange = (e) => {
    dispatch(setTimeSeries(e.target.value));
  };

  const handleSymbolChange = (dataKey) => (e) => {
    dispatch(setSymbol(e.target.value));
    if(dataKey === 'StockData') dispatch(fetchStockData());
    else dispatch(fetchFinancialData());
  };

  const handleFundamentalFunctionChange = (e) => {
    dispatch(setFundamentalFunctions(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4 h-160">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Stock Values</span>
            <div className="flex space-x-2">
              {/* Timeseries Dropdown */}
              <select
                className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2 w-40"
                onChange={handleTimeseriesChange}
                value={timeSeries}
              >
                <option value="">Select Timeseries</option>
                {timeseriesData.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              {/* Symbols Dropdown */}
              {timeSeries && (
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2 w-40"
                  onChange={handleSymbolChange('StockData')}
                  value={symbol}
                >
                  <option value="">Select Symbol</option>
                  {symbolsData.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

            <div className="mt-4">
              {isLoading ? <div>Loading...</div> : <StockChart />}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 h-160">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Fundamental Data</span>
              <div className="flex space-x-2">
                {/* Functional Dropdown */}
                <select
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2 w-40"
                  onChange={handleFundamentalFunctionChange}
                  value={fundamentalFunctions}
                >
                  <option value="">Select Function</option>
                  {fundamentalFunctionData.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {/* Symbols Dropdown */}
                {fundamentalFunctions && (
                  <select
                    className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2 w-40"
                    onChange={handleSymbolChange('FundamentalFunctionData')}
                    value={symbol}
                  >
                    <option value="">Select Symbol</option>
                    {symbolsData.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="mt-4">
              <FinancialChart />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 h-90">
            <span className="text-lg font-semibold">Crypto Currency</span>
            <div className="mt-4">
              <CryptoCurrencyChart cryptoCurrencyData={cryptoCurrencyData} />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 h-90">
            <span className="text-lg font-semibold">Foreign Exchange</span>
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
