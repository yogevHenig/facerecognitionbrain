import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import { apiCall } from './api/api';
import './App.css'; 

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      desity: {
        enable: true,
        value_area: 800 
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  faces: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){ 
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }});
  }

  calculateFacesLocation = (data) => {
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

  displayFaceBoxes = (faces) => {
    this.setState({faces: faces});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onPictureSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    apiCall('post','imageurl', {input: this.state.input})
    .then(response => {
      if (response){
        apiCall('put', 'image', { id: this.state.user.id })
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
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState( {route: route });
  }

  render(){
    const { isSignedIn, imageUrl, route, faces } =  this.state;
    //console.log('init faces', faces);
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn= {isSignedIn} onRouteChange = { this.onRouteChange  }/>
        { route === 'home'
          ? <div>
                <Logo />
                <Rank 
                  name={ this.state.user.name } 
                  entries={ this.state.user.entries }
                />
                <ImageLinkForm 
                  onInputChange={ this.onInputChange } 
                  onButtonSubmit={ this.onPictureSubmit }
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
