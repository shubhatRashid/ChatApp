const toastTheme = {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }
    const gradient = "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

const fetchChatName = (chat,user) => {
    if (chat.isGroupChat){
        return chat.chatName
    }else{
        if(chat.users[1].name === user.name){
            return chat.users[0].name
        }else{
            return chat.users[1].name 
        }
    }
}
export {toastTheme,gradient,fetchChatName};