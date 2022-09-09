import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet';

import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import useLocationLevel from '../../hooks/useLocationLevel';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import AlertContext from '../../config/AlertContext';
import { root } from '../../utils/fixedRoutes';

export default function Lessons() {
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const id = useLocationLevel(2, root);

	const classes = useStyles();

	const [hasFetched, setHasFetched] = useState(false);
	const [course, setCourse] = useState({});
	const [lesson, setLesson] = useState({});

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			axiosInstance({ method: 'get', url: `/courses/lessons/${id}` })
				.then(function (response) {
					setCourse(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				})
				.finally(function () {
					setHasFetched(true);
				});
		}

		return () => (isMounted = false);
	}, [id, course, hasFetched]);

	const handleListItemClick = (data) => {
		setLesson(data);
	};

	const Video = useMemo(() => {
		if (lesson) {
			return (
				<div>
					<Typography variant='subtitle2' gutterBottom>
						{lesson.title}
					</Typography>

					<ReactPlayer url={lesson.videoLink} width='100%' controls playing />
				</div>
			);
		}
	}, [lesson]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${course.title} - BD-Jobs`}</title>
			</Helmet>
			<Container maxWidth='xl'>
				<div className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={4}>
							<Paper className={classes.paper}>
								{course.title ? (
									<Typography variant='subtitle2' gutterBottom>
										{course.title}
									</Typography>
								) : undefined}

								<TreeView
									aria-label='file system navigator'
									defaultCollapseIcon={<ExpandMoreIcon />}
									defaultExpandIcon={<ChevronRightIcon />}
									defaultEndIcon={<PlayCircleOutlineIcon />}
									style={{
										maxHeight: 360,
										flexGrow: 1,
										overflowY: 'auto',
									}}>
									{course.lessons &&
										course.lessons.map((data) => (
											<TreeItem
												key={data._id}
												nodeId={data._id}
												label={data.title}
												onClick={() => {
													handleListItemClick(data);
												}}
											/>
										))}
								</TreeView>
							</Paper>
						</Grid>
						<Grid item xs={12} lg={8}>
							<Paper className={classes.paper}>{Video}</Paper>
						</Grid>
					</Grid>
				</div>
			</Container>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: '30px 0',
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.primary,
	},
}));
