import React from 'react';
import ReactPlayer from 'react-player';
//Material UI core
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//Material UI Icons
import BackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

const DialogVideoPlayer = ({ title, link, iFrameDialogIsOpen, setIFrameDialogIsOpen }) => {
	const theme = useTheme();
	const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleIFrameDialogClose = () => {
		setIFrameDialogIsOpen(false);
	};

	return (
		<Dialog
			open={iFrameDialogIsOpen}
			onClose={handleIFrameDialogClose}
			fullScreen={matchesMobile ? true : false}
			maxWidth='xl'
			fullWidth
			aria-labelledby='iframe-dialog-title-text'>
			<ListItem>
				{matchesMobile ? (
					<Tooltip title='Back'>
						<IconButton
							onClick={handleIFrameDialogClose}
							aria-label='go back'
							autoFocus
							size='small'
							style={{ margin: '0px 8px 0px -8px' }}>
							<BackIcon />
						</IconButton>
					</Tooltip>
				) : undefined}

				<ListItemText primary={title} id='iframe-dialog-title-text' />

				{matchesMobile ? undefined : (
					<Tooltip title='Close'>
						<IconButton
							onClick={handleIFrameDialogClose}
							aria-label='close dialog'
							autoFocus
							size='small'
							style={{ margin: '0px -3px 0px 16px' }}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				)}
			</ListItem>

			<DialogContent style={{ padding: 0, overflowY: 'hidden' }}>
				<ReactPlayer
					url={link}
					width='100%'
					height={matchesMobile ? 'calc(100vh - 72px)' : 'calc(100vh - 120px)'}
					controls
					playing
				/>
			</DialogContent>
		</Dialog>
	);
};

export default DialogVideoPlayer;
