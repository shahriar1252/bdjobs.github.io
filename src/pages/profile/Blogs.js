import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
//Custom Components
import CardNoteBlog from '../../components/CardNoteBlog';
import AlertContext from '../../config/AlertContext';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import { backend } from '../../utils/fixedRoutes';

export default function AllBlogs() {
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [blogs, setBlogs] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
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

	const blogsArray = blogs.map((blog) => {
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
	});

	return (
		<Container maxWidth='xl'>
			<Helmet>
				<title>{'Blogs - ELearnBD'}</title>
			</Helmet>

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
				{blogsArray}
			</div>
		</Container>
	);
}
