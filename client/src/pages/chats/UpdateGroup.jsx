import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import Button from '../../components/Button'
import {toast} from "react-toastify"
import { toastTheme } from '../../constants'
import Chat from '../../components/Chat'
import ChatsLoader from '../../loaders/ChatsLoader'
import { X } from 'lucide-react'

const UpdateGroup = ({show,setShow}) => {
    
    // STATES VARIABLES
    const [loader,setLoader] = useState(false)
    const {selectedChat,setSelectedChat,user} = ChatState()
    const [search,setSearch] = useState('')
    const [data,setData] = useState([])
    const [groupName,setGroupName] = useState('')
    const [showResults,setShowResults] = useState(false)

    // FUNCTION TO MAKE API CALL TO FETCH SEARCHED USERS //
    const fetchUsers = async (query) => {
        const URL = `${process.env.REACT_APP_SERVER_PORT}/api/users?search=${query}`
        const headers = { 'Authorization': `Bearer ${user.token}` };
        var response = await fetch(URL, {headers})
        response = response.json()
        return response
    }

    // FUNCTION TO HANDLE SUBMIT FORM OF SEARCH INPUT //
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search){
            toast.warn("Type a name or email to search",toastTheme)
            return
        }
        setShowResults(true)
        setLoader(true)
        try {
        const users = await fetchUsers(search)
        setData(users)
        setLoader(false)
        console.log(data)
        } catch (error) {
            toast.error("Unable to search",toastTheme)
            console.log(error)
        }
    }

    // FUNCTION TO SELECT THE SEARCHED USER AND ADD IT TO GROUP MEMBERS //
    const addUser = async (name,id) => {
        var userFound = false
        selectedChat.users.map(user => {
            if (user._id === id){
                toast.error("Member already exists in group",toastTheme)
                userFound = true
                return;
            }
        })

        if (userFound){
            return;
        }

        try {
            const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats/groupadd`
            const headers = { 
                "content-type" : "application/json",
                'Authorization': `Bearer ${user.token}` };
            const body = {
                chatId: selectedChat._id,
                userId:id}
            var response = await fetch(URL, {
                method:"PUT",
                body:JSON.stringify(body),
                headers:headers
            })
            response = await response.json()
            setSelectedChat(response)
            toast.success("Member added successfully",toastTheme)
            setGroupName("")
            setSearch("")
        } catch (error) {
            toast.error(error.message,toastTheme)
            console.log(error)
        }
    }

    // FUNCTION TO REMOVE A MEMBER FROM GROUP //

    const removeUser = async (e,id) => {
        e.preventDefault()
        try {
            const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats/groupremove`
            const headers = { 
                "content-type" : "application/json",
                'Authorization': `Bearer ${user.token}` };
            const body = {
                chatId: selectedChat._id,
                userId:id}
            var response = await fetch(URL, {
                method:"PUT",
                body:JSON.stringify(body),
                headers:headers
            })
            response = await response.json()
            setSelectedChat(response)
            toast.success("member removed successfully",toastTheme)
            setGroupName("")
        } catch (error) {
            toast.error(error.message,toastTheme)
            console.log(error)
        }

        
    }

    // FUNCTION TO MAKE API CALL TO RENAME THE GROUP//
    const renameGroup = async (e) =>{
        e.preventDefault()

        if (groupName == ""){
            toast.warn("Enter a new group name to change",toastTheme)
        }

        try {
            const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats/renamegroup`
            const headers = { 
                "content-type" : "application/json",
                'Authorization': `Bearer ${user.token}` };
            const body = {
                chatId: selectedChat._id,
                chatName:groupName}
            var response = await fetch(URL, {
                method:"PUT",
                body:JSON.stringify(body),
                headers:headers
            })
            response = await response.json()
            setSelectedChat(response)
            toast.success("Group successfully renamed",toastTheme)
            setGroupName("")
        } catch (error) {
            toast.error(error.message,toastTheme)
            console.log(error)
        }
    }

    return (
        
        <div  
            className={`absolute z-20 ${show?"flex":"hidden"} flex-col top-20 left-5 right-5
                justify-center items-center bg-black rounded-lg shadow-md shadow-cyan-500/50 text-white
                min-w-[80%] min-h-[45%] py-[5%] `}>
            
            {/* DISPLAY MEMBERS*/}

            <div className='w-[80%] grid grid-cols-3 sm:grid-cols-5 grid-flow-row gap-2 my-[3%] bg-neutral-900 rounded-lg p-[2%]'>
                {selectedChat.users.map(member => (
                    <div key={member._id} className='flex mx-[1%] my-[2%] p-2 rounded-lg flex justify-around items-center gap-2 bg-neutral-600'>
                        <p className='Capitalize text-sm font-serif'>{member.name}</p>
                        <button  className='flex items-center font-serif text-xs' onClick={(e) => removeUser(e,member._id)}>
                            <p className='flex mx-auto'>×</p>
                        </button>
                    </div>
                ))}
            </div>

            {/* BUTTON TO CLOSE THE DIV */}
            <button onClick={()=>{setShow(false)}} className='absolute z-10 flex items-center text-xs absolute top-0 right-0 border rounded-full m-1'>
                <X size={20}/>
            </button>

            {/* HEADING */}
            <div className='absolute top-0 left-0 rounded-lg py-2 w-[80%] bg-neutral-900 w-full font-bold'>
                <p className='m-[1%]  text-xs uppercase'> Update group details</p>
            </div>

            {/* FORM */}
            <div className='flex flex-col gap-[10px] w-[80%] relative'>
                <form className='flex bg-neutral-900 rounded-lg pr-[1%]' onSubmit={renameGroup}>
                    <input value={groupName} placeholder='Rename Group...' className='rounded-lg p-[2%] w-[100%] bg-neutral-900' onChange={(e) => setGroupName(e.target.value)}/>
                    <Button  src="https://cdn.lordicon.com/lbsajkny.json" clickFun={renameGroup} />
                </form> 
                <form>
                    <div className='flex bg-neutral-900 rounded-lg pr-[1%]'>
                        <input value = {search} placeholder='Search for new members to add...' className='bg-neutral-900 rounded-lg p-[2%] w-[100%]' onChange={(e) => setSearch(e.target.value)}/>
                        <Button  src="https://cdn.lordicon.com/zniqnylq.json" clickFun={handleSearch} />
                    </div>
                </form>
            </div>

            {/* SEARCH RESULTS */}
            <div className={`${showResults?"flex":"hidden"} text-black w-[80%] h-[300px] overflow-auto flex-col mt-[3%] text-white`}>
                    {loader?<ChatsLoader/> :data.map((value) =>(
                        <button key={value._id} className='' onClick={() => addUser(value.name,value._id)}>
                             <Chat name= {value.name} key={value._id} src={value.pic} subText={value.email}/>
                        </button>
                    )) }
            </div>
            
        </div> 
    )
}

export default UpdateGroup