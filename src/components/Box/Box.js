import React from 'react';
import './Box.css';

const Box = ({ topRow, rightCol, bottomRow, leftCol}) => {
	return (
		<div className='bounding-Box' 
				 style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}>
		</div>
	);
}

export default Box;


