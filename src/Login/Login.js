import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/features/authData';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Dispatch the login action
        dispatch(login(data));
        
        // Navigate to the OTP component and pass type as 'login' along with email and password
        navigate('/otp', {
            state: {
                email: data.email,
                password: data.password,
                type: 'login',
            },
        });
    };  

    const isLoading = useSelector((state) => state.authDataSlice?.isLoading);

    return (
        <div className="grid grid-cols-12 gap-4 p-2.5 h-screen">
            <div className="col-span-8 bg-blue-500 p-4 text-white">First Div (8 columns)</div>
            <div className="col-span-4 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mt-[30%]">
                        <span className="font-bold text-2xl">SIGN IN</span>
                        <p className="opacity-60">Enter your Email or Mobile number!</p>
                        <div className="mt-10 flex flex-col">
                            <label className="text-base">Email</label>
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
                        <div className="flex flex-col">
                            <label className="text-base">Password</label>
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
                        <div className="flex justify-between pt-2">
                            <p className="opacity-60 flex gap-1">
                                <input type="checkbox" />
                                Remember me
                            </p>
                            <p className="opacity-60">Forgot Password?</p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white mt-10 p-2 rounded font-bold text-lg"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
