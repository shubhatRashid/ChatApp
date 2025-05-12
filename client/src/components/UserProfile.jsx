import React from 'react'
import Button from './Button'
import {motion} from "framer-motion"
import { headTextAnimation } from '../configs/motion';
import { LogOut,UserRoundCheck } from 'lucide-react';

const UserProfile = ({user, showSidebar}) => {

  return (
    <motion.div 
      className='bg-gray-200 flex justify-between items-center h-[10%] border-2 shadow-md  rounded-lg mt-[1%]'
      {...headTextAnimation}>
        <div className='flex w-full ml-[3%] justify-start items-center gap-3'>
            <UserRoundCheck className='mb-1'/>
            <h2 className='font-serif text-sm font-bold'>{user.name}</h2>
            <button className='ml-auto mr-2' name='logout' 
              onClick={() => {
                localStorage.clear()
                window.location.reload()}}>
              <LogOut/>
            </button>
        </div>
    </motion.div>
  )
}

export default UserProfile