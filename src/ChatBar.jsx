import React, {Component} from 'react'

class ChatBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Anon', // Anon by default if no username is entered
      content: ''
    }
  }

  // Setting username to whatever user types
  changeUsername = e => {
    this.setState({ username: e.target.value })
  }

  // Setting content to whatever the user types
  changeContent = e => {
    this.setState({ content: e.target.value })
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" 
            onChange={ this.changeUsername }
            
            // If username is changed, display notification on 'Enter'
            onKeyPress = {e => {
              if (e.key === 'Enter') {
                this.changeUserName(e.target.value)
              }
            }}
          />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
            onChange = { this.changeContent }
            
            // If there's no content, prevent submitting
            // Otherwise submit the message & username
            onKeyPress = {e => {
              if (e.key === 'Enter') {            
                if (!this.state.content) {
                  e.preventDefault()
                } else {
                  this.submitInput()
                  e.target.value = ''
                }
              }
            }}
          />
        </footer>
      </div>
    )
  }

  // Here we render a notification that the user changed his name 
  changeUserName = (username) => {
    this.props.newMessage(
      {
        type: 'postNotification',
        content: `Anon changed his name to ${ this.state.username }`
      }
    )
  }

  // Here we submit the content and message as per usual
  submitInput = () => {
    this.props.newMessage(
      {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
    ) 
    this.setState({ content: '' }) 
  }
}

export default ChatBar