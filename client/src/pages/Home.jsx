import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"
import ChatContainer from "../components/layout/ChatContainer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import HomeScreen from "../components/layout/HomsScreen"

function Home() {
  const [user,setUser] = useState({
    name:"",
    _id:"",
    username:""
  })

  const [selectedContact, setSelectedContact] = useState({
    name : "",
    _id : "",
    username :""
  });

  const navigate = useNavigate();

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/me",{
        withCredentials: true
        })
        setUser(response.data.user)
        // console.log(response)
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="h-screen bg-black text-white p-2 md:p-4">
      
      <div className="h-full flex flex-col gap-2 md:gap-4">
        
        {/* Navbar */}
        <Navbar setSelectedContact={setSelectedContact} />

        {/* Main Content */}
        <div className="flex-1 flex gap-4 min-h-0">
          
          {/* Sidebar - Hidden on Mobile */}
          <div className="hidden md:flex md:w-[35%] lg:w-[30%] h-full">
            <Sidebar user={user} setSelectedContact={setSelectedContact} />
          </div>

          {/* Chat Container */}
          <div className="flex-1 min-w-0 h-full">

            {/* <HomeScreen/> */}

            {selectedContact.name=="" ?  <HomeScreen/> : <ChatContainer user={user} selectedContact={selectedContact}/>}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home