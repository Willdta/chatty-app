import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    // Our initial base state
    this.state = {
      currentUser: {name: 'Anon'}, // If username is not entered, it will be 'Anon'
      messages: [],
      randomColours: ''
    }
  }

  newMessage = (message) => {
    
    let messages = {
      username: message.username,
      content: message.content,
      id: message.id,
      type: message.type,
      randomColours: this.state.randomColours
    }

    let fullMessage = JSON.stringify(messages)

    this.socket.send(fullMessage)
  }

  componentDidMount() {

    // Our socket server
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data)
  
      // If message.type is = to... do this...
      switch (message.type) {
        
        // Here we check for user connections
        case 'counting connections':
          this.setState({ clientCount: message.count })
          break

        case 'color change':
          this.setState({ randomColours: message.randomColours })

        // Send the username and content
        case 'postMessage':
        
        // Send the notification
        case 'postNotification':  
          this.setState({ messages: this.state.messages.concat([message]) })
          break

        default:       
          
          // Show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + message.type)
      }

      console.log(JSON.parse(event.data))
    }
  }

  render() {
    const { messages, clientCount } = this.state
    
    return (
      <div>
        <NavBar clientCount={ clientCount } />     
        <MessageList messages={ messages } />      
        <ChatBar messages={ messages } newMessage={ this.newMessage }/>
      </div>
    )
  }
}

export default App
