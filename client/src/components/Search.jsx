import React from 'react'
import Button from './Button'

const Search = ({placeholder}) => {
  return (
    <div className='w-[100%] flex items-center bg-white px-[2%] rounded-lg'>
        <Button src='https://cdn.lordicon.com/zniqnylq.json' size='25px' />
        <input  onChange={()=>{}} placeholder={placeholder} type='search' className='w-[100%] px-[2%] py-[1%] rounded-lg bg-transparent'/>
    </div>
  )
}

export default Search
