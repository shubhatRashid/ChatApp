import React from 'react'
import {motion} from "framer-motion"
import { slideAnimation } from '../configs/motion'
import ShowMedia from './ShowMedia'

const ChatBubble = ({message,position}) => {
    const convertData = (isoDate) => {
        const date = new Date(isoDate);

        const istDate = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        });
        return istDate.split(' ')[1].slice(0,5)

    }
  return (
    <motion.div  
        className="flex py-[0.3%] px-[0.5%] space-x-4 mr-[1%]" 
        {...slideAnimation(position === 'start' ? 'left' : 'right')}
        style={{justifyContent:position}}
    >
        <div className={`${position==="end"?"hidden":"flex"} flex-col w-[25px] h-[25px] my-[1%] ml-[2%]`}>
            <img  className= 'rounded-full border' src={message.sender.pic} alt='not found'/>
        </div>
        <div className={`${position==="start"?"bg-green-300 text-black":"bg-gray-50 text-black"} border  rounded-lg ${position==="end"?"rounded-tr-none":"rounded-tl-none"} mx-[2%]  my-[0.5%] p-[1%] max-w-[70%]`}>
            <p className={`${position==="end"?"hidden":""} font-sans text-[8px]`}>{convertData(message.updatedAt)} :</p>
            {
                message.messageType === 'text' ? 
                    <p className='font-serif text-sm text-wrap'>{message.content}</p>
                :
                    <ShowMedia mediaType={message.messageType} mediaUrl={message.content} mediaName = {message.mediaName}/>
            }
            
        </div>
    </motion.div>
    )
}

export default ChatBubble