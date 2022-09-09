import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';

import axiosInstance from '../../utils/axiosInstance';
import AlertContext from '../../config/AlertContext';
import handleAxiosErrors from '../../utils/axiosErrorHandler';

import { jobsDeptArray } from '../../utils/optionsArrays';

export default function JobCircular() {
	const classes = useStyles();
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [jobs, setJobs] = useState([]);

	const [search, setSearch] = useState('');
	const [department, setDepartment] = useState('');

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			let searchQuery, departmentQuery;
			if (search) {
				searchQuery = `search=${search}`;
			}
			if (department) {
				departmentQuery = `department[eq]=${department}`;
			}

			const query = `${searchQuery}&${departmentQuery}`;

			axiosInstance({ method: 'get', url: `/jobs?${query}` })
				.then(function (response) {
					setJobs(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search, department]);

	const [editingItemID, setEditingItemID] = useState('');
	const [editingItem, setEditingItem] = useState('');

	const [newItemTitle, setNewItemTitle] = useState('');
	const [newItemLink, setNewItemLink] = useState('');
	const [newItemDepartment, setNewItemDepartment] = useState('');
	const [newItemDescription, setNewItemDescription] = useState('');

	const [modifyDialogIsOpen, setModifyDialogIsOpen] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (editingItemID) {
				axiosInstance({ method: 'get', url: `/jobs/auth/${editingItemID}` })
					.then(function (response) {
						setEditingItem(response.data.data);
					})
					.catch(function (error) {
						handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
					});
			}
		}
		return () => (isMounted = false);
	}, [editingItemID]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (editingItem) {
				setModifyDialogIsOpen(true);
			}
		}
		return () => (isMounted = false);
	}, [editingItem]);

	const [jobCircularDialogIsOpen, setJobCircularDialogIsOpen] = useState(false);
	const [jobCircularTitle, setJobCircularTitle] = useState(false);
	const [jobCircularLink, setJobCircularLink] = useState(false);
	const [jobCircularDepartment, setJobCircularDepartment] = useState(false);
	const [jobCircularDescription, setJobCircularDescription] = useState(false);

	const handleLinkOpen = (title, link, dept, des) => {
		setJobCircularTitle(title);
		setJobCircularLink(link);
		setJobCircularDepartment(dept);
		setJobCircularDescription(des);
		setJobCircularDialogIsOpen(true);
	};

	const handleModifyDialogClose = () => {
		setModifyDialogIsOpen(false);
		setEditingItemID('');
		setEditingItem('');
		setNewItemTitle('');
		setNewItemLink('');
		setNewItemDescription('');
		setNewItemDepartment('');
	};

	const handleAdd = () => {
		if (newItemTitle && newItemLink && newItemDescription && newItemDepartment) {
			const config = {
				method: 'post',
				url: `/jobs/auth`,
				data: {
					title: newItemTitle,
					applyLink: newItemLink,
					department: newItemDepartment,
					description: newItemDescription,
				},
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Updated successfully');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		} else {
			handleModifyDialogClose();
		}
	};

	const handleSave = () => {
		if (editingItemID) {
			const config = {
				method: 'patch',
				url: `/jobs/auth/${editingItemID}`,
				data: {
					title: newItemTitle ? newItemTitle : editingItem.title,
					applyLink: newItemLink ? newItemLink : editingItem.applyLink,
					department: newItemDepartment ? newItemDepartment : editingItem.department,
					description: newItemDescription ? newItemDescription : editingItem.description,
				},
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Updated successfully');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		} else {
			handleModifyDialogClose();
		}
	};

	const handleDelete = () => {
		if (editingItemID) {
			const config = {
				method: 'patch',
				url: `/jobs/auth/${editingItemID}`,
				data: {
					isActive: false,
				},
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Updated successfully');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		} else {
			handleModifyDialogClose();
		}
	};

	const jobsArrays = useMemo(() => {
		return jobs.map((job) => {
			return (
				<Grid item xs={12} lg={6} key={job._id}>
					<Paper style={{ overflow: 'hidden' }}>
						<ListItem
							id={job._id}
							button
							ContainerComponent='div'
							onClick={() =>
								handleLinkOpen(
									job.title,
									job.applyLink,
									job.department,
									job.description,
								)
							}>
							<ListItemText
								primary={`${job.title} - ${job.department}`}
								secondary={`${job.description.substring(0, 50)}...`}
							/>
							<ListItemSecondaryAction>
								<Tooltip title='Edit this item'>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={() => setEditingItemID(job._id)}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</ListItemSecondaryAction>
						</ListItem>
					</Paper>
				</Grid>
			);
		});
	}, [jobs]);

	const departmentsArray = useMemo(
		() =>
			jobsDeptArray.map((option) => (
				<MenuItem key={option} value={option}>
					{option ? option : 'All'}
				</MenuItem>
			)),
		[],
	);

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Grid container alignItems='flex-start' spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							onChange={(event) => {
								if (!event.target.value) setSearch('');
							}}
							onKeyPress={(event) => {
								if (event.key === ' ' || event.key === 'Enter')
									setSearch(event.target.value.trim());
							}}
							label='Search by title'
							variant='outlined'
							margin='dense'
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							onChange={(event) => setDepartment(event.target.value)}
							value={department}
							label='Department'
							select
							variant='outlined'
							margin='dense'
							fullWidth>
							{departmentsArray}
						</TextField>
					</Grid>
				</Grid>

				<Button
					onClick={() => {
						setEditingItemID('');
						setEditingItem('');
						setModifyDialogIsOpen(true);
					}}
					variant='contained'
					color='primary'
					startIcon={<AddIcon />}
					style={{ minWidth: 96, marginTop: 24 }}>
					Add
				</Button>

				<Grid
					container
					alignItems='flex-start'
					spacing={2}
					className={classes.gridContainer}>
					{Boolean(jobsArrays && jobsArrays.length > 0) ? (
						jobsArrays
					) : (
						<Grid item xs={12}>
							<Paper className={classes.emptyPlaceholder}>No Items</Paper>
						</Grid>
					)}
				</Grid>
			</div>

			<Dialog
				open={jobCircularDialogIsOpen}
				onClose={() => setJobCircularDialogIsOpen(false)}
				aria-labelledby='view-dialog-title'
				maxWidth='md'
				fullWidth>
				<DialogTitle id='view-dialog-title'>
					{`${jobCircularTitle} - ${jobCircularDepartment}`}
				</DialogTitle>
				<DialogContent dividers>
					{jobCircularDescription
						? jobCircularDescription.length > 100
							? jobCircularDescription.split('\n').map((text, index) => (
									<Typography
										key={`job-circular-description-regular-para-${index}`}
										variant='body1'
										color='textPrimary'
										gutterBottom>
										{text}
									</Typography>
							  ))
							: jobCircularDescription.split('\n').map((text, index) => (
									<Typography
										key={`job-circular-description-large-para-${index}`}
										variant='h6'
										color='textPrimary'
										gutterBottom>
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

			<Dialog
				open={modifyDialogIsOpen}
				onClose={handleModifyDialogClose}
				aria-labelledby='edit-item-dialog-title'
				maxWidth='md'
				fullWidth>
				<DialogTitle id='edit-item-dialog-title'>
					{editingItem ? `Edit ${editingItem.title}` : 'Add new document'}
				</DialogTitle>
				<DialogContent dividers>
					<TextField
						onChange={(event) => setNewItemTitle(event.target.value)}
						defaultValue={editingItem.title}
						placeholder={editingItem.title}
						inputProps={{ maxLength: '100' }}
						label='Title'
						required
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
					<TextField
						onChange={(event) => setNewItemDepartment(event.target.value)}
						defaultValue={editingItem.department}
						placeholder={editingItem.department}
						inputProps={{ maxLength: '30' }}
						label='Department'
						required
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
					<TextField
						onChange={(event) => setNewItemLink(event.target.value)}
						defaultValue={editingItem.applyLink}
						placeholder={editingItem.applyLink}
						inputProps={{ maxLength: '300' }}
						label='Online Apply Link'
						required
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
					<TextField
						onChange={(event) => setNewItemDescription(event.target.value)}
						defaultValue={editingItem.description}
						placeholder={editingItem.description}
						inputProps={{ maxLength: '5000' }}
						label='Job Description'
						required
						multiline
						minRows={6}
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
				</DialogContent>

				{editingItem ? (
					<DialogActions>
						<Button onClick={handleModifyDialogClose} autoFocus>
							Cancel
						</Button>
						<Button onClick={handleDelete} color='secondary'>
							Delete
						</Button>
						<Button onClick={handleSave} color='primary' autoFocus>
							Save
						</Button>
					</DialogActions>
				) : (
					<DialogActions>
						<Button onClick={handleModifyDialogClose} autoFocus>
							Cancel
						</Button>
						<Button onClick={handleAdd} color='primary'>
							Add
						</Button>
					</DialogActions>
				)}
			</Dialog>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 1200,
		margin: '0px auto',
		padding: theme.spacing(1, 2, 3, 2),
	},
	gridContainer: {
		padding: theme.spacing(3, 0),
	},
	emptyPlaceholder: {
		minHeight: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	marginBottom: {
		margin: theme.spacing(0, 0, 2, 0),
	},
}));
