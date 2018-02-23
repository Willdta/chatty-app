import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const { messages } = this.props

    return (
      <main className="messages">
        {/* Here we loop through the message to render content*/}
        {
          messages.map(message => {
            return (
              <Message key={ message.id } message={ message } type={ message.type } randomColours={ message.randomColours }/>    
            )
          })
        }           
      </main>
    );
  }
}
export default MessageList;
