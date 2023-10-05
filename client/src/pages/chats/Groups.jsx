import React,{useEffect, useState} from 'react'
import GroupIcon from "../../components/GroupIcon"
import GroupLoader from '../../loaders/GroupLoader';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import AddToGroup from './AddToGroup';

const Groups = ({setStart,chatFun}) => {
  const {user,groups,setGroups,selectedChat,setSelectedChat} = ChatState() //get the required states from context api //
  const [showCreateGroup,setShowCreateGroup] = useState(false)
  const [loading,setLoading] = useState(true)

  // FUNCTION TO MAKE API CALL TO FETCH ALL CHATS OF THE LOGGED USER//
  const fetchGroups = async () =>{
    try {
        const URL = "http://localhost:5000/api/chats/groups"
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
  }
  
  // FUNCTION TO ACCESS A GROUP //!SECTION
  const accessGroup = (group) => {
    setStart(false)
    setSelectedChat()
    setTimeout(() => {
      setSelectedChat(group)
    },1000)
    chatFun()
  }


  useEffect(() =>{
    fetchGroups()
  },[])
  return (
    <div className='h-[20%] border-b-4 rounded-lg]'>

        {/* CREATE NEW GROUP */}
        <AddToGroup show={showCreateGroup} setShow={setShowCreateGroup}/>

        {/* Label */}
        <div className='flex items-center mt-[1%] '>
            <h2 className='font-serif font-bold ml-[5%] border-b-2 '>Teams</h2>
        </div>

        {/* All Groups */}
        <div className='flex flex-row justify-start overflow-x-auto ml-[2%]'>

            {/* CREATE GROUP BUTTON */}
            <GroupIcon clickFun = {() =>setShowCreateGroup(true)} groupName="Create" src='https://static.thenounproject.com/png/79377-200.png' />
            { loading? <GroupLoader />:
              groups.map((group) => (
                <GroupIcon clickFun={() => accessGroup(group)} groupName={group.chatName} key = {group._id} src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
              ))
            }
        </div>
    </div>
  )
}

export default Groups