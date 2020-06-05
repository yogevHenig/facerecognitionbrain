import React, { Component } from 'react';

// import components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './containers/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation'

// import containers
import SignIn from './containers/SignIn/SignIn.js';
import Register from './containers/Register/Register.js';

import { apiCall } from './api/api';
import Modal from './components/Modal/Modal';
import Profile from './containers/Profile/Profile';
import './App.css'; 


const initialState = {
  input: '',
  imageUrl: '',
  faces: [],
  route: 'signin', // todo change to sign in
  isSignedIn: false, // todo change to false
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: '',
  }
}

class App extends Component {
  constructor(){ 
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      apiCall('post', 'signin', {} ,{ 'Authorization' : token })
      .then(response =>  response.json())
      .then(data => {
        if (data && data.id) {
          apiCall('get', `profile/${data.id}`, null, { 'Authorization' : token })
          .then(response =>  response.json())
          .then(user => {
            if (user && user.email){
              this.loadUser(user)
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }});
  }

  calculateFacesLocation = (data) => {
    if (data && data.outputs){
      const image = document.getElementById('inputImg');
      const width = (Number)(image.width);
      const height = (Number)(image.height);

      let faces = (data.outputs[0].data.regions).map(region => {
        let face = region.region_info.bounding_box;
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
      })
      return faces;      
    }
    return;
  }

  displayFaceBoxes = (faces) => {
    if (faces){  
      this.setState({faces: faces});
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    apiCall('post','imageurl', {input: this.state.input}, { 'Authorization' : window.sessionStorage.getItem('token') })
    .then(response =>  response.json())
    .then(response => {
      if (response){
        apiCall('put', 'image', { id: this.state.user.id }, { 'Authorization' : window.sessionStorage.getItem('token') })
        .then(response =>  response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log);
      }
      this.displayFaceBoxes(this.calculateFacesLocation(response))
    })
    .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      window.sessionStorage.removeItem('token');
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState( {route: route });
  }

  toggleModal = () => {
    console.log('toggle modal')
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render(){
    const { isSignedIn, imageUrl, route, faces, isProfileOpen, user} =  this.state;
    return (
      <div className="App">
        <BackgroundAnimation />
        <Navigation isSignedIn= {isSignedIn} onRouteChange = { this.onRouteChange  }
          toggleModal={ this.toggleModal } />
        { isProfileOpen && 
          <Modal>
            <Profile
              isProfileOpen ={ isProfileOpen }  
              toggleModal={ this.toggleModal }
              loadUser= { this.loadUser }
              user= { user }
            />
          </Modal>
        }
        { route === 'home'
          ? <div>
                <Logo />
                <Rank 
                  name={ this.state.user.name } 
                  entries={ this.state.user.entries }
                />
                <ImageLinkForm 
                  onInputChange={ this.onInputChange } 
                  onButtonSubmit={ this.onButtonSubmit }
                />
                <FaceRecognition faces={faces} imageUrl={ imageUrl }/>
              </div>
          : (
              route === 'signin'
              ? <SignIn 
                  onRouteChange= { this.onRouteChange } 
                  loadUser = { this.loadUser }
                />
              : <Register onRouteChange = { this.onRouteChange } loadUser= { this.loadUser } />
            )
        }
      </div>
    );
  }

}

export default App;
