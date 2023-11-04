import React, {useEffect, useState } from 'react'
import ChatBubble from '../../components/ChatBubble'
import Search from '../../components/Search'
import Button from '../../components/Button'
import { ChatState } from '../../context/ChatProvider'
import UpdateGroup from './UpdateGroup'
import { toast } from 'react-toastify';
import { fetchChatName, toastTheme } from '../../constants';
import io from "socket.io-client"
import Lottie from "react-lottie"
import animationData from "../../assets/typing.json"
import Chat from '../../components/Chat'

// VARIABLES FOR SOCKET CONNECTION //
const ENDPOINT = process.env.REACT_APP_SERVER_PORT
var socket,selectedChatCompare;

const CurrentChat = ({showSidebar,usersDiv,seeChat,isStart,setClickedNotification}) => {
  const {user,selectedChat,setSelectedChat,messages,setMessages,notification,setNotification} = ChatState()
  const [showUpdateDiv,setShowUpdateDiv] = useState(false)
  const [newMessage,setNewMessage] = useState("")
  const [socketConnected,setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showNotification,setShowNotification] = useState(false)

  // CODE TO SETUP SOCKET.IO
  useEffect(() => {
    selectedChatCompare = selectedChat
    
    socket = io(ENDPOINT)
    socket.emit("setup",user)
    socket.on('connected',() => setSocketConnected(true))

  },[selectedChat])

  // PUT THE RECEIVED MESSAGE INSIDE MESSAGES STATE
  useEffect(() => {

    socket.on("message received",(newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){

        // give notification
        if (!notification.includes(newMessageReceived)){
          setNotification([...notification,newMessageReceived])
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
            },2000)
        }

      }else{
        setMessages([...messages,newMessageReceived])
      }
    })

  },[notification,messages])

  // FUNCTION TO HANDLE CHANGE IN REPLY INPUT //
  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  // FUNCTION TO SEND A NEW MESSAGE TO DATABASE
  const sendMessage = async() => {

    try {
      const URL = `${process.env.REACT_APP_SERVER_PORT}/api/messages`
      const body = {
        chatId:selectedChat._id,
        content:newMessage
      }
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
      socket.emit("new message",response) // sending new message into the room using socket
      
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
  
  // FUNCTION FOR REACT LOTTIE ANIMATION
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // FUNCTION FOR NOTIFICATION CLICK //
  const clickNotif = (notification) => {
    setSelectedChat(notification.chat)
    setShowNotification(!showNotification)
    setClickedNotification(true)
  }

  return (
    selectedChat ?
    
    <div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'} relative flex-col justify-between min-w-[40%] w-screen  bg-green-50 my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%] pt-[1%] border`}>
      <UpdateGroup show={showUpdateDiv} setShow={setShowUpdateDiv} />

    {/*ALL NOTIFICATIONS OF LOGGED IN USER*/}
    <div className={`${showNotification?"flex":"hidden"} flex-col  overflow-y-auto absolute top -20 left-20 right-20 z-10 border rounded-lg bg-white`}>
        {!notification.length?"No notifications":notification.map((notification) => (
          <button onClick={() =>clickNotif(notification)}>
            <Chat src={notification.sender.pic }
            name={notification.sender.name} 
            key = {notification._id} 
            subText = {notification.content}
            />
          </button>
        ))}
    </div>

    {/* SEARCH IN CHAT */}
    <div className='flex my-[1%]'>
        <Search placeholder='Search in chat...' />
        {/* SIDE BAR SHOW BUTTON */}
        <div className='flex sm:hidden flex items-center justify-end w-[15%] bg-white'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </div>
    
    <div className='border h-[80%]  rounded-lg bg-white'>

          {/* NAME AND PHOTO */}
          <div className='flex items-center justify-between  border-b-4 rounded-lg h-[15%] pr-[1%]'>
                <div className='flex items-center  my-[2%] ml-[2%]'>
                  <img  className= 'rounded-full w-[50px] h-[50px]' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                  <h2 className='font-serif text-sm ml-[10%] w-[200px] capitalize font-bold ' >{fetchChatName(selectedChat,user)}</h2>
                </div>
                {
                  selectedChat.isGroupChat && selectedChat.groupAdmin._id===user._id? 
                  <Button src="https://cdn.lordicon.com/wizuwpye.json"  size="60px" clickFun={() => {setShowUpdateDiv(true)}}/>
                  :
                  <></>
                }

                {/*  NOTIFICATION BUTTON */}
                <div className={`${notification.length > 0?"flex":"hidden"} items-center bg-white pr-[2%] rounded-r-lg relative `}>
                <span class="animate-ping absolute top-0 right-4 inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <div className='rounded-full text-2xl'>
                    <button onClick={() => setShowNotification(!showNotification)} trigger={"loop"}>🔔</button>
                  </div>
                </div>
                
          </div>
         
          {/* CURRENT CHATS */}
          <div className='h-[85%] flex flex-col-reverse overflow-y-auto'>
                <div>
                  {isTyping?
                    <div>
                        <Lottie 
                          options={defaultOptions}
                          width={120}
                          style={{marginBottom:15,marginLeft:30}}
                        />
                    </div>
                  :<></>}
                </div>
                <div>
                      {/* SENDER'S CHAT BUBBLE */}
                      {messages.map((message) => (
                        <ChatBubble key={message._id} message={message} position={message.sender._id===user._id?"end":"start"} />
                      ))}
                </div>
          </div>
    </div>
    
      
    {/* REPLY */}
    <form className='flex justify-around items-center my-[1%]' onSubmit={handleSubmit}>
      <form className='flex pt-[5px] space-x-2'>
        <Button  src="https://cdn.lordicon.com/fxylrfia.json" size= '30px' clickFun={(e) => {e.preventDefault()}}/>
        <Button   src="https://cdn.lordicon.com/brtridhw.json" size= '30px'  clickFun={(e) => {e.preventDefault()}} />
      </form>
      
      <p className='text-2xl'>|</p>
      <input value={newMessage} onChange={handleChange}  placeholder='Message here...' type='search' className='h-[40px] w-[60%] px-[2%] rounded-lg bg-transparent'/>
      <button type="submit" className='flex items-center bg-sky-500 h-[30px] px-[1%] mx-[1%] rounded-lg font-serif text-white'>
       <p>Send</p>
       <p>➡️</p>
      </button>
    </form>

</div>

:
    <div className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'}  flex-col justify-center items-center min-w-[40%] w-screen  bg-white  my-[2%] mx-[1%] rounded-lg ml-[2%]  relative`}>
      <img className='max-w-full h-auto rounded-lg bg-transparent mb-[4%]' src= "https://i.pinimg.com/originals/07/39/61/0739613927cfc7c51d6b352119cd7294.gif" alt=''/>
      <p className={`${isStart?"flex":"hidden"} absolute z-10 bottom-[10%] left-[40% border rounded-lg p-[3%] font-serif text-lg font-bold bg-white text-yellow-500`}>Please select a chat to begin ...</p>
    </div>
  )
}

export default CurrentChat