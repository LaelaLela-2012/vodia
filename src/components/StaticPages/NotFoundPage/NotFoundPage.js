import React from 'react'
import './NotFoundPage.css'
import { Link } from 'react-router-dom';

const notFoundPage = () => {
	return (
		<div className="Parent">
			<div className="notfound">
				<div className="notfound-404">
					<div></div>
					<h1>404</h1>
				</div>
				<h2>Page not found</h2>
				<p>The page you are looking for might have been removed, had its name changed, or doesn't exist.</p>
				<Link to={`/`}>Back to home</Link>
			</div>
		</div>
	)
}

export default notFoundPage