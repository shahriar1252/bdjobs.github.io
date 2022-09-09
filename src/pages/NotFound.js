import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PageIcon from '@material-ui/icons/ErrorOutline';
//React helmet
import { Helmet } from 'react-helmet';
export default function NotFound() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{`404 Not Found`}</title>
			</Helmet>
			<Box
				m={3}
				p={3}
				height={300}
				bgcolor='background.paper'
				color='text.disabled'
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'>
				<PageIcon fontSize='large' />
				<Typography align='center' variant='h5'>
					Page Not Found
				</Typography>
				<Typography align='center' variant='body1'>
					This URL does not exist.
				</Typography>
			</Box>
		</React.Fragment>
	);
}
