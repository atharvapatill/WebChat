import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  let navigate = useNavigate();

  const onLogin = async () => {

    try {
      
      const response = await axios.post("https://webchat-i88q.onrender.com/api/v1/auth/login",{
        username : username,
        password : password
      },{
        withCredentials: true
    });

    if (response.status==200) {
      navigate("/")
    }

    console.log(response.data);
      
    } catch (error) {
      console.error("Error while login", error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      
      <div
        className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-700
          rounded-2xl
          p-6
          md:p-8
          shadow-xl
        "
      >
        
        {/* Heading */}
        <div className="mb-8 text-center">
          
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-2">
            Login to continue chatting
          </p>

        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          
          {/* Username */}
          <div className="flex flex-col gap-2">
            
            <label className="text-sm text-zinc-300">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your Username"
              className="
                bg-zinc-800
                border
                border-zinc-700
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-blue-500
                transition
              "
              onChange={(e)=>{setUsername(e.target.value)}}
            />

          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            
            <label className="text-sm text-zinc-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="
                bg-zinc-800
                border
                border-zinc-700
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-blue-500
                transition
              "
              onChange={(e)=>{setPassword(e.target.value)}}
            />

          </div>

          {/* Login Button */}
          <button
            type="button"
            className="
              bg-blue-500
              hover:bg-blue-600
              transition
              py-3
              rounded-xl
              font-medium
              mt-2
            "
            onClick={onLogin}
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          
          Don't have an account?{" "}
          
          <Link
            to="/signup"
            className="
              text-blue-500
              hover:text-blue-400
              transition
            "
          >
            Signup
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Login