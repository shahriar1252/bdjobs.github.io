import React from 'react';
//Material UI core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//Material UI Icons
import BackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/GetApp';

const IFrameViewerDialog = ({
	title,
	link,
	downloadLink,
	iFrameDialogIsOpen,
	setIFrameDialogIsOpen,
}) => {
	const theme = useTheme();
	const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleIFrameDialogClose = () => {
		setIFrameDialogIsOpen(false);
	};

	const renderDownloadButton = matchesMobile ? (
		<Tooltip title='Download this file'>
			<IconButton
				component='a'
				href={downloadLink}
				rel='noopener noreferrer'
				id='iframe-dialog-download-icon-button'
				key='iframe-dialog-download-icon-button-key'
				aria-label='download this file'
				size='small'
				style={{
					borderColor: theme.palette.action.disabled,
					borderStyle: 'solid',
					borderWidth: 1,
					margin: '0px -3px 0px 8px',
				}}>
				<DownloadIcon />
			</IconButton>
		</Tooltip>
	) : (
		<Button
			component='a'
			href={downloadLink}
			rel='noopener noreferrer'
			id='iframe-dialog-download-button'
			key='iframe-dialog-download-button-key'
			variant='outlined'
			startIcon={<DownloadIcon />}
			style={{ margin: '0px 0px 0px 16px' }}>
			Download
		</Button>
	);

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

				{downloadLink ? renderDownloadButton : undefined}

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

			<iframe
				src={link}
				title={`${title} Preview Window`}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				style={{
					border: 'none',
					width: '100%',
					height: '100vh',
				}}
			/>
		</Dialog>
	);
};

export default IFrameViewerDialog;
