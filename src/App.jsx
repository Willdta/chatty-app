import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  // newMessage = (message) => {
  //   this.setState({
  //     messages: this.state.messages.concat([{
  //       username: message.username,
  //       content: message.content
  //     }])
  //   })
  // }

  newMessage = (message) => {
    let messages = {
      username: message.username,
      content: message.content
    }

    let fullMessage = String(`user ${messages.username} said ${messages.content}`)

    this.socket.send(String(fullMessage))
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
  }
  
  render() {
    const {currentUser, messages} = this.state
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        
        <MessageList messages={messages} />      
        <ChatBar userProp={currentUser.name} messages={messages} submitMessage={this.newMessage}/>
      </div>
    );
  }
}

export default App;
