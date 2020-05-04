import React from 'react';
import Logo from './connet_icon.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

//contains methods, theme and styles for componenets to render a banner with material card

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
});

const logostyle = {
	//position:"relative",
	width: '150px',
};

const imgCenterStyle = {
	position: 'absolute',
	top: '50%',
	color: 'white',
	fontSize: '200%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	//display:"flex",
	//alignItems:"center", /** Y-axis align **/
	//justifyContent:"center", /** X-axis align **/
	//left:"25%",
	//width:"100%",
};



const useStyles = makeStyles((theme) => ({
	Banner: {
	  position: 'relative',
	  backgroundColor: theme.palette.grey[800],
	  color: theme.palette.common.white,
	  marginBottom: theme.spacing(4),
	  backgroundImage: 'url(https://source.unsplash.com/random)',
	  backgroundSize: 'cover',
	  backgroundRepeat: 'no-repeat',
	  backgroundPosition: 'center',
	},
	overlay: {
	  position: 'absolute',
	  top: 0,
	  bottom: 0,
	  right: 0,
	  left: 0,
	  backgroundColor: 'rgba(0,0,0,.3)',
	},
	BannerContent: {
	  position: 'relative',
	  padding: theme.spacing(3),
	  [theme.breakpoints.up('md')]: {
		padding: theme.spacing(10),
		paddingRight: 1,
	  },
	},
  }));

export default function Banner(props) {
const classes = useStyles();
//const { post } = props;

return (
	<MuiThemeProvider theme={theme}>
	<Paper className={classes.Banner} style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}>
	{/* Increase the priority of the hero background image */}
	<div className={classes.overlay} />
	<Grid container>
		<Grid item md={11}>
		<div className={classes.BannerContent}>
			{<img src={Logo} alt='Logo' style={logostyle} />}
			<Typography component="h1" variant="h3" color="inherit" gutterBottom>
			{"The world awaits you."}
			</Typography>
			<Typography variant="h5" color="inherit" paragraph>
			{'Join a local group to meet people, try something new, or do more of what you love.'}
			</Typography>			
		</div>
		</Grid>
	</Grid>
	</Paper>
	</MuiThemeProvider>
);
}

Banner.propTypes = {
post: PropTypes.object,
};
