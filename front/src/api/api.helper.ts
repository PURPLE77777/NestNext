export const getContentType = () => ({
	'Content-Type': 'application/json',
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
	'Access-Control-Allow-Headers':
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
})

export const errorCatch = (error: any): string => {
	return error.response
		? error.response.data
		: error.request
		? error.request
		: error.message
}
