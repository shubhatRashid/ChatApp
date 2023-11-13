import React from 'react'
import { gradient} from "../constants"
import {motion} from 'framer-motion'
import { fadeAnimation, headContainerAnimation, slideAnimation } from '../configs/motion'
import Button from './Button'
import chatIcon from "../assets/chaticon.png"
const Sidebar = ({homeFun,chatFun,searchFun,logoutFun}) => {
  
  return (
    <div>
        <div className='w-[55px] h-[100%] flex flex-col justify-around'>
            <motion.div className='flex flex-col h-[25%] py-[4%]' {...slideAnimation('left',0.4)}>
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
        

            {/* UPPER ICON BUTTONS */}
            <motion.div className='flex flex-col gap-[5%] items-center' {...slideAnimation('left',0.5)}>
              <Button src="https://cdn.lordicon.com/kxoxiwrf.json" size= '45px' clickFun={homeFun}/>
              <Button src="https://cdn.lordicon.com/mjmrmyzg.json" size = '45px' clickFun={chatFun} />
              <Button src="https://cdn.lordicon.com/zniqnylq.json" size= '45px' clickFun={searchFun} />
            </motion.div>

            {/* LOGOUT BUTTON ICON */}
            <motion.div  className='flex flex-col-reverse h-[30%] items-center' {...slideAnimation('left',0.6)}>
              <Button src="https://cdn.lordicon.com/hcuxerst.json" size ='45px' clickFun={logoutFun} />
            </motion.div>
        </div>
    </div>
  )
}

export default Sidebar