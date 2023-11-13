import React from 'react'
import {motion} from "framer-motion"
import {slideAnimation} from '../configs/motion';

const groupIcon = ({src,groupName,clickFun,index}) => {
  return (
    <motion.div 
      {...slideAnimation('left',index/4)}
      className='w-[50px] my-[2%] mx-[3%] flex flex-col items-center'
    >
        <button onClick={clickFun}>
          <img className='rounded-full my-[3%] border' src={src} alt='' />
        </button>
        <div className='flex items-center w-[100%] h-[100%] justify-around '>
          <p className='font-serif text-xs'>{groupName}</p>
        </div>

    </motion.div>
  )
}

export default groupIcon