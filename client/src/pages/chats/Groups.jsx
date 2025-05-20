import React,{useCallback, useEffect, useState} from 'react'
import GroupIcon from "../../components/GroupIcon"
import GroupLoader from '../../loaders/GroupLoader';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import AddToGroup from './AddToGroup';

const Groups = ({setStart,chatFun}) => {
  const {user,groups,setGroups,setMessages,setSelectedChat} = ChatState() //get the required states from context api //
  const [showCreateGroup,setShowCreateGroup] = useState(false)
  const [loading,setLoading] = useState(true)

  // FUNCTION TO MAKE API CALL TO FETCH ALL CHATS OF THE LOGGED USER//
  const fetchGroups = useCallback( async () =>{
    try {
        const URL = `${process.env.REACT_APP_SERVER_PORT}/api/chats/groups`
        const headers = { 
            'Authorization': `Bearer ${user.token}` };
        var response = await fetch(URL, {
            method:"GET",
            headers:headers
        })
        response = await response.json()
        setGroups(response)
        setLoading(false)
    } catch (error) {
        toast.error("Unable to get groups",toastTheme)
        console.log(error)
    }
  },[setGroups,user.token])

  // FUNCTION TO FETCH ALL MESSAGES IN A PARTICULAR GROUP
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

  // FUNCTION TO ACCESS A GROUP //!SECTION
  const accessGroup = (group) => {
    setStart(false)
    setSelectedChat()
    fetchCurrentChats(group._id)
    setTimeout(() => {
      setSelectedChat(group)
    },1000)
    chatFun()
  }


  useEffect(() =>{
    fetchGroups()
  },[fetchGroups])

  return (
    <div className='rounded-lg bg-neutral-900'>

        {/* CREATE NEW GROUP */}
        <AddToGroup show={showCreateGroup} setShow={setShowCreateGroup}/>

        {/* Label */}
        <div className='flex items-center '>
            <h2 className='font-sans font-bold ml-[5%] mb-2'>Teams</h2>
        </div>

        {/* All Groups */}
        <div className='flex flex-row justify-start overflow-x-scroll scrollbar-none ml-[2%] border-b rounded-md border-neutral-600 py-2'>

            {/* CREATE GROUP BUTTON */}
            <GroupIcon clickFun = {() =>setShowCreateGroup(true)} groupName="Create"/>
            { loading? <GroupLoader />:
              groups.map((group,index) => (
                <GroupIcon clickFun={() => accessGroup(group)} index={index} groupName={group.chatName} key = {group._id} />
              ))
            }
        </div>
    </div>
  )
}

export default Groups