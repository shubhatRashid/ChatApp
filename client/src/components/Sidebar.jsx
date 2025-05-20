import React from 'react'
import {motion} from 'framer-motion'
import { slideAnimation } from '../configs/motion'
import { Home, LogOut, NotebookTabs, Search } from 'lucide-react'
const Sidebar = ({homeFun,chatFun,searchFun,logoutFun}) => {
  
  return (
        <div 
          className='absolute bottom-0 left-0 sm:relative z-10 sm:z-0  
                      flex sm:flex-row flex-col justify-around h-[70px] sm:h-full w-full sm:w-[70px] 
                      rounded-none sm:rounded-xl bg-neutral-900 text-white'>
        
            {/* UPPER ICON BUTTONS */}
            <motion.div className='flex flex-row sm:flex-col gap-5 items-center justify-center' {...slideAnimation('left',0.5)}>
              <button onClick={homeFun}><Home/></button>
              <button onClick={searchFun}><Search/></button>
            </motion.div>

        </div>
  )
}

export default Sidebar