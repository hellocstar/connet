import React from 'react';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
		};
	}

	onUsernameChange = (name) => {
		this.setState({ username: name.target.value });
	};

	onEmailChange = (email) => {
		this.setState({ email: email.target.value });
	};

	onPasswordChange = (password) => {
		this.setState({ password: password.target.value });
	};

	onSubmitSignUp = () => {
		fetch('http://localhost:3000/signup', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.text())
			.then((id) => {
				if (id) {
					this.props.onSignIn(id, this.state.username);
					this.props.onActivityIDChange(id);
					this.props.onRouteChange('updateprofile/' + id);
				}
			});
	};

	render() {
		return (
			<div>
				<p>Sign Up to reach out to the world!</p>
				<fieldset id='sign_up'>
					<legend>Sign Up</legend>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							onChange={this.onUsernameChange}
						/>
					</div>
					<div>
						<label htmlFor='email-address'>Email</label>
						<input
							type='email'
							name='email-address'
							id='email-address'
							onChange={this.onEmailChange}
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
						onClick={this.onSubmitSignUp}
						type='submit'
						value='Sign Up'
					/>
				</div>
			</div>
		);
	}
}

export default SignUp;
