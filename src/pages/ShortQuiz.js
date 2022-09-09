import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Container,
	FormControlLabel,
	makeStyles,
	MenuItem,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
//React helmet
import { Helmet } from 'react-helmet';

import useLocationLevel from '../hooks/useLocationLevel';
import AlertContext from '../config/AlertContext';
import UserContext from '../config/UserContext';
import axiosInstance from '../utils/axiosInstance';
import handleAxiosErrors from '../utils/axiosErrorHandler';
import { root, home, profile, shortQuiz } from '../utils/fixedRoutes';

import { levelsArray, schoolDeptArray, jobsDeptArray } from '../utils/optionsArrays';

export default function ShortQuiz() {
	const classes = useStyles();
	const running = useLocationLevel(1, root);

	const {
		setAlertMessage,
		setAlertSeverity,
		startCountdownTimer,
		stopCountdownTimer,
		countdownTimeUp,
		setCountdownTimeUp,
		setCountdownLink,
		setIsCountdownOpen,
	} = useContext(AlertContext);
	const { user, quizAnswer, setQuizAnswer } = useContext(UserContext);

	const [step, setStep] = useState(1);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [score, setScore] = useState(0);
	const [scoreToppers, setScoreToppers] = useState([]);

	const [results, setResults] = useState({});
	const [title, setTitle] = useState('');
	const [time, setTime] = useState('');
	const [level, setLevel] = useState('');
	const [subject, setSubject] = useState('');
	const [department, setDepartment] = useState('');
	const [departmentsArray, setDepartmentsArray] = useState([]);

	const handleChangeAnswers = useCallback(
		(id, event) => {
			const newAnswers = quizAnswer.map((i) => {
				if (id === i.questionId) {
					i[event.target.name] = event.target.value;
				}
				return i;
			});
			setQuizAnswer(newAnswers);
		},
		[quizAnswer],
	);

	const handleSubmit = useCallback(() => {
		if (!isSubmitted) {
			setAlertSeverity('info');
			setAlertMessage('Submitting...');

			const config = {
				method: 'post',
				url: '/quizzes/evaluate',
				data: { answers: quizAnswer },
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Submitted');
					stopCountdownTimer();
					setCountdownTimeUp(false);
					setIsCountdownOpen(false);
					setCountdownLink(home);
					setQuizAnswer([]);
					setResults(response.data.data);
					setScore(0);
					setTitle('');
					setTime('');
					setLevel('');
					setSubject('');
					setDepartment('');
					setDepartmentsArray([]);
					setStep(3);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		setIsSubmitted(true);
	}, [isSubmitted, quizAnswer, stopCountdownTimer]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && running === 'running' && step === 1 && quizAnswer.length > 0) setStep(2);

		if (isMounted && countdownTimeUp && step === 2) handleSubmit();

		if (isMounted && step === 1 && score === 0) {
			axiosInstance({ method: 'get', url: '/users/leaderboard?separate=1' })
				.then(function (response) {
					let toppers = [];

					response.data.data.forEach((item) => {
						if (item.type === 'quiz') {
							if (toppers.length < 3) toppers.push(item);

							if (user.userName === item.userName && user.fullName === item.fullName)
								setScore(item.totalScore);
						}
					});

					setScoreToppers(toppers);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, [quizAnswer, countdownTimeUp, handleSubmit, running, step, score, user]);

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

	const step1 = useMemo(() => {
		if (step === 1) {
			return (
				<React.Fragment>
					<TableContainer className={classes.paper}>
						<Typography variant='subtitle1' color='primary'>
							This week's toppers
						</Typography>

						<Table aria-label='Top scores'>
							<TableBody>
								{scoreToppers.map((item, index) => (
									<TableRow
										key={`${item.userName}-${item.totalScore}`}
										component={Link}
										to={`${profile}/${item.userName}`}
										selected={
											user.userName === item.userName &&
											user.fullName === item.fullName
										}
										hover>
										<TableCell align='left' variant='body' size='small'>
											{index + 1}.&emsp;{item.fullName} ({item.userName})
										</TableCell>
										<TableCell align='right' variant='body' size='small'>
											{item.totalScore}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<Typography variant='h6' color='primary' className={classes.marginTop}>
						Your score this week : {score}
					</Typography>

					<div className={classes.paper}>
						<Typography
							variant='subtitle1'
							color={Boolean(user.userName) ? 'primary' : 'secondary'}
							className={classes.marginBottom}>
							{Boolean(user.userName)
								? 'Start new quiz'
								: 'You need to log in to take a quiz'}
						</Typography>

						<TextField
							onChange={(event) => {
								setLevel(event.target.value);
								setDepartment('');
							}}
							value={level}
							label='Level'
							select
							variant='outlined'
							margin='dense'
							fullWidth
							className={classes.marginBottom}>
							{levelsMenu}
						</TextField>

						<TextField
							onChange={(event) => setDepartment(event.target.value)}
							value={department}
							label='Department'
							select
							variant='outlined'
							margin='dense'
							fullWidth
							className={classes.marginBottom}>
							{departmentsMenu}
						</TextField>

						<TextField
							onChange={(event) => setSubject(event.target.value)}
							inputProps={{ maxLength: '30' }}
							value={subject}
							margin='dense'
							label='Subject'
							variant='outlined'
							fullWidth
							className={classes.marginBottom}
						/>

						<Button
							onClick={() => {
								setAlertSeverity('info');
								setAlertMessage('Starting...');

								let levelQuery, departmentQuery, subjectQuery;
								if (level) levelQuery = `class=${level}`;
								if (department) departmentQuery = `department=${department}`;
								if (!level) departmentQuery = '';
								if (subject) subjectQuery = `subject=${subject}`;
								const query = `${levelQuery}&${departmentQuery}&${subjectQuery}`;

								axiosInstance({ method: 'get', url: `/quizzes/random?${query}` })
									.then(function (response) {
										setResults({});
										setScore(0);

										const answers = response.data.data.questions.map((item) => {
											return {
												answer: 0,
												question: item.question,
												option1: item.option1,
												option2: item.option2,
												option3: item.option3,
												option4: item.option4,
												questionId: item._id,
											};
										});

										setQuizAnswer(answers);
										setTitle(response.data.data.title);
										setTime(response.data.data.time);
										setLevel(response.data.data.class);
										setSubject(response.data.data.subject);
										setDepartment(response.data.data.department);
										setStep(2);
										setCountdownTimeUp(false);
										setCountdownLink(`${shortQuiz}/running`);
										startCountdownTimer(response.data.data.timeOut);
										setIsCountdownOpen(true);

										setAlertMessage('');
										if (response.data.message) {
											setAlertSeverity('warning');
											setAlertMessage(response.data.message);
										}
									})
									.catch(function (error) {
										handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
									});
							}}
							color='primary'
							size='large'
							variant='contained'
							disabled={!Boolean(user.userName)}
							className={classes.startButton}>
							Start
						</Button>
					</div>
				</React.Fragment>
			);
		}

		return undefined;
	}, [
		step,
		classes,
		scoreToppers,
		score,
		user,
		level,
		levelsMenu,
		department,
		departmentsMenu,
		subject,
		startCountdownTimer,
	]);

	const step2 = useMemo(() => {
		if (step === 2) {
			const questionArray = quizAnswer.map((item) => (
				<div key={item.questionId} className={classes.paper}>
					<Typography className={classes.marginBottom}>{item.question}</Typography>

					<RadioGroup
						onChange={(event) => handleChangeAnswers(item.questionId, event)}
						value={item.answer}
						name='answer'>
						<FormControlLabel
							value='1'
							label={`A. ${item.option1}`}
							control={<Radio checked={item.answer === '1'} color='primary' />}
						/>
						<FormControlLabel
							value='2'
							label={`B. ${item.option2}`}
							control={<Radio checked={item.answer === '2'} color='primary' />}
						/>
						<FormControlLabel
							value='3'
							label={`C. ${item.option3}`}
							control={<Radio checked={item.answer === '3'} color='primary' />}
						/>
						<FormControlLabel
							value='4'
							label={`D. ${item.option4}`}
							control={<Radio checked={item.answer === '4'} color='primary' />}
						/>
					</RadioGroup>
				</div>
			));

			return (
				<React.Fragment>
					{running !== 'running' && (
						<React.Fragment>
							<Typography className={classes.marginTop} gutterBottom>
								{title} (Time : {time} minutes)
							</Typography>
							<Typography className={classes.marginBottom} variant='subtitle1'>
								{level} - {department} - {subject}
							</Typography>
						</React.Fragment>
					)}

					{questionArray}

					<Button
						onClick={handleSubmit}
						color='primary'
						size='large'
						variant='contained'
						disabled={!Boolean(user.userName) || quizAnswer.length < 1}
						className={classes.startButton}>
						submit
					</Button>
				</React.Fragment>
			);
		}

		return undefined;
	}, [
		step,
		quizAnswer,
		running,
		classes,
		title,
		time,
		level,
		department,
		subject,
		handleSubmit,
		user,
		handleChangeAnswers,
	]);

	const step3 = useMemo(() => {
		if (step === 3) {
			const resultsArray = results.answers.map((item) => (
				<div key={`${item.question}-${item.correctAnswer}`} className={classes.paper2}>
					{item.isCorrect ? (
						<DoneIcon color='primary' />
					) : (
						<CloseIcon color='secondary' />
					)}
					<div>
						<Typography className={classes.marginBottom}>{item.question}</Typography>
						{item.isCorrect ? undefined : (
							<Typography color='secondary'>Wrong : {item.wrongAnswer}</Typography>
						)}

						<Typography color='primary'>Correct : {item.correctAnswer}</Typography>
					</div>
				</div>
			));

			return (
				<React.Fragment>
					<Typography
						variant='h5'
						color='primary'
						className={classes.marginTop}
						gutterBottom>
						Correct {results.correct} out of {results.total} ({results.percent}%)
					</Typography>

					{resultsArray}
					<Button
						onClick={() => {
							stopCountdownTimer();
							setCountdownTimeUp(false);
							setIsCountdownOpen(false);
							setCountdownLink(home);
							setQuizAnswer([]);
							setResults({});
							setScore(0);
							setTitle('');
							setTime('');
							setLevel('');
							setSubject('');
							setDepartment('');
							setDepartmentsArray([]);
							setIsSubmitted(false);
							setStep(1);
						}}
						color='primary'
						size='large'
						variant='contained'
						disabled={!Boolean(user.userName)}
						className={classes.startButton}>
						Done
					</Button>
				</React.Fragment>
			);
		}

		return undefined;
	}, [classes, results, step, user, stopCountdownTimer]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Short Quiz - BD-Jobs`}</title>
			</Helmet>

			<Container maxWidth='xl'>
				{step1}

				{step2}

				{step3}

				{/* <iframe
					src={`${process.env.PUBLIC_URL}/quiz`}
					title='short-quiz-iframe'
					style={{ border: 'none', width: '100%', height: 540 }}
				/> */}
			</Container>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: theme.spacing(2),
		margin: theme.spacing(1.5, 0),
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
	},
	paper2: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: theme.spacing(1),
		padding: theme.spacing(2),
		margin: theme.spacing(1.5, 0),
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
	},
	marginBottom: {
		marginBottom: theme.spacing(1),
	},
	marginTop: {
		marginTop: theme.spacing(1),
	},
	startButton: {
		minWidth: 120,
		margin: '8px 0px 16px auto',
	},
}));
