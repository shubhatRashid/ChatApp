import React ,{useState,useEffect}from 'react'

const Chats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/chats")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, []);

  return (
    <div>Chats</div>
  )
}

export default Chats