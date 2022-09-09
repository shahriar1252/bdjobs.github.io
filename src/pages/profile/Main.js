import React, { useContext } from 'react';
// Material UI core
// import Avatar from '@material-ui/core/Avatar';
// import Divider from '@material-ui/core/Divider';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import { makeStyles } from '@material-ui/core/styles';
// React router
import { Redirect, Route, Switch } from 'react-router-dom';
// React helmet
import { Helmet } from 'react-helmet';
//Custom hooks
import useLocationLevel from '../../hooks/useLocationLevel';
// Custom pages
// import ProfileAbout from './About';
// import ProfileBlogs from './Blogs';
// import ProfileCourses from './Courses';
import ProfileEdit from './Edit';
// import ProfileFavorites from './Favorites';
// import ProfileHandNotes from './HandNotes';
// Fixed Routes
import UserContext from '../../config/UserContext';
import { root, profile, home } from '../../utils/fixedRoutes';

export default function Profile() {
	const { user } = useContext(UserContext);

	// const classes = useStyles();
	// const activeTab = useLocationLevel(2, root);

	const userName = useLocationLevel(1, root);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${userName} - BD-Jobs`}</title>
			</Helmet>

			{/* <List className={classes.Profile}>
				<ListItem>
					<ListItemAvatar>
						<Avatar alt={user.fullName} src={user.photo} />
					</ListItemAvatar>
					<ListItemText primary={user.fullName} secondary={user.userName} />
				</ListItem>
			</List>
			<Tabs
				value={activeTab}
				indicatorColor='primary'
				variant='scrollable'
				scrollButtons='auto'
				aria-label='Profile tabs'>
				<Tab
					component={Link}
					to={`${profile}/${userName}/about`}
					value='about'
					label='About'
				/>
				<Tab
					component={Link}
					to={`${profile}/${userName}/handnotes`}
					value='handnotes'
					label='Hand Notes'
				/>
				<Tab
					component={Link}
					to={`${profile}/${userName}/blogs`}
					value='blogs'
					label='Blogs'
				/>
				<Tab
					component={Link}
					to={`${profile}/${userName}/courses`}
					value='courses'
					label='Courses'
				/>
				<Tab
					component={Link}
					to={`${profile}/${userName}/favorites`}
					value='favorites'
					label='Favorites'
				/>
				{userName === user.userName ? (
					<Tab
						component={Link}
						to={`${profile}/${userName}/editprofile`}
						value='editprofile'
						label='Edit Profile'
					/>
				) : undefined}
			</Tabs>
			<Divider /> */}

			<Switch>
				{/* <Route path={`${profile}/${userName}/about`} component={ProfileAbout} /> */}
				{/* <Route path={`${profile}/${userName}/handnotes`} component={ProfileHandNotes} /> */}
				{/* <Route path={`${profile}/${userName}/blogs`} component={ProfileBlogs} /> */}
				{/* <Route path={`${profile}/${userName}/courses`} component={ProfileCourses} /> */}
				{/* <Route path={`${profile}/${userName}/favorites`} component={ProfileFavorites} /> */}
				{userName === user.userName ? (
					<Route path={`${profile}/${userName}/editprofile`} component={ProfileEdit} />
				) : undefined}
				<Redirect from={`${profile}/${userName}`} to={home} />
			</Switch>
		</React.Fragment>
	);
}

/* const useStyles = makeStyles((theme) => ({
	Profile: {
		padding: theme.spacing(0, 5),
		[theme.breakpoints.down('xs')]: {
			padding: 0,
		},
	},
	ProfileFollowButton: {
		marginRight: theme.spacing(1),
	},
})); */
