export const apiCall = (method, endpoint, bodyObject= {}, headresAdditions={}) => {
	if (method === 'get'){
		return fetch('http://localhost:3000/' + endpoint, {
			method: method,
			headers: {
			 	'Content-Type' : 'application/json', 
			 	...headresAdditions 
			}
		})
		.catch(err => {
			console.log('apiCall error', err)
		})
	} else {
			return fetch('http://localhost:3000/' + endpoint, {
				method: method,
				headers: {
					 'Content-Type' : 'application/json',
					 ...headresAdditions 
				},
				body: JSON.stringify(bodyObject)
			})
			.catch(err => {
				console.log('apiCall error', err)
			})
		}
}

	// https://quiet-temple-55004.herokuapp.com