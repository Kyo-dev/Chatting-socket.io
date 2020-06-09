// http://localhost:3000/socket.io/socket.io.js
//io('dominio.com')

const socket = io()
//from DOM

let chat_message = document.getElementById('chat-message')
let chat_username = document.getElementById('chat-username')
let chat_actions = document.getElementById('chat-actions')
let chat_output = document.getElementById('chat-output')
let chat_btn = document.getElementById('send-message')

chat_btn.addEventListener('click', () =>{
    socket.emit('chat:message', {
        username: chat_username.value, 
        message: chat_message.value
    })
    // console.log({
    //     username: chat_username.value, 
    //     message: chat_message.value
    // })
})

chat_message.addEventListener('keypress', () =>{
    socket.emit('chat:typing', chat_username.value)
})

socket.on('chat:messageServer', (data)=>{
    chat_actions.innerHTML = ''
    chat_output.innerHTML += `<p><strong>${data.username}</strong> : ${data.message}</p>`
})

socket.on('chat:typingServer' , (data) =>{
    chat_actions.innerHTML = `<p><em>${data} is typing... </em></p>`  
})