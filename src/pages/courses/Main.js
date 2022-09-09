import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllCourses from './AllCourses';
import Lessons from './Lessons';
import Overview from './Overview';
import { courses, courseLessons, courseOverview } from '../../utils/fixedRoutes';
export default function Courses() {
	return (
		<React.Fragment>
			<Switch>
				<Route path={courseLessons} component={Lessons} />
				<Route path={courseOverview} component={Overview} />
				<Route path={courses} component={AllCourses} />
			</Switch>
		</React.Fragment>
	);
}
