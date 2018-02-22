import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Anon',
      content: ''
    }
  }

  changeUsername = e => {
    this.setState({ username: e.target.value })
  }

  changeContent = e => {
    this.setState({ content: e.target.value })
  }

  clearInput = () => {
    this.contentInput.value = '' 
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" 
            onChange={this.changeUsername}
            onKeyPress = {e => {
              if (e.key === 'Enter') {
                this.changeUserName()
              }
            }}
          />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
            ref={el => this.contentInput = el}
            onChange = {this.changeContent}
            onKeyPress = {e => {
              if (e.key === 'Enter') {            
                this.submitInput()
                this.clearInput()
              }
            }}
          />
        </footer>
      </div>
    )
  }

  changeUserName = () => {
    this.props.submitMessage(
      {
        type: 'postNotification',
        content: `Anon changed his name to ${this.state.username}`
      }
    )
  }

  submitInput = () => {
    this.props.submitMessage(
      {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
    )
  }
}

export default ChatBar;

// switch (message.type) {
      //   case "counting connections":
      //   // handle incoming message
      //   console.log('test', message)
      //     this.setState({ clientNumbers: message.count })

      //     break;
      //   case "postMessdsdage":
      //   // handle incoming notification

      //   // this.setState({
      //   //   messages: this.state.messages.concat([{
      //   //     username: message.username,
      //   //     content: message.content,
      //   //     id: message.id,
      //   //     type: message.type
      //   //   }])
      //   // })

      //     break;
      //   case "currentClients":
      //     // handle incoming notification

      //     break;
      //   default:
      //   // show an error in the console if the message type is unknown
      //   throw new Error("Unknown event type " + data.type);
      // }