// CREATING CONTEXT API FOR COMPONENTS TO SHARE THE STATES //

import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const [groups,setGroups] = useState([]) // ALL GROUPS OF LOGGED USER //
    const [user,setUser] = useState()   // USER STATE //
    const [selectedChat,setSelectedChat] = useState()   // CURRENT CHAT //
    const [chats,setChats] = useState([]) // ALL CHATS OF LOGGED USER //
    // SETTING THE USER STATE INFO //
    useEffect( () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
    },[])
    return  <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,groups,setGroups}}>
              {children}
            </ChatContext.Provider>
}


export const ChatState = () =>{
    return useContext(ChatContext)
}
export default ChatProvider