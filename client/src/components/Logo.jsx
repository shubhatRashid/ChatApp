import React from 'react'
import chatIcon from "../assets/chaticon.png"
import { gradient } from '../constants'
import { slideAnimation } from '../configs/motion'
import { motion } from 'framer-motion'

const Logo = () => {
  return (
    <motion.div className='hidden sm:flex flex-col w-[70px] bg-neutral-900 p-2 pb-3 rounded-xl' {...slideAnimation('left',0.4)}>
        <motion.img 
            src={chatIcon} 
            alt='brand' 
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            />
        <p className={`font-serif text-xs ${gradient} bg-clip-text  text-transparent`}>Chat App</p>
    </motion.div>
  )
}

export default Logo