import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation } from '../configs/motion';

const Chat = ({src,name,subText,index}) => {
  return (
    <motion.div className='flex rounded-lg mx-[2%] bg-[#232D3F]  my-[2%]' {...slideAnimation("up",index/4)}>
        <div className='w-[15%] h-[15%] my-[2%] ml-[2%]'>
            <img  className= 'rounded-full' src={src} alt='' />
        </div>
        <div className='flex flex-col items-start  my-auto ml-[3%]'>
            <h2 className='font-serif text-sm capitalize'>{name}</h2>
            <p className='font-serif text-xs text-gray-400 italic'>{subText.substring(0,40)} ...</p>
        </div>
    </motion.div>
  )
}

export default Chat