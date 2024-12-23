import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/features/authData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(login(data, navigate));
    };

    const isLoading = useSelector((state) => state.authDataSlice?.isLoading);

    return (
        <div className="grid grid-cols-12 gap-4 p-2.5 h-screen bg-gradient-to-r from-blue-200 to-blue-100">
            {/* Left Side Carousel Section */}
            <div className="col-span-8 bg-black bg-opacity-40">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="h-full"
                >
                    <SwiperSlide>
                        <div
                            className="h-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: "url('/stock-market.jpg')" }}
                        >
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-semibold">Stay Ahead in the Market</h2>
                                <p className="mt-2">Get real-time stock and forex updates.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="h-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: "url('/cryptocurrency.jpg')" }}
                        >
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-semibold">Track Cryptocurrencies</h2>
                                <p className="mt-2">Monitor Bitcoin, Ethereum, and more.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="h-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: "url('/forex.jpg')" }}
                        >
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-semibold">Forex Market Insights</h2>
                                <p className="mt-2">Analyze exchange rates with ease.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Right Side Form Section */}
            <div className="col-span-4 p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="text-center">
                        <span className="font-bold text-3xl text-blue-600">Sign In</span>
                        <p className="text-gray-500 mt-2">Access your market insights and portfolio</p>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700">Email or Username</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email',
                                },
                            })}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex justify-between pt-2">
                        <label className="opacity-60 flex gap-1">
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <p onClick={() => navigate('/forgotPassword')} className="opacity-60 cursor-pointer text-blue-600 hover:underline">Forgot Password?</p>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full bg-green-600 text-white mt-10 p-3 rounded font-bold text-lg ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-4 text-gray-600">
                        <p>New here? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline">Create an account</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
