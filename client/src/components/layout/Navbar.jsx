import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar({setSelectedContact}) {

  const navigate = useNavigate();

  async function onLogout() {
    try {

      const response = await axios.delete(
        "http://localhost:8000/api/v1/auth/logout",
        {
          withCredentials: true
        }
      );

      if(response.status === 200){
        navigate("/login");
      }

    } catch (error) {
      console.log("Failed to logout", error);
    }
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        px-5
        py-4
        flex
        items-center
        justify-between
        shadow-lg
      "
      onClick={()=>{setSelectedContact({
        name:"",
        username:"",
        _id:""
      })}}
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-10
          w-40
          h-40
          bg-blue-500/10
          blur-3xl
          rounded-full
        "
      ></div>

      {/* Left Section */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-4
        "
      >
        {/* Logo */}
        <div
          className="
            w-11
            h-11
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            flex
            items-center
            justify-center
            text-lg
            font-bold
            shadow-md
          "
        >
          💬
        </div>

        {/* Branding */}
        <div className="leading-tight">
          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-white
            "
          >
            WebChat
          </h1>

          <p
            className="
              text-sm
              text-zinc-400
              hidden
              sm:block
            "
          >
            Real-time messaging
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative z-10">
        <button
          type="button"
          onClick={onLogout}
          className="
            bg-zinc-800
            hover:bg-red-500
            border
            border-zinc-700
            px-4
            py-2.5
            rounded-xl
            text-sm
            font-medium
            transition-all
            duration-200
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;