import React, { useState } from 'react'
import "./chat.css"
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmotionIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic'
import axios from './axios'



function Chat(props) {
    // console.log(messages)
    const [input, setInput] = useState('')

    const sendMessage =async (e) => {
        e.preventDefault();
       await axios.post('/message/new', {
           
                message: input,
                name: "Ghanshyam",
                timestam: "YO",
                received: true
            
        })
        setInput('');
    }
return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ......</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
            {props.messages.map((message) => {
                return(
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                    <span className='chat_name'>{message.name}</span>
                    {message.message}
                    <span className='chat_timestamp'>
                        {message.timestamp}
                    </span>
                    </p>
                )
            })}
            </div>
            <div className="chat_footer">
                <InsertEmotionIcon />
                <form>
                    <input
                        placeholder="Type a message"
                        text="text"
                    value={input}
                    onChange={e => {
                       setInput(e.target.value)
                   }}
                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat