import React from 'react';
import Particles from 'react-particles-js';

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

const BackgroundAnimation = () => {
	return (
		<Particles className='particles' params={particlesOptions} />
	);
}

export default BackgroundAnimation;


