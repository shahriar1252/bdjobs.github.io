import React, { useContext, useEffect, useState } from 'react';
//Material UI core
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//Material UI icons
import BugReport from '@material-ui/icons/BugReport';
import Call from '@material-ui/icons/Call';
import Email from '@material-ui/icons/Email';
import Facebook from '@material-ui/icons/Facebook';
import GetApp from '@material-ui/icons/GetApp';
import Info from '@material-ui/icons/Info';
import Instagram from '@material-ui/icons/Instagram';
import Language from '@material-ui/icons/Language';
import Palette from '@material-ui/icons/Palette';
import Policy from '@material-ui/icons/Policy';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Telegram from '@material-ui/icons/Telegram';
import Twitter from '@material-ui/icons/Twitter';
import YouTube from '@material-ui/icons/YouTube';
//React router
import { Link } from 'react-router-dom';

import UserContext from '../config/UserContext';
import AlertContext from '../config/AlertContext';
import axiosInstance from '../utils/axiosInstance';
import handleAxiosErrors from '../utils/axiosErrorHandler';
//Fixed Routes
import {
	backend,
	about,
	becomeInstructor,
	privacyPolicy,
	reportBug,
	phoneNumber,
	email,
	emailSubject,
	facebookPage,
	instagramPage,
	telegramChannel,
	twitterPage,
	youTubeChannel,
} from '../utils/fixedRoutes';

const Footer = ({ changeLanguage, setIsThemeChangerOpen, setIsInstallDialogOpen }) => {
	const { user, setUser } = useContext(UserContext);
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			if (!user.userName && localStorage.getItem('stream')) {
				axiosInstance({ method: 'get', url: '/users/me' })
					.then(function (response) {
						const userResponse = {
							id: response.data.data._id,
							fullName: response.data.data.fullName,
							userName: response.data.data.userName,
							email: response.data.data.email,
							role: response.data.data.role,
							gender: response.data.data.gender,
							photo: `${backend}${response.data.data.photo}`,
							birthDate: response.data.data.birthDate,
							premiumExpiresAt: response.data.data.premiumExpiresAt,
							courses: response.data.data.courses,
							blogs: response.data.data.blogs,
							phone: response.data.data.phone,
						};
						setUser(userResponse);
					})
					.catch(function (error) {
						handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
					})
					.finally(function () {
						setHasFetched(true);
					});
			}
		}

		return () => (isMounted = false);
	}, [user, setUser, hasFetched]);

	const classes = useStyles();

	return (
		<div className={classes.footerBox}>
			<div className={classes.footerFlex}>
				<div className={classes.footerSection}>
					<Typography variant='subtitle1' color='secondary'>
						Options
					</Typography>
					{/* <Button
						onClick={() => changeLanguage()}
						startIcon={<Language />}
						variant='text'
						className={classes.footerLinkButton}>
						English / বাংলা
					</Button>
					<br />*/}
					<Button
						onClick={() => setIsThemeChangerOpen(true)}
						startIcon={<Palette />}
						variant='text'
						className={classes.footerLinkButton}>
						Change Theme
					</Button>
					<br />
					<Button
						onClick={() => setIsInstallDialogOpen(true)}
						startIcon={<GetApp />}
						variant='text'
						className={classes.footerLinkButton}>
						Install App
					</Button>
				</div>
				{/* <div className={classes.footerSection}>
					<Typography variant='subtitle1' color='secondary'>
						Important Links
					</Typography>
					<Button
						component={Link}
						to={becomeInstructor}
						startIcon={<SupervisorAccount />}
						variant='text'
						className={classes.footerLinkButton}>
						Become An Instructor
					</Button>
					<br />
					<Button
						component={Link}
						to={privacyPolicy}
						startIcon={<Policy />}
						variant='text'
						className={classes.footerLinkButton}>
						Privacy &amp; Policy
					</Button>
					<br />
					<Button
						component={Link}
						to={reportBug}
						startIcon={<BugReport />}
						variant='text'
						className={classes.footerLinkButton}>
						Report A Problem
					</Button>
				</div> */}
				<div className={classes.footerSection}>
					<Typography variant='subtitle1' color='secondary'>
						Contacts
					</Typography>
					<Button
						component={Link}
						to={about}
						startIcon={<Info />}
						variant='text'
						className={classes.footerLinkButton}>
						About Me
					</Button>
					<br />
					<Button
						component='a'
						href={`tel:${phoneNumber}`}
						startIcon={<Call />}
						variant='text'
						className={classes.footerLinkButton}>
						{phoneNumber}
					</Button>
					<br />
					<Button
						component='a'
						href={`mailto:${email}?Subject=${emailSubject}`}
						startIcon={<Email />}
						variant='text'
						className={classes.footerLinkButton}>
						{email}
					</Button>
				</div>
				<div className={classes.footerSection}>
					<Typography variant='subtitle1' color='secondary'>
						Social
					</Typography>
					<IconButton
						component='a'
						href={facebookPage}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Social Media Link Facebook'
						className={classes.footerLinkIconButton}>
						<Facebook fontSize='large' />
					</IconButton>
					<IconButton
						component='a'
						href={instagramPage}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Social Media Link Instagram'
						className={classes.footerLinkIconButton}>
						<Instagram fontSize='large' />
					</IconButton>
					<IconButton
						component='a'
						href={twitterPage}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Social Media Link Twitter'
						className={classes.footerLinkIconButton}>
						<Twitter fontSize='large' />
					</IconButton>
					<IconButton
						component='a'
						href={youTubeChannel}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Social Media Link YouTube'
						className={classes.footerLinkIconButton}>
						<YouTube fontSize='large' />
					</IconButton>
					<IconButton
						component='a'
						href={telegramChannel}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Social Media Link Telegram Channel'
						className={classes.footerLinkIconButton}>
						<Telegram fontSize='large' />
					</IconButton>
				</div>
			</div>
			<Typography variant='caption' display='block' align='center'>
				&copy; 2021 bdjobs.com
			</Typography>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	footerBox: {
		padding: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
	},
	footerFlex: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'flex-start',
		},
	},
	footerSection: {
		minWidth: 240,
		padding: theme.spacing(1),
		[theme.breakpoints.down('xs')]: {
			minWidth: 160,
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	},
	footerLinkButton: {
		marginLeft: -6,
		textTransform: 'none',
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	footerLinkIconButton: {
		marginLeft: -14,
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
}));

export default Footer;
