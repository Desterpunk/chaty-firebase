import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
        <Header/>
        <div className="chat-area" ref={this.myRef}>
          {/* loading */}
          {this.state.loadingChats ? 
          <div role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span>{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
          <form className="mx-3" onSubmit={this.handleSubmit}>
            <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="btn btn-dark px-5 mt-4" type="submit">Send</button>
          </form>
          <div className="py-5 mx-3">
            Login in as: <strong>{this.state.user.email}</strong>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
