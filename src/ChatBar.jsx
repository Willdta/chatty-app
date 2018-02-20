import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: this.props.userProp,
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
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.userProp} onChange={this.changeUsername} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
            onChange = { this.changeContent }
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

  submitInput = () => {
    this.props.submitMessage(
      {
        username: this.state.username,
        content: this.state.content
      }
    )
  }
}

export default ChatBar;