import React from 'react'

const ChatBubble = ({position}) => {
  return (
    <div className={`flex justify-${position} py-[1%] px-[1%] space-x-4`}>
        <div className={`${position==="end"?"hidden":"flex"} w-[25px] h-[25px] my-[2%] ml-[2%]`}>
            <img  className= 'rounded-full border' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
        </div>
        <div className='mx-[3%] bg-[#116D6E] rounded-lg rounded-tl-none mx-[2%] text-white my-[2%] p-[2%]'>
            <p className='font-serif text-sm'>Hi! How are you</p>
        </div>
    </div>
    )
}

export default ChatBubble