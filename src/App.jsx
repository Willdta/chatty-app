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

  newMessage = (message) => {
    
    let messages = {
      username: message.username,
      content: message.content,
      id: message.id
    }

    let fullMessage = JSON.stringify(messages)

    this.socket.send(fullMessage)
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data)

      this.setState({
        messages: this.state.messages.concat([{
          username: message.username,
          content: message.content,
          id: message.id
        }])
      })
      
      console.log(JSON.parse(event.data));
    }
  }
  
  render() {
    const {currentUser, messages} = this.state
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>RENDER USER COUNT HERE</p>
        </nav>
        
        <MessageList messages={messages} />      
        <ChatBar userProp={currentUser.name} messages={messages} submitMessage={this.newMessage}/>
      </div>
    );
  }
}

export default App;
