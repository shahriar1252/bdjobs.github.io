import { Typography } from '@material-ui/core';
import React from 'react';
//React helmet
import { Helmet } from 'react-helmet';
export default function PrivacyPolicy() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{`Privacy and Policy - BD-Jobs`}</title>
			</Helmet>
			<Typography variant='h2' color='textPrimary' display='block' gutterBottom>
				Privacy and Policy
			</Typography>
		</React.Fragment>
	);
}
