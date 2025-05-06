import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import Button from '../../components/Button'
import {toast} from "react-toastify"
import { toastTheme } from '../../constants'
import Chat from '../../components/Chat'
import ChatsLoader from '../../loaders/ChatsLoader'
import { X } from 'lucide-react'

const AddToGroup = ({show,setShow}) => {

    // STATES VARIABLES
    const [loader,setLoader] = useState(false)
    const {user,groups,setGroups} = ChatState()
    const [search,setSearch] = useState('')
    const [data,setData] = useState([])
    const [members,setMembers] = useState([])
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

    // FUNCTION TO SELECT THE SEARCHED USER AND PUT IT INTO MEMBERS ARRAY
    const selectUser = (name,id) => {
        setMembers([...members,[name,id]])
        setShowResults(false)
        setSearch('')
    }

    // FUNCTION TO SELECT THE SEARCHED USER AND PUT IT INTO MEMBERS ARRAY
    const removeUser = (value) => {
        let newMembers = [...members]
        let filtered = newMembers.filter((element) =>(element != value))
        setMembers(filtered)
    }

    // FUNCTION TO MAKE API CALL TO NEW GROUP WITH NAME AND IDS//
    const createGroup = async (e) =>{
        e.preventDefault()
        const users = []

        members.map(member => [
            users.push(member[1])
        ])

        console.log(users)
        
        if (groupName == ''){
            toast.warn("Enter a Group name",toastTheme)
        }

        try {
            const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats/groups`
            const headers = { 
                "content-type" : "application/json",
                'Authorization': `Bearer ${user.token}` };
            const body = {
                name:groupName,
                users:users}
            var response = await fetch(URL, {
                method:"POST",
                body:JSON.stringify(body),
                headers:headers
            })
            response = await response.json()
            setGroups([...groups,response])
            toast.success("group created successfully",toastTheme)
            setShow(false)
            setGroupName("")
            setMembers([])
        } catch (error) {
            toast.error("Unable to search",toastTheme)
            console.log(error)
        }
    }
    return (
        
        <div 
            className={`resize absolute z-20 ${show?"flex":"hidden"} flex-col justify-center items-center mx-[20%] 
            bg-gray-50 rounded-lg border min-w-[40%] min-h-[45%] py-[5%] `}>
            
            {/* BUTTON TO CLOSE THE DIV */}
            <button onClick={()=>{setShow(false)}} className='absolute flex items-center top-0 right-0 border rounded-full m-[1%]'>
                <X size={20}/>
            </button>

            {/* HEADING */}
            <div className='absolute top-0 left-0 m-[1%] w-[80%]'>
                <p className='font-serif m-[1%] flex'> New group </p>
            </div>

            {/* FORM */}
            <div className='w-[80%] '>
                <form className='flex flex-col gap-[10px]' onSubmit={createGroup}>
                    <input value={groupName} placeholder='Group Name...' className='rounded-lg p-[2%] w-[100%] border' onChange={(e) => setGroupName(e.target.value)}/>
                    
                    <div className='flex bg-white rounded-lg pr-[1%] border'>
                        <input value = {search} placeholder='Search Members...' className='rounded-lg p-[2%] w-[100%] ' onChange={(e) => setSearch(e.target.value)}/>
                        <Button  src="https://cdn.lordicon.com/zniqnylq.json" clickFun={handleSearch} />
                    </div>
                    <div className='border rounded-lg my-[2%] bg-white px-[2%] py-[1%] flex justify-center text-serif font-bold text-sky-400'>
                        <button type='submit'>CREATE</button>
                    </div>
                </form>
            </div>

            {/* SEARCH RESULTS */}
            <div className={`${showResults?"flex":"hidden"} text-black w-[80%] h-[200px] overflow-auto flex-col mt-[3%] text-white`}>
                    {loader?<ChatsLoader/> :data.map((value) =>(
                        <button key={value._id} className='' onClick={() => selectUser(value.name,value._id)}>
                             <Chat name= {value.name} key={value._id} src={value.pic} subText={value.email}/>
                        </button>
                    )) }
                </div>

            {/* DISPLAY SELECTED USERS */}
            <div className='w-[80%] grid grid-rows-3  grid-flow-col gap-2 mt-[3%]'>
                {members.map(member => (
                    <div key={member[1]} className='flex mx-auto my-[2%] border rounded-lg flex justify-around items-center p-[1%] gap-2'>
                        <p className='uppercase'>{member[0]}</p>
                        <button  className='flex items-center font-serif text-xs' onClick={() => removeUser(member)}>
                            <X size={15}/>
                        </button>
                    </div>
                ))}
            </div>

        </div> 
    )
}

export default AddToGroup