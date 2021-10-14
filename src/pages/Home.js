import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
          <section>
            <div>
              <Header/>
              <section className="container text-center py-5">
                <div >
                  <h1 className="display-4">Welcome to Chatty</h1>
                  <p className="lead">A great place to share your thoughts with friends</p>
                </div>
                <div className="mt-4 ">
                  <Link className="btn btn-primary px-5 mr-3" to = "/signup">Create New Account</Link>
                  <Link className="btn px-5 text-white" to = "/login">Login to your Account</Link>
                </div>
              </section>
            </div>
          </section>
          <Footer></Footer>
      </div>
    )
  }
}