import React, { useEffect, useState } from 'react'
import Chat from '../../components/Chat';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import { toastTheme} from "../../constants"
import ChatsLoader from '../../loaders/ChatsLoader';

const ChatList = ({chatFun,setStart}) => {
  const {chats,user,setChats,setSelectedChat} = ChatState() //get the required states from context api // 
  const [loading,setLoading] = useState(true)

  // FUNCTION TO MAKE API CALL TO FETCH ALL CHATS OF THE LOGGED USER//
  const fetchChats = async () =>{
    try {
        const URL = "http://localhost:5000/api/chats"
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
  }

  const clickChat = (chat) => {
    setStart(false)
    setSelectedChat()
    setTimeout(() => {
      setSelectedChat(chat)
    },1000)
    chatFun()
  }

  useEffect(() =>{
    fetchChats()
  },[])
  return (
    <div className='flex flex-col h-[65%] border-b-4 rounded-lg'>
        {/* Label */}
        <div className='flex flex-col items-start  mt-[5%]  py-[2%]'>
            <h2 className='font-serif font-bold ml-[5%]  border-b-2'>Chats</h2>
        </div>

        {/*ALL CHATS OF LOGGED IN USER*/}
        <div className='flex flex-col  overflow-y-auto'>
          {loading?<ChatsLoader/>:chats.map((chat) => (
            <button onClick = {() => clickChat(chat)} >
              <Chat src={chat.users[1].name === user.name? chat.users[0].pic:chat.users[1].pic }
              name={chat.users[1].name === user.name? chat.users[0].name:chat.users[1].name } 
              key = {chat._id} 
              subText = {chat.lastMessage}
               />
            </button>
          ))}
        </div>
    </div>
  )
}

export default ChatList