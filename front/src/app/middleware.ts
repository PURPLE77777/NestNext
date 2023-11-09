import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Set CORS headers
	const response = NextResponse.next()
	response.headers.set('Access-Control-Allow-Origin', '*')
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,DELETE,OPTIONS'
	)
	response.headers.set(
		'Access-Control-Allow-Headers',
		'X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding'
	)
	return response
}
