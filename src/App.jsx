import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

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
      id: message.id,
      type: message.type
    }

    let fullMessage = JSON.stringify(messages)

    this.socket.send(fullMessage)
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data)
  
      switch (message.type) {
        case 'counting connections':

          this.setState({clientCount: message.count})
        
          break;

        case 'postMessage':
          // this.setState({
          //   messages: this.state.messages.concat([{
          //     username: message.username,
          //     content: message.content,
          //     id: message.id,
          //     type: message.type,
          //     randomColours: message.randomColours    
          //   }])
          // })

          this.setState({messages: this.state.messages.concat([message])})

          break;

        case 'postNotification':

          // this.setState({
          //   messages: this.state.messages.concat([{
          //     username: message.username,
          //     content: message.content,
          //     id: message.id,
          //     type: message.type,
          //     randomColours: message.randomColours              
          //   }])
          // })

          this.setState({ messages: this.state.messages.concat([message]) })
          
          break;

        default: 
        // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + message.type);
      }

      console.log(JSON.parse(event.data));
    }
  }

  render() {
    const { currentUser, messages, clientCount } = this.state
    
    return (
      <div>
        <NavBar clientCount={clientCount} />     
        <MessageList messages={messages} />      
        <ChatBar userProp={currentUser.name} messages={messages} submitMessage={this.newMessage}/>
      </div>
    );
  }
}

export default App;
