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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import axiosInstance from '../../utils/axiosInstance';
import AlertContext from '../../config/AlertContext';
import handleAxiosErrors from '../../utils/axiosErrorHandler';

import DialogVideoPlayer from '../../components/DialogVideoPlayer';
import { levelsArray, schoolDeptArray, jobsDeptArray } from '../../utils/optionsArrays';

export default function Tutorials() {
	const classes = useStyles();
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [tutorials, setTutorials] = useState([]);

	const [search, setSearch] = useState('');
	const [level, setLevel] = useState('');
	const [department, setDepartment] = useState('');
	const [departmentsArray, setDepartmentsArray] = useState([]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (level === 'JSC' || level === 'SSC' || level === 'HSC' || level === 'Admission') {
				setDepartmentsArray(schoolDeptArray);
			} else {
				setDepartmentsArray(jobsDeptArray);
			}
		}
		return () => (isMounted = false);
	}, [level]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			let searchQuery, levelQuery, departmentQuery;
			if (search) {
				searchQuery = `search=${search}`;
			}
			if (level) {
				levelQuery = `class[eq]=${level}`;
			}
			if (department) {
				departmentQuery = `department[eq]=${department}`;
			}
			if (!level) {
				departmentQuery = '';
			}

			const query = `${searchQuery}&${levelQuery}&${departmentQuery}`;

			axiosInstance({ method: 'get', url: `/tutorials?${query}&sort=class,department` })
				.then(function (response) {
					setTutorials(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search, level, department]);

	const [editingItemID, setEditingItemID] = useState('');
	const [editingItem, setEditingItem] = useState('');

	const [newItemTitle, setNewItemTitle] = useState('');
	const [newItemVideoLink, setNewItemVideoLink] = useState('');
	const [newItemAuthorName, setNewItemAuthorName] = useState('');
	const [newItemClass, setNewItemClass] = useState('');
	const [newItemDepartment, setNewItemDepartment] = useState('');
	const [newItemSubject, setNewItemSubject] = useState('');

	const [modifyDialogIsOpen, setModifyDialogIsOpen] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (editingItemID) {
				axiosInstance({ method: 'get', url: `/tutorials/auth/${editingItemID}` })
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

	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);

	const handleLinkOpen = (title, video) => {
		setIFrameTitle(title);
		setIFrameLink(video);
		setIFrameDialogIsOpen(true);
	};

	const handleModifyDialogClose = () => {
		setModifyDialogIsOpen(false);
		setEditingItemID('');
		setEditingItem('');
		setNewItemTitle('');
		setNewItemVideoLink('');
		setNewItemAuthorName('');
		setNewItemClass('');
		setNewItemDepartment('');
		setNewItemSubject('');
	};

	const handleAdd = () => {
		if (
			newItemTitle &&
			newItemVideoLink &&
			newItemAuthorName &&
			newItemClass &&
			newItemDepartment &&
			newItemSubject
		) {
			const config = {
				method: 'post',
				url: `/tutorials/auth`,
				data: {
					title: newItemTitle,
					videoLink: newItemVideoLink,
					authorName: newItemAuthorName,
					class: newItemClass,
					department: newItemDepartment,
					subject: newItemSubject,
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
				url: `/tutorials/auth/${editingItemID}`,
				data: {
					title: newItemTitle ? newItemTitle : editingItem.title,
					videoLink: newItemVideoLink ? newItemVideoLink : editingItem.videoLink,
					authorName: newItemAuthorName ? newItemAuthorName : editingItem.authorName,
					class: newItemClass ? newItemClass : editingItem.class,
					department: newItemDepartment ? newItemDepartment : editingItem.department,
					subject: newItemSubject ? newItemSubject : editingItem.subject,
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
				url: `/tutorials/auth/${editingItemID}`,
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

	const tutorialsArray = useMemo(() => {
		return tutorials.map((item) => {
			return (
				<Grid item xs={12} lg={6} key={item._id}>
					<Paper style={{ overflow: 'hidden' }}>
						<ListItem
							id={item._id}
							button
							ContainerComponent='div'
							onClick={() => handleLinkOpen(item.title, item.videoLink)}>
							<ListItemText
								primary={`${item.title} - ${item.subject}`}
								secondary={`${item.authorName} - ${item.class} - ${item.department}`}
							/>
							<ListItemSecondaryAction>
								<Tooltip title='Edit this item'>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={() => setEditingItemID(item._id)}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</ListItemSecondaryAction>
						</ListItem>
					</Paper>
				</Grid>
			);
		});
	}, [tutorials]);

	const levelsMenu = useMemo(() => {
		return levelsArray.map((option) => (
			<MenuItem key={option} value={option}>
				{option ? option : 'All'}
			</MenuItem>
		));
	}, []);

	const departmentsMenu = useMemo(() => {
		return departmentsArray.map((option) => (
			<MenuItem key={option} value={option}>
				{option ? option : 'All'}
			</MenuItem>
		));
	}, [departmentsArray]);

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Grid container alignItems='flex-start' spacing={1}>
					<Grid item xs={12} sm={12} md={4}>
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

					<Grid item xs={12} sm={6} md={4}>
						<TextField
							onChange={(event) => setLevel(event.target.value)}
							value={level}
							label='Level'
							select
							variant='outlined'
							margin='dense'
							fullWidth>
							{levelsMenu}
						</TextField>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<TextField
							onChange={(event) => setDepartment(event.target.value)}
							value={department}
							disabled={Boolean(!level)}
							label='Department'
							select
							variant='outlined'
							margin='dense'
							fullWidth>
							{departmentsMenu}
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
					{Boolean(tutorialsArray && tutorialsArray.length > 0) ? (
						tutorialsArray
					) : (
						<Grid item xs={12}>
							<Paper className={classes.emptyPlaceholder}>No Items</Paper>
						</Grid>
					)}
				</Grid>
			</div>

			<DialogVideoPlayer
				title={iFrameTitle}
				link={iFrameLink}
				iFrameDialogIsOpen={iFrameDialogIsOpen}
				setIFrameDialogIsOpen={setIFrameDialogIsOpen}
			/>

			<Dialog
				open={modifyDialogIsOpen}
				onClose={handleModifyDialogClose}
				aria-labelledby='edit-profile-dialog-title'
				maxWidth='xs'
				fullWidth>
				<DialogTitle id='edit-profile-dialog-title'>
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
						onChange={(event) => setNewItemVideoLink(event.target.value)}
						defaultValue={editingItem.videoLink}
						placeholder={editingItem.videoLink}
						inputProps={{ maxLength: '300' }}
						label='YouTube Video Link'
						required
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
					<TextField
						onChange={(event) => setNewItemAuthorName(event.target.value)}
						defaultValue={editingItem.authorName}
						placeholder={editingItem.authorName}
						inputProps={{ maxLength: '50' }}
						label='Video Author Name'
						required
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>
					<TextField
						onChange={(event) => setNewItemClass(event.target.value)}
						defaultValue={editingItem.class}
						placeholder={editingItem.class}
						inputProps={{ maxLength: '20' }}
						label='Level'
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
						onChange={(event) => setNewItemSubject(event.target.value)}
						defaultValue={editingItem.subject}
						placeholder={editingItem.subject}
						inputProps={{ maxLength: '30' }}
						label='Subject'
						required
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
