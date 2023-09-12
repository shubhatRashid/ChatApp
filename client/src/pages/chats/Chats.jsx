import React ,{useState,useEffect}from 'react'
import Button from '../../components/Button';
import GroupIcon from '../../components/GroupIcon';
import Chat from '../../components/Chat';
const Chats = () => {

  // STATE VARIABLES
  const [searchInput, setSearchInput] = useState("");
  const [usersDiv,setUsersDiv] = useState(true)

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/chats")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, []);

  // FUNCTIONS FOR BUTTONS
  const homeFun = () =>{}
  const starFun = () =>{}
  const profileFun = () =>{}
  const settingFun = () =>{}
  const logoutFun = () => {}
  const searchFun = () => {}
  const handleSearch = () => {}

  return (
    <div className='flex flex-row justify-center min-h-screen'>

        {/* ICON BUTTONS LEFT BAR FOR QUICK ACCESS */}
        <div className='flex flex-col justify-between items-center bg-[#116D6E] my-[2%] mx-[2%] rounded-lg ml-[2%] px-[1%] min-w-[60px] py-[2%]'>

            <div>
              <Button src="https://cdn.lordicon.com/qjezzrrz.json" size='40px' clickFun={() => {setUsersDiv(!usersDiv)}}/>
            </div>

            {/* UPPER ICON BUTTONS */}
            <div className='flex flex-col'>
              <Button src="https://cdn.lordicon.com/kxoxiwrf.json" size= '45px' clickFun={homeFun}/>
              <Button src="https://cdn.lordicon.com/whttoese.json" size= '45px' clickFun={starFun}/>
              <Button src="https://cdn.lordicon.com/ljvjsnvh.json" size= '45px' clickFun={profileFun}/>
              <Button src="https://cdn.lordicon.com/tsnvgrkp.json" size= '45px' clickFun={settingFun}/>
              <Button src="https://cdn.lordicon.com/zniqnylq.json" size= '45px' clickFun={searchFun} />
            </div>

            {/* LOGOUT BUTTON ICON */}
            <div  className='flex flex-col-reverse'>
              <Button src="https://cdn.lordicon.com/hcuxerst.json" size ='45px' clickFun={logoutFun} />
            </div>
        </div>

        {/* ALL CHATS DIV */}
        <div className={`${usersDiv?"flex":"hidden"} flex-col min-w-[25%] my-[2%] rounded-lg bg-green-50`}>
              {/* USER PROFILE */}
              <div className='flex justify-start'>
                  <div className='w-[15%] h-[15%] my-[2%] ml-[2%]'>
                    <img  className= 'rounded-full' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                  </div>
                  <div className='flex items-center ml-[3%]'>
                    <h2 className='font-serif text-sm font-bold'>User Name</h2>
                  </div>
              </div>

              {/* GROUP CHATS */}
              <div>
                  {/* Label */}
                  <div className='flex items-center ml-[5%] mt-[5%]'>
                        <h2 className='font-serif font-bold'>Teams</h2>
                  </div>

                  {/* All Groups */}
                  <div className='flex overflow-x-hidden'>
                        <GroupIcon src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
                        <GroupIcon src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
                        <GroupIcon src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
                        <GroupIcon src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
                        <GroupIcon src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg'/>
                  </div>
              </div>
              

              {/* ALL CHATS */}
              <div>
                  {/* Label */}
                  <div className='flex items-center ml-[5%] mt-[5%]'>
                        <h2 className='font-serif font-bold'>Chats</h2>
                  </div>

                  {/* CHATS */}
                  <div>
                      <Chat src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' name="Name" lastMessage = 'last message' />
                      <Chat src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' name="Name" lastMessage = 'last message' />
                      <Chat src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' name="Name" lastMessage = 'last message' />
                      <Chat src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' name="Name" lastMessage = 'last message' />
                  </div>
              </div>
        </div>

        {/* CURRENT CHAT DIV */}
        <div className={`${usersDiv?"hidden":"flex"} md:flex  flex-col justify-between min-w-[60%] bg-green-50 my-[2%] mx-[1%] rounded-lg ml-[2%] px-[1%] pt-[1%]`}>

            {/* SEARCH IN CHAT */}
            <div className='w-[100%] flex bg-white px-[2%] rounded-lg'>
              <Button src='https://cdn.lordicon.com/zniqnylq.json' size='25px' />
              <input  onChange={handleSearch} placeholder='Search in chat...' type='search' className='w-[100%] px-[2%] rounded-lg bg-transparent'/>
            </div>

            <div className='border min-h-[80%] mt-[2%] rounded-lg bg-white '>

                  {/* NAME AND PHOTO */}
                  <div className='flex border-b-4 rounded-lg'>
                        <div className='w-[7%] h-[7%] my-[2%] ml-[2%]'>
                          <img  className= 'rounded-full' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                        </div>
                        <div className='flex items-center ml-[3%]'>
                          <h2 className='font-serif text-sm'>Sender Name</h2>
                        </div>
                  </div>
                 
                  {/* CURRENT CHATS */}
                  <div>
                        {/* SENDER'S CHAT BUBBLE */}
                        <div className='flex py-[1%] space-x-4'>
                            <div className='w-[25px] h-[25px] my-[2%] ml-[2%]'>
                              <img  className= 'rounded-full border' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                            </div>
                            <div className='mx-[3%] bg-[#116D6E] rounded-lg rounded-tl-none mx-[2%] text-white my-[2%] p-[2%]'>
                              <p className='font-serif text-sm'>Hi! How are you</p>
                            </div>
                        </div>

                        
                        {/* RECIEVERS CHAT BUBBLE */}
                        <div className='flex justify-end py-[1%] space-x-4'>
                            <div className='mx-[3%] bg-[#116D6E] rounded-lg rounded-tr-none mx-[2%] text-white my-[2%] p-[2%] '>
                              <p className='font-serif text-sm'>hey, where have you been</p>
                            </div>
                        </div>

                        {/* SENDER'S CHAT BUBBLE */}
                        <div className='flex py-[1%] space-x-4'>
                            <div className='w-[25px] h-[25px] my-[2%] ml-[2%]'>
                              <img  className= 'rounded-full border' src='https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg' alt='' />
                            </div>
                            <div className='mx-[3%] bg-[#116D6E] rounded-lg rounded-tl-none mx-[2%] text-white my-[2%] p-[2%]'>
                              <p className='font-serif text-sm'>Coding</p>
                            </div>
                        </div>
                        
                  </div>
            </div>
            

            {/* REPLY */}
            <div className='flex py-[1%] justify-around items-center'>
              <div className='flex pt-[5px] space-x-1'>
                <Button  src="https://cdn.lordicon.com/fxylrfia.json" size= '25px' clickFun={searchFun} />
                <Button   src="https://cdn.lordicon.com/brtridhw.json" size= '25px' clickFun={searchFun} />
              </div>
              
              <p className='text-2xl'>|</p>
              <input  onChange={handleSearch} placeholder='Message here...' type='search' className='w-[60%] px-[2%] rounded-lg bg-transparent'/>
              <button className='bg-sky-500 h-[40px] px-[3%] mx-[1%] rounded-lg font-serif text-white'>
                Send
              </button>
            </div>

        </div>
    </div>
  )
}

export default Chats