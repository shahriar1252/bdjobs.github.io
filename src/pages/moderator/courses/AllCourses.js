import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
//Custom Components
import CardCourse from '../../../components/CardCourse';
import AlertContext from '../../../config/AlertContext';
import axiosInstance from '../../../utils/axiosInstance';
import handleAxiosErrors from '../../../utils/axiosErrorHandler';
import { backend, moderatorCourses } from '../../../utils/fixedRoutes';

export default function Courses() {
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [courses, setCourses] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
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

	const coursesArray = useMemo(() => {
		if (courses && courses.length > 0) {
			return courses.map((course) => {
				return (
					<CardCourse
						title={course.title}
						subject={course.subject}
						author={course.instructor.fullName}
						price={course.price}
						photo={`${backend}${course.photo}`}
						id={course._id}
						edit={true}
						key={course._id}
					/>
				);
			});
		}

		return (
			<Paper
				style={{
					width: '100%',
					minHeight: 200,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				No Items
			</Paper>
		);
	}, [courses]);

	return (
		<Container maxWidth='xl'>
			<div
				style={{
					padding: '8px 0px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
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
					style={{ maxWidth: 400 }}
				/>
			</div>

			<Button
				component={Link}
				to={`${moderatorCourses}/create`}
				variant='contained'
				color='primary'
				startIcon={<AddIcon />}
				style={{ minWidth: 96, margin: '16px 0px' }}>
				Add
			</Button>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				{coursesArray}
			</div>
		</Container>
	);
}
