import React from 'react'

const groupIcon = ({src,groupName,clickFun}) => {
  return (
    <div className='w-[50px] my-[2%] mx-[3%] flex flex-col items-center'>
        <button onClick={clickFun}>
          <img className='rounded-full my-[3%] border' src={src} alt='' />
        </button>
        <div className='flex items-center w-[100%] h-[100%] justify-around '>
          <p className='font-serif text-xs'>{groupName}</p>
        </div>
    </div>
  )
}

export default groupIcon