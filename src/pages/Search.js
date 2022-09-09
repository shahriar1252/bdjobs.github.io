import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Card,
	CardActionArea,
	CardMedia,
	Container,
	Grid,
	Paper,
	ListItem,
	ListItemText,
	Typography,
	makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useLocationLevel from '../hooks/useLocationLevel';
//React helmet
import { Helmet } from 'react-helmet';
//Fixed Routes
import { backend, root } from '../utils/fixedRoutes';
import CardNoteBlog from '../components/CardNoteBlog';
import CardCourse from '../components/CardCourse';
import DialogIFrameViewer from '../components/DialogIFrameViewer';
import DialogVideoPlayer from '../components/DialogVideoPlayer';
import AlertContext from '../config/AlertContext';
import axiosInstance from '../utils/axiosInstance';
import handleAxiosErrors from '../utils/axiosErrorHandler';

export default function Search() {
	const search = useLocationLevel(1, root);

	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const classes = useStyles();

	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);
	const [iFrameDownloadLink, setIFrameDownloadLink] = useState(false);

	const [videoDialogIsOpen, setVideoDialogIsOpen] = useState(false);
	const [videoTitle, setVideoTitle] = useState(false);
	const [videoLink, setVideoLink] = useState(false);

	/* - - - - - - - - - - Blogs - - - - - - - - - - 

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		if (!search) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/blogs?search=${search}` })
				.then(function (response) {
					setBlogs(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, [search]);

	const BlogsArray = useMemo(() => {
		if (blogs && blogs.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						Blog Posts
					</Typography>

					<div className={classes.arrayContainer}>
						{blogs.map((blog) => {
							return (
								<CardNoteBlog
									title={blog.title}
									subject={blog.subject}
									banner={`${backend}${blog.banner}`}
									author={blog.author.fullName}
									likes={blog.likes.length}
									dislikes={blog.dislikes.length}
									updatedAt={blog.updatedAt}
									id={blog._id}
									key={blog._id}
								/>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from blogs
				</Typography>
			);
		}
	}, [blogs, classes]);

	- - - - - - - - - - Blogs - - - - - - - - - - */

	/* - - - - - - - - - - Courses - - - - - - - - - - 

	const [courses, setCourses] = useState([]);

	useEffect(() => {
		if (!search) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/courses?search=${search}&sort=subject` })
				.then(function (response) {
					setCourses(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, [search]);

	const CoursesArray = useMemo(() => {
		if (courses && courses.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						Courses
					</Typography>

					<div className={classes.arrayContainer}>
						{courses.map((course) => {
							return (
								<CardCourse
									title={course.title}
									subject={course.subject}
									author={course.instructor.fullName}
									price={course.price}
									photo={`${backend}${course.photo}`}
									id={course._id}
									key={course._id}
								/>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from courses
				</Typography>
			);
		}
	}, [courses, classes]);

	- - - - - - - - - - Courses - - - - - - - - - - */

	/* - - - - - - - - - - PDF Books - - - - - - - - - - */

	const [books, setBooks] = useState([]);

	useEffect(() => {
		if (!search) return;

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

	const handleBookLinkOpen = (title, fileID) => {
		setIFrameTitle(title);
		setIFrameLink(`https://drive.google.com/file/d/${fileID}/preview`);
		setIFrameDownloadLink(`https://drive.google.com/uc?id=${fileID}&export=download`);
		setIFrameDialogIsOpen(true);
	};

	const BooksArray = useMemo(() => {
		if (books && books.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						PDF Books
					</Typography>

					<div className={classes.arrayContainer}>
						{books.map((item) => {
							return (
								<Card
									key={item._id}
									variant='outlined'
									className={classes.cardContainer}>
									<CardActionArea
										onClick={() =>
											handleBookLinkOpen(item.title, item.driveId)
										}>
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
												variant='subtitle1'
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
								</Card>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from books
				</Typography>
			);
		}
	}, [books, classes]);

	/* - - - - - - - - - - PDF Books - - - - - - - - - - */

	/* - - - - - - - - - - Question Bank - - - - - - - - - - */

	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		if (!search) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/questions?search=${search}&sort=class,department`,
			})
				.then(function (response) {
					setQuestions(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search]);

	const handleQuestionLinkOpen = (title, fileID) => {
		setIFrameTitle(title);
		setIFrameLink(`https://drive.google.com/file/d/${fileID}/preview`);
		setIFrameDownloadLink(`https://drive.google.com/uc?id=${fileID}&export=download`);
		setIFrameDialogIsOpen(true);
	};

	const QuestionsArray = useMemo(() => {
		if (questions && questions.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						Questions
					</Typography>

					<Grid
						container
						alignItems='flex-start'
						spacing={2}
						className={classes.gridContainer}>
						{questions.map((item) => {
							return (
								<Grid item xs={12} md={6} key={item._id}>
									<Paper className={classes.listItemPaper}>
										<ListItem
											id={item._id}
											button
											onClick={() =>
												handleQuestionLinkOpen(item.title, item.driveId)
											}>
											<ListItemText
												primary={item.title}
												secondary={`${item.class} - ${item.department} - ${item.subject}`}
											/>
										</ListItem>
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from questions
				</Typography>
			);
		}
	}, [questions, classes]);

	/* - - - - - - - - - - Question Bank - - - - - - - - - - */

	/* - - - - - - - - - - Tutorials - - - - - - - - - - 

	const [tutorials, setTutorials] = useState([]);

	useEffect(() => {
		if (!search) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/tutorials?search=${search}&sort=class,department`,
			})
				.then(function (response) {
					setTutorials(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search]);

	const handleTutorialLinkOpen = (title, video) => {
		setVideoTitle(title);
		setVideoLink(video);
		setVideoDialogIsOpen(true);
	};

	const TutorialsArray = useMemo(() => {
		if (tutorials && tutorials.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						Seminars
					</Typography>

					<Grid
						container
						alignItems='flex-start'
						spacing={2}
						className={classes.gridContainer}>
						{tutorials.map((item) => {
							return (
								<Grid item xs={12} lg={6} key={item._id}>
									<Paper className={classes.listItemPaper}>
										<ListItem
											id={item._id}
											button
											ContainerComponent='div'
											onClick={() =>
												handleTutorialLinkOpen(item.title, item.videoLink)
											}>
											<ListItemText
												primary={`${item.title} - ${item.subject}`}
												secondary={`${item.authorName} - ${item.class} - ${item.department}`}
											/>
										</ListItem>
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from seminars
				</Typography>
			);
		}
	}, [tutorials, classes]);

	- - - - - - - - - - Tutorials - - - - - - - - - - */

	/* - - - - - - - - - - Job Circular - - - - - - - - - - 

	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		if (!search) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/jobs?search=${search}` })
				.then(function (response) {
					setJobs(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search]);

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

	const JobsArray = useMemo(() => {
		if (jobs && jobs.length > 0) {
			return (
				<div>
					<Typography variant='subtitle1' color='secondary' gutterBottom>
						Job Circulars
					</Typography>

					<Grid
						container
						alignItems='flex-start'
						spacing={2}
						className={classes.gridContainer}>
						{jobs.map((job) => {
							return (
								<Grid item xs={12} lg={6} key={job._id}>
									<Paper className={classes.listItemPaper}>
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
						})}
					</Grid>
				</div>
			);
		} else {
			return (
				<Typography variant='subtitle1' color='textSecondary' gutterBottom>
					No results from jobs
				</Typography>
			);
		}
	}, [jobs, classes]);

	- - - - - - - - - - Job Circular - - - - - - - - - - */

	return (
		<>
			<Helmet>
				<title>{`Searching BD-Jobs...`}</title>
			</Helmet>
			<Container maxWidth='xl'>
				<Typography
					variant='h6'
					color='textPrimary'
					display='block'
					className={classes.divider}
					gutterBottom>
					Searched for "{search}"
				</Typography>

				{/* <Divider className={classes.divider} />

				{BlogsArray}

				<Divider className={classes.divider} />

				{CoursesArray} */}

				<Divider className={classes.divider} />

				{BooksArray}

				<Divider className={classes.divider} />

				{QuestionsArray}

				<Divider className={classes.divider} />

				{/* {TutorialsArray}

				<Divider className={classes.divider} />

				{JobsArray}

				<Divider className={classes.divider} /> */}
			</Container>

			<DialogIFrameViewer
				title={iFrameTitle}
				link={iFrameLink}
				downloadLink={iFrameDownloadLink}
				iFrameDialogIsOpen={iFrameDialogIsOpen}
				setIFrameDialogIsOpen={setIFrameDialogIsOpen}
			/>

			<DialogVideoPlayer
				title={videoTitle}
				link={videoLink}
				iFrameDialogIsOpen={videoDialogIsOpen}
				setIFrameDialogIsOpen={setVideoDialogIsOpen}
			/>

			{/* <Dialog
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
			</Dialog> */}
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: theme.spacing(1, 0),
	},
	arrayContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	gridContainer: {
		padding: theme.spacing(0, 0, 1),
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
	listItemPaper: {
		overflow: 'hidden',
	},
}));
