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
    return (
      <main className="messages">
        <Message messages={this.state.messages} />            
      </main>
    );
  }
}
export default MessageList;
