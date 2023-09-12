import React from 'react'

const groupIcon = ({src}) => {
  return (
    <div className='min-w-[10%] max-w-[15%] my-[2%] mx-[3%] flex flex-col items-center'>
        <img className='rounded-full my-[3%]' src={src} alt='' />
        <p className='font-serif text-xs'>Group</p>
    </div>
  )
}

export default groupIcon