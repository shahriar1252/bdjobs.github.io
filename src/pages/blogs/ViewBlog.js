import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
	Avatar,
	Button,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Tooltip,
	TextField,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

import useLocationLevel from '../../hooks/useLocationLevel';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import AlertContext from '../../config/AlertContext';
import UserContext from '../../config/UserContext';
import { backend, root, profile, blogEdit, logIn } from '../../utils/fixedRoutes';

export default function ViewBlog() {
	const { user } = useContext(UserContext);
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const blogId = useLocationLevel(2, root);

	const [hasFetched, setHasFetched] = useState(false);
	const [blog, setBlog] = useState({});
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	const fetchData = useCallback(() => {
		axiosInstance({ method: 'get', url: `/blogs/${blogId}` })
			.then(function (response) {
				setBlog(response.data.data);
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			})
			.finally(function () {
				setHasFetched(true);
			});
	}, [blogId]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			if (!hasFetched) fetchData();

			if (blog.likes && blog.likes.indexOf(user.id) !== -1) setIsLiked(true);
			else setIsLiked(false);
			if (blog.dislikes && blog.dislikes.indexOf(user.id) !== -1) setIsDisliked(true);
			else setIsDisliked(false);
		}

		return () => (isMounted = false);
	}, [user, blogId, blog, hasFetched, fetchData]);

	const handleLike = () => {
		const config = {
			method: 'get',
			url: `/blogs/like/${blog._id}`,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				if (isLiked) {
					setAlertMessage('Removed like');
				} else {
					setAlertMessage('Liked this post');
				}
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			})
			.finally(function () {
				fetchData();
			});
	};

	const handleDislike = () => {
		const config = {
			method: 'get',
			url: `/blogs/dislike/${blog._id}`,
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				if (isDisliked) {
					setAlertMessage('Removed dislike');
				} else {
					setAlertMessage('Disliked this post');
				}
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			})
			.finally(function () {
				fetchData();
			});
	};

	const [comment, setComment] = useState('');

	const handlePostComment = () => {
		if (comment) {
			const data = {
				comment: comment,
			};

			const config = {
				method: 'post',
				url: `/blogs/comment/${blog._id}`,
				data: data,
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Comment posted');
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				})
				.finally(function () {
					fetchData();
				});
		}

		setComment('');
	};

	const handleDeleteComment = (id) => {
		if (id) {
			const config = {
				method: 'delete',
				url: `/blogs/comment/${id}`,
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Comment deleted');
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				})
				.finally(function () {
					fetchData();
				});
		}
	};

	const classes = useStyles();

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${blog.title} - BD-Jobs`}</title>
			</Helmet>
			<Container maxWidth='xl'>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={8}>
						<div
							className={classes.banner}
							style={{
								backgroundImage: `url("${backend}${blog.banner}")`,
							}}
						/>

						<Typography variant='h6'>{blog.title}</Typography>

						<Typography variant='subtitle2' color='primary' gutterBottom>
							{blog.subject}
						</Typography>

						{blog.author && (
							<ListItem
								component={Link}
								to={`${profile}/${blog.author.userName}`}
								button
								disableGutters
								ContainerComponent='div'>
								<ListItemAvatar>
									<Avatar src={`${backend}/${blog.author.photo}`} />
								</ListItemAvatar>
								<ListItemText
									primary={blog.author.fullName}
									secondary={`Last updated : ${new Date(
										blog.updatedAt,
									).toDateString()}`}
								/>
								{user.role === 'admin' || user.id === blog.author._id ? (
									<ListItemSecondaryAction>
										<Button
											component={Link}
											to={`${blogEdit}/${blog._id}`}
											color='primary'
											variant='outlined'
											size='small'
											startIcon={<EditIcon />}>
											Edit
										</Button>
									</ListItemSecondaryAction>
								) : undefined}
							</ListItem>
						)}

						{blog.description
							? blog.description.length > 100
								? blog.description.split('\n').map((text, index) => (
										<Typography
											key={`${blog._id}-description-regular-para-${index}`}
											variant='body1'
											color='textPrimary'
											className={classes.paddingBottom}>
											{text}
										</Typography>
								  ))
								: blog.description.split('\n').map((text, index) => (
										<Typography
											key={`${blog._id}-description-large-para-${index}`}
											variant='h6'
											color='textPrimary'
											className={classes.paddingBottom}>
											{text}
										</Typography>
								  ))
							: undefined}

						{blog.photos &&
							blog.photos.map((data, index) => (
								<img
									key={`${blog._id}-photo-${index}`}
									alt={`${blog.title}-${index}`}
									src={`${backend}/${data}`}
									className={classes.blogPhotos}
								/>
							))}
					</Grid>

					<Grid item xs={12} lg={4}>
						<Paper className={classes.paper}>
							{!user.userName && (
								<div className={classes.commentHeader}>
									<Typography color='secondary' variant='subtitle2' gutterBottom>
										You need to log in to be able to like or comment
									</Typography>

									<Button
										component={Link}
										to={logIn}
										variant='contained'
										color='primary'
										fullWidth>
										Log in
									</Button>
								</div>
							)}

							<div className={classes.likeButtonsContainer}>
								<Button
									onClick={handleLike}
									disabled={!user.userName}
									fullWidth
									color={isLiked ? 'primary' : 'default'}
									startIcon={
										isLiked ? (
											<ThumbUpIcon fontSize='large' />
										) : (
											<ThumbUpAltOutlinedIcon fontSize='large' />
										)
									}
									className={classes.likeButton}>
									{blog.likes ? blog.likes.length : ''}
								</Button>

								<Button
									onClick={handleDislike}
									disabled={!user.userName}
									fullWidth
									color={isDisliked ? 'secondary' : 'default'}
									startIcon={
										isDisliked ? (
											<ThumbDownIcon fontSize='large' />
										) : (
											<ThumbDownAltOutlinedIcon fontSize='large' />
										)
									}
									className={classes.likeButton}>
									{blog.dislikes ? blog.dislikes.length : ''}
								</Button>
							</div>

							<Divider />

							<Typography variant='subtitle2' className={classes.commentHeader}>
								{`Comments (${blog.comments ? blog.comments.length : ''})`}
							</Typography>

							{user.userName && (
								<>
									<ListItem>
										<ListItemAvatar>
											<Avatar src={user.photo} />
										</ListItemAvatar>
										<ListItemText primary={user.fullName} />
									</ListItem>

									<div className={classes.comment}>
										<TextField
											onChange={(event) => setComment(event.target.value)}
											value={comment}
											inputProps={{ maxLength: '1000' }}
											label='Write comment'
											multiline
											minRows={4}
											variant='outlined'
											margin='dense'
											fullWidth
										/>

										<Button
											onClick={handlePostComment}
											color='primary'
											size='small'
											variant='contained'
											className={classes.commentPostButton}>
											Post comment
										</Button>
									</div>

									<Divider />
								</>
							)}

							<List>
								{blog.comments &&
									blog.comments.map((data) => (
										<div key={data._id}>
											<ListItem
												button
												component={Link}
												to={`${profile}/${data.user.userName}`}>
												<ListItemAvatar>
													<Avatar src={`${backend}/${data.user.photo}`} />
												</ListItemAvatar>
												<ListItemText
													primary={data.user.fullName}
													secondary={new Date(
														data.updatedAt,
													).toDateString()}
												/>
												{user.id === data.user._id ? (
													<ListItemSecondaryAction>
														<Tooltip title='Delete this comment'>
															<IconButton
																edge='end'
																aria-label='Delete comment'
																color='secondary'
																onClick={() =>
																	handleDeleteComment(data._id)
																}>
																<RemoveIcon />
															</IconButton>
														</Tooltip>
													</ListItemSecondaryAction>
												) : undefined}
											</ListItem>

											<div className={classes.comment}>
												{data.comment.split('\n').map((text, index) => (
													<Typography
														key={`${data._id}-comment-para-${index}`}
														variant='body2'
														className={classes.paddingBottom}>
														{text}
													</Typography>
												))}
											</div>

											<Divider />
										</div>
									))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	banner: {
		width: '100%',
		height: 240,
		margin: theme.spacing(2, 0, 3, 0),
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		borderRadius: theme.shape.borderRadius,
	},
	paper: {
		margin: theme.spacing(2, 0, 3, 0),
		overflow: 'hidden',
	},
	blogPhotos: {
		width: '100%',
		margin: theme.spacing(1, 0),
		borderRadius: theme.shape.borderRadius,
	},
	likeButtonsContainer: {
		display: 'flex',
		padding: theme.spacing(2),
	},
	likeButton: {
		flexGrow: 1,
		textTransform: 'none',
	},
	commentHeader: {
		margin: theme.spacing(2, 2, 1, 2),
	},
	commentPostButton: {
		margin: theme.spacing(0.5, 0, 0, 0),
	},
	comment: {
		padding: theme.spacing(0, 2, 2, 2),
	},
	paddingBottom: {
		paddingBottom: '0.5em',
	},
}));
