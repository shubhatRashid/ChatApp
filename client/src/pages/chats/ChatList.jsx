import React, { useCallback, useEffect, useState } from 'react'
import Chat from '../../components/Chat';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import { fetchChatName, toastTheme} from "../../constants"
import ChatsLoader from '../../loaders/ChatsLoader';

// VARIABLES FOR SOCKET CONNECTION //

const ChatList = ({chatFun,setStart}) => {
  const {chats,user,setChats,selectedChat,setSelectedChat,setMessages,notification,setNotification} = ChatState() //get the required states from context api // 
  const [loading,setLoading] = useState(true)

  // FUNCTION TO MAKE API CALL TO FETCH ALL CHATS OF THE LOGGED USER//
  const fetchChats = useCallback (async () =>{
    try {
        const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats`
        const headers = { 
            'Authorization': `Bearer ${user.token}` };
        var response = await fetch(URL, {
            method:"GET",
            headers:headers
        })
        response = await response.json()
        setChats(response)
        setLoading(false)
    } catch (error) {
        toast.error("Unable to get chats",toastTheme)
        console.log(error)
    }
  },[setChats,user.token])

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

// FUNCTION TO SELECT A CHAT OUT OF ALL CHATS 
  const clickChat = async (chat) => {
    setNotification(notification.filter((n) => n.chat._id !== chat._id))

    setStart(false)
    setSelectedChat(chat)
    await fetchCurrentChats(chat._id)
    chatFun()
  }
  
  const checkUnread = (id) => {
    var count = 0
    notification.map(notif => {
      if (notif.chat._id === id){
        count += 1
      }
    })
    if (count> 0){
      fetchChats()
    }
    return count
  }
  
  useEffect(() =>{
    fetchChats()
  },[])


  return (
    <div className='flex flex-col h-[65%] rounded-lg bg-neutral-900'>
        {/* Label */}
        <div className='flex justify-between items-center mb-2'>
            <h2 className='font-sans font-bold ml-[5%]'>All Chats</h2>
        </div>

        {/*ALL CHATS OF LOGGED IN USER*/}
        <div className='flex flex-col overflow-y-scroll gap-2'>
          {loading?<ChatsLoader/>:chats.map((chat,index) => (
            <button onClick = {() => clickChat(chat)} key={chat._id}>
              <Chat src={chat.users[1].name === user.name? chat.users[0].pic:chat.users[1].pic }
              name={fetchChatName(chat,user)} 
              subText = {chat.latestMessage?chat.latestMessage.content:" "}
              index = {index}
              count={checkUnread(chat._id)}
               />
            </button>
          ))}
        </div>
    </div>
  )
}

export default ChatList