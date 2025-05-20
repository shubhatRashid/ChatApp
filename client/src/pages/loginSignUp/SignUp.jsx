import React, { useState } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import {motion} from "framer-motion"
import { slideAnimation } from '../../configs/motion';

const SignUp = () => {
   // INITIAL VALUES FOR FORM IN FORMIK
   const  initialValues={ name:'',email: '', password: '',confirmPassword:''}

   // FOR NAVIGATING BETWEEN DIFF ROUTES
   const navigate = useNavigate();
   const [showPass,setShowPass] = useState(false)

   // VALIDATION SCHEMA FOR FORM IN FORMIK
   const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
   };
   const schema = yup.object().shape({
    name: yup.string()
        .required("You must enter a name"),
    email: yup.string()
        .email()
        .required("Please enter an email"),
    password: yup.string()
        .required("Please enter a password")
        
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: yup.string()
        .required("Please re-type your password")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of password.
        .oneOf([yup.ref("password")], "Passwords does not match")
  }); 
  
  // API CALL FUNCTION FOR USER REGISTRATION TOWARDS BACKEND REST API
  const handleFormSubmit = async (values) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/users/signup`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json()
          
        // IF ALL CREDENTIALS ARE OK 
        if (response.ok){
            toast.success("Successfully Registered", toastTheme);
            setTimeout(()=>{ window.location.reload()},500)
            navigate('/')

        // IF EMAIL ALREADY EXISTS
        }else{
            toast.success("Email already registered", toastTheme);
        }
    
    } catch (error) {
        toast.success(error, toastTheme);
    }
   
    
  }
  return (
    <div className='mx-[2%] my-[4%]'>

        {/* USING FORMIK FOR FORM HANDLING */}
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
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} className='flex flex-wrap justify-between'>

                    {/*NAME INPUT*/}
                    <motion.div className='flex flex-col mt-[5%] min-w-[100%]' {...slideAnimation('left',0.2)}>
                        <p className='m-[1%]  text-md'>Name</p>
                        <input
                            className='rounded-lg h-[50px] pl-[4%] bg-neutral-600 outline-none'
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Please enter Your Name'
                        />
                       <p className='text-red-500 mx-[1%] text-xs'>{errors.name && touched.name && errors.name}</p> 
                    </motion.div>

                    {/*EMAIL INPUT*/}
                    <motion.div className='flex flex-col my-[5%] min-w-[100%]' {...slideAnimation('left',0.3)}>
                        <p className='m-[1%]  text-md'>Email</p>
                        <input
                            className='rounded-lg h-[50px] pl-[4%] bg-neutral-600 outline-none'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Please enter an email'
                        />
                       <p className='text-red-500 mx-[1%] text-xs'>{errors.email && touched.email && errors.email}</p> 
                    </motion.div>

                    {/*PASSWORD INPUT*/}
                    <motion.div className='flex flex-col mb-[5%] min-w-[45%]' {...slideAnimation('left',0.4)}>
                        <p className='m-[1%] text-md'>Password</p>
                        <input
                            className='rounded-lg h-[50px] pl-[4%] bg-neutral-600 outline-none'
                            type={showPass?'text':'password'}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Enter your password'
                        />
                        <p className='text-red-500 mx-[1%] text-xs'>{errors.password && touched.password && errors.password}</p>
                        <div className='flex gap-1 m-1'>
                            <input type='checkbox' className='' onChange={()=> setShowPass(!showPass)}/>
                            <label className='text-xs text-gray-400'>show password</label>
                        </div>
                        
                    </motion.div>

                    {/*CONFIRM PASSWORD INPUT*/}
                    <motion.div className='flex flex-col mb-[5%] min-w-[45%]' {...slideAnimation('right',0.5)}>
                        <p className='m-[1%] text-md'>Confirm Password</p>
                        <input
                            className='rounded-lg h-[50px] pl-[4%] bg-neutral-600 outline-none'
                            type={showPass?'text':'password'}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder='Confirm your password'
                        />
                        <p className='text-red-500 mx-[1%] text-xs'>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                    </motion.div>

                    {/*SUBMIT BUTTON*/}
                    <motion.button 
                    {...slideAnimation('left',0.6)}
                    type="submit" 
                    disabled={isSubmitting}
                    className='text-black font-serif mx-[1%] mb-[2%] border px-[4%] py-[1%] rounded-lg bg-emerald-200 hover:bg-emerald-100 hover:text-lg max-h-[50px] '>
                        Submit
                    </motion.button>
                </form>
            )}
        </Formik>
       

    </div>
  )
}

export default SignUp