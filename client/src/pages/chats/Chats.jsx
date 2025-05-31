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
import Logo from '../../components/Logo';
import { slideAnimation } from '../../configs/motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

const Chats = () => {

  // USER'S INFO //
  const {user,setSelectedChat,notification} = ChatState()

  // STATE VARIABLES
  const [searchDrawer,setSearchDrawer] = useState(false) // determines if search Drawer is visible //
  const [usersDiv,setUsersDiv] = useState(true) // determines if div containing all chats if visible //
  const [seeNav,setSeeNav] = useState(false)    // determines if sidebar if visible //
  const [seeChat,setSeeChat] = useState(true)   // determines if current chat div if visible // 
  const [isStart,setStart] = useState(true)  // if it the start of the app //
  
  


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
    <div className='flex flex-row bg-black justify-center h-screen'>

        {/* USER SEARCH DRAWER */}
        <SearchDrawer showSearch={searchDrawer} searchFun = {searchFun}/>

        {/* SIDEBAR FOR QUICK ACCESS */}
        <motion.div 
          className={`${seeNav?'flex':'hidden'} sm:flex flex-col justify-between gap-5 my-[2%] mx-0 sm:mx-[2%] rounded-lg`}
          {...slideAnimation('left')}
        >   <Logo/>
            <Sidebar seeNav={seeNav} homeFun= {homeFun} chatFun={chatFun} searchFun = {searchFun} logoutFun = {logoutFun} />
        </motion.div>

        {/* SIDE BAR SHOW BUTTON */}
        <div 
          className='absolute z-10 flex right-4 top-[60%]  p-2 rounded-full bg-neutral-900 text-white sm:hidden border '
        >
            <button onClick={() => setSeeNav(!seeNav)}>{seeNav ? <ArrowDown/> : <ArrowUp/>}</button>
        </div>

        {/* ALL CHATS DIV */}
        <motion.div 
          className={`${usersDiv?"flex":"hidden"} flex-col justify-between my-[2%] rounded-lg bg-neutral-900 text-white w-[550px] px-[1%] py-[1%] `}
          {...slideAnimation('left',0.1)}>
            <UserProfile user={user} showSidebar={showSidebar}/>
            <Groups  setStart = {setStart} chatFun={chatFun}/>
            <ChatList chatFun={chatFun} setStart= {setStart}/>

        </motion.div>

        {/* CURRENT CHAT DIV */}
        <CurrentChat 
          isStart={isStart} 
          showSidebar={showSidebar} 
          usersDiv={usersDiv} 
          seeChat={seeChat}
        />
    </div>
  )
}

export default Chats