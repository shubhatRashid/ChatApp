import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation } from '../configs/motion';
import {CircleUser, CircleUserRound, User} from "lucide-react"
import { gradient } from '../constants';

const Chat = ({src,name,subText,index,count}) => {
  return (
    <motion.div 
      className={`${count > 0 && 'border-teal-500 animate-pulse'}
                 flex w-[90%] rounded-lg mx-[2%] 
                 border-b border-neutral-700 shadow-md  my-[2%] relative p-1`}
                 {...slideAnimation("up",index/4)}
      
    >
        <div className='w-[15%] h-[15%] my-[2%] ml-[2%] '>
          <CircleUser/>
        </div>
        <div className='font-sans flex flex-col items-start  my-auto ml-[3%]'>
            <h2 className=' text-sm capitalize'>{name}</h2>
            <p className=' text-[10px] text-gray-400 italic'>{subText.substring(0,40)} ...</p>
        </div>

        {count?
        <div className='absolute right-10 top-0 bottom-0 flex flex-col justify-center'>
          <p className='animate-pulse font-serif text-xs italic flex justify-center shadow shadow-cyan-500/50 rounded-full h-[20px] w-[20px] bg-black'>{count}</p>
        </div>
        :<></>}
    </motion.div>
  )
}

export default Chat