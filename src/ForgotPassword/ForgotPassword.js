
import { Controller, useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const { handleSubmit, control, watch, formState: { errors } } = useForm();

    const otpLength = 6; // Number of OTP digits

    // Watch all OTP fields
    const otpFields = watch(Array.from({ length: otpLength }, (_, i) => `otp${i + 1}`));

    const onSubmit = (data) => {
        const otp = Array.from({ length: otpLength }, (_, i) => data[`otp${i + 1}`]).join("");
        console.log("OTP Entered:", otp);
        alert(`OTP Verified Successfully: ${otp}`);
    };

    // Handle keypress for moving focus between inputs
    const handleKeyUp = (e, index) => {
        if (e.target.value.length === 1 && e.key !== "Backspace" && index < otpLength - 1) {
            document.getElementById(`otp${index + 2}`).focus();
        } else if (e.key === "Backspace" && index > 0 && !e.target.value) {
            document.getElementById(`otp${index}`).focus();
        }
    };

    return (

        <div class="grid grid-cols-12 gap-4 p-2.5 h-screen">
            <div class="col-span-8 bg-blue-500 p-4 text-white">First Div (8 columns)</div>
            <div class="col-span-4  p-4">
                <div className="mt-[30%]">
                    <span className="font-bold text-2xl">
                        FORGOT PASSWORD
                    </span>
                    <p className="opacity-60">Enter your Valid OTP!</p>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-between mb-4">
                                {Array.from({ length: otpLength }, (_, i) => (
                                    <Controller
                                        key={i}
                                        name={`otp${i + 1}`}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "All fields are required",
                                            pattern: {
                                                value: /^[0-9]$/,
                                                message: "Each field must contain a single digit",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id={`otp${i + 1}`}
                                                maxLength="1"
                                                className={`w-12 h-12 text-center border ${errors[`otp${i + 1}`]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                                    } rounded focus:outline-none focus:ring focus:ring-blue-500 text-lg`}
                                                onKeyUp={(e) => handleKeyUp(e, i)}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                            {errors.otp1 && (
                                <span className="text-red-500 text-sm mt-1 block">
                                    {errors.otp1.message}
                                </span>
                            )}
                            <div className="flex justify-center items-center w-[80%] m-auto mt-5">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition "
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </div>





    )
}
export default ForgotPassword;