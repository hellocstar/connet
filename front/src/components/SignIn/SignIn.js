import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	onUsernameChange = (username) => {
		this.setState({ username: username.target.value });
	};

	onPasswordChange = (password) => {
		this.setState({ password: password.target.value });
	};

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				this.props.onSignIn(data._id, data.username);
				this.props.onActivityIDChange(data._id);
				this.props.onRouteChange('profile/' + data._id);
			});
	};

	render() {
		return (
			<div>
				<fieldset id='sign_in'>
					<legend>Sign In</legend>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='username'
							name='username'
							id='username'
							onChange={this.onUsernameChange}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							onChange={this.onPasswordChange}
						/>
					</div>
				</fieldset>
				<div className=''>
					<input
						onClick={this.onSubmitSignIn}
						type='submit'
						value='Sign In'
					/>
				</div>
			</div>
		);
	}
}

export default SignIn;
