import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation } from '../configs/motion'

const ChatBubble = ({message,position}) => {
  return (
    <div  className={`flex justify-${position} py-[0.3%] px-[0.5%] space-x-4 mr-[1%] `} >
        <div className={`${position==="end"?"hidden":"flex"} flex-col w-[25px] h-[25px] my-[1%] ml-[2%]`}>
            <img  className= 'rounded-full border' src={message.sender.pic} alt='not found'/>
        </div>
        <div className={`${position==="start"?"bg-green-300 text-black":"bg-gray-50 text-black"} border  rounded-lg ${position==="end"?"rounded-tr-none":"rounded-tl-none"} mx-[2%]  my-[0.5%] p-[1%] max-w-[70%]`}>
            <p className={`${position==="end"?"hidden":""} font-sans text-[8px]`}>{message.sender.name} :</p>
            <p className='font-serif text-sm text-wrap'>{message.content}</p>
        </div>
    </div>
    )
}

export default ChatBubble