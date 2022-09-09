import { Typography } from '@material-ui/core';
import React from 'react';
//React helmet
import { Helmet } from 'react-helmet';
export default function BecomeInstructor() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{`Become an Instructor - BD-Jobs`}</title>
			</Helmet>
			<Typography variant='h2' color='textPrimary' display='block' gutterBottom>
				Become an Instructor
			</Typography>
		</React.Fragment>
	);
}
