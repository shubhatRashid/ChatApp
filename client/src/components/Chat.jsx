import React from 'react'

const Chat = ({src,name,lastMessage}) => {
  return (
    <div className='flex rounded-lg mx-[2%] bg-white  my-[2%]'>
        <div className='w-[15%] h-[15%] my-[2%] ml-[2%]'>
            <img  className= 'rounded-full' src={src} alt='' />
        </div>
        <div className='flex flex-col my-auto ml-[3%]'>
            <h2 className='font-serif text-sm'>{name}</h2>
        <p className='font-serif text-xs'>{lastMessage}</p>
        </div>
    </div>
  )
}

export default Chat