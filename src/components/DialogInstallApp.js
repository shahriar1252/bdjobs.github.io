import React from 'react';
//Material UI core
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//Material UI Icons
import CloseIcon from '@material-ui/icons/Close';

const InstallAppDialog = ({ isInstallDialogOpen, setIsInstallDialogOpen }) => {
	const classes = useStyles();

	const handleCloseDialog = () => {
		setIsInstallDialogOpen(false);
	};

	return (
		<Dialog
			open={isInstallDialogOpen}
			onClose={handleCloseDialog}
			aria-labelledby='install-app-dialog'
			maxWidth='sm'
			fullWidth>
			<ListItem divider>
				<ListItemText
					primary='How to install BD-Jobs Progressive Web App'
					primaryTypographyProps={{ variant: 'h6' }}
					style={{ padding: '0px 8px' }}
					id='install-app-dialog'
				/>
				<Tooltip title='Close'>
					<IconButton
						onClick={handleCloseDialog}
						aria-label='close dialog'
						autoFocus
						size='small'
						edge='end'>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</ListItem>
			<DialogContent>
				<Typography variant='h6' color='secondary' display='block' gutterBottom>
					Installing on Chrome Android
				</Typography>
				<Typography variant='body1' color='textPrimary' display='block' gutterBottom>
					Tap the three-dot overflow menu in the top-right corner and then select ‘Add to
					home screen.’ Then, enter a name for the app to install.
				</Typography>
				<img
					className={classes.image}
					alt='Installing from Chrome Android screenshots'
					src={`${process.env.PUBLIC_URL}/assets/images/install-pwa-android.png`}
				/>
				<Divider className={classes.divider} />
				<Typography variant='h6' color='secondary' display='block' gutterBottom>
					Installing on Safari iOS
				</Typography>
				<Typography variant='body1' color='textPrimary' display='block' gutterBottom>
					Tap the ‘Share’ button, scroll down and tap ‘Add to Home Screen.’ Enter the name
					for the app then tap add.
				</Typography>
				<img
					className={classes.image}
					alt='Installing from Safari iOS screenshots'
					src={`${process.env.PUBLIC_URL}/assets/images/install-pwa-ios.png`}
				/>
				<Divider className={classes.divider} />
				<Typography variant='h6' color='secondary' display='block' gutterBottom>
					Installing on Chrome or Edge desktop
				</Typography>
				<Typography variant='body1' color='textPrimary' display='block' gutterBottom>
					Click on the ‘+’ symbol on the right side of the address bar next to the
					bookmark button to install.
				</Typography>
				<img
					className={classes.image}
					alt='Installing from Chrome address bar screenshot'
					src={`${process.env.PUBLIC_URL}/assets/images/install-pwa-desktop-urlbar.jpg`}
				/>
				<Typography variant='body1' color='textPrimary' display='block' gutterBottom>
					Chrome and Edge also includes an option to install accessible by clicking the
					three-dot menu button in the top right corner and selecting the install option
					from the menu.
				</Typography>
				<img
					className={classes.image}
					alt='Installing from Edge menu screenshot'
					src={`${process.env.PUBLIC_URL}/assets/images/install-pwa-desktop-menu.jpg`}
				/>
			</DialogContent>
		</Dialog>
	);
};

const useStyles = makeStyles((theme) => ({
	image: {
		width: '100%',
	},
	divider: {
		margin: theme.spacing(2, 0),
	},
}));

export default InstallAppDialog;
