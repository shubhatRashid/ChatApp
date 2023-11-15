import React, {useEffect, useState } from 'react'
import ChatBubble from '../../components/ChatBubble'
import Search from '../../components/Search'
import Button from '../../components/Button'
import { ChatState } from '../../context/ChatProvider'
import UpdateGroup from './UpdateGroup'
import { toast } from 'react-toastify';
import { fetchChatName, toastTheme } from '../../constants';
import io from "socket.io-client"
import animationData from "../../assets/typing.json"
import Chat from '../../components/Chat'
import {motion} from "framer-motion"
import { slideAnimation } from '../../configs/motion'
import {send,received,notify} from "../../assets"
const gradient = "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

// VARIABLES FOR SOCKET CONNECTION //
const ENDPOINT = process.env.REACT_APP_SERVER_PORT
var socket,selectedChatCompare;

const CurrentChat = ({showSidebar,usersDiv,seeChat,isStart,setClickedNotification}) => {
  const {user,selectedChat,setSelectedChat,messages,setMessages,notification,setNotification} = ChatState()
  const [showUpdateDiv,setShowUpdateDiv] = useState(false)
  const [newMessage,setNewMessage] = useState("")
  const [socketConnected,setSocketConnected] = useState(false)
  const [showNotification,setShowNotification] = useState(false)

  // FUNCTION TO FETCH ALL MESSAGES IN A PARTICULAR CHAT
const fetchCurrentChats = async(id) => {
  try {
    const URL = `${process.env.REACT_APP_SERVER_PORT}/api/messages/${id}`
    const headers = { 
        'Authorization': `Bearer ${user.token}` };
    var response = await fetch(URL, {
        method:"GET",
        headers:headers
    })
    response = await response.json()
    setMessages(response)
 
  } catch (error) {
      toast.error(error.message,toastTheme)
  }
}

  // CODE TO SETUP SOCKET.IO
  useEffect(() => {
    selectedChatCompare = selectedChat
    
    socket = io(ENDPOINT)
    socket.emit("setup",user)
    socket.on('connected',() => setSocketConnected(true))

  },[selectedChat])

  // GIVE NOTIFICATION OR DISPLAY MESSAGE
  useEffect(() => {

    socket.on("message received",async (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        // give notification
        if (!notification.includes(newMessageReceived)){

          new Audio(notify).play()
            .catch(error => {
                console.info('User has not interacted with document yet.');
            });

          setNotification([...notification,newMessageReceived])
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
            },2000)
        }

      }else{
        await fetchCurrentChats(newMessageReceived.chat._id)
        new Audio(received).play()
      }
    })

  },[])

  // FUNCTION TO HANDLE CHANGE IN REPLY INPUT //
  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  // FUNCTION TO SEND A NEW MESSAGE TO DATABASE
  const sendMessage = async() => {
    
    if (!newMessage){
      toast.warn("Type Something to send",toastTheme)
      return
    }
    
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

  // FUNCTION FOR NOTIFICATION CLICK //
  const clickNotif = (notification) => {
    setSelectedChat(notification.chat)
    setShowNotification(!showNotification)
    setNotification([])
    setClickedNotification(true)
  }

  return (
    selectedChat ?
    
    <motion.div 
      className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'} relative flex-col justify-between min-w-[40%] w-screen  bg-black my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%] pt-[1%] border`}
      {...slideAnimation('right',0.2)}
    >
      <UpdateGroup show={showUpdateDiv} setShow={setShowUpdateDiv} />

    {/*ALL NOTIFICATIONS OF LOGGED IN USER*/}
    <div className={`${showNotification?"flex":"hidden"} flex-col  overflow-y-auto absolute top-20 left-5 right-5 z-10 border rounded-lg bg-white`}>
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
    <motion.div className='flex my-[1%] gap-2' {...slideAnimation("down")}>
        <Search placeholder='Search in chat...' />
        {/* SIDE BAR SHOW BUTTON */}
        <div className='flex sm:hidden flex items-center justify-center w-[10%] bg-[#232D3F] rounded-lg'>
            <Button   src="https://cdn.lordicon.com/qjezzrrz.json" clickFun={showSidebar} size='45px' />
        </div>
    </motion.div>
    
    <div className='border h-[80%]  rounded-lg bg-[#232D3F]'>

          {/* NAME AND PHOTO */}
          <motion.div className='flex items-center justify-between  border-b-4 rounded-lg h-[15%] pr-[1%]' {...slideAnimation('down')}>
                <div className='flex items-center  my-[2%] ml-[2%]'>
                  <img  className= 'rounded-full w-[50px] h-[50px]' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                  <h2 className='font-serif text-sm ml-[10%] w-[200px] capitalize font-bold text-white ' >{fetchChatName(selectedChat,user)}</h2>
                </div>
                {
                  selectedChat.isGroupChat && selectedChat.groupAdmin._id===user._id? 
                  <Button src="https://cdn.lordicon.com/wizuwpye.json"  size="60px" clickFun={() => {setShowUpdateDiv(true)}}/>
                  :
                  <></>
                }

                {/*  NOTIFICATION BUTTON */}
                <div className={`${notification.length > 0?"flex":"hidden"} items-center  pr-[2%] rounded-r-lg relative `}>
                <span className="animate-ping absolute top-0 right-4 inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <div className='rounded-full text-2xl'>
                    <button onClick={() => setShowNotification(!showNotification)} trigger={"loop"}>🔔</button>
                  </div>
                </div>
                
          </motion.div>
         
          {/* CURRENT CHATS */}
          <motion.div className='h-[85%] flex flex-col-reverse overflow-y-auto' {...slideAnimation('up')}>
                <div>
                      {/* SENDER'S CHAT BUBBLE */}
                      {messages.map((message,index) => (
                        <ChatBubble key={message._id} message={message} position={message.sender._id===user._id?"end":"start"} />
                      ))}
                </div>
          </motion.div>
    </div>
    
      
    {/* REPLY */}
    <motion.form className='flex justify-around items-center my-[1%]' onSubmit={handleSubmit} {...slideAnimation('left')}>
      <div className='flex p-[5px] space-x-2 bg-[#232D3F] rounded-lg '>
        <Button  src="https://cdn.lordicon.com/fxylrfia.json" size= '30px' clickFun={(e) => {e.preventDefault()}}/>
        <Button   src="https://cdn.lordicon.com/brtridhw.json" size= '30px'  clickFun={(e) => {e.preventDefault()}} />
      </div>
      
      <p className='text-2xl'>|</p>
      <input value={newMessage} onChange={handleChange}  placeholder='Message here...' type='search' className='h-[40px] w-[60%] px-[2%] rounded-lg bg-[#232D3F] text-white'/>
      <button type="submit" className='flex items-center bg-[#232D3F] h-[30px] px-[1%] mx-[1%] rounded-lg font-serif text-white'>
       <p>Send</p>
       <p>➡️</p>
      </button>
    </motion.form>

</motion.div>

:
    <motion.div 
      className={`${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'}  
      flex-col justify-center items-center min-w-[40%] 
      w-screen my-[2%] mx-[1%] rounded-lg ml-[2%]  relative border bg-black`}
      {...slideAnimation('right',0.2)}
    >
      <img 
        className='max-w-full h-auto rounded-lg mb-[4%]' 
        src= "https://cdn.dribbble.com/userupload/10543014/file/original-4703d0ba72b72f87fa49a618a24a1f6d.gif" 
        alt='not found'
        />
      <p 
        className={`${isStart?"flex":"hidden"} absolute z-10 bottom-[10%] 
          left-[40% border rounded-lg p-[3%] font-serif font-serif ${gradient} 
          bg-clip-text  text-transparent`}
          >
        Please select a chat to begin ...
      </p>
    </motion.div>
  )
}

export default CurrentChat