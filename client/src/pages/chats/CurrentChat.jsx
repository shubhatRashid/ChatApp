import {useEffect, useState } from 'react'
import ChatBubble from '../../components/ChatBubble'
import Search from '../../components/Search'
import Button from '../../components/Button'
import { ChatState } from '../../context/ChatProvider'
import UpdateGroup from './UpdateGroup'
import { toast } from 'react-toastify';
import { fetchChatName, toastTheme } from '../../constants';
import io from "socket.io-client"
import {motion} from "framer-motion"
import { slideAnimation } from '../../configs/motion'
import {received,notify} from "../../assets"
import { Camera,CircleUser,Paperclip, SendHorizonal, SmilePlus, User } from 'lucide-react'
import Uploadcare from '../../components/UploadCare'
const gradient = "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

// VARIABLES FOR SOCKET CONNECTION //
const ENDPOINT = process.env.REACT_APP_SERVER_PORT
var selectedChatCompare;

const CurrentChat = ({showSidebar,usersDiv,seeChat,isStart}) => {
  const {user,selectedChat,setSelectedChat,messages,setMessages,notification,setNotification,socket} = ChatState()
  const [showUpdateDiv,setShowUpdateDiv] = useState(false)
  const [newMessage,setNewMessage] = useState("")
  const [socketConnected,setSocketConnected] = useState(false)
  const [showFileUploadOption,setShowFileUploadOption] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [online, setOnline] = useState(false);
  const [typing,setTyping] = useState(false)
  

  // CODE TO SETUP SOCKET.IO

useEffect(() => {
  selectedChatCompare = selectedChat
  socket.current = io(ENDPOINT);
  socket.current.emit("setup", user._id);

  socket.current.on("connected", () => setSocketConnected(true));

  socket.current.on("onlineusers", (users) => {
    setOnlineUsers(() => users); // triggers update
  });
},[selectedChat]);

useEffect(() => {
  socket.current.on('typing',(userId) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
    }, 2000);

    return () => {
      socket.off('typing')
      setTyping(false)}
  })
},[])

useEffect(() => {
  if (!selectedChat || onlineUsers.length === 0) return;

  const oppositeId =
    selectedChat.users[0]._id === user._id
      ? selectedChat.users[1]._id
      : selectedChat.users[0]._id;

  setOnline(onlineUsers.includes(oppositeId));
}, [selectedChat, onlineUsers]); 

// DISPLAY NEW MESSAGE AND NOTIFICATIONS


const showBrowserNotification = (message) => {
  if (Notification.permission === 'granted') {
    new Notification(`New message from ${message.sender.name}`, {
      body: message.content,
      icon: '/chaticon.png', // optional icon
    });
  }
};

useEffect(() => {

    socket.current.on("message received",(newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        // give notification
        if (!notification.includes(newMessageReceived)){

          setNotification([...notification,newMessageReceived])  
          showBrowserNotification(newMessageReceived)
        }

      }else{
        setMessages((messages) =>[ ...JSON.parse(JSON.stringify(messages)),newMessageReceived])
        new Audio(received).play()
        
      }
    })

  },[])

  // FUNCTION TO HANDLE CHANGE IN REPLY INPUT //
  const handleChange = (e) => {
    setNewMessage(e.target.value)
    const oppositeId =
    selectedChat.users[0]._id === user._id
      ? selectedChat.users[1]._id
      : selectedChat.users[0]._id;
    socket.current.emit('typing',oppositeId)
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
        content:newMessage,
        messageType : 'text',
        mediaName:'none'
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
      socket.current.emit("new message",response) // sending new message into the room using socket
      
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
    
    <motion.div 
      className={`relative ${usersDiv?"hidden":"flex"} md:${seeChat?'flex':'hidden'} relative flex-col justify-between
      min-w-[40%] w-screen my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%]`}
      
      {...slideAnimation('right',0.2)}
    >
      <UpdateGroup show={showUpdateDiv} setShow={setShowUpdateDiv} />

    {/* SEARCH IN CHAT */}
    <motion.div className='flex  gap-2  rounded-lg' {...slideAnimation("down")}>
        <Search placeholder='Search in chat...' />
    </motion.div>
    
    <div className='text-white'>

          {/* NAME AND PHOTO */}
          <motion.div className='bg-neutral-900 shadow-md shadow-cyan-500/50 flex items-center justify-between  rounded-lg mb-2' {...slideAnimation('down')}>
                <div className='flex items-center  my-[2%] ml-[2%]'>
                  <CircleUser/>
                  <div className='flex flex-col '>
                    <h2 className=' text-sm ml-[10%] w-[200px] capitalize' >{fetchChatName(selectedChat,user)}</h2>
                    {online  ? 
                      <div className='flex ml-[10%] gap-1'>
                        <p className='flex justify-center items-center text-teal-500 text-[8px]'>o</p>

                        {
                          typing ? 
                          <p className='text-xs text-neutral-200 animate-pulse'>
                            typing...
                          </p>
                          :
                          <p className='text-xs text-neutral-200 animate-pulse'>
                            online
                          </p>
                        }
                        
                      </div>
                      : 
                      <div className='flex ml-[10%]'>
                        <p className='flex items-center text-xs  gap-1 text-neutral-400 '>
                          offline
                        </p>
                      </div>
                    }
                  </div>
                </div>
                {
                  selectedChat.isGroupChat && selectedChat.groupAdmin._id===user._id? 
                  <Button src="https://cdn.lordicon.com/wizuwpye.json"  size="60px" clickFun={() => {setShowUpdateDiv(true)}}/>
                  :
                  <></>
                }
                
          </motion.div>
         
          {/* CURRENT CHATS */}
          <motion.div className={`h-[65dvh] sm:h-[55dvh] flex flex-col-reverse overflow-y-auto bg-neutral-950`} {...slideAnimation('up')}>
                <div>
                      {/* SENDER'S CHAT BUBBLE */}
                      {messages.map((message,index) => (
                        <ChatBubble key={message._id} message={message} position={message.sender._id===user._id?"end":"start"} />
                      ))}
                </div>
          </motion.div>
    </div>
    
      
    {/* REPLY */}
    <motion.div className='flex justify-around items-center p-1 bg-neutral-900 text-white rounded-lg w-full gap-2 p-2' {...slideAnimation('left')}>
      <div className='flex p-[5px]  gap-3 rounded-lg justify-center items-center pl-2 '>
        {
          showFileUploadOption && 
          <div className='absolute bottom-20 left-5 z-10 bg-white rounded-lg font-mono font-bold border shadow-md'>
            <Uploadcare socket = {socket.current} selectedChat={selectedChat} setShowFileUploadOption={setShowFileUploadOption}/>
          </div>
        }
        <button onClick={() => setShowFileUploadOption(!showFileUploadOption)}>
             <Paperclip/>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} typeof='submit' className='flex justify-around items-center w-[90%] gap-3'>
        <input value={newMessage} onChange={handleChange}  placeholder='type here...' type='search' className='h-[40px] w-[90%] px-[2%] rounded-lg bg-neutral-600'/>
        <button type="submit" className='flex items-center'>
          <SendHorizonal className=''/>
        </button>
      </form>
    </motion.div>

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