import { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import LogoutIcon from '@material-ui/icons/ExitToApp';
//import HandNotesIcon from '@material-ui/icons/Note';
import BlogsIcon from '@material-ui/icons/ChromeReaderMode';
import CoursesIcon from '@material-ui/icons/LibraryBooks';
//import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';
import UserContext from '../config/UserContext';
import { moderator, profile, logIn, signUp } from '../utils/fixedRoutes';

const UserMenu = ({ anchorPosition, isUserMenuOpen, setIsUserMenuOpen }) => {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	const isLoggedIn = Boolean(user.userName);

	const handleMenuClose = () => {
		setIsUserMenuOpen(false);
	};

	const handleLogOut = () => {
		setIsUserMenuOpen(false);
		setUser({});
		localStorage.setItem('stream', '');
		setTimeout(() => window.location.reload(), 500);
	};

	const UserMenu = [
		<MenuItem
			component={Link}
			to={`${profile}/${user.userName}/editprofile`}
			onClick={handleMenuClose}
			key='key-header-menu-profile-list-item'
			id='id-header-menu-profile-list-item'>
			<ListItemAvatar>
				<Avatar alt='User Profile Picture' src={user.photo} />
			</ListItemAvatar>

			<ListItemText primary={user.fullName} secondary={user.email} />
		</MenuItem>,

		user.role === 'admin' || user.role === 'moderator' || user.role === 'instructor' ? (
			<MenuItem
				dense
				component={Link}
				to={moderator}
				onClick={handleMenuClose}
				key='key-header-menu-admin-panel'
				id='id-header-menu-admin-panel'>
				<ListItemIcon>
					<SupervisorAccountIcon />
				</ListItemIcon>

				<ListItemText
					primary={`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel`}
				/>
			</MenuItem>
		) : undefined,

		<MenuItem
			onClick={handleLogOut}
			button
			key='key-header-menu-profile-log-out-button'
			id='id-header-menu-profile-log-out-button'>
			<ListItemIcon>
				<LogoutIcon color='secondary' />
			</ListItemIcon>

			<ListItemText
				secondary='Log Out'
				secondaryTypographyProps={{
					variant: 'button',
					color: 'secondary',
				}}
			/>
		</MenuItem>,

		/* <MenuItem
			component={Link}
			to={`${profile}/${user.userName}/handnotes`}
			onClick={handleMenuClose}
			dense
			key='key-header-menu-profile-extra-hand-notes'
			id='id-header-menu-profile-extra-hand-notes'>
			<ListItemIcon>
				<HandNotesIcon />
			</ListItemIcon>

			<ListItemText primary='My Hand Notes' />
		</MenuItem>,

		<MenuItem
			component={Link}
			to={`${profile}/${user.userName}/blogs`}
			onClick={handleMenuClose}
			dense
			key='key-header-menu-profile-extra-blogs'
			id='id-header-menu-profile-extra-blogs'>
			<ListItemIcon>
				<BlogsIcon />
			</ListItemIcon>

			<ListItemText primary='My Blogs' />
		</MenuItem>,

		<MenuItem
			component={Link}
			to={`${profile}/${user.userName}/courses`}
			onClick={handleMenuClose}
			dense
			key='key-header-menu-profile-extra-courses'
			id='id-header-menu-profile-extra-courses'>
			<ListItemIcon>
				<CoursesIcon />
			</ListItemIcon>

			<ListItemText primary='My Courses' />
		</MenuItem>,

		<MenuItem
			component={Link}
			to={`${profile}/${user.userName}/favorites`}
			onClick={handleMenuClose}
			dense
			key='key-header-menu-profile-extra-favorites'
			id='id-header-menu-profile-extra-favorites'>
			<ListItemIcon>
				<StarIcon />
			</ListItemIcon>

			<ListItemText primary='My Favorites' />
		</MenuItem>, 

		<MenuItem
			component={Link}
			to={`${profile}/${user.userName}/editprofile`}
			onClick={handleMenuClose}
			dense
			key='key-header-menu-profile-extra-edit-profile'
			id='id-header-menu-profile-extra-edit-profile'>
			<ListItemIcon>
				<EditIcon />
			</ListItemIcon>

			<ListItemText primary='Edit Profile' />
		</MenuItem>, */
	];

	const NoUserMenu = [
		<MenuItem
			disabled
			dense
			key='key-header-menu-no-user-sign-up-text'
			id='id-header-menu-no-user-sign-up-text'>
			<ListItemText secondary='Join the community' />
		</MenuItem>,

		<MenuItem
			component={Link}
			to={signUp}
			onClick={handleMenuClose}
			divider
			key='key-header-menu-no-user-sign-up-button'
			id='id-header-menu-no-user-sign-up-button'>
			<ListItemText
				disableTypography
				primary='Sign up'
				className={classes.headerMenuSignupButtonText}
			/>
		</MenuItem>,

		<MenuItem
			disabled
			dense
			key='key-header-menu-no-user-log-in-text'
			id='id-header-menu-no-user-log-in-text'>
			<ListItemText secondary='Already have an account?' />
		</MenuItem>,

		<MenuItem
			component={Link}
			to={logIn}
			onClick={handleMenuClose}
			key='key-header-menu-no-user-log-in-button'
			id='id-header-menu-no-user-log-in-button'>
			<ListItemText
				disableTypography
				primary='Log in'
				className={classes.headerMenuLoginButtonText}
			/>
		</MenuItem>,
	];

	return (
		<Menu
			open={isUserMenuOpen}
			onClose={handleMenuClose}
			anchorReference='anchorPosition'
			anchorPosition={anchorPosition}
			id='header-user-menu'>
			{isLoggedIn ? UserMenu : NoUserMenu}
		</Menu>
	);
};

const useStyles = makeStyles((theme) => ({
	headerMenuSignupButtonText: {
		minWidth: 200,
		...theme.typography.button,
		textAlign: 'center',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.primary.main,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5, 2),
	},
	headerMenuLoginButtonText: {
		minWidth: 200,
		...theme.typography.button,
		textAlign: 'center',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.primary.main,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.primary.main,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(0.5, 2),
	},
}));

export default UserMenu;
