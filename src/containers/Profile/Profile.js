import React from 'react';
import { apiCall } from '../../api/api';
import './Profile.css'; 

class Profile extends React.Component {
	constructor(props){
		super(props); // needed in case you want to use props inside the constructor code
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age,
			pet: this.props.user.pet,
		}
	}

	onFormChange = (event) => {
		switch(event.target.name) {
			case 'user-name':
				this.setState({ name : event.target.value })
				break;
			case 'user-age':
				this.setState({ age : event.target.value })
				break;
			case 'user-pet':
				this.setState({ pet : event.target.value })
				break;
			default:
				return;
		}
	}

	onProfileUpdate = (data) => {
		apiCall('post', `profile/${this.props.user.id}`, { formInput: data }, { 'Authorization' : window.sessionStorage.getItem('token') })
		.then (resp => {
			if(resp.status === 200 || resp.status === 304){
				console.log('updated2')
				this.props.toggleModal();
				this.props.loadUser({ ...this.props.user, ...data });
			}
		}).catch(console.log);
	}

	render(){
		//const { name, age, pet } = this.state
		const { toggleModal, user} = this.props;
		const { name, age, pet } = this.state;
		return (
			<div 
				className="profile-modal" > 
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
					<main className="pa4 black-80 w-80">
						<img
				      	src="http://tachyons.io/img/logo.jpg"
				      	className="h3 w3 dib" alt="avatar" />
				    <h1>{this.state.name}</h1>
				    <h4>{`Image Submitted: ${user.entries}`}</h4> 
				    <p> {`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
				    <hr/>
			        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
			        <input 
			        	onChange= {this.onFormChange}
			        	className="pa2 i ba w-100"
			        	placeholder={user.name} 
			        	type="text" 
			        	name="user-name"  
			        	id="name" 
			        />
			        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
			        <input 
			        	onChange= {this.onFormChange}
			        	className="pa2 i ba w-100"
			        	placeholder={user.age} 
			        	type="text" 
			        	name="user-age"  
			        	id="age" 
			        />
			        <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
			        <input
			        	onChange= {this.onFormChange} 
			        	className="pa2 i ba w-100"
			        	placeholder={user.pet}
			        	type="text" 
			        	name="user-pet"  
			        	id="pet" 
			        />
			        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
			        	<button 
			        		onClick= { () => this.onProfileUpdate({ name, age, pet }) }
			        		className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
			        		Save
			        	</button>
			        	<button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
			        		onClick ={toggleModal}>
			        		Cancel
			        	</button>		        	
			        </div>
					</main>
					<div className='modal-close' onClick={toggleModal}>&times;</div>
				</article>
			</div>
		)
	}
}

export default Profile;