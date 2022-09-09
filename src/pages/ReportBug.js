import { Typography } from '@material-ui/core';
import React from 'react';
//React helmet
import { Helmet } from 'react-helmet';
export default function ReportProblem() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{`Report a Problem - BD-Jobs`}</title>
			</Helmet>
			<Typography variant='h2' color='textPrimary' display='block' gutterBottom>
				Report a Problem
			</Typography>
		</React.Fragment>
	);
}
