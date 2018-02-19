import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: this.props.messages
    }
  }

  render() {
    const { messages } = this.state

    return (
      <main className="messages">
        {
          messages.map(message => {
            return (
              <Message message={message} />    
            )
          })
        }           
      </main>
    );
  }
}
export default MessageList;
