import React from 'react'
import Button from './Button'
import {motion} from "framer-motion"
import { headTextAnimation } from '../configs/motion';
import { CircleUser, LogOut,UserRoundCheck } from 'lucide-react';
import { ChatState } from '../context/ChatProvider';

const UserProfile = ({user, showSidebar}) => {
  const {socket} = ChatState()

  return (
    <motion.div 
      className='flex justify-between items-center h-[10%]  rounded-lg mt-[1%]'
      {...headTextAnimation}>
        <div className='flex w-full ml-[3%] justify-center items-center gap-3'>
            <CircleUser className='mb-1'/>
            <h2 className='font-sans text-lg font-md'>{user.name}</h2>
            <button className='ml-auto mr-2' name='logout' 
              onClick={() => {
                localStorage.clear()
                socket.current.disconnect()
                window.location.reload()}}>
              <LogOut/>
            </button>
        </div>
    </motion.div>
  )
}

export default UserProfile