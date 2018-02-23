import React, { Component } from 'react'

class Message extends Component {
  render() {
    const { message, randomColours } = this.props

    // Render the notification
    if (message.type === 'postNotification') {
      return (
        <div className="message-system">
          { message.content }
        </div>
      )
    
    // Render the message and username
    } else {
      
      // Here we a declare an object to set colors for username
      let spanStyle = {
        color: randomColours
      }

      return (
        <div className="message">
          <span className="message-username" style={ spanStyle }>{ message.username }</span>
          <span className="message-content" dangerouslySetInnerHTML={{ __html: message.content }}></span>
        </div>
      )
    }
  }
}
export default Message