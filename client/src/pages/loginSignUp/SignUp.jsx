import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';

const SignUp = () => {
   const  initialValues={ email: '', password: '',confirmPassword:'' }
   const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
   };
   const schema = yup.object().shape({
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
        // use "ref" to get the value of passwrod.
        .oneOf([yup.ref("password")], "Passwords does not match"),
  });

  return (
    <div className='mx-[2%] my-[4%]'>
        <Formik
            initialValues={initialValues}
            validationSchema ={schema}
            onSubmit={(values) => (console.log(values))}
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
                    <div className='flex flex-col mb-[5%] min-w-[100%]'>
                        <p className='font-serif m-[1%] text-xl'>Confirm Password :</p>
                        <input
                            className='border rounded-lg h-[50px] pl-[4%] border-indigo-500'
                            type="Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder='Confirm your password'
                        />
                        <p className='text-red-500 mx-[1%] text-xs'>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                    </div>
                    <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className='mx-[1%] mb-[2%] border px-[4%] py-[1%] rounded-lg bg-emerald-200 hover:bg-emerald-100 hover:text-lg '>
                        Submit
                    </button>
                </form>
            )}
        </Formik>

    </div>
  )
}

export default SignUp