import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'> 
				<img id='inputImg' alt='' src= { imageUrl } width='500px' hight='auto' />
				<div className='bounding-Box' 
						 style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
				</div>
		 	</div>
		</div>
	);
}

export default FaceRecognition;