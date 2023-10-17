import React, {useEffect, useState } from 'react'
import ChatBubble from '../../components/ChatBubble'
import Search from '../../components/Search'
import Button from '../../components/Button'
import { ChatState } from '../../context/ChatProvider'
import UpdateGroup from './UpdateGroup'
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';

const CurrentChat = ({showSidebar,usersDiv,seeChat,isStart}) => {
  const {user,selectedChat,messages,setMessages} = ChatState()
  const [showUpdateDiv,setShowUpdateDiv] = useState(false)
  const [newMessage,setNewMessage] = useState("")

  // FUNCTION TO SEND A NEW MESSAGE TO DATABASE
  const sendMessage = async() => {
    try {
      const URL = 'http://localhost:5000/api/messages'
      const body = {
        chatId:selectedChat._id,
        content:newMessage
      }
      console.log(body)
      const headers = { 
          "content-type" : "application/json",
          'Authorization': `Bearer ${user.token}` };
      var response = await fetch(URL, {
          method:"POST",
          body:JSON.stringify(body),
          headers:headers
      })
      response = await response.json()
      setMessages([...messages,response])
      
    } catch (error) {
        toast.error(error.message,toastTheme)
    }
  }
  // FUNCTION TO SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
    setNewMessage("")
  }
 
  return (
    selectedChat ?
    
    <div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'} relative flex-col justify-between min-w-[40%] w-screen  bg-green-50 my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%] pt-[1%]`}>
    <UpdateGroup show={showUpdateDiv} setShow={setShowUpdateDiv} />

    {/* SEARCH IN CHAT */}
    <div className='flex my-[1%]'>
        <Search placeholder='Search in chat...' />
        <div className='flex sm:hidden flex items-center justify-end w-[15%] bg-white'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </div>
    
    <div className='border h-[80%]  rounded-lg bg-white '>

          {/* NAME AND PHOTO */}
          <div className='flex items-center justify-between  border-b-4 rounded-lg h-[15%] pr-[1%]'>
                <div className='flex items-center  my-[2%] ml-[2%]'>
                  <img  className= 'rounded-full w-[50px] h-[50px]' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                  <h2 className='font-serif text-sm ml-[10%] w-[200px] capitalize' >{selectedChat.chatName}</h2>
                </div>
                {
                  selectedChat.isGroupChat && selectedChat.groupAdmin._id===user._id? 
                  <Button src="https://cdn.lordicon.com/wizuwpye.json"  size="60px" clickFun={() => {setShowUpdateDiv(true)}}/>
                  :
                  <></>
                }
                
          </div>
         
          {/* CURRENT CHATS */}
          <div className='h-[85%] flex flex-col-reverse overflow-y-auto'>
                <div>
                      {/* SENDER'S CHAT BUBBLE */}
                      {messages.map((message) => (
                        <ChatBubble key={message._id} message={message} position={message.sender._id===user._id?"end":"start"} />
                      ))}
                </div>
          </div>
    </div>
    

    {/* REPLY */}
    <form className='flex justify-around items-center mb-[1%]' onSubmit={handleSubmit}>
      <div className='flex pt-[5px] space-x-2'>
        <Button  src="https://cdn.lordicon.com/fxylrfia.json" size= '30px' clickFun={() =>{}} />
        <Button   src="https://cdn.lordicon.com/brtridhw.json" size= '30px' clickFun={() =>{}} />
      </div>
      
      <p className='text-2xl'>|</p>
      <input value={newMessage} onChange={(e) =>{setNewMessage(e.target.value)}} placeholder='Message here...' type='search' className='h-[40px] w-[60%] px-[2%] rounded-lg bg-transparent'/>
      <button type="submit" className='flex items-center bg-sky-500 h-[30px] px-[1%] mx-[1%] rounded-lg font-serif text-white'>
       <p>Send</p>
       <p>➡️</p>
      </button>
    </form>

</div>

:
    <div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'}  flex-col justify-center items-center min-w-[40%] w-screen  bg-white  my-[2%] mx-[1%] rounded-lg ml-[2%]  relative`}>
      <img className='max-w-full h-auto rounded-lg bg-transparent mb-[4%]' src= "https://i.pinimg.com/originals/07/39/61/0739613927cfc7c51d6b352119cd7294.gif" />
      <p className={`${isStart?"flex":"hidden"} absolute z-10 bottom-[10%] left-[40% border rounded-lg p-[3%] font-serif text-lg font-bold bg-white text-yellow-500`}>Please select a chat to begin ...</p>
    </div>
  )
}

export default CurrentChat