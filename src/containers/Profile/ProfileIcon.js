import React from 'react';

import { 
	Dropdown, 
	DropdownToggle, 
	DropdownMenu, 
	DropdownItem 
} from 'reactstrap';


class ProfileIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false
		}
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}))
	}

	render() {
		// note in JSX we have to close the html tags although its not oroginly closed (img tag)
		return(
			<div className="pa4 tc">
				<Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
			    <DropdownToggle
		        tag="span"
		        data-toggle="dropdown"
		        aria-expanded={this.state.dropdownOpen}
		      >
			  		<img
			      	src="http://tachyons.io/img/logo.jpg"
			      	className="br-100 ba h3 w3 dib" alt="avatar"
			      /> 
      		</DropdownToggle>
		      <DropdownMenu
		      	right
		      	className='b--transparent shadow-5'
		      	style={{ 
							marginTop: '20px', 
							backgroundColor: 'rgba(255,255,255,0.5)',
							position: 'absolute',
   						willChange: 'transform',
	        		top: '0px',
	        		left: '0px',
    	   			transform: 'translate3d(-101px, 44px, 0px)'
						}}
					>
		        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
		        <DropdownItem onClick= {() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
		      </DropdownMenu>
	    	</Dropdown>
			</div>
		)
	}
}

export default ProfileIcon;