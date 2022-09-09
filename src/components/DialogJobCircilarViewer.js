import React from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function DialogJobCircularViewer({
	jobCircularDialogIsOpen,
	setJobCircularDialogIsOpen,
	jobCircularTitle,
	jobCircularDepartment,
	jobCircularDescription,
	jobCircularLink,
	jobCircularDate,
}) {
	return (
		<Dialog
			open={jobCircularDialogIsOpen}
			onClose={() => setJobCircularDialogIsOpen(false)}
			aria-labelledby='view-dialog-title'
			maxWidth='md'
			fullWidth>
			<DialogTitle id='view-dialog-title'>{jobCircularDepartment}</DialogTitle>
			<DialogContent dividers>
				<Typography variant='h6' color='textPrimary' gutterBottom>
					{jobCircularTitle}
				</Typography>
				<Typography variant='subtitle2' color='textPrimary' gutterBottom>
					{`Last updated : ${new Date(jobCircularDate).toDateString()}`}
				</Typography>
				{jobCircularDescription
					? jobCircularDescription.length > 100
						? jobCircularDescription.split('\n').map((text, index) => (
								<Typography
									key={`job-circular-description-regular-para-${index}`}
									variant='body1'
									color='textPrimary'
									style={{ paddingBottom: '0.5em' }}>
									{text}
								</Typography>
						  ))
						: jobCircularDescription.split('\n').map((text, index) => (
								<Typography
									key={`job-circular-description-large-para-${index}`}
									variant='h6'
									color='textPrimary'
									style={{ paddingBottom: '0.5em' }}>
									{text}
								</Typography>
						  ))
					: undefined}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setJobCircularDialogIsOpen(false)}
					color='secondary'
					autoFocus>
					Cancel
				</Button>
				<Button
					color='primary'
					component='a'
					href={jobCircularLink}
					rel='noopener noreferrer'
					target='_blank'
					endIcon={<NavigateNextIcon />}>
					Apply online
				</Button>
			</DialogActions>
		</Dialog>
	);
}
