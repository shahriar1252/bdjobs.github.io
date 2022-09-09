import React from 'react';
//Material UI core
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
//React router
import { Link, Redirect, Route, Switch } from 'react-router-dom';
//Custom hooks
import useLocationLevel from '../../hooks/useLocationLevel';
//Custom pages
import SignUp from './SignUp';
import LogIn from './LogIn';
//Fixed Routes
import { root, join, logIn, signUp } from '../../utils/fixedRoutes';

export default function Join() {
	const classes = useStyles();
	const activeTab = useLocationLevel(1, root);
	return (
		<div className={classes.JoinBackground}>
			<div className={classes.JoinContainer}>
				<Tabs
					value={activeTab}
					variant='fullWidth'
					indicatorColor='primary'
					aria-label='Sign up or log in'>
					<Tab component={Link} to={signUp} value='signup' label='SIGN UP' />
					<Tab component={Link} to={logIn} value='login' label='LOG IN' />
				</Tabs>
				<Divider />
				<div className={classes.JoinBox}>
					<Switch>
						<Route path={signUp} component={SignUp} />
						<Route path={logIn} component={LogIn} />
						<Redirect from={join} to={logIn} />
					</Switch>
				</div>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	JoinBackground: {
		minHeight: 640,
		padding: theme.spacing(4, 2),
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/bookshelf.jpg")`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	JoinContainer: {
		maxWidth: 480,
		minHeight: 300,
		overflow: 'hidden',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[12],
		transitionProperty: 'height',
		transitionDuration: theme.transitions.duration.complex,
	},
	JoinBox: {
		padding: theme.spacing(2, 3, 3, 3),
	},
}));
