//import FormData from 'form-data';
import React, { useContext, useState } from 'react';
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
//import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import AlertContext from '../../../config/AlertContext';
import axiosInstance from '../../../utils/axiosInstance';
import handleAxiosErrors from '../../../utils/axiosErrorHandler';
import { moderatorCourses } from '../../../utils/fixedRoutes';

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
	//const data = new FormData();
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
	//const [photo, setPhoto] = useState('');
	const [price, setPrice] = useState(0);

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
			method: 'post',
			url: '/courses/auth',
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
	const classes = useStyles();

	return (
		<Container maxWidth='xl'>
			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setTitle(event.target.value)}
							inputProps={{ maxLength: '100' }}
							margin='dense'
							label='Title'
							variant='outlined'
							fullWidth
						/>
						<TextField
							onChange={(event) => setSubject(event.target.value)}
							inputProps={{ maxLength: '30' }}
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
									value={requirement.requirements}
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
						{/*
						<Typography color='primary' variant='subtitle2'>
							Cover Image
						</Typography>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								margin: '8px 0px',
							}}>
							<input
								onChange={(event) => setPhoto(event.target.files[0])}
								id='choose-cover-photo'
								name='choose-cover-photo'
								type='file'
								accept='image/png, image/jpeg'
								style={{ display: 'none' }}
							/>
							<Button
								component='label'
								htmlFor='choose-cover-photo'
								variant='outlined'
								size='small'
								startIcon={<AddAPhotoIcon />}
								style={{ marginRight: 8 }}>
								Pick a photo
							</Button>
							{photo ? (
								<Typography variant='subtitle2' display='block' gutterBottom>
									{photo.name}
								</Typography>
							) : undefined}
						</div>
						*/}

						<TextField
							onChange={(event) => setDescription(event.target.value)}
							inputProps={{ maxLength: '5000' }}
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
		</Container>
	);
}

export default CourseCreate;
