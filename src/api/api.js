export const apiCall = (method, endpoint,bodyObject) =>
	fetch('http://localhost:3000/' + endpoint, {
		method: method,
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify(bodyObject)
	})
	.then(response =>  response.json())
	.catch(err => {
		console.log('apiCall error', err)
		//console.log(response);
	})


	// https://quiet-temple-55004.herokuapp.com