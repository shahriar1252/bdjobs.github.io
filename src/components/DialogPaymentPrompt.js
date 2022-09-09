import React from 'react';
//Material UI core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//Material UI Icons

export default function DialogPaymentPrompt({
	title,
	link,
	price,
	isPaymentDialogOpen,
	setIsPaymentDialogOpen,
}) {
	const theme = useTheme();
	const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleIFrameDialogClose = () => {
		setIsPaymentDialogOpen(false);
	};

	return (
		<Dialog
			open={isPaymentDialogOpen}
			onClose={handleIFrameDialogClose}
			maxWidth='lg'
			fullWidth
			aria-labelledby='payment-dialog-title'>
			<DialogTitle id='payment-dialog-title'>Proceed to payment</DialogTitle>

			<DialogContent dividers>
				<Typography variant='body1'>Your are about to pay for</Typography>

				<Typography variant='h6' gutterBottom>
					{title}
				</Typography>

				<Typography variant='h5' color='primary' gutterBottom>
					Price : {price}
				</Typography>

				<div
					style={{
						backgroundColor: theme.palette.grey[100],
						borderRadius: theme.shape.borderRadius,
						overflow: 'hidden',
						minHeight: 400,
					}}>
					<img
						alt='SSLCommerz'
						src={
							matchesMobile
								? 'https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-04.png'
								: 'https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-05.png'
						}
						style={{ width: '100%' }}
					/>
				</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleIFrameDialogClose} color='secondary'>
					Cancel
				</Button>
				<Button
					component='a'
					href={link}
					rel='noopener noreferrer'
					color='primary'
					variant='outlined'
					endIcon={<NavigateNextIcon />}
					autoFocus>
					Go to payment page
				</Button>
			</DialogActions>
		</Dialog>
	);
}
