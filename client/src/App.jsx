import React, { useState,useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import "./index.css"
import LoginSignUp from "./pages/loginSignUp/LoginSignUp"
import Chats from "./pages/chats/Chats"
import {ChatState} from "./context/ChatProvider"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {user} = ChatState()

  useEffect(() => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission:', permission);
    });
  }
});

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {!user?<LoginSignUp/>:<Chats />}/>
        <Route path = "/chats" element = {user?<Chats />:<LoginSignUp/>}/>
      </Routes>
      <div className='z-10'>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
      </div>
    </BrowserRouter>
  )
}

export default App