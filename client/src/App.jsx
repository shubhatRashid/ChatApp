import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import "./index.css"
import LoginSignUp from "./pages/loginSignUp/LoginSignUp"
import Chats from "./pages/chats/Chats"

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/" element = {<LoginSignUp/>}/>
      <Route path = "/chats" element = {<LoginSignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App