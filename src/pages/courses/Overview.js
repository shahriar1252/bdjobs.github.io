import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Container, Grid, Link as MuiLink, Paper, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import useLocationLevel from '../../hooks/useLocationLevel';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import AlertContext from '../../config/AlertContext';
import UserContext from '../../config/UserContext';
import { backend, root, apiRoot, courseLessons, logIn, profile } from '../../utils/fixedRoutes';
import DialogPaymentPrompt from '../../components/DialogPaymentPrompt';

export default function Overview() {
	const { user } = useContext(UserContext);
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);
	const id = useLocationLevel(2, root);
	const status = useLocationLevel(3, root);

	const [hasFetched, setHasFetched] = useState(false);
	const [course, setCourse] = useState({});
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !hasFetched) {
			axiosInstance({ method: 'get', url: `/courses/${id}` })
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

		if (user.courses && user.courses.includes(course._id)) {
			setIsEnrolled(true);
		}

		return () => (isMounted = false);
	}, [user, id, course, hasFetched]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && status) {
			setTimeout(() => {
				if (status === 'success') {
					setAlertSeverity('success');
					setAlertMessage('Payment successful. Enrolled course');
				} else if (status === 'fail') {
					setAlertSeverity('error');
					setAlertMessage('Payment failed');
				} else if (status === 'cancel') {
					setAlertSeverity('warning');
					setAlertMessage('Canceled payment');
				}
			}, 1000);
		}

		return () => (isMounted = false);
	}, [status]);

	const handleEnrollCourse = () => {
		axiosInstance({ method: 'get', url: `users/enroll/${id}` })
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Enrolled course');
				window.location.reload();
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${course.title} - BD-Jobs`}</title>
			</Helmet>
			<Container maxWidth='lg'>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<div
							style={{
								width: '100%',
								height: 200,
								margin: '8px 0px',
								backgroundImage: `url("${backend}${course.photo}")`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								borderRadius: 8,
							}}
						/>

						<Typography variant='h6'>{course.title}</Typography>

						<Typography variant='subtitle2' color='primary' gutterBottom>
							{course.subject}
						</Typography>

						{course.description &&
							course.description.split('\n').map((text, index) => (
								<Typography
									key={`${index}-course-description`}
									color='textSecondary'
									style={{ paddingBottom: '0.5em' }}>
									{text}
								</Typography>
							))}

						<Typography variant='subtitle2' gutterBottom>
							Requirements :
						</Typography>

						<ul style={{ margin: 0 }}>
							{course.requirements &&
								course.requirements.map((data, index) => (
									<Typography
										key={`${index}-${data}`}
										component={'li'}
										variant='subtitle2'>
										{data}
									</Typography>
								))}
						</ul>
					</Grid>

					<Grid item xs={12} md={4}>
						<Paper style={{ padding: 16, margin: '8px 0px' }}>
							<Typography variant='subtitle2'>Instructor</Typography>
							{course.instructor ? (
								<MuiLink
									component={Link}
									to={`${profile}/${course.instructor.userName}`}>
									{course.instructor.fullName}
								</MuiLink>
							) : undefined}

							<br />
							<br />

							<Typography color='primary' gutterBottom>
								{isEnrolled
									? 'Enrolled'
									: course.price < 1
									? 'FREE'
									: `Price: ৳${course.price}`}
							</Typography>

							{!user.userName ? (
								<>
									<Typography color='secondary' variant='subtitle2' gutterBottom>
										You need to log in to access this course.
									</Typography>
									<Button
										component={Link}
										to={logIn}
										variant='contained'
										color='primary'
										fullWidth>
										Log in
									</Button>
								</>
							) : isEnrolled ? (
								<Button
									component={Link}
									to={`${courseLessons}/${id}`}
									variant='contained'
									color='primary'
									fullWidth
									endIcon={<NavigateNextIcon />}>
									Go to lessons
								</Button>
							) : course.price < 1 ? (
								<Button
									onClick={handleEnrollCourse}
									variant='contained'
									color='primary'
									fullWidth>
									Enroll Now
								</Button>
							) : (
								<Button
									onClick={() => setIsPaymentDialogOpen(true)}
									variant='contained'
									color='primary'
									fullWidth>
									Buy Now
								</Button>
							)}
						</Paper>
					</Grid>
				</Grid>
				<br />
			</Container>

			<DialogPaymentPrompt
				title={`Course : ${course.title}`}
				link={`${apiRoot}/payment/request/${user.id}/course/${course._id}`}
				price={course.price}
				isPaymentDialogOpen={isPaymentDialogOpen}
				setIsPaymentDialogOpen={setIsPaymentDialogOpen}
			/>
		</React.Fragment>
	);
}
