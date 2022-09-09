//import FormData from 'form-data';
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
	Button,
	Container,
	Grid,
	IconButton,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import useLocationLevel from '../../../hooks/useLocationLevel';
import AlertContext from '../../../config/AlertContext';
import axiosInstance from '../../../utils/axiosInstance';
import handleAxiosErrors from '../../../utils/axiosErrorHandler';
import { backend, moderatorCourses, root } from '../../../utils/fixedRoutes';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.primary,
		margin: '24px auto',
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
	},
}));

function CourseCreate() {
	const history = useHistory();
	const id = useLocationLevel(3, root);
	const formData = new FormData();
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	/**----------------tags----------------**/

	const [requirements, setRequirements] = useState([
		{
			id: uuidv4(),
			requirement: '',
		},
	]);

	const handleChangeRequirement = (id, event) => {
		const newInputFields = requirements.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});

		setRequirements(newInputFields);
	};

	const handleAddRequirement = () => {
		setRequirements([...requirements, { id: uuidv4(), requirement: '' }]);
	};

	const handleRemoveRequirement = (id) => {
		const values = [...requirements];
		values.splice(
			values.findIndex((value) => value.id === id),
			1,
		);
		setRequirements(values);
	};

	/**--------------------------lessons-----------------------------**/

	const [lessons, setLessons] = useState([
		{
			id: uuidv4(),
			no: 1,
			title: '',
			link: '',
		},
	]);

	const handleChangeLessons = (id, event) => {
		const newInputFields = lessons.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});
		setLessons(newInputFields);
	};

	const handleAddLessons = (e) => {
		e.preventDefault();
		setLessons([
			...lessons,
			{
				id: uuidv4(),
				no: lessons.length + 1,
				title: '',
				link: '',
			},
		]);
	};

	const handleRemoveVideos = (id) => {
		const values = [...lessons];
		values.splice(
			values.findIndex((value) => value.id === id),
			1,
		);
		setLessons(values);
	};

	const [title, setTitle] = useState('');
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [photo, setPhoto] = useState('');
	const [photoOld, setPhotoOld] = useState('');
	const [price, setPrice] = useState(0);

	const handlePhotoSave = () => {
		setAlertSeverity('info');
		setAlertMessage('Loading...');

		formData.append('photo', photo);

		const config = {
			method: 'patch',
			url: `/courses/auth/${id}`,
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
	};

	const handleSave = (event) => {
		event.preventDefault();
		setAlertSeverity('info');
		setAlertMessage('Loading...');

		const lessonsArray = lessons.map((lesson) => {
			const { title, link } = lesson;
			return { title, videoLink: link };
		});

		const requirementsArray = requirements.map((lesson) => {
			const { requirement } = lesson;
			return requirement;
		});

		const data = {
			title: title,
			subject: subject,
			description: description,
			price: price,
			requirements: requirementsArray,
			lessons: lessonsArray,
		};

		const config = {
			method: 'patch',
			url: `/courses/auth/${id}`,
			data: data,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Updated successfully');
				history.push(moderatorCourses);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const handleDelete = (event) => {
		event.preventDefault();
		setAlertSeverity('info');
		setAlertMessage(`Deleting ${id}`);
		axiosInstance({ method: 'delete', url: `/courses/auth/${id}` })
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Course deleted');
				history.push(moderatorCourses);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			axiosInstance({ method: 'get', url: `/courses/auth/${id}` })
				.then(function (response) {
					let requirements = [];
					response.data.data.requirements.forEach(function (value) {
						requirements.push({ id: uuidv4(), requirement: value });
					});
					setRequirements(requirements);

					let lessons = [];
					response.data.data.lessons.forEach(function (value) {
						lessons.push({
							id: uuidv4(),
							no: lessons.length + 1,
							title: value.title,
							link: value.videoLink,
						});
					});
					setLessons(lessons);

					setTitle(response.data.data.title);
					setSubject(response.data.data.subject);
					setDescription(response.data.data.description);
					setPhotoOld(response.data.data.photo);
					setPrice(response.data.data.price);
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

	return (
		<Container maxWidth='xl'>
			<div
				style={{
					width: '100%',
					height: 200,
					padding: 4,
					margin: '24px 0px 0px 0px',
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-end',
					justifyContent: 'flex-start',
					backgroundImage: photo
						? `url("${URL.createObjectURL(photo)}")`
						: `url("${backend}${photoOld}")`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: 8,
				}}>
				<input
					onChange={(event) => setPhoto(event.target.files[0])}
					id='choose-cover-photo'
					name='choose-cover-photo'
					type='file'
					accept='image/png, image/jpeg'
					style={{ display: 'none' }}
				/>

				{!photo ? (
					<Button
						component='label'
						htmlFor='choose-cover-photo'
						variant='contained'
						size='small'
						style={{ margin: 4 }}
						startIcon={<AddAPhotoIcon />}>
						select photo
					</Button>
				) : undefined}

				{photo ? (
					<Button
						onClick={() => setPhoto('')}
						color='secondary'
						variant='contained'
						size='small'
						style={{ margin: 4 }}
						startIcon={<ClearIcon />}>
						clear selection
					</Button>
				) : undefined}

				{photo ? (
					<Button
						onClick={handlePhotoSave}
						color='primary'
						variant='contained'
						size='small'
						style={{ margin: 4 }}
						startIcon={<SaveIcon />}>
						Save cover photo
					</Button>
				) : undefined}
			</div>

			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setTitle(event.target.value)}
							inputProps={{ maxLength: '100' }}
							value={title}
							margin='dense'
							label='Title'
							variant='outlined'
							fullWidth
						/>
						<TextField
							onChange={(event) => setSubject(event.target.value)}
							inputProps={{ maxLength: '30' }}
							value={subject}
							margin='dense'
							label='Subject'
							variant='outlined'
							fullWidth
						/>
						<TextField
							onChange={(event) => setPrice(event.target.value)}
							value={price}
							margin='dense'
							label='Price'
							type='number'
							variant='outlined'
							fullWidth
						/>
						<br />
						<br />

						<Typography color='primary' variant='subtitle2'>
							Prior Requirements
						</Typography>

						{requirements.map((requirement, index) => (
							<div
								key={requirement.id}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<TextField
									onChange={(event) =>
										handleChangeRequirement(requirement.id, event)
									}
									value={requirement.requirement}
									id='filled-basic'
									name='requirement'
									variant='outlined'
									margin='dense'
									fullWidth
								/>
								<IconButton
									color='secondary'
									disabled={requirements.length === 1}
									edge='end'
									onClick={() => handleRemoveRequirement(requirement.id)}>
									<RemoveIcon />
								</IconButton>
							</div>
						))}
						<Button
							variant='contained'
							color='primary'
							onClick={handleAddRequirement}
							style={{ marginTop: 8 }}>
							<AddIcon />
						</Button>
					</Grid>
					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setDescription(event.target.value)}
							inputProps={{ maxLength: '5000' }}
							value={description}
							label='Description'
							multiline
							minRows={12}
							variant='outlined'
							margin='dense'
							fullWidth
						/>
					</Grid>
				</Grid>
			</div>
			<div className={classes.paper}>
				<Typography color='primary' variant='subtitle2'>
					Lessons
				</Typography>
				{lessons.map((video, index) => (
					<div
						key={video.id}
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							marginBottom: 16,
						}}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField
									onChange={(event) => handleChangeLessons(video.id, event)}
									value={video.title}
									id='filled-basic'
									label='Video Name'
									name='title'
									variant='outlined'
									margin='dense'
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									onChange={(event) => handleChangeLessons(video.id, event)}
									value={video.link}
									id='filled-basic'
									label='Video Link'
									name='link'
									variant='outlined'
									margin='dense'
									fullWidth
								/>
							</Grid>
						</Grid>
						<IconButton
							color='secondary'
							disabled={lessons.length === 1}
							edge='end'
							onClick={() => {
								handleRemoveVideos(video.id);
							}}>
							<RemoveIcon />
						</IconButton>
					</div>
				))}
				<Button onClick={handleAddLessons} variant='contained' color='primary'>
					<AddIcon />
				</Button>
			</div>

			<Button
				onClick={(event) => handleSave(event)}
				type='submit'
				variant='contained'
				color='primary'
				style={{
					minWidth: 96,
					margin: '0px 16px 24px 0px',
				}}>
				save
			</Button>

			<Button
				onClick={(event) => handleDelete(event)}
				type='submit'
				variant='contained'
				color='secondary'
				style={{
					minWidth: 96,
					margin: '0px 16px 24px 0px',
				}}>
				delete
			</Button>
		</Container>
	);
}

export default CourseCreate;
