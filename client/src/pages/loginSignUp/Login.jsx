import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';

const Login = () => {
   
   // FOR NAVIGATING BETWEEN DIFF ROUTES
   const navigate = useNavigate()

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
        const response = await fetch('http://localhost:5000/api/user/login', {
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
            toast.success("Successfully logged in", toastTheme);
            setTimeout(()=>{ window.location.reload()},1000)
           
     
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
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} className='flex flex-col items-start'>

                    {/* EMAIL INPUT */}
                    <div className='flex flex-col my-[5%] min-w-[100%]'>
                        <p className='font-serif m-[1%]  text-xl'>Email Address :</p>
                        <input
                            className='border rounded-lg h-[50px] pl-[4%] border-indigo-500'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Please enter an email'
                        />
                       <p className='text-red-500 mx-[1%] text-xs'>{errors.email && touched.email && errors.email}</p> 
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className='flex flex-col mb-[5%] min-w-[100%]'>
                        <p className='font-serif m-[1%] text-xl'>Password :</p>
                        <input
                            className='border rounded-lg h-[50px] pl-[4%] border-indigo-500'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Enter your password'
                        />
                        <p className='text-red-500 mx-[1%] text-xs'>{errors.password && touched.password && errors.password}</p>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className='font-serif mx-[1%] border px-[4%] py-[1%] rounded-lg bg-emerald-200 hover:bg-emerald-100 hover:text-lg'>
                        Submit
                    </button>
                </form>
            )}
        </Formik>

    </div>
  )
}

export default Login