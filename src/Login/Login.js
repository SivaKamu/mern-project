
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const forgotPwdPage = () => {
    }
    const onSubmit = () => {
        navigate("./forgotPassword")
    }


    return (
        <div class="grid grid-cols-12 gap-4 p-2.5 h-screen">
            <div class="col-span-8 bg-blue-500 p-4 text-white">First Div (8 columns)</div>
            <div class="col-span-4  p-4">
                <div className="mt-[30%]">
                    <span className="font-bold text-2xl">
                        SIGN IN
                    </span>
                    <p className="opacity-60">Enter your Email or Mobile number!</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-10 flex flex-col">
                            <label className="text-base">Email</label>
                            <input type="email" id="email" className="border p-2 rounded my-2  w-full"
                                {...register('email', { required: 'Email is required' })} placeholder="Enter your Email" />
                            {errors.email && <p className=" text-red-600 error">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-base">Password</label>
                            <input type="password"  {...register('password', { required: 'Password is required' })} className="border p-2 rounded my-2" placeholder="Enter your Password" />
                            {errors.password && <p className=" text-red-600 error">{errors.password.message}</p>}
                        </div>
                        <div className="flex justify-between pt-2">
                            <p className="opacity-60 flex gap-1">
                                <input type="checkbox" />
                                Remember  me
                            </p>
                            <p className="opacity-60 cursor-pointer" onClick={forgotPwdPage}>Forgot Password?</p>
                        </div>
                        <div></div>

                        <button className="w-full bg-green-600 text-white mt-10 p-2 rounded font-bold text-lg" type="submit">Sign in</button>
                    </form>
                </div>


            </div>
        </div>




    )
}
export default Login;