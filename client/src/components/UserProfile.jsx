import React from 'react'
import Button from './Button'
import {motion} from "framer-motion"
import { headTextAnimation } from '../configs/motion';
import { UserPen, UserRoundCheck } from 'lucide-react';

const UserProfile = ({user, showSidebar}) => {

  return (
    <motion.div 
      className='bg-gray-200 flex justify-between items-center h-[10%] border-2 shadow-md  rounded-lg mt-[1%]'
      {...headTextAnimation}>
        <div className='flex min-w-[75%] ml-[3%] justify-start items-center gap-3'>
            <UserRoundCheck className='mb-1'/>
            <h2 className='font-serif text-sm font-bold'>{user.name}</h2>
        </div>
        <div className='flex sm:hidden flex items-center justify-end'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </motion.div>
  )
}

export default UserProfile