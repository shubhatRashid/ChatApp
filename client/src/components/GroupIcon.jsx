import React from 'react'
import {motion} from "framer-motion"
import {slideAnimation} from '../configs/motion';
import { CircleUser, Users } from 'lucide-react';

const groupIcon = ({groupName,clickFun,index}) => {
  return (
    <motion.div 
      {...slideAnimation('left',index/4)}
      className='max-w-[150px] my-[2%] mx-[3%] flex flex-col items-center justify-center'
    >
        <button onClick={clickFun}>
          <CircleUser size={35}/>
        </button>
        <div className='flex items-center w-[100%] h-[100%] justify-around '>
          <p className='flex font-serif text-xs lowercase'>{groupName.slice(0,4)}</p>
        </div>

    </motion.div>
  )
}

export default groupIcon