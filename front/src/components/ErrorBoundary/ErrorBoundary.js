import React from 'react';
import Button from '@material-ui/core/Button';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div id='notfound'>
					<div className='notfound'>
						<div className='notfound-404'></div>
						<h2>Oops! Something's wrong</h2>
						<p>Sorry but something is wrong. Please check again.</p>
						<Button
							variant='contained'
							onClick={() =>
								this.props.onRouteChange('community')
							}
						>
							Go to Community
						</Button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
