import React, { useState } from 'react'
import Search from '../../components/Search';
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import { ChatState} from "../../context/ChatProvider"
import Chat from '../../components/Chat'
import ChatsLoader from "../../loaders/ChatsLoader";

const SearchDrawer = ({showSearch,searchFun}) => {
    // STATE VARIABLES //
    const [loader,setLoader] = useState(false)
    const {user,setSelectedChat,chats,setChats,setMessages} = ChatState()
    const [search,setSearch] = useState('')
    const [data,setData] = useState([])

    // FUNCTION TO MAKE API CALL TO FETCH SEARCHED USERS //
    const fetchUsers = async (query) => {
        const URL = `${process.env.REACT_APP_SERVER_PORT}/api/users?search=${query}`
        const headers = { 'Authorization': `Bearer ${user.token}` };
        var response = await fetch(URL, {headers})
        response = response.json()
        return response
    }

    // FUNCTION TO MAKE API CALL TO FETCH CHATS WITH SEARCHED USER //
    const fetchChat = async (id,name) =>{
        try {
            const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats`
            const headers = { 
                "content-type" : "application/json",
                'Authorization': `Bearer ${user.token}` };
            const body = {userId:id,chatName:name}
            var response = await fetch(URL, {
                method:"POST",
                body:JSON.stringify(body),
                headers:headers
            })
            response = await response.json()
            return response
        } catch (error) {
            toast.error("Unable to search",toastTheme)
            console.log(error)
        }
    }

    // FUNCTION TO HANDLE SUBMIT FORM OF SEARCH INPUT //
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search){
            toast.warn("Type a name or email to search",toastTheme)
            return
        }
        try {
        const users = await fetchUsers(search)
        setData(users)
        setLoader(false)
        } catch (error) {
            toast.error("Unable to search",toastTheme)
            console.log(error)
        }
    }

    // FUNCTION TO FETCH ALL MESSAGES IN A PARTICULAR CHAT
      const fetchCurrentChats = async (id) => {
        try {
          const URL = `${process.env.REACT_APP_SERVER_PORT}/api/messages/${id}`
          const headers = { 
              'Authorization': `Bearer ${user.token}` };
          var response = await fetch(URL, {
              method:"GET",
              headers:headers
          })
          response = await response.json()
          setMessages(() => response)
        } catch (error) {
            toast.error(error.message,toastTheme)
        }
      }

    // FUNCTION TO HANDLE CLICK ON SEARCHED USER //
    const accessChat = async (id,name) =>{
        const chat = await fetchChat(id,name)
        await fetchCurrentChats(chat._id)
        setSelectedChat(chat)
        if (!chats.find((c) => c._id === chat._id)) setChats([chat, ...chats])
        searchFun()
    }
    return (
        <div className={`${showSearch?"flex":"hidden"} flex-col h-[100%] w-[400px] absolute left-0 top-0 bg-neutral-900 text-white z-10`}>
            <div className='flex justify-between items-center w-[90%] my-[2%] mx-auto px-[1%]'>
                <h2 className='font-serif font-bold border-b'>Search Users...</h2> 
                <button onClick={searchFun} className='text-black p-[2%]'>❌</button> 
            </div>
            <div className='w-[90%] my-[2%] mx-auto border border-neutral-600 rounded-lg' >
                <Search placeholder="Search a user..." handleSearch={handleSearch} handleClick={() => {setLoader(true)}} handleChange={(e) => setSearch(e.target.value)} value = {search}/>
            </div>

            {/* SEARCH RESULTS */}
            <div className='w-full overflow-y-auto'>
                {loader?<ChatsLoader /> :data.map((value,index) =>(
                    <button key={index} onClick={() => accessChat(value._id,value.name)} className='flex w-full'>
                            <Chat name= {value.name} key={value._id} src={value.pic} subText={value.email}/>
                    </button>
                )) }
            </div>
        </div>
  )
}

export default SearchDrawer