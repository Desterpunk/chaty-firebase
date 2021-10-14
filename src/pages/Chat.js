import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }
  
  render() {
    return (
      <div>
        <div ref={this.myRef}>
          {/* loading */}
          {this.state.loadingChats ? 
          <div role="status">
            <span>Loading...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp}>
              {chat.content}
              <br />
              <span>{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
          <form onSubmit={this.handleSubmit}>
            <textarea name="content" onChange={this.handleChange} value={this.state.content}></textarea>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Send</button>
          </form>
          <div>
            Login in as: <string>{this.state.user.email}</string>
          </div>
        </div>
      </div>
    );
  }
}
