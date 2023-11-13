import React,{useState} from 'react'
import "../../index.css"
import Login from "./Login"
import SignUp from "./SignUp"
import { motion } from "framer-motion"
import chaticon from "../../assets/chaticon.png"
import { slideAnimation,headTextAnimation,headContentAnimation } from '../../configs/motion'
const gradient = "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

const LoginSignUp = () => {

  {/*STATE VARIABLE FOR TABS CHANGE*/}
  const [value,setValue] = useState("Login")

  {/*FUNCTIONS TO HANDLE TAB CHANGE*/}
  const handleClickLogin = () => {
    setValue("Login")
  }
  const handleClickSignUp = () => {
    setValue("SignUp")
  }
  return (

    // LOGIN SIGNUP SCREEN //
    <div className='flex mx-auto '>

        {/* LOGIN SIGNUP FORM AREA */}
        <div 
            className='mx-auto min-w-[100%] lg:min-w-[40%] px-[3%] py-[2%] md:py-[6%]'
            >

          {/* HEADING BRAND AND NAME */}
          <motion.div className=' flex flex-col items-center' {...headTextAnimation}>
              <img 
                src='https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png' 
                alt='brand' 
                className='w-[15%] mr-[2%]  flex md:hidden'
                />
              <h1 className={`text-6xl  font-serif ${gradient} bg-clip-text  text-transparent`}>Chat App</h1>
              <p className='text-xs ml-[2%] text-sky-300'>By Shubhat Rashid .</p>
          </motion.div>
          
          {/* FORM AREA */}
          <div className='my-[10%] h-[50px]'>

            {/* TABS */}
            <div className='flex font-serif h-[50px]'>
              <motion.button 
                {...slideAnimation('left',0.1)}
                onClick={handleClickLogin} 
                className={`mx-auto border rounded-lg border-indigo-500 w-[150px] border hover:bg-emerald-200 hover:text-lg ${value==="Login" && "bg-emerald-100"}`}
                >
                  Login
                </motion.button>
              <motion.button 
                {...slideAnimation('right',0.1)}
                onClick={handleClickSignUp} 
                className={`mx-auto border rounded-lg border-indigo-500 w-[150px] border hover:bg-emerald-200 hover:text-lg ${value==="SignUp" && "bg-emerald-100"}`}
                >
                  SignUp
                </motion.button>
            </div>

            <div>
              {value === "Login"? <Login/> : <SignUp/>}
            </div>

          </div>
        </div>

        {/* THIS IS THE IMAGE AREA OF THE LOGIN-SIGNUP SCREEN */}
        <motion.div 
          className='mainImage mx-auto hidden md:flex items-center min-w-[60%] px-[3%] min-h-screen resize-y'
          {...slideAnimation("right")}>
          <motion.img 
            className='mx-auto bg-white rounded-3xl' 
            alt='logo' 
            src={chaticon}
            {...headContentAnimation}
          />
        </motion.div>
    </div>
  )
}

export default LoginSignUp