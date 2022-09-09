import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import axiosInstance from '../utils/axiosInstance';
import AlertContext from '../config/AlertContext';
import handleAxiosErrors from '../utils/axiosErrorHandler';

import { jobsDeptArray } from '../utils/optionsArrays';

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

	const jobsArrays = useMemo(() => {
		return jobs.map((job) => {
			return (
				<Grid item xs={12} lg={6} key={job._id}>
					<Paper style={{ overflow: 'hidden' }}>
						<ListItem
							id={job._id}
							button
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
			<Helmet>
				<title>{`Job Circular - BD-Jobs`}</title>
			</Helmet>
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
}));
