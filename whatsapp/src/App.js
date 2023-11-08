import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';


function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/message/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('83243e3fa84c09022523', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      
      setMessages([...messages,data])
    });
return() => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages])
  // console.log(messages);
  return (
    <div className="app">
      <div className='app_body'>
        {/* SideBar */}
        <Sidebar></Sidebar>
        {/* ChatComponent */}
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
