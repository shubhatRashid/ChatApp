import { FileUploaderRegular } from '@uploadcare/react-uploader';
import { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import '@uploadcare/react-uploader/core.css';
import { toast } from 'react-toastify';
import { toastTheme } from '../constants';

function App({socket,selectedChat}) {
    const {user,messages,setMessages} = ChatState()

    const sendMessage = async(mediaUrl,mediaType,mediaName) => {
        
        if (!mediaUrl){
          toast.warn("select Something to send",toastTheme)
          return
        }
        
        try {
          const URL = `${process.env.REACT_APP_SERVER_PORT}/api/messages`
          const body = {
            chatId:selectedChat._id,
            content:mediaUrl,
            messageType : mediaType,
            mediaName:mediaName
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
          socket.emit("new message",response) // sending new message into the room using socket
          
        } catch (error) {
            toast.error(error.message,toastTheme)
        }
      }
    

    const handleSucess = (file) => {
        if (!file ) return;
        sendMessage(file.cdnUrl,file.file.type,file.name)
    };

  return (
    <div>
      <FileUploaderRegular
         sourceList="local, camera, gdrive"
         pubkey={process.env.REACT_APP_UPLOADCARE_PUB_KEY}
         onFileUploadSuccess={handleSucess}
         
      />
    </div>
  );
}

export default App;