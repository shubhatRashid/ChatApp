import React from 'react'
import Button from './Button'
const UserProfile = ({user, showSidebar}) => {

  return (
    <div className='flex justify-between items-center h-[10%] border-b-4 rounded-lg mt-[1%]'>
        <div className='flex min-w-[75%] ml-[3%] justify-start'>
            <div className='w-[50px] h-[50px] ml-[2%]'>
              <img  className= 'rounded-full' src={user.pic} alt='' />
            </div>
            <div className='flex items-center ml-[3%]'>
                <h2 className='font-serif text-sm font-bold'>{user.name}</h2>
            </div>
        </div>
        <div className='flex sm:hidden flex items-center justify-end'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </div>
  )
}

export default UserProfile