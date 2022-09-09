import React, { useContext, useMemo, useState, useEffect } from 'react';
//Material UI core
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
//React router
import { Link, Redirect, Route, Switch } from 'react-router-dom';
//React helmet
import { Helmet } from 'react-helmet';
//Custom hooks
import useLocationLevel from '../../hooks/useLocationLevel';
//Custom pages
import Courses from './courses/Main';
import JobCircular from './JobCircular';
import PdfBooks from './PDFBooks';
import QuestionBank from './QuestionBank';
import ShortQuiz from './quiz/Main';
import Tutorials from './Tutorials';
import Tags from './Tags';
import Users from './Users';

import UserContext from '../../config/UserContext';
//Fixed Routes
import {
	root,
	moderator,
	moderatorCourses,
	moderatorJobCircular,
	moderatorPDFBooks,
	moderatorQuestionBank,
	moderatorShortQuiz,
	moderatorTutorials,
	moderatorTags,
	moderatorUsers,
} from '../../utils/fixedRoutes';

export default function Moderator() {
	const { user } = useContext(UserContext);
	const activeTab = useLocationLevel(1, root);

	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (user.role === 'admin')
				setTabs([
					// { link: moderatorCourses, value: 'courses', label: 'Courses' },
					{ link: moderatorPDFBooks, value: 'pdfbooks', label: 'PDF Books' },
					{ link: moderatorQuestionBank, value: 'questionbank', label: 'Question Bank' },
					// { link: moderatorTutorials, value: 'tutorials', label: 'Seminar' },
					// { link: moderatorJobCircular, value: 'jobcircular', label: 'Job Circular' },
					{ link: moderatorShortQuiz, value: 'shortquiz', label: 'Short Quiz' },
					// { link: moderatorTags, value: 'tags', label: 'Tags' },
					// { link: moderatorUsers, value: 'users', label: 'Manage users' },
				]);

			if (user.role === 'moderator')
				setTabs([
					{ link: moderatorPDFBooks, value: 'pdfbooks', label: 'PDF Books' },
					{ link: moderatorQuestionBank, value: 'questionbank', label: 'Question Bank' },
					// { link: moderatorTutorials, value: 'tutorials', label: 'Seminar' },
					// { link: moderatorJobCircular, value: 'jobcircular', label: 'Job Circular' },
					{ link: moderatorShortQuiz, value: 'shortquiz', label: 'Short Quiz' },
					// { link: moderatorTags, value: 'tags', label: 'Tags' },
				]);

			/* if (user.role === 'instructor')
				setTabs([
					{ link: moderatorCourses, value: 'courses', label: 'Courses' },
					{ link: moderatorShortQuiz, value: 'shortquiz', label: 'Short Quiz' },
					{ link: moderatorTags, value: 'tags', label: 'Tags' },
				]); */
		}
		return () => (isMounted = false);
	}, [user.role]);

	const TabsArray = useMemo(() => {
		return tabs.map((item) => (
			<Tab component={Link} to={item.link} value={item.value} label={item.label} />
		));
	}, [tabs]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${
					user.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)
				} Panel - BD-Jobs`}</title>
			</Helmet>
			<Tabs
				value={activeTab}
				indicatorColor='primary'
				variant='scrollable'
				scrollButtons='auto'
				aria-label='Profile tabs'>
				{TabsArray}
				{/* <Tab component={Link} to={moderatorCourses} value='courses' label='Courses' />

				<Tab component={Link} to={moderatorPDFBooks} value='pdfbooks' label='PDF Books' />

				<Tab
					component={Link}
					to={moderatorQuestionBank}
					value='questionbank'
					label='Question Bank'
				/>

				<Tab component={Link} to={moderatorTutorials} value='tutorials' label='Tutorials' />

				<Tab
					component={Link}
					to={moderatorJobCircular}
					value='jobcircular'
					label='Job Circular'
				/>

				<Tab
					component={Link}
					to={moderatorShortQuiz}
					value='shortquiz'
					label='Short Quiz'
				/>

				<Tab component={Link} to={moderatorTags} value='tags' label='Tags' />

				<Tab component={Link} to={moderatorUsers} value='users' label='Manage users' /> */}
			</Tabs>
			<Divider />
			<Switch>
				{/* <Route path={moderatorCourses} component={Courses} /> */}
				{/* <Route path={moderatorJobCircular} component={JobCircular} /> */}
				<Route path={moderatorPDFBooks} component={PdfBooks} />
				<Route path={moderatorQuestionBank} component={QuestionBank} />
				<Route path={moderatorShortQuiz} component={ShortQuiz} />
				{/* <Route path={moderatorTutorials} component={Tutorials} /> */}
				{/* <Route path={moderatorTags} component={Tags} /> */}
				{/* <Route path={moderatorUsers} component={Users} /> */}
				<Redirect from={moderator} to={moderatorPDFBooks} />
			</Switch>
		</React.Fragment>
	);
}
