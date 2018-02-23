import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const { messages } = this.props

    // Here we loop through the message to render content
    return (
      <main className="messages">
        {
          messages.map(message => {
            return (
              <Message key={ message.id } message={ message } type={ message.type } randomColours={ message.randomColours }/>    
            )
          })
        }           
      </main>
    )
  }
}
export default MessageList
