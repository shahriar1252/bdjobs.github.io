import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
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

import axiosInstance from '../../../utils/axiosInstance';
import AlertContext from '../../../config/AlertContext';
import handleAxiosErrors from '../../../utils/axiosErrorHandler';

import { levelsArray, schoolDeptArray, jobsDeptArray } from '../../../utils/optionsArrays';
import { moderatorShortQuiz } from '../../../utils/fixedRoutes';

export default function AllQuizzes() {
	const classes = useStyles();
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [quizzes, setQuizzes] = useState([]);

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

			axiosInstance({ method: 'get', url: `/quizzes?${query}&sort=class,department` })
				.then(function (response) {
					setQuizzes(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search, level, department]);

	const quizzesArray = useMemo(() => {
		return quizzes.map((item) => {
			return (
				<Grid item xs={12} lg={6} key={item._id}>
					<Paper style={{ overflow: 'hidden' }}>
						<ListItem id={item._id} ContainerComponent='div'>
							<ListItemText
								primary={item.title}
								secondary={`${item.class} - ${item.department} - ${item.subject}`}
							/>
							<ListItemSecondaryAction>
								<Tooltip title='Edit this item'>
									<IconButton
										edge='end'
										aria-label='edit'
										component={Link}
										to={`${moderatorShortQuiz}/edit/${item._id}`}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</ListItemSecondaryAction>
						</ListItem>
					</Paper>
				</Grid>
			);
		});
	}, [quizzes]);

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
					component={Link}
					to={`${moderatorShortQuiz}/create`}
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
					{Boolean(quizzesArray && quizzesArray.length > 0) ? (
						quizzesArray
					) : (
						<Grid item xs={12}>
							<Paper className={classes.emptyPlaceholder}>No Items</Paper>
						</Grid>
					)}
				</Grid>
			</div>
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
