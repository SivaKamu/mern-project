import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Otp } from '../store/features/authData';
import { useLocation } from 'react-router-dom';

const OtpSignUp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { email, type } = location.state || {}; // Extract data from location.state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const otpData = { ...data, email, type };
        console.log(otpData);
        dispatch(Otp(otpData,navigate)); // Dispatch OTP action
    };

    const isLoading = useSelector((state) => state.authDataSlice?.isLoading);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">OTP</h2>
                <span className="text-gray-400 text-sm text-center mb-6">
                    Enter the OTP sent to your Email
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            {...register('otp', { required: 'OTP is required' })}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.otp && <span className="text-red-500 text-sm">{errors.otp.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpSignUp;
