import React, { useState } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import {motion} from "framer-motion"
import { slideAnimation } from '../../configs/motion';

const Login = () => {
   // FOR NAVIGATING BETWEEN DIFF ROUTES
   const navigate = useNavigate()
   const [showPass,setShowPass] = useState(false)

   //INITIAL VALUES FOR FORM IN FORMIK
   const  initialValues={ email: '', password: '' }

   //VALIDATION FOR FORM IN FORMIK
   const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required("Please enter an email"),
    password: yup.string()
        .required("Please enter a password")
  });
  
   //FUNCTION FOR API CALL FOR  USER AUTHENTICATION CHECK
   const handleFormSubmit = async (values) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        const result = await response.json()

        // IF ALL CREDENTIALS ARE OK 
        if (response.ok){
            console.log(result)
            localStorage.setItem("userInfo",JSON.stringify(result))
            // For POPUPS
            toast.success("Logged in...", toastTheme);
            setTimeout(()=>{ window.location.reload()},500)
            navigate("/chats")
     
        // IF EMAIL OR PASSWORD IS WRONG
        }else{
            toast.warn(result.message, toastTheme);
        }

    } catch (error) {
        toast.success(error, toastTheme);
    }
  }

  return (
    <div className='mx-[2%] my-[4%]'>

        {/*  USING FORMIK FOR FORM HANDLING */}
        <Formik
            initialValues={initialValues}
            validationSchema ={schema}
            onSubmit={(values) => handleFormSubmit(values)}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

            }) => (
                <form onSubmit={handleSubmit} className='flex flex-col items-start'>

                    {/* EMAIL INPUT */}
                    <motion.div className='flex flex-col my-[5%] min-w-[100%]' {...slideAnimation("left")}>
                        <p className='font-serif m-[1%]  text-lg'>Email Address :</p>
                        <input
                            className='border rounded-lg h-[50px] pl-[4%]'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='please enter an email'
                        />
                       <p className='text-red-500 mx-[1%] text-xs'>{errors.email && touched.email && errors.email}</p> 
                    </motion.div>

                    {/* PASSWORD INPUT */}
                    <motion.div className='flex flex-col mb-[5%] min-w-[100%]' {...slideAnimation('left',0.2)}>
                        <p className='font-serif m-[1%] text-lg'>Password :</p>
                        <input
                            className='border rounded-lg h-[50px] pl-[4%]'
                            type={showPass?'text':'password'}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='enter your password'
                        />
                        <p className='text-red-500 mx-[1%] text-xs'>{errors.password && touched.password && errors.password}</p>
                        <div className='flex gap-1 m-1'>
                            <input type='checkbox' className='' onChange={()=> setShowPass(!showPass)}/>
                            <label className='text-xs text-gray-400'>show password</label>
                        </div>
                    </motion.div>

                    {/* SUBMIT BUTTON */}
                    <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className='font-serif mx-[1%] border px-[4%] py-[1%] rounded-lg bg-emerald-200 hover:bg-emerald-100 hover:text-lg text-black'
                    {...slideAnimation("left",0.3)}>
                        Submit
                    </motion.button>
                </form>
            )}
        </Formik>

    </div>
  )
}

export default Login