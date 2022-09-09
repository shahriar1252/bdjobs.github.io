import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Divider,
	Card,
	CardActionArea,
	CardMedia,
	Container,
	Grid,
	Paper,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Typography,
	makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//React helmet
import { Helmet } from 'react-helmet';
//Fixed Routes
import {
	backend,
	blogs,
	courses,
	jobCircular,
	pdfBooks,
	questionBank,
	tutorials,
} from '../utils/fixedRoutes';
import CardNoteBlog from '../components/CardNoteBlog';
import CardCourse from '../components/CardCourse';
import DialogIFrameViewer from '../components/DialogIFrameViewer';
import DialogVideoPlayer from '../components/DialogVideoPlayer';
import AlertContext from '../config/AlertContext';
import UserContext from '../config/UserContext';
import axiosInstance from '../utils/axiosInstance';
import handleAxiosErrors from '../utils/axiosErrorHandler';
import DialogJobCircularViewer from '../components/DialogJobCircilarViewer';
import DialogTopperViewer from '../components/DialogTopperViewer';

export default function Home() {
	const limit = 16;

	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const { user } = useContext(UserContext);

	const classes = useStyles();

	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);
	const [iFrameDownloadLink, setIFrameDownloadLink] = useState(false);

	const [videoDialogIsOpen, setVideoDialogIsOpen] = useState(false);
	const [videoTitle, setVideoTitle] = useState(false);
	const [videoLink, setVideoLink] = useState(false);

	const [topperDialogIsOpen, setTopperDialogIsOpen] = useState(false);

	/* - - - - - - - - - - Toppers - - - - - - - - - - */

	const [toppers, setToppers] = useState([]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: '/users/leaderboard?separate=0' })
				.then(function (response) {
					setToppers(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, []);

	/* - - - - - - - - - - Toppers - - - - - - - - - - */

	/* - - - - - - - - - - Blogs - - - - - - - - - - 

	const [blogPosts, setBlogs] = useState([]);

	useEffect(() => {
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/blogs?limit=${limit}` })
				.then(function (response) {
					setBlogs(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, [limit]);

	const BlogsArray = useMemo(() => {
		if (blogPosts && blogPosts.length > 0) {
			return (
				<div>
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Blog Posts'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={blogs}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

					<div className={classes.arrayContainer}>
						{blogPosts.map((blog) => {
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
	}, [blogPosts, classes]);

	 - - - - - - - - - - Blogs - - - - - - - - - - */

	/* - - - - - - - - - - Courses - - - - - - - - - - 

	const [onlineCourses, setCourses] = useState([]);

	useEffect(() => {
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/courses?limit=${limit}` })
				.then(function (response) {
					setCourses(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}

		return () => (isMounted = false);
	}, [limit]);

	const CoursesArray = useMemo(() => {
		if (onlineCourses && onlineCourses.length > 0) {
			return (
				<div>
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Courses'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={courses}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

					<div className={classes.arrayContainer}>
						{onlineCourses.map((course) => {
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
	}, [onlineCourses, classes]);

	 - - - - - - - - - - Courses - - - - - - - - - - */

	/* - - - - - - - - - - PDF Books - - - - - - - - - - */

	const [books, setBooks] = useState([]);

	useEffect(() => {
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/books?limit=${limit}`,
			})
				.then(function (response) {
					setBooks(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [limit]);

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
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Latest Books'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={pdfBooks}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

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
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/questions?limit=${limit}`,
			})
				.then(function (response) {
					setQuestions(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [limit]);

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
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Latest Questions'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={questionBank}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

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

	const [tutorialVideos, setTutorials] = useState([]);

	useEffect(() => {
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/tutorials?limit=${limit}`,
			})
				.then(function (response) {
					setTutorials(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [limit]);

	const handleTutorialLinkOpen = (title, video) => {
		setVideoTitle(title);
		setVideoLink(video);
		setVideoDialogIsOpen(true);
	};

	const TutorialsArray = useMemo(() => {
		if (tutorialVideos && tutorialVideos.length > 0) {
			return (
				<div>
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Seminars'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={tutorials}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

					<Grid
						container
						alignItems='flex-start'
						spacing={2}
						className={classes.gridContainer}>
						{tutorialVideos.map((item) => {
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
	}, [tutorialVideos, classes]);

	 - - - - - - - - - - Tutorials - - - - - - - - - - */

	/* - - - - - - - - - - Job Circular - - - - - - - - - - 

	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		if (!limit) return;

		let isMounted = true;

		if (isMounted) {
			axiosInstance({ method: 'get', url: `/jobs?limit=${limit}` })
				.then(function (response) {
					setJobs(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [limit]);

	const [jobCircularDialogIsOpen, setJobCircularDialogIsOpen] = useState(false);
	const [jobCircularTitle, setJobCircularTitle] = useState(false);
	const [jobCircularLink, setJobCircularLink] = useState(false);
	const [jobCircularDepartment, setJobCircularDepartment] = useState(false);
	const [jobCircularDescription, setJobCircularDescription] = useState(false);
	const [jobCircularDate, setJobCircularDate] = useState(false);

	const handleJobCircularLinkOpen = (title, link, dept, des, date) => {
		setJobCircularTitle(title);
		setJobCircularLink(link);
		setJobCircularDepartment(dept);
		setJobCircularDescription(des);
		setJobCircularDate(date);
		setJobCircularDialogIsOpen(true);
	};

	const JobsArray = useMemo(() => {
		if (jobs && jobs.length > 0) {
			return (
				<div>
					<ListItem ContainerComponent='div' className={classes.subheader}>
						<ListItemText
							primary='Job Circulars'
							primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
						/>

						<ListItemSecondaryAction>
							<Button
								component={Link}
								to={jobCircular}
								color='primary'
								size='small'
								endIcon={<NavigateNextIcon />}
								style={{ marginRight: '-16px' }}>
								Show more
							</Button>
						</ListItemSecondaryAction>
					</ListItem>

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
												handleJobCircularLinkOpen(
													job.title,
													job.applyLink,
													job.department,
													job.description,
													job.updatedAt,
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
				<title>BD-Jobs</title>
			</Helmet>
			<Container maxWidth='xl'>
				<Typography
					variant='h5'
					color='textSecondary'
					align='center'
					display='block'
					className={classes.divider}
					gutterBottom>
					{user.fullName ? `Welcome ${user.fullName}` : 'Welcome to BD-Jobs'}
				</Typography>

				<Button
					onClick={() => setTopperDialogIsOpen(true)}
					color='primary'
					size='large'
					fullWidth>
					View Top Chart
				</Button>

				{/* <Divider className={classes.divider} />

				{BlogsArray}

				<Divider className={classes.divider} />

				{CoursesArray} */}

				<Divider className={classes.divider} />

				{BooksArray}

				<Divider className={classes.divider} />

				{QuestionsArray}

				<Divider className={classes.divider} />

				{/* TutorialsArray}

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

			{/* <DialogJobCircularViewer
				jobCircularDialogIsOpen={jobCircularDialogIsOpen}
				setJobCircularDialogIsOpen={setJobCircularDialogIsOpen}
				jobCircularTitle={jobCircularTitle}
				jobCircularDepartment={jobCircularDepartment}
				jobCircularDescription={jobCircularDescription}
				jobCircularLink={jobCircularLink}
				jobCircularDate={jobCircularDate}
			/> */}

			<DialogTopperViewer
				topperDialogIsOpen={topperDialogIsOpen}
				setTopperDialogIsOpen={setTopperDialogIsOpen}
				toppers={toppers}
				user={user}
			/>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: theme.spacing(1, 0),
	},
	subheader: {
		padding: theme.spacing(0, 0, 1),
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
