import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages/components
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import OtpSignUp from './Otp/Otp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import Layout from '../src/Common/Layout'; // Import Layout component
import Home from './home/home';

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // Example check for login status

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OtpSignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        
        {/* Protected Routes (Only if logged in) */}
        {isLoggedIn && (
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        )}

        {/* Catch-all route for invalid URLs (404 Not Found) */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
