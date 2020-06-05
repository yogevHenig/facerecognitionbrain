import React from 'react';
import { apiCall } from '../../api/api';
import './Register.css';


class Register extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
		}
	}

	onNameChange = (event) => {
		this.setState({ registerName: event.target.value })
	}

	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value })
	}

saveAuthTokenInSession = (token) => {
		// object that saved between browser refresh
		window.sessionStorage.setItem('token', token); // stores the token we get from the backend in the browser storage
		// also possible to use sessions.storage. the diffrence is sessionstorage is unique to browser tab - not exist if you open new tab. 
	}

	onSubmitRegister = () => {
		let bodyObject = {
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword,
		}
		apiCall('post', 'register', bodyObject)
		.then(response =>  response.json())
		.then(data => {
			if (data.userId && data.success === 'true') {
				this.saveAuthTokenInSession(data.token);
        apiCall('get', `profile/${data.userId}`, null, { 'Authorization' : data.token })
        .then(response =>  response.json())
        .then(user => {
          if (user && user.email){
            this.props.loadUser(user)
            this.props.onRouteChange('home');
          }
        })
			}
		})
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
				        	type="text" 
				        	name="name"  
				        	id="name" 
				        	onChange = { this.onNameChange }
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
				        	type="email"
				        	ame="email-address"
				        	id="email-address"
				        	onChange = { this.onEmailChange }
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
				        	type="password" 
				        	name="password" 
				        	id="password" 
				        	onChange = { this.onPasswordChange }
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick = { this.onSubmitRegister } 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register" />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
} 

export default Register;



