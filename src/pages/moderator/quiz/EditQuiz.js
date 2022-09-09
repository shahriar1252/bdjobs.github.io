//import FormData from 'form-data';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
	Button,
	Container,
	FormControlLabel,
	Grid,
	IconButton,
	makeStyles,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';

import useLocationLevel from '../../../hooks/useLocationLevel';
import AlertContext from '../../../config/AlertContext';
import axiosInstance from '../../../utils/axiosInstance';
import handleAxiosErrors from '../../../utils/axiosErrorHandler';
import { moderatorShortQuiz } from '../../../utils/fixedRoutes';

import { levelsArray, schoolDeptArray, jobsDeptArray } from '../../../utils/optionsArrays';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.primary,
		margin: '24px auto',
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
	},

	marginBottom: {
		marginBottom: theme.spacing(1),
	},
}));

export default function EditQuiz() {
	const history = useHistory();
	const id = useLocationLevel(4);
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [questions, setQuestions] = useState([
		{
			id: uuidv4(),
			no: 1,
			question: '',
			option1: '',
			option2: '',
			option3: '',
			option4: '',
			answer: 1,
		},
	]);

	const handleChangeQuestions = (id, event) => {
		const newInputFields = questions.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});
		setQuestions(newInputFields);
	};

	const handleAddQuestion = (e) => {
		e.preventDefault();
		setQuestions([
			...questions,
			{
				id: uuidv4(),
				no: questions.length + 1,
				question: '',
				option1: '',
				option2: '',
				option3: '',
				option4: '',
				answer: 1,
			},
		]);
	};

	const handleRemoveQuestion = (id) => {
		const values = [...questions];
		values.splice(
			values.findIndex((value) => value.id === id),
			1,
		);
		setQuestions(values);
	};

	const [title, setTitle] = useState('');
	const [subject, setSubject] = useState('');
	const [level, setLevel] = useState('');
	const [time, setTime] = useState('');
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

	const handleSave = (event) => {
		event.preventDefault();
		setAlertSeverity('info');
		setAlertMessage('Loading...');

		const questonsArray = questions.map((item) => {
			return {
				question: item.question,
				option1: item.option1,
				option2: item.option2,
				option3: item.option3,
				option4: item.option4,
				answer: item.answer,
			};
		});

		const data = {
			title: title,
			subject: subject,
			department: department,
			class: level,
			time: time,
			questions: questonsArray,
		};

		const config = {
			method: 'patch',
			url: `/quizzes/auth/${id}`,
			data: data,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Updated successfully');
				history.push(moderatorShortQuiz);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const handleDelete = (event) => {
		event.preventDefault();
		setAlertSeverity('info');
		setAlertMessage(`Deleting ${id}`);
		axiosInstance({ method: 'delete', url: `/quizzes/auth/${id}` })
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Quiz deleted');
				history.push(moderatorShortQuiz);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			axiosInstance({ method: 'get', url: `/quizzes/auth/${id}` })
				.then(function (response) {
					let questions = [];
					response.data.data.questions.forEach(function (item) {
						questions.push({
							id: uuidv4(),
							no: questions.length + 1,
							question: item.question,
							option1: item.option1,
							option2: item.option2,
							option3: item.option3,
							option4: item.option4,
							answer: item.answer,
						});
					});

					setQuestions(questions);
					setTitle(response.data.data.title);
					setSubject(response.data.data.subject);
					setLevel(response.data.data.class);
					setTime(response.data.data.time);
					setDepartment(response.data.data.department);
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
			<div className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={6}>
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

					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setDepartment(event.target.value)}
							value={department}
							label='Department'
							select
							variant='outlined'
							margin='dense'
							fullWidth>
							{departmentsMenu}
						</TextField>
					</Grid>

					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setSubject(event.target.value)}
							inputProps={{ maxLength: '30' }}
							value={subject}
							margin='dense'
							label='Subject'
							variant='outlined'
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => setTitle(event.target.value)}
							inputProps={{ maxLength: '100' }}
							value={title}
							margin='dense'
							label='Quiz Title'
							variant='outlined'
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} lg={6}>
						<TextField
							onChange={(event) => {
								if (event.target.value < 5) setTime(5);
								else if (event.target.value > 360) setTime(360);
								else setTime(event.target.value);
							}}
							value={time}
							type='number'
							margin='dense'
							label='Quiz Time (minutes)'
							variant='outlined'
							fullWidth
						/>
					</Grid>
				</Grid>
			</div>

			<div className={classes.paper}>
				{questions.map((item, index) => (
					<div
						key={item.id}
						style={{
							width: '100%',
							display: 'flex',
							marginBottom: 24,
						}}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}>
							<Typography variant='h6'>{index + 1}</Typography>

							<Tooltip title='Remove this question'>
								<IconButton
									color='secondary'
									disabled={questions.length === 1}
									onClick={() => {
										handleRemoveQuestion(item.id);
									}}>
									<RemoveIcon />
								</IconButton>
							</Tooltip>
						</div>

						<div style={{ width: '100%' }}>
							<TextField
								onChange={(event) => handleChangeQuestions(item.id, event)}
								inputProps={{ maxLength: '500' }}
								value={item.question}
								label='Question'
								name='question'
								multiline
								minRows={3}
								variant='outlined'
								margin='dense'
								fullWidth
								className={classes.marginBottom}
							/>

							<Grid container spacing={1} className={classes.marginBottom}>
								<Grid item xs={12} md={6}>
									<TextField
										onChange={(event) => handleChangeQuestions(item.id, event)}
										inputProps={{ maxLength: '200' }}
										value={item.option1}
										label='Option A'
										name='option1'
										variant='outlined'
										margin='dense'
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										onChange={(event) => handleChangeQuestions(item.id, event)}
										inputProps={{ maxLength: '200' }}
										value={item.option2}
										label='Option B'
										name='option2'
										variant='outlined'
										margin='dense'
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										onChange={(event) => handleChangeQuestions(item.id, event)}
										inputProps={{ maxLength: '200' }}
										value={item.option3}
										label='Option C'
										name='option3'
										variant='outlined'
										margin='dense'
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										onChange={(event) => handleChangeQuestions(item.id, event)}
										inputProps={{ maxLength: '200' }}
										value={item.option4}
										label='Option D'
										name='option4'
										variant='outlined'
										margin='dense'
										fullWidth
									/>
								</Grid>
							</Grid>

							<Typography variant='subtitle1' color='textSecondary'>
								Answer
							</Typography>

							<RadioGroup
								onChange={(event) => handleChangeQuestions(item.id, event)}
								value={item.answer}
								name='answer'
								row>
								<FormControlLabel
									value='1'
									label='A'
									control={<Radio checked={item.answer == 1} color='primary' />}
								/>
								<FormControlLabel
									value='2'
									label='B'
									control={<Radio checked={item.answer == 2} color='primary' />}
								/>
								<FormControlLabel
									value='3'
									label='C'
									control={<Radio checked={item.answer == 3} color='primary' />}
								/>
								<FormControlLabel
									value='4'
									label='D'
									control={<Radio checked={item.answer == 4} color='primary' />}
								/>
							</RadioGroup>
						</div>
					</div>
				))}
				<Button onClick={handleAddQuestion} variant='contained' color='primary'>
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
