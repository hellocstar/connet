import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ConNET
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: 'orange',
      // marginTop: theme.spacing(8),
      padding: theme.spacing(6, 0),
    },
  }));

export default function StickyFooter(props) {
    const classes = useStyles();
    const { description, title } = props;
  
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {description}
          </Typography>
          <Copyright />
        </Container>
      </footer>
    );
}

StickyFooter.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};