import React from 'react'
import { gradient} from "../constants"
import Button from './Button'
const Sidebar = ({homeFun,chatFun,searchFun,logoutFun}) => {
  return (
    <div>
        <div className='w-[55px] h-[100%] flex flex-col justify-around'>
            <div className='flex flex-col h-[25%] py-[4%]'>
                <img src='https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png' alt='brand' className=''/>
                <p className={`font-serif text-xs ${gradient} bg-clip-text  text-transparent`}>Chat App</p>
            </div>
        

            {/* UPPER ICON BUTTONS */}
            <div className='flex flex-col gap-[5%] items-center'>
              <Button src="https://cdn.lordicon.com/kxoxiwrf.json" size= '45px' clickFun={homeFun}/>
              <Button src="https://cdn.lordicon.com/mjmrmyzg.json" size = '45px' clickFun={chatFun} />
              <Button src="https://cdn.lordicon.com/zniqnylq.json" size= '45px' clickFun={searchFun} />
            </div>

            {/* LOGOUT BUTTON ICON */}
            <div  className='flex flex-col-reverse h-[30%] items-center'>
              <Button src="https://cdn.lordicon.com/hcuxerst.json" size ='45px' clickFun={logoutFun} />
            </div>
        </div>
    </div>
  )
}

export default Sidebar