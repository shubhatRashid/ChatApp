import { FileUploaderRegular } from '@uploadcare/react-uploader';
import { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import '@uploadcare/react-uploader/core.css';
import { toast } from 'react-toastify';
import { toastTheme } from '../constants';

function App({socket,selectedChat,setShowFileUploadOption}) {
    const {user,messages,setMessages} = ChatState()
    const [uploadedMedia,setUploadedMedia] = useState([])

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
          setMessages((messages) => [...messages,response])
          socket.emit("new message",response) // sending new message into the room using socket
          setShowFileUploadOption(false)
        } catch (error) {
            toast.error(error.message,toastTheme)
        }
      }
    

    const handleSucessFileUpload = (file) => {
        if (!file ) return;
        setUploadedMedia((uploadMedia) => [...uploadMedia,file])
    };

    const handleSendLinks = () => {
        uploadedMedia.forEach(async (file) => {
            await sendMessage(file.cdnUrl,file.file.type,file.name)
        })
    }

    const handleRemoveFile = async (removedfile) => {
      const afterRemoveFiles = uploadedMedia.filter((file) => file.uuid != removedfile.uuid)
      setUploadedMedia(() => afterRemoveFiles)

       const publicKey = process.env.REACT_APP_UPLOADCARE_PUB_KEY
      const secretKey = process.env.REACT_APP_UPLOADCARE_API_KEY

      const response = await fetch(`https://api.uploadcare.com/files/${removedfile.uuid}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Uploadcare.Simple ${publicKey}:${secretKey}`
        }
      });

      if (response.ok) {
        console.log("File deleted successfully.");
      } else {
        console.error("Failed to delete file:", response.statusText);
      }
    }

  return (
    <div>
      <FileUploaderRegular
         sourceList="local, camera, gdrive"
         pubkey={process.env.REACT_APP_UPLOADCARE_PUB_KEY}
         onFileUploadSuccess={handleSucessFileUpload}
         onDoneClick={handleSendLinks}
         onFileRemoved={handleRemoveFile}
         
      />
    </div>
  );
}

export default App;