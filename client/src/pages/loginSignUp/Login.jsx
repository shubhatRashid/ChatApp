import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate()

   //INITIAL VALUES FOR FORM
   const  initialValues={ email: '', password: '' }

   //VALIDATION FOR FORM
   const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required("Please enter an email"),
    password: yup.string()
        .required("Please enter a password")
  });
  
   //FUNCTION FOR API CALL FOR  USER AUTHENTICATION
   const handleFormSubmit = async (values) => {
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json()
    console.log(result);
    navigate("/chats")
  }

  return (
    <div className='mx-[2%] my-[4%]'>
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
                    <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className='mx-[1%] border px-[4%] py-[1%] rounded-lg bg-emerald-200 hover:bg-emerald-100 hover:text-lg '>
                        Submit
                    </button>
                </form>
            )}
        </Formik>

    </div>
  )
}

export default Login