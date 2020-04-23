import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import './NavBar.css';
import Fade from '@material-ui/core/Fade';
import RoomIcon from '@material-ui/icons/Room';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ffffff',
			mainGradient: 'linear-gradient(to right, orange, #9c27b0)',
			contrastText: '#fff',
		},
		secondary: {
			main: '#e91e63',
		},
	},
	typography: {
		button: {
			//textTransform: 'none',
		},
	},
});

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

const BootstrapButton = withStyles({
	root: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		background: 'orange',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: 'orange',

			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: 'orange',
		},
	},
})(Button);

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	// return React.cloneElement(children, {
	//   elevation: trigger ? 4 : 0, style:{ background: trigger ? theme.palette.primary.mainGradient : 'transparent',  boxShadow: 'none'}
	// });

	const bar = React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
		style: {
			background: theme.palette.primary.mainGradient,
			boxShadow: 'none',
		},
	});

	return (
		<Fade in={trigger} timeout={500}>
			{bar}
		</Fade>
	);
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

// // function topButton(){
// // 	return {className={classes.button} color="primary" size="small"};
// // }

// const topButtonProp = {className={classes.button} color="primary" size="small"};
function PrimarySearchAppBar(
	{
		onRouteChange,
		isSignedIn,
		onActivityIDChange,
		onSignIn,
		onSignOut,
		pastRoute,
		user,
	},
	props
) {
	const [search, setSearch] = React.useState('');

	const onSubmitSearch = (search) => {
		fetch('http://localhost:3000/search', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: search,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.username) {
					onActivityIDChange(data._id);
					onRouteChange('profile/' + data._id);
				} else {
					onRouteChange('notfound');
				}
			});
	};

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					aria-label='show 11 new notifications'
					color='inherit'
				>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const [open, setOpen] = React.useState(false);
	const [openSignup, setOpenSignup] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenSignup = () => {
		setOpenSignup(true);
	};

	const handleCloseSignup = () => {
		setOpenSignup(false);
	};

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [username, setUsername] = React.useState('');

	const onUsernameChange = (username) => {
		setUsername(username.target.value);
	};
	const onEmailChange = (email) => {
		setEmail(email.target.value);
	};
	const onPasswordChange = (password) => {
		setPassword(password.target.value);
	};

	const onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					// console.log(data);
					handleClose();
					onSignIn(data._id, data.username, data.imageData);
					onActivityIDChange(data._id);
					onRouteChange('profile/' + data._id);
				}
			});
	};

	const onSubmitSignUp = () => {
		if(username && email && password){
		fetch('http://localhost:3000/signup', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					handleCloseSignup();
					onSignIn(data._id, data.username, data.imageData);
					onActivityIDChange(data._id);
					onRouteChange('updateprofile/' + data._id);
				}
			});
		}
	};

	const LoginButton = withStyles({
		root: {
			background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
			borderRadius: 100,
			border: 0,
			color: 'white',
			height: 48,
			padding: '0 30px',
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		},
		label: {
			textTransform: 'capitalize',
		},
	})(Button);

	const Copyright = (
		<Box m={1}>
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Copyright © '}
				<Link color='inherit' href='https://material-ui.com/'>
					ConNET
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);

	const LoginDialogue = (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			maxWidth='xs'
		>
			<DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
				</Grid>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
			</DialogTitle>
			{/* <Divider variant='middle' /> */}

			<DialogContent>
				{/* <DialogContentText>
					<Typography
						style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
					>
						Already have an account? Sign in!
					</Typography>
				</DialogContentText> */}

				<TextField
					autoFocus
					variant='outlined'
					required
					fullWidth
					name='username'
					label='User Name'
					type='username'
					id='username'
					autoComplete='current-username'
					color='secondary'
					margin='normal'
					onChange={onUsernameChange}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					color='secondary'
					onChange={onPasswordChange}
					onKeyPress={(e) => {
						if (e.key === 'Enter') onSubmitSignIn();
					}}
				/>
				<FormControlLabel
					control={<Checkbox value='remember' color='secondary' />}
					label='Remember me'
				/>
			</DialogContent>
			{/* <Divider variant='middle' /> */}
			<DialogActions>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<LoginButton
						onClick={onSubmitSignIn}
						style={{ justifyContent: 'center' }}
					>
						Sign In
					</LoginButton>
				</Grid>
			</DialogActions>
			<Box mt={2}>{Copyright}</Box>
		</Dialog>
	);

	const SignupDialogue = (
		<Dialog
			open={openSignup}
			onClose={handleCloseSignup}
			aria-labelledby='form-dialog-title'
			maxWidth='xs'
		>
			<DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
				</Grid>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
			</DialogTitle>
			{/* <Divider variant='middle' /> */}
			<DialogContent>
				<DialogContentText>
					<Typography
						style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
					>
						Don't have an account yet? Join us!
					</Typography>
				</DialogContentText>

				<TextField
					autoFocus
					variant='outlined'
					required
					fullWidth
					name='username'
					label='User Name'
					type='username'
					id='username'
					autoComplete='current-username'
					color='secondary'
					margin='normal'
					onChange={onUsernameChange}
				/>
				<TextField
					variant='outlined'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					color='secondary'
					margin='normal'
					onChange={onEmailChange}
				/>
				<TextField
					variant='outlined'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					color='secondary'
					margin='normal'
					onChange={onPasswordChange}
				/>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								value='allowExtraEmails'
								color='secondary'
							/>
						}
						label='I want to receive inspiration, marketing promotions and updates via email.'
					/>
				</Grid>
			</DialogContent>
			{/* <Divider variant='middle' /> */}
			<DialogActions>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<LoginButton
						onClick={onSubmitSignUp}
						style={{ justifyContent: 'center' }}
					>
						Sign Up
					</LoginButton>
				</Grid>
			</DialogActions>
			<Box mt={2}>{Copyright}</Box>
		</Dialog>
	);

	const CustomAppBar = (
		<AppBar style={{ background: 'transparent', boxShadow: 'none' }}>
			<Toolbar>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='open drawer'
					onClick={() => {
						onRouteChange(pastRoute);
					}}
				>
					<ArrowBackIcon />
				</IconButton>
				{isSignedIn === true ? (
					<div>
						<IconButton
							variant='outlined'
							className={classes.button}
							color='primary'
							size='small'
							// aria-label='open drawer'
							onClick={() => {
								onRouteChange('profile/' + user.id);
							}}
						>
							<Avatar src={user.imageData}>{user.name}</Avatar>
						</IconButton>
						<BootstrapButton
							variant='contained'
							color='primary'
							onClick={() => onRouteChange('create')}
						>
							Create!
						</BootstrapButton>
					</div>
				) : null}
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search for people...'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
						onChange={(event) => setSearch(event.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') onSubmitSearch(search);
						}}
					/>
				</div>
				<div className={classes.grow} />
				<div className={classes.sectionDesktop}>
					<Button
						variant='outlined'
						className={classes.button}
						color='primary'
						size='small'
						onClick={() => onRouteChange('about')}
					>
						About
					</Button>
					{isSignedIn === true ? (
						<Button
							variant='outlined'
							className={classes.button}
							color='primary'
							size='small'
							onClick={() => onRouteChange('mycircle')}
						>
							My Circle
						</Button>
					) : null}
					<Button
						variant='outlined'
						className={classes.button}
						color='primary'
						size='small'
						onClick={() => onRouteChange('community')}
					>
						Community
					</Button>
					{isSignedIn === true ? (
						<Button
							variant='outlined'
							className={classes.button}
							color='primary'
							size='small'
							onClick={() => onSignOut()}
						>
							Sign Out
						</Button>
					) : (
						<div>
							<Button
								variant='outlined'
								className={classes.button}
								color='primary'
								size='small'
								onClick={handleClickOpen}
							>
								Sign in
							</Button>
							<Button
								variant='outlined'
								className={classes.button}
								color='primary'
								size='small'
								onClick={handleClickOpenSignup}
							>
								Sign up
							</Button>
						</div>
					)}
				</div>
				<div className={classes.sectionMobile}>
					<IconButton
						aria-label='show more'
						aria-controls={mobileMenuId}
						aria-haspopup='true'
						onClick={handleMobileMenuOpen}
						color='inherit'
					>
						<MoreIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);

	return (
		<div className={classes.grow}>
			<MuiThemeProvider theme={theme}>
				{CustomAppBar}
				<ElevationScroll {...props}>{CustomAppBar}</ElevationScroll>
				{renderMobileMenu}
				{renderMenu}
				{LoginDialogue}
				{SignupDialogue}
			</MuiThemeProvider>
		</div>
	);
}

const NavBar = ({
	onRouteChange,
	isSignedIn,
	onActivityIDChange,
	onSignIn,
	onSignOut,
	pastRoute,
	user,
}) => {
	//const bar = <PrimarySearchAppBar onRouteChange={onRouteChange} isSignedIn={isSignedIn} />;

	//PrimarySearchAppBar({ onRouteChange, isSignedIn });
	//<PrimarySearchAppBar {...this.prop}/>
	//Welcome("sara");
	return (
		<PrimarySearchAppBar
			onRouteChange={onRouteChange}
			isSignedIn={isSignedIn}
			onActivityIDChange={onActivityIDChange}
			onSignIn={onSignIn}
			onSignOut={onSignOut}
			pastRoute={pastRoute}
			user={user}
		/>
	);
};

export default NavBar;
