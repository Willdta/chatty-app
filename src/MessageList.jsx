import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const { messages } = this.props

    return (
      <main className="messages">
        {
          messages.map(message => {
            return (
              <Message key={message.id} message={message} />    
            )
          })
        }           
      </main>
    );
  }
}
export default MessageList;
