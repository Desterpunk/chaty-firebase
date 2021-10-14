import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
		this.githubSignIn = this.githubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
		event.preventDefault();
		this.setState({ error: ''});
		try {
			await signup(this.state.email, this.state.password);
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

    
	async googleSignIn() {
		try {
			await signInWithGoogle();
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	async githubSignIn() {
    	try {
      		await signInWithGitHub();
    	} catch (error) {
      		this.setState({ error: error.message });
    	}
  	}


	render() {
		return (
			<div className="container">
                <form 
				className="mt-5 py-5 px-5"
				autoComplete= "off"
				onSubmit={this.handleSubmit}>
                    <h1>Sign Up to <Link className="title ml-2" to="/">Chatty</Link></h1>
                    <p>Fill in the form below to create an account.</p>
                    <div className="form-group">
                        <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                    </div>
                    <div>
                        <input className="form-control"placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                    </div>
                    <div className="form-group">
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button className="btn btn-dark px-5" type="submit">Sign up</button>
						<hr></hr>
						<p>Or</p>
						<button className="btn mr-3 text-white" onClick={this.googleSignIn} type="button">
							Sign up with Google
						</button>
						<button className="btn mr-3 text-white" onClick={this.githubSignIn} type="button">
							Sign up with GitHub
						</button>
                        <hr></hr>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
				<Footer></Footer>
			</div>
		)
	}
}