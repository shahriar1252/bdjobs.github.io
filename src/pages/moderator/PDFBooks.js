import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import ClearIcon from '@material-ui/icons/Clear';

import axiosInstance from '../../utils/axiosInstance';
import AlertContext from '../../config/AlertContext';
import handleAxiosErrors from '../../utils/axiosErrorHandler';

import DialogIFrameViewer from '../../components/DialogIFrameViewer';
import { backend } from '../../utils/fixedRoutes';

export default function QuestionBank() {
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const formData = new FormData();

	const [books, setBooks] = useState([]);

	const [search, setSearch] = useState('');

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/books?search=${search}&sort=subject`,
			})
				.then(function (response) {
					setBooks(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search]);

	const [editingItemID, setEditingItemID] = useState('');
	const [editingItem, setEditingItem] = useState('');

	const [newItemTitle, setNewItemTitle] = useState('');
	const [newItemDriveId, setNewItemDriveId] = useState('');
	const [newItemAuthorName, setNewItemAuthorName] = useState('');
	const [newItemSubject, setNewItemSubject] = useState('');
	const [newItemPhoto, setNewItemPhoto] = useState('');

	const [modifyDialogIsOpen, setModifyDialogIsOpen] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (editingItemID) {
				axiosInstance({ method: 'get', url: `/books/auth/${editingItemID}` })
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
	const [iFrameDownloadLink, setIFrameDownloadLink] = useState(false);

	const handleLinkOpen = (title, fileID) => {
		setIFrameTitle(title);
		setIFrameLink(`https://drive.google.com/file/d/${fileID}/preview`);
		setIFrameDownloadLink(`https://drive.google.com/uc?id=${fileID}&export=download`);
		setIFrameDialogIsOpen(true);
	};

	const handleModifyDialogClose = () => {
		setModifyDialogIsOpen(false);
		setEditingItemID('');
		setEditingItem('');
		setNewItemTitle('');
		setNewItemDriveId('');
		setNewItemAuthorName('');
		setNewItemSubject('');
		setNewItemPhoto('');
	};

	const handleAdd = () => {
		if (newItemTitle && newItemDriveId && newItemAuthorName && newItemSubject && newItemPhoto) {
			formData.append('title', newItemTitle);
			formData.append('driveId', newItemDriveId);
			formData.append('authorName', newItemAuthorName);
			formData.append('subject', newItemSubject);
			formData.append('photo', newItemPhoto);

			const config = {
				method: 'post',
				url: `/books/auth`,
				data: formData,
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
			if (newItemTitle) formData.append('title', newItemTitle);
			else formData.delete('title');

			if (newItemDriveId) formData.append('driveId', newItemDriveId);
			else formData.delete('driveId');

			if (newItemAuthorName) formData.append('authorName', newItemAuthorName);
			else formData.delete('authorName');

			if (newItemSubject) formData.append('subject', newItemSubject);
			else formData.delete('subject');

			if (newItemPhoto) formData.append('photo', newItemPhoto);
			else formData.delete('photo');

			const config = {
				method: 'patch',
				url: `/books/auth/${editingItemID}`,
				data: formData,
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
				url: `/books/auth/${editingItemID}`,
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

	const classes = useStyles();

	const BooksArray = useMemo(() => {
		if (books && books.length > 0) {
			return books.map((item) => {
				return (
					<Card key={item._id} variant='outlined' className={classes.cardContainer}>
						<CardActionArea onClick={() => handleLinkOpen(item.title, item.driveId)}>
							<CardMedia
								image={`${backend}${item.photo}`}
								title='Cover Image'
								className={classes.cardImage}
							/>

							<div className={classes.cardContent}>
								<Typography
									variant='body1'
									color='textPrimary'
									display='block'
									className={classes.lineClamp2}>
									{item.title}
								</Typography>

								<Typography
									variant='subtitle2'
									color='textSecondary'
									display='block'
									className={classes.lineClamp1}>
									{item.authorName}
								</Typography>

								<Typography
									variant='body2'
									color='textSecondary'
									display='block'
									className={classes.lineClamp1}>
									{item.subject}
								</Typography>
							</div>
						</CardActionArea>

						<CardActions>
							<Button
								onClick={() => setEditingItemID(item._id)}
								size='small'
								variant='outlined'
								startIcon={<EditIcon />}
								className={classes.editButton}>
								edit
							</Button>
						</CardActions>
					</Card>
				);
			});
		}

		return <Paper className={classes.emptyPlaceholder}>No Items</Paper>;
	}, [books, classes]);

	const Photo = useMemo(() => {
		return (
			<div
				className={classes.coverImage}
				style={{
					backgroundImage: newItemPhoto
						? `url("${URL.createObjectURL(newItemPhoto)}")`
						: `url("${backend}${editingItem.photo}")`,
				}}>
				<input
					onChange={(event) => setNewItemPhoto(event.target.files[0])}
					id='choose-cover-photo'
					name='choose-cover-photo'
					type='file'
					accept='image/png, image/jpeg'
					style={{ display: 'none' }}
				/>

				{!newItemPhoto ? (
					<Tooltip title='Select new photo'>
						<IconButton component='label' htmlFor='choose-cover-photo'>
							<AddAPhotoIcon fontSize='large' className={classes.addPhotoIcon} />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title='Clear selection'>
						<IconButton onClick={() => setNewItemPhoto('')}>
							<ClearIcon fontSize='large' className={classes.removePhotoIcon} />
						</IconButton>
					</Tooltip>
				)}
			</div>
		);
	}, [newItemPhoto, editingItem, classes]);

	return (
		<React.Fragment>
			<Container maxWidth='xl'>
				<div className={classes.searchBarContainer}>
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
						className={classes.searchBar}
					/>
				</div>

				<Button
					onClick={() => {
						setEditingItemID('');
						setEditingItem('');
						setModifyDialogIsOpen(true);
					}}
					variant='contained'
					color='primary'
					startIcon={<AddIcon />}
					className={classes.addButton}>
					Add
				</Button>

				<div className={classes.arrayContainer}>{BooksArray}</div>
			</Container>

			<DialogIFrameViewer
				title={iFrameTitle}
				link={iFrameLink}
				downloadLink={iFrameDownloadLink}
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
					{Photo}

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
						onChange={(event) => setNewItemDriveId(event.target.value)}
						defaultValue={editingItem.driveId}
						placeholder={editingItem.driveId}
						inputProps={{ maxLength: '45' }}
						label='Google Drive File ID'
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
						label='Book Author Name'
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
						label='Genere / Subject'
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
	arrayContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	searchBarContainer: {
		padding: theme.spacing(1, 0),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBar: {
		maxWidth: 400,
	},
	addButton: {
		minWidth: 96,
		margin: theme.spacing(2, 0),
	},
	cardContainer: {
		width: 240,
		margin: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			margin: theme.spacing(1.25, 0),
		},
	},
	cardImage: {
		height: 260,
	},
	cardContent: {
		minHeight: 110,
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			minHeight: 0,
		},
	},
	lineClamp1: {
		marginTop: 'auto',
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '1',
	},
	lineClamp2: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '2',
	},
	editButton: {
		margin: '0px auto',
	},
	coverImage: {
		width: 140,
		height: 180,
		margin: '0px auto 16px auto',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		borderRadius: theme.shape.borderRadius,
	},
	addPhotoIcon: {
		padding: 4,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
		boxShadow: theme.shadows[2],
	},
	removePhotoIcon: {
		padding: 4,
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '50%',
		boxShadow: theme.shadows[2],
	},
	emptyPlaceholder: {
		width: '100%',
		minHeight: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	marginBottom: {
		margin: theme.spacing(0, 0, 2, 0),
	},
}));
