import React from 'react'
import {motion} from "framer-motion"
import {slideAnimation} from '../configs/motion';
import { Users } from 'lucide-react';

const groupIcon = ({groupName,clickFun,index}) => {
  return (
    <motion.div 
      {...slideAnimation('left',index/4)}
      className='max-w-[150px] my-[2%] mx-[3%] flex flex-col items-center justify-center  p-1 rounded-lg bg-white'
    >
        <button onClick={clickFun}>
          <Users />
        </button>
        <div className='flex items-center w-[100%] h-[100%] justify-around '>
          <p className='flex font-serif text-[9px] lowercase'>{groupName}</p>
        </div>

    </motion.div>
  )
}

export default groupIcon