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
                this.changeUserName(e.target.value)
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

  changeUserName = (username) => {
    this.props.submitMessage(
      {
        type: 'postNotification',
        content: `${username} changed his name to ${this.state.username}`
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