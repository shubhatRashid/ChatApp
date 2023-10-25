import React from 'react'

const Chat = ({src,name,subText}) => {
  return (
    <div className='flex rounded-lg mx-[2%] bg-white  my-[2%]'>
        <div className='w-[15%] h-[15%] my-[2%] ml-[2%]'>
            <img  className= 'rounded-full' src={src} alt='' />
        </div>
        <div className='flex flex-col items-start  my-auto ml-[3%]'>
            <h2 className='font-serif text-sm capitalize'>{name}</h2>
            <p className='font-serif text-xs text-gray-400 italic'>{subText.substring(0,40)} ...</p>
        </div>
    </div>
  )
}

export default Chat