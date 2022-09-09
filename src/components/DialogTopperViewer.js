import React from 'react';

import { Link } from 'react-router-dom';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@material-ui/core';

import { profile } from '../utils/fixedRoutes';

export default function DialogJobCircularViewer({
	topperDialogIsOpen,
	setTopperDialogIsOpen,
	toppers,
	user,
}) {
	return (
		<Dialog
			open={topperDialogIsOpen}
			onClose={() => setTopperDialogIsOpen(false)}
			aria-labelledby='view-dialog-title'
			maxWidth='sm'
			fullWidth>
			<DialogTitle id='view-dialog-title'>Top users of this week</DialogTitle>
			<DialogContent dividers style={{ padding: 0 }}>
				<TableContainer>
					<Table aria-label='Top scores'>
						<TableBody>
							{toppers.map((item, index) => (
								<TableRow
									key={`${item.userName}-${item.totalScore}`}
									component={Link}
									to={`${profile}/${item.userName}`}
									selected={
										user.userName === item.userName &&
										user.fullName === item.fullName
									}
									hover>
									<TableCell align='left' variant='body'>
										{index + 1}.&emsp;{item.fullName} ({item.userName})
									</TableCell>
									<TableCell align='right' variant='body'>
										{item.totalScore}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setTopperDialogIsOpen(false)} color='primary' autoFocus>
					ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
