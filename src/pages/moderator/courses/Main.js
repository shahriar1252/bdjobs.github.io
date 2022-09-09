import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllCourses from './AllCourses';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';
import { moderatorCourses } from '../../../utils/fixedRoutes';
export default function Courses() {
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${moderatorCourses}/create`} component={CreateCourse} />
				<Route path={`${moderatorCourses}/edit`} component={EditCourse} />
				<Route path={moderatorCourses} component={AllCourses} />
			</Switch>
		</React.Fragment>
	);
}
