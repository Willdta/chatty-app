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
            onChange = {this.changeContent}
            onKeyPress = {e => {
              if (e.key === 'Enter') {
                this.submitInput()
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