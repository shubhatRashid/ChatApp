import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation } from '../configs/motion'
import ShowMedia from './ShowMedia'
import { gradient } from '../constants'

const ChatBubble = ({message,position}) => {
    const convertData = (isoDate) => {
        const date = new Date(isoDate);
        const istTime = date.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
         // 24-hour format
            hour: "2-digit",
            minute: "2-digit"
        });

        return istTime
        };


  return (
    <motion.div  
        className="flex space-x-4 mr-[1%] " 
        {...slideAnimation(position === 'start' ? 'left' : 'right')}
        style={{justifyContent:position}}
    >
        <div className={`${position==="end"?"hidden":"flex"} flex-col w-[25px] h-[25px] ml-2`}>
            <img  className= 'rounded-full border' src={message.sender.pic} alt='not found'/>
        </div>
        <div 
            className={`
                        rounded-lg ${position==="end"?"rounded-tr-none":"rounded-tl-none"} 
                        max-w-[70%] min-w-[10%] mt-5`}
        >   
            <div 
                className={`py-1 px-2   
                            ${position === 'start'
                            ? 
                            'bg-gradient-to-r from-pink-700 to-purple-700 rounded-b-xl rounded-r-xl' 
                            : 
                            'bg-neutral-600 rounded-t-xl rounded-l-xl'}`}>
            {
                message.messageType === 'text' ? 
                    <p 
                        className='text-sm text-wrap m-2 font-bold'
                    >{message.content}</p>
                :
                    <ShowMedia mediaType={message.messageType} mediaUrl={message.content} mediaName = {message.mediaName}/>
            }
            </div>
             <p className={`flex justify-end items-center w-full  font-bold text-[8px] mt-2 text-gray-400`}>{convertData(message.updatedAt)} :</p>
            
        </div>
    </motion.div>
    )
}

export default ChatBubble