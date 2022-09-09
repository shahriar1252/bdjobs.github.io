import { Box, Button, Typography, SvgIcon } from '@material-ui/core';
import React from 'react';
//React helmet
import { Helmet } from 'react-helmet';
export default function AboutUs() {
	const dummyText = `A quick brown fox jumped over the lazy dog. 01234 56789 </>,.; ?!&$@ +-=%#* ^~()[] "HI" 'hi'`;
	const dummyTextBangla = `আগুনের শিখা নিভে গিয়েছিল, আর তিনি জানলা দিয়ে তারাদের দিকে তাকালেন৷ ০১২৩৪ ৫৬৭৮৯`;
	return (
		<React.Fragment>
			<Helmet>
				<title>{`About Us - BD-Jobs`}</title>
			</Helmet>
			<Box bgcolor='background.paper' textAlign='center'>
				<img alt='Logo' src={`${process.env.PUBLIC_URL}/assets/icons/icon-128.png`} />
				<img alt='Logo' src={`${process.env.PUBLIC_URL}/assets/icons/icon-72.png`} />
				<img alt='Logo' src={`${process.env.PUBLIC_URL}/assets/icons/icon-36.png`} />
				<img alt='Logo' src={`${process.env.PUBLIC_URL}/assets/icons/icon-32.png`} />
				<SvgIcon fontSize='large' color='primary'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M16 1H8a3 3 0 00-3 3v3.84l1.4-.77V4h11.2v3.05l1.4.77V4a3 3 0 00-3-3zm-5.52 1.4h3V3h-3v-.6zm-1.7.8a.5.5 0 100-1 .5.5 0 000 1zM5 20v-9.64l1.4.76V18h11.2v-2.72H19V20a3 3 0 01-3 3H8a3 3 0 01-3-3zm9 1v-1h-4v1h4z'
					/>
					<path d='M7.54 14.3v-2.55L12 14.18l4.46-2.43v2.55L12 16.73 7.54 14.3z' />
					<path d='M5 9.09l7-3.82 7 3.82v5.1h-1.27v-4.4L12 12.9 5 9.09z' />
				</SvgIcon>
				<SvgIcon fontSize='large' color='secondary'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M16 1H8a3 3 0 00-3 3v3.84l1.4-.77V4h11.2v3.05l1.4.77V4a3 3 0 00-3-3zm-5.52 1.4h3V3h-3v-.6zm-1.7.8a.5.5 0 100-1 .5.5 0 000 1zM5 20v-9.64l1.4.76V18h11.2v-2.72H19V20a3 3 0 01-3 3H8a3 3 0 01-3-3zm9 1v-1h-4v1h4z'
					/>
					<path d='M7.54 14.3v-2.55L12 14.18l4.46-2.43v2.55L12 16.73 7.54 14.3z' />
					<path d='M5 9.09l7-3.82 7 3.82v5.1h-1.27v-4.4L12 12.9 5 9.09z' />
				</SvgIcon>
				<Typography variant='subtitle1' color='secondary' display='block' gutterBottom>
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='subtitle1' color='primary' display='block' gutterBottom>
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
			</Box>
			<Box textAlign='center'>
				<Typography variant='subtitle1' color='secondary' display='block' gutterBottom>
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='subtitle1' color='primary' display='block' gutterBottom>
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Button color='primary' variant='contained'>
					A quick brown fox jumped over the lazy dog
				</Button>
				<Button color='secondary' variant='contained'>
					A quick brown fox jumped over the lazy dog
				</Button>
			</Box>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Box height='50px' width='50px' bgcolor='primary.light' />
				<Box height='50px' width='50px' bgcolor='primary.main' />
				<Box height='50px' width='50px' bgcolor='primary.dark' />
				<Box height='50px' width='50px' bgcolor='secondary.light' />
				<Box height='50px' width='50px' bgcolor='secondary.main' />
				<Box height='50px' width='50px' bgcolor='secondary.dark' />
				<Box height='50px' width='50px' bgcolor='error.light' />
				<Box height='50px' width='50px' bgcolor='error.main' />
				<Box height='50px' width='50px' bgcolor='error.dark' />
				<Box height='50px' width='50px' bgcolor='warning.light' />
				<Box height='50px' width='50px' bgcolor='warning.main' />
				<Box height='50px' width='50px' bgcolor='warning.dark' />
				<Box height='50px' width='50px' bgcolor='info.light' />
				<Box height='50px' width='50px' bgcolor='info.main' />
				<Box height='50px' width='50px' bgcolor='info.dark' />
				<Box height='50px' width='50px' bgcolor='success.light' />
				<Box height='50px' width='50px' bgcolor='success.main' />
				<Box height='50px' width='50px' bgcolor='success.dark' />
			</div>
			<Box bgcolor='text.disabled' p='16px'>
				<Typography variant='h1' color='textPrimary' display='block' gutterBottom>
					h1 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='h2' color='textPrimary' display='block' gutterBottom>
					h2 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='h3' color='textPrimary' display='block' gutterBottom>
					h3 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='h4' color='textPrimary' display='block' gutterBottom>
					h4 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='h5' color='textPrimary' display='block' gutterBottom>
					h5 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='h6' color='textPrimary' display='block' gutterBottom>
					h6 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='subtitle1' color='textPrimary' display='block' gutterBottom>
					subtitle1 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='subtitle2' color='textPrimary' display='block' gutterBottom>
					subtitle2 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='body1' color='textPrimary' display='block' gutterBottom>
					body1 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='body2' color='textPrimary' display='block' gutterBottom>
					body2 <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='caption' color='textPrimary' display='block' gutterBottom>
					caption <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='button' color='textPrimary' display='block' gutterBottom>
					button <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='overline' color='textPrimary' display='block' gutterBottom>
					overline <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='srOnly' color='textPrimary' display='block' gutterBottom>
					srOnly <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
				<Typography variant='inherit' color='textPrimary' display='block' gutterBottom>
					inherit <br />
					{dummyText}
					<br />
					{dummyTextBangla}
				</Typography>
			</Box>
		</React.Fragment>
	);
}
