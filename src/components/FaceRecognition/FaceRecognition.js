import React from 'react';
import Box from '../Box/Box';

const FaceRecognition = ({ imageUrl, faces }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'> 
				<img id='inputImg' alt='' src= { imageUrl } width='500px' hight='auto' />
		  	<div>
		  		{
			  		faces.map( (face, i) => {
							return (
								<Box  
								key= {i}
								topRow= { face.topRow }
								rightCol= { face.rightCol }
								bottomRow= { face.bottomRow }
								leftCol= { face.leftCol }
								/>
							); 
						})
					}
		    </div>
		 	</div>
		</div>
	);
}

export default FaceRecognition;

