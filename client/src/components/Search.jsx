import React from 'react'
import Button from './Button'

const Search = ({placeholder,handleSearch,handleClick,handleChange,value}) => {
  return (
    <div className='w-[100%] flex items-center bg-gray-200  border shadow-md px-[2%] rounded-lg'>
      <form onSubmit={handleSearch} className='flex relative w-[100%]'>
        <input 
        value={value} 
        onChange={handleChange} 
        placeholder={placeholder} 
        type='search' 
        className='w-[100%] px-[2%] py-[1.5%] rounded-lg bg-transparent' 
        />
        <Button src='https://cdn.lordicon.com/zniqnylq.json' size='25px' clickFun={handleClick}/>
        </form>
    </div>
  )
}

export default Search
