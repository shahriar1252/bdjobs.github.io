import React from 'react';
//Material UI core
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
//Material UI Icons
import CloseIcon from '@material-ui/icons/Close';
import SeenAllIcon from '@material-ui/icons/DoneAll';
//React router
import { useHistory } from 'react-router-dom';

const NotificationsDialog = ({
	notifications,
	notificationMarkAsSeen,
	notificationMarkAllAsSeen,
	isNotificationsDialogOpen,
	setIsNotificationsDialogOpen,
}) => {
	const handleCloseNotificationsDialog = () => {
		setIsNotificationsDialogOpen(false);
	};
	const handleMarkAllAsSeen = () => {
		handleCloseNotificationsDialog();
		notificationMarkAllAsSeen();
	};
	const history = useHistory();
	const handleNotificationClick = (index) => {
		handleCloseNotificationsDialog();
		notificationMarkAsSeen(index);
		history.push(notifications[index].url);
	};

	const notificationsArray = notifications.map((notification, index) => {
		return (
			<ListItem
				button
				onClick={() => handleNotificationClick(index)}
				key={`${notification.time}-${notification.url}`}
				divider>
				<ListItemText
					primary={notification.text}
					primaryTypographyProps={
						notification.isSeen
							? { color: 'textSecondary' }
							: { style: { fontWeight: 500 } }
					}
					secondary={notification.time}
				/>
			</ListItem>
		);
	});

	return (
		<Dialog
			open={isNotificationsDialogOpen}
			onClose={handleCloseNotificationsDialog}
			aria-labelledby='notifications-dialog-title'
			maxWidth='md'
			fullWidth>
			<ListItem divider>
				<ListItemText
					primary='Notifications'
					primaryTypographyProps={{ variant: 'h6' }}
					id='notifications-dialog-title'
				/>

				<Tooltip title='Mark all as seen'>
					<IconButton
						onClick={handleMarkAllAsSeen}
						aria-label='mark all as seen'
						size='small'
						style={{ marginRight: 16 }}>
						<SeenAllIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title='Close'>
					<IconButton
						onClick={handleCloseNotificationsDialog}
						aria-label='close dialog'
						autoFocus
						size='small'
						edge='end'>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</ListItem>

			<div style={{ overflow: 'auto' }}>
				<List>{notificationsArray}</List>
			</div>
		</Dialog>
	);
};

export default NotificationsDialog;
