import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import axiosInstance from '../utils/axiosInstance';
import AlertContext from '../config/AlertContext';
import handleAxiosErrors from '../utils/axiosErrorHandler';

import DialogVideoPlayer from '../components/DialogVideoPlayer';
import { levelsArray, schoolDeptArray, jobsDeptArray } from '../utils/optionsArrays';

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

	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);

	const handleLinkOpen = (title, video) => {
		setIFrameTitle(title);
		setIFrameLink(video);
		setIFrameDialogIsOpen(true);
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
			<Helmet>
				<title>{`Tutorials - BD-Jobs`}</title>
			</Helmet>
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
