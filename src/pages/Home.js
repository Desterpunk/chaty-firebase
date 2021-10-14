import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div>
          <section>
            <div>
              <div>
                <h1>Welcome to Chatty</h1>
                <p>A great place to share your thoughts with friends</p>
              </div>
              <div>
                <Link to = "/signup">Create New Account</Link>
                <Link to = "/login">Login to your Account</Link>
              </div>
            </div>
          </section>
      </div>
    )
  }
}