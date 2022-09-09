import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import ViewBlog from './ViewBlog';
import { blogs, blogCreate, blogEdit, blogView } from '../../utils/fixedRoutes';
export default function Blogs() {
	return (
		<React.Fragment>
			<Switch>
				<Route path={blogCreate} component={CreateBlog} />
				<Route path={blogEdit} component={EditBlog} />
				<Route path={blogView} component={ViewBlog} />
				<Route path={blogs} component={AllBlogs} />
			</Switch>
		</React.Fragment>
	);
}
