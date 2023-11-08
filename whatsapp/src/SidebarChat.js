import React from 'react'
import { Avatar } from '@material-ui/core'
import './sidebarChat.css'
function SidebarChat() {
  return (
      <div className='sidebarChat'>
          <Avatar />
          <div className="sidebarChat_info">
              <h2>Room name</h2>
              <p>This is last message sent on this room!</p>
          </div>
    </div>
  )
}

export default SidebarChat