import React from 'react'

const ChatBubble = ({message,position}) => {
  return (
    <div className={`flex justify-${position} py-[0.3%] px-[0.5%] space-x-4 mr-[1%] `}>
        <div className={`${position==="end"?"hidden":"flex"} w-[25px] h-[25px] my-[1%] ml-[2%]`}>
            <img  className= 'rounded-full border' src={message.sender.pic} alt='not found' />
        </div>
        <div className={`${position==="start"?"bg-green-100 text-black":"bg-[#116D6E] text-white"} border  rounded-lg ${position==="end"?"rounded-tr-none":"rounded-tl-none"} mx-[2%]  my-[0.5%] p-[1%] max-w-[70%]`}>
            <p className={`${position==="end"?"hidden":""} font-sans text-[8px]`}>{message.sender.name} :</p>
            <p className='font-serif text-sm '>{message.content}</p>
        </div>
    </div>
    )
}

export default ChatBubble