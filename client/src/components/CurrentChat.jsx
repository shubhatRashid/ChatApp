import React, { useEffect, useState } from 'react'
import ChatBubble from './ChatBubble'
import Search from './Search'
import Button from './Button'
import { ChatState } from '../context/ChatProvider'

const CurrentChat = ({showSidebar,usersDiv,seeChat,isStart}) => {
  const {chats,selectedChat,setSelectedChat} = ChatState()

  return (
    selectedChat ?
    
    <div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'}  flex-col justify-between min-w-[40%] w-screen  bg-green-50 my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%] pt-[1%]`}>

    {/* SEARCH IN CHAT */}
    <div className='flex my-[1%]'>
        <Search placeholder='Search in chat...' />
        <div className='flex sm:hidden flex items-center justify-end w-[15%] bg-white'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </div>
    
    <div className='border h-[80%]  rounded-lg bg-white '>

          {/* NAME AND PHOTO */}
          <div className='flex items-center border-b-4 rounded-lg h-[15%] '>
                <div className='w-[50px] h-[50px] my-[2%] ml-[2%]'>
                  <img  className= 'rounded-full' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                </div>
                <div className='flex items-center ml-[3%]'>
                  <h2 className='font-serif text-sm' >{selectedChat.chatName}</h2>
                </div>
          </div>
         
          {/* CURRENT CHATS */}
          <div className='h-[85%] flex flex-col overflow-y-auto'>

                {/* SENDER'S CHAT BUBBLE */}
                <ChatBubble position={"start"}/>
                <ChatBubble position={"end"}/>
                <ChatBubble position={"start"}/>
                <ChatBubble position={"end"}/>
                <ChatBubble position={"start"}/>
 
          </div>
    </div>
    

    {/* REPLY */}
    <div className='flex justify-around items-center mb-[1%]'>
      <div className='flex pt-[5px] space-x-2'>
        <Button  src="https://cdn.lordicon.com/fxylrfia.json" size= '30px' clickFun={() =>{}} />
        <Button   src="https://cdn.lordicon.com/brtridhw.json" size= '30px' clickFun={() =>{}} />
      </div>
      
      <p className='text-2xl'>|</p>
      <input  onChange={() =>{}} placeholder='Message here...' type='search' className='h-[40px] w-[60%] px-[2%] rounded-lg bg-transparent'/>
      <button className='flex items-center bg-sky-500 h-[30px] px-[1%] mx-[1%] rounded-lg font-serif text-white'>
       <p>Send</p>
       <p>➡️</p>
      </button>
    </div>

</div>

:
<div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'}  flex-col justify-center items-center min-w-[40%] w-screen  bg-white  my-[2%] mx-[1%] rounded-lg ml-[2%]  relative`}>
      <img className='max-w-full h-auto rounded-lg bg-transparent mb-[4%]' src= "https://i.pinimg.com/originals/07/39/61/0739613927cfc7c51d6b352119cd7294.gif" />
      <p className={`${isStart?"flex":"hidden"} absolute z-10 bottom-[10%] left-[40% border rounded-lg p-[3%] font-serif text-lg font-bold bg-white text-yellow-500`}>Please select a chat to begin ...</p>
    </div>
  )
}

export default CurrentChat