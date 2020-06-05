import React from 'react';

class Rank extends React.Component {
	constructor(){
		super();
		this.state = {
			emoji: ''
		}
	}

// called on the first time the component is mounting
	componentDidMount(){
		this.generateEmoji(this.props.entries)
	}

// called every time something changed with the component, state/props..
	componentDidUpdate(prevProps, prevState){
		if (prevProps.entries === this.props.entries &&
				prevProps.name === this.props.name ) {
			return null
		}
		this.generateEmoji(this.props.entries)
	}

	generateEmoji = (entries) => {
		fetch(`https://faj9pzq05d.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
		.then(resp => resp.json())
		.then(data => {
			this.setState({emoji: data.input})
		})
		.catch(console.log)
	}

	render() {
		return (
			<div> 
				<div className='white f3'>
					{`${this.props.name} , your current rank is...`}
				</div>
	      <div className='white f1 '>
	      	{this.props.entries}
	      </div>	
	      <div className='white f3 '>
	      	{ `Rank Badge: ${this.state.emoji}` }
	      </div>
			</div>
		);
	}
}

export default Rank;