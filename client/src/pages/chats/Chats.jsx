import React ,{useEffect, useState}from 'react'
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import { ChatState } from '../../context/ChatProvider';
import Sidebar from "../../components/Sidebar"
import Groups from './Groups';
import UserProfile from "../../components/UserProfile"
import ChatList from './ChatList';
import CurrentChat from './CurrentChat';
import SearchDrawer from "./SearchDrawer"
import {motion} from "framer-motion"
import {slideAnimation} from "../../configs/motion"


const Chats = () => {

  // USER'S INFO //
  const {user,setSelectedChat} = ChatState()

  // STATE VARIABLES
  const [searchDrawer,setSearchDrawer] = useState(false) // determines if search Drawer is visible //
  const [usersDiv,setUsersDiv] = useState(true) // determines if div containing all chats if visible //
  const [seeNav,setSeeNav] = useState(false)    // determines if sidebar if visible //
  const [seeChat,setSeeChat] = useState(true)   // determines if current chat div if visible // 
  const [isStart,setStart] = useState(true)  // if it the start of the app //
  const [clickedNotification,setClickedNotification] = useState(false) // to judge if any particular notification has been clicked
  


  // FUNCTIONS FOR BUTTONS
  const homeFun = () =>{
    setSeeChat(true)
    setUsersDiv(true)
    setSelectedChat()
  }

  const logoutFun = () => {
    localStorage.clear()
    
    toast.success("Logged Out...", toastTheme);
    setTimeout(()=>{ window.location.reload()},500)
  }

  const chatFun = () => {
    setSeeChat(true)
    if (window.innerWidth < 900){
      setUsersDiv(false)}
    }
   

  const searchFun = () => {setSearchDrawer(!searchDrawer)}
  const showSidebar = () => {
    setSeeNav(!seeNav)
  }

  return (
    <div className='flex flex-row bg-teal-800 justify-center h-screen'>

        {/* USER SEARCH DRAWER */}
        <SearchDrawer showSearch={searchDrawer} searchFun = {searchFun}/>

        {/* SIDEBAR FOR QUICK ACCESS */}
        <motion.div 
          className={`${seeNav?'flex':'hidden'} sm:flex my-[2%] mx-[2%] rounded-lg ml-[2%] px-[1%] border bg-gray-200`}
          {...slideAnimation('left')}
        >
            <Sidebar seeNav={seeNav} homeFun= {homeFun} chatFun={chatFun} searchFun = {searchFun} logoutFun = {logoutFun} />
        </motion.div>

        {/* ALL CHATS DIV */}
        <motion.div 
          className={`${usersDiv?"flex":"hidden"} flex-col justify-between my-[2%] rounded-lg bg-white text-black w-[550px] px-[1%] py-[1%] border`}
          {...slideAnimation('left',0.1)}>
            <UserProfile user={user} showSidebar={showSidebar}/>
            <Groups  setStart = {setStart} chatFun={chatFun}/>
            <ChatList chatFun={chatFun} setStart= {setStart} clickedNotification={clickedNotification} setClickedNotification={setClickedNotification}/>

        </motion.div>

        {/* CURRENT CHAT DIV */}
        <CurrentChat 
          isStart={isStart} 
          showSidebar={showSidebar} 
          usersDiv={usersDiv} 
          seeChat={seeChat} 
          setClickedNotification={setClickedNotification} 
        />
    </div>
  )
}

export default Chats