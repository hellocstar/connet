import React from 'react';

class UpdateProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: '',
			userPassword: '',
			userConfirmPassword: '',
			dateOfBirth: '',
			gender: '',
			interest: '',
			userDescription: '',
		};
	}

	onEmailChange = (email) => {
		this.setState({ userEmail: email.target.value });
	};

	onPasswordChange = (password) => {
		this.setState({ userPassword: password.target.value });
	};

	onConfirmPasswordChange = (confirmPassword) => {
		this.setState({ confirmPassword: confirmPassword.target.value });
	};
	onDateOfBirthChange = (DOB) => {
		this.setState({ dateOfBirth: DOB.target.value });
	};
	onGenderChange = (Gender) => {
		this.setState({ gender: Gender.target.value });
	};
	onInterestChange = (Interest) => {
		this.setState({ interest: Interest.target.value });
	};
	onUserDescriptionChange = (Description) => {
		this.setState({ userDescription: Description.target.value });
	};

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				signInEmail: this.state.email,
				signInPassword: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					this.props.onRouteChange('community');
				}
			});
	};

	render() {
		return (
			<div>
				<fieldset id='update_profile'>
					<legend>Update Profile</legend>
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
					<div>
						<label htmlFor='confirmPassword'>
							Confirm Password
						</label>
						<input
							type='confirmPassword'
							name='confirmPassword'
							id='confirmPassword'
							onChange={this.onConfirmPasswordChange}
						/>
					</div>
					<div>
						<label htmlFor='date_of_birth'>Date of Birth</label>
						<input
							type='date_of_birth'
							name='date_of_birth'
							id='date_of_birth'
							onChange={this.onDateOfBirthChange}
						/>
					</div>
					<div>
						<label htmlFor='gender'>Gender</label>
						<input
							type='gender'
							name='gender'
							id='gender'
							onChange={this.onGenderChange}
						/>
					</div>
					<div>
						<label htmlFor='interest'>Interest</label>
						<input
							type='interest'
							name='interest'
							id='interest'
							onChange={this.onInterestChange}
						/>
					</div>
					<div>
						<label htmlFor='user_description'>Description</label>
						<input
							type='user_description'
							name='user_description'
							id='user_description'
							onChange={this.onUserDescriptionChange}
						/>
					</div>
				</fieldset>
				<div className=''>
					<input
						onClick={this.onSubmitSignIn}
						type='submit'
						value='Update'
					/>
				</div>
			</div>
		);
	}
}

export default UpdateProfile;
