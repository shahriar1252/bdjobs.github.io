import React, { useContext, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Helmet } from 'react-helmet';
//Custom Components
import CardCourse from '../../components/CardCourse';
import AlertContext from '../../config/AlertContext';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import { backend } from '../../utils/fixedRoutes';

export default function AllCourses() {
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

	const coursesArray = courses.map((course) => {
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
	});

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Courses - ELearnBD`}</title>
			</Helmet>
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
		</React.Fragment>
	);
}
