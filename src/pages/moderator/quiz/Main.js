import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllQuizzes from './AllQuizzes';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz';
import { moderatorShortQuiz } from '../../../utils/fixedRoutes';
export default function ShortQuiz() {
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${moderatorShortQuiz}/create`} component={CreateQuiz} />
				<Route path={`${moderatorShortQuiz}/edit`} component={EditQuiz} />
				<Route path={moderatorShortQuiz} component={AllQuizzes} />
			</Switch>
		</React.Fragment>
	);
}
