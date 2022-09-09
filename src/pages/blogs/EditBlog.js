//import FormData from 'form-data';
import React, { useEffect, useContext, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	makeStyles,
	useTheme,
	TextField,
	Typography,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import ClearIcon from '@material-ui/icons/Clear';

import useLocationLevel from '../../hooks/useLocationLevel';
import AlertContext from '../../config/AlertContext';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import { backend, root, blogs } from '../../utils/fixedRoutes';

export default function EditBlog() {
	const history = useHistory();
	const id = useLocationLevel(2, root);
	const formData = new FormData();
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [title, setTitle] = useState('');
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [banner, setBanner] = useState('');
	const [bannerOld, setBannerOld] = useState('');
	const [photos, setPhotos] = useState([]);

	/*
	const handleAddPhotos = (file) => {
		setPhotos([...photos, { id: uuidv4(), photo: file }]);
	};

	const handleRemovePhoto = (id) => {
		const values = [...photos];
		values.splice(
			values.findIndex((value) => value.id === id),
			1,
		);
		setPhotos(values);
	};
	*/

	const handleSave = (event) => {
		event.preventDefault();
		setAlertSeverity('info');
		setAlertMessage('Loading...');

		photos.forEach(function (p) {
			if (p.photo) formData.append('photos', p.photo);
		});
		if (banner) formData.append('banner', banner);
		if (title) formData.append('title', title);
		if (subject) formData.append('subject', subject);
		if (description) formData.append('description', description);

		const config = {
			method: 'patch',
			url: `/blogs/${id}`,
			data: formData,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Updated successfully');
				history.push(blogs);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const handleDelete = () => {
		const config = {
			method: 'delete',
			url: `/blogs/${id}`,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Updated successfully');
				history.push(blogs);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			axiosInstance({ method: 'get', url: `/blogs/${id}` })
				.then(function (response) {
					setTitle(response.data.data.title);
					setSubject(response.data.data.subject);
					setDescription(response.data.data.description);
					setBannerOld(response.data.data.banner);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				})
				.finally(function () {
					setHasFetched(true);
				});
		}

		return () => (isMounted = false);
	}, [id, hasFetched]);

	const classes = useStyles();
	const theme = useTheme();

	const Banner = useMemo(() => {
		return (
			<div
				style={{
					width: '100%',
					height: 200,
					padding: theme.spacing(0.5),
					margin: theme.spacing(0, 0, 3, 0),
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-end',
					justifyContent: 'flex-start',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundImage: banner
						? `url("${URL.createObjectURL(banner)}")`
						: `url("${backend}${bannerOld}")`,
					borderRadius: theme.shape.borderRadius,
				}}>
				<input
					onChange={(event) => setBanner(event.target.files[0])}
					id='choose-banner-photo'
					name='choose-banner-photo'
					type='file'
					accept='image/png, image/jpeg'
					style={{ display: 'none' }}
				/>

				{!banner ? (
					<Button
						component='label'
						htmlFor='choose-banner-photo'
						variant='contained'
						size='small'
						style={{ margin: theme.spacing(0.5) }}
						startIcon={<AddAPhotoIcon />}>
						select photo
					</Button>
				) : (
					<Button
						onClick={() => setBanner('')}
						color='secondary'
						variant='contained'
						size='small'
						style={{ margin: theme.spacing(0.5) }}
						startIcon={<ClearIcon />}>
						clear selection
					</Button>
				)}
			</div>
		);
	}, [banner, bannerOld, theme]);

	const PhotoSelector = useMemo(() => {
		return (
			<Grid container spacing={2}>
				{photos.map((photo, index) => {
					if (photo.photo) {
						return (
							<Grid item xs={6} md={4} lg={3} key={photo.id}>
								<div
									style={{
										width: '100%',
										height: 180,
										display: 'flex',
										alignItems: 'flex-start',
										justifyContent: 'flex-end',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundImage: `url("${URL.createObjectURL(
											photo.photo,
										)}")`,
										borderRadius: theme.shape.borderRadius,
									}}>
									<IconButton
										onClick={() => {
											const values = [...photos];
											values.splice(
												values.findIndex((value) => value.id === photo.id),
												1,
											);
											setPhotos(values);
										}}>
										<ClearIcon
											style={{
												color: theme.palette.text.primary,
												backgroundColor: theme.palette.background.default,
												borderRadius: '50%',
												borderWidth: 1,
												borderStyle: 'solid',
												borderColor: theme.palette.text.primary,
											}}
										/>
									</IconButton>
								</div>
							</Grid>
						);
					}

					return undefined;
				})}

				<input
					onChange={(event) =>
						setPhotos([...photos, { id: uuidv4(), photo: event.target.files[0] }])
					}
					id='choose-post-photos'
					name='choose-post-photos'
					type='file'
					accept='image/png, image/jpeg'
					style={{ display: 'none' }}
				/>

				{photos.length < 10 ? (
					<Grid item xs={6} md={4} lg={3}>
						<div
							style={{
								width: '100%',
								height: 180,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: theme.shape.borderRadius,
								borderWidth: 1,
								borderStyle: 'solid',
								borderColor: theme.palette.action.disabled,
							}}>
							<IconButton
								component='label'
								htmlFor='choose-post-photos'
								aria-label='Add photo'>
								<AddAPhotoIcon fontSize='large' />
							</IconButton>
						</div>
					</Grid>
				) : undefined}
			</Grid>
		);
	}, [photos, theme]);

	return (
		<>
			<Helmet>
				<title>{'Edit post - BD-Jobs'}</title>
			</Helmet>

			<Container maxWidth='lg'>
				<div className={classes.paper}>
					{Banner}

					<TextField
						onChange={(event) => setTitle(event.target.value)}
						value={title}
						inputProps={{ maxLength: '100' }}
						margin='dense'
						label='Title'
						variant='outlined'
						fullWidth
						className={classes.marginBottom}
					/>

					<TextField
						onChange={(event) => setSubject(event.target.value)}
						value={subject}
						inputProps={{ maxLength: '30' }}
						margin='dense'
						label='Subject'
						variant='outlined'
						fullWidth
						className={classes.marginBottom}
					/>

					<TextField
						onChange={(event) => setDescription(event.target.value)}
						value={description}
						inputProps={{ maxLength: '5000' }}
						label='Description'
						multiline
						minRows={12}
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.marginBottom}
					/>

					<Typography color='primary' variant='subtitle2' gutterBottom>
						Photos
					</Typography>

					<Typography
						color='textSecondary'
						variant='subtitle2'
						className={classes.marginBottom}>
						Old photos will be replaced if you add new ones
					</Typography>

					{PhotoSelector}
				</div>

				<Button
					onClick={(event) => handleSave(event)}
					type='submit'
					variant='contained'
					color='primary'
					className={classes.finalActionButton}>
					save
				</Button>

				<Button
					onClick={() => setIsDialogOpen(true)}
					type='submit'
					variant='contained'
					color='secondary'
					className={classes.finalActionButton}>
					delete
				</Button>
			</Container>

			<Dialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				aria-labelledby='delete-blog-confirm-dialog-title'
				maxWidth='xs'
				fullWidth>
				<DialogTitle id='delete-blog-confirm-dialog-title'>Delete Blog Post</DialogTitle>

				<DialogContent dividers>
					<Typography variant='body1'>
						Are you sure you want to delete this post?
					</Typography>

					<Typography variant='body1' color='secondary'>
						This cannot be undone.
					</Typography>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setIsDialogOpen(false)} color='primary' autoFocus>
						Cancel
					</Button>

					<Button onClick={handleDelete} color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		margin: theme.spacing(3, 0),
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
	},
	marginBottom: {
		margin: theme.spacing(0, 0, 3, 0),
	},
	finalActionButton: {
		minWidth: 96,
		margin: theme.spacing(0, 2, 3, 0),
	},
}));
