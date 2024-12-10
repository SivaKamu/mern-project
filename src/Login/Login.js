
const Login = () =>{
    return (
        <div class="grid grid-cols-12 gap-4 p-2.5 h-screen">
        <div class="col-span-8 bg-blue-500 p-4 text-white">First Div (8 columns)</div>
        <div class="col-span-4  p-4">
            <div className="mt-[30%]">
                <span className="font-bold text-2xl">
                    SIGN IN
                </span>
                <p className="opacity-60">Enter your Email or Mobile number!</p>
                <div className="mt-10 flex flex-col">
                    <label className="text-base">Email</label>
                    <input type="email" className="border  p-2 rounded my-2" placeholder="Enter your Email"/>
                </div>
                <div  className="flex flex-col">
                    <label className="text-base">Password</label>
                    <input type="password" className="border p-2 rounded my-2" placeholder="Enter your Password"/>
                </div>
                <div className="flex justify-between pt-2">
                    <p className="opacity-60 flex gap-1">
                        <input type="checkbox"/>
                        Remember  me</p>
                    <p  className="opacity-60">Forgot Password?</p>
                </div>
                <div>
                <button className="w-full bg-green-600 text-white mt-10 p-2 rounded font-bold text-lg">Sign in</button>
            </div>
               
            </div>
           
          
        </div>
      </div>




    )
}
export default Login;