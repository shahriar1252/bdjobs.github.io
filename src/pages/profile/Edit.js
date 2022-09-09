import React, { useContext, useEffect, useState } from 'react';
//Material UI core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormData from 'form-data';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmail from 'validator/lib/isEmail';

import UserContext from '../../config/UserContext';
import AlertContext from '../../config/AlertContext';
import axiosInstance from '../../utils/axiosInstance';
import handleAxiosErrors from '../../utils/axiosErrorHandler';
import { encrypt } from '../../utils/myCrypt';

export default function ProfileEdit() {
	const data = new FormData();
	const classes = useStyles();

	const { user } = useContext(UserContext);
	const { alertMessage, setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [photo, setPhoto] = useState('');
	const [gender, setGender] = useState(user.gender);
	const [birthDate, setBirthDate] = useState(user.birthDate);

	const [fullName, setFullName] = useState(user.fullName);
	const [fullNameError, setFullNameError] = useState('');

	const [isNameValidating, setIsNameValidating] = useState(false);
	const [isNameValidated, setIsNameValidated] = useState(false);

	const [phone, setPhone] = useState(user.phone);
	const [phoneError, setPhoneError] = useState('');

	const [isPhoneValidating, setIsPhoneValidating] = useState(false);
	const [isPhoneValidated, setIsPhoneValidated] = useState(false);

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [isEmailValidating, setIsEmailValidating] = useState(false);
	const [isEmailValidated, setIsEmailValidated] = useState(false);

	const [passCurrent, setPassCurrent] = useState('');
	const [passCurrentError, setPassCurrentError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [passConfirm, setPassConfirm] = useState('');
	const [passConfirmError, setPassConfirmError] = useState('');

	const [isPassValidating, setIsPassValidating] = useState(false);
	const [isPassValidated, setIsPassValidated] = useState(false);

	const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
	const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const genders = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
		{ value: 'other', label: 'Other' },
		{ value: 'unknown', label: 'Undisclosed' },
	];

	useEffect(() => {
		setFullName(user.fullName);
		setGender(user.gender);
		setBirthDate(user.birthDate);
		setPhone(user.phone);
	}, [user]);

	useEffect(() => {
		if (fullName) setIsNameValidating(true);

		if (isNameValidating) {
			if (fullName.length < 4) setFullNameError('Too short');
			else if (fullName.length > 50) setFullNameError('Too long');
			else setFullNameError('');

			if (fullNameError) setIsNameValidated(false);
			else setIsNameValidated(true);
		}
	}, [isNameValidating, fullName, fullNameError]);

	useEffect(() => {
		if (phone) setIsPhoneValidating(true);

		if (isPhoneValidating) {
			if (phone.length !== 14) setPhoneError('Invalid phone number');
			else setPhoneError('');

			if (phoneError) setIsPhoneValidated(false);
			else setIsPhoneValidated(true);
		}
	}, [isPhoneValidating, phone, phoneError]);

	useEffect(() => {
		if (email && password) setIsEmailValidating(true);

		if (isEmailValidating) {
			if (!isEmail(email)) setEmailError('Invalid email');
			else setEmailError('');

			if (!isStrongPassword(password)) setPasswordError('Too weak');
			else setPasswordError('');

			if (!passwordError && !emailError) setIsEmailValidated(true);
			else setIsEmailValidated(false);
		}
	}, [isEmailValidating, email, password, emailError, passwordError]);

	useEffect(() => {
		if (passCurrent && password && passConfirm) setIsPassValidating(true);

		if (isPassValidating) {
			if (!isStrongPassword(passCurrent)) setPassCurrentError('Too weak');
			else setPassCurrentError('');

			if (!isStrongPassword(password)) setPasswordError('Too weak');
			else setPasswordError('');

			if (passConfirm !== password) setPassConfirmError('Not matching');
			else setPassConfirmError('');

			if (!passwordError && !passConfirmError && !passCurrentError) setIsPassValidated(true);
			else setIsPassValidated(false);
		}
	}, [
		isPassValidating,
		passCurrent,
		password,
		passConfirm,
		passCurrentError,
		passwordError,
		passConfirmError,
	]);

	const handleDialogClose = () => {
		setIsPassDialogOpen(false);
		setIsEmailDialogOpen(false);
		setIsDeleteDialogOpen(false);

		setEmail('');
		setPassword('');
		setPassConfirm('');

		setEmailError('');
		setPassCurrentError('');
		setPasswordError('');
		setPassConfirmError('');

		setIsPassValidating(false);
		setIsPassValidated(false);

		setIsEmailValidating(false);
		setIsEmailValidated(false);
	};

	const handleProfileSave = (event) => {
		event.preventDefault();

		setIsNameValidating(true);

		if (isNameValidated && isPhoneValidated) {
			setAlertSeverity('info');
			setAlertMessage('Loading...');

			data.append('fullName', fullName);
			if (photo) data.append('photo', photo);
			if (gender) data.append('gender', gender);
			if (birthDate) data.append('birthDate', birthDate);
			if (phone) data.append('phone', phone);

			const config = {
				method: 'patch',
				url: '/users/update',
				data: data,
			};

			axiosInstance(config)
				.then(function (response) {
					setAlertSeverity('success');
					setAlertMessage('Updated successfully');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
	};

	const handleEmailSave = (event) => {
		event.preventDefault();

		setIsEmailValidating(true);

		if (isEmailValidated) {
			setAlertSeverity('info');
			setAlertMessage('Loading...');

			const data = JSON.stringify({
				email: email,
				password: password,
			});

			const config = {
				method: 'patch',
				url: '/users/update-email',
				headers: { 'Content-Type': 'application/json' },
				data: data,
			};

			axiosInstance(config)
				.then(function (response) {
					encrypt(response.data.token);
					setAlertSeverity('success');
					setAlertMessage('Updated successfully. Logging in...');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});

			handleDialogClose();
		}
	};

	const handlePasswordSave = (event) => {
		event.preventDefault();

		setIsPassValidating(true);

		if (isPassValidated) {
			setAlertSeverity('info');
			setAlertMessage('Loading...');

			const data = JSON.stringify({
				passwordCurrent: passCurrent,
				password: password,
				passwordConfirm: passConfirm,
			});

			const config = {
				method: 'patch',
				url: '/users/update-password',
				headers: { 'Content-Type': 'application/json' },
				data: data,
			};

			axiosInstance(config)
				.then(function (response) {
					encrypt(response.data.token);
					setAlertSeverity('success');
					setAlertMessage('Updated successfully. Logging in...');
					window.location.reload();
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});

			handleDialogClose();
		}
	};

	const handleDelete = () => {
		const config = {
			method: 'delete',
			url: '/users/delete',
		};

		axiosInstance(config)
			.then(function (response) {
				setAlertSeverity('success');
				setAlertMessage('Updated successfully');
				localStorage.setItem('stream', '');
				window.location.reload();
			})
			.catch(function (error) {
				handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
			});

		handleDialogClose();
	};

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Grid container alignItems='center' spacing={3}>
					<Grid item xs={12} md={8}>
						<div className={classes.avatarContainer}>
							<Avatar
								alt={user.fullName}
								src={user.photo}
								className={classes.avatarLarge}
							/>

							<div>
								<input
									onChange={(event) => setPhoto(event.target.files[0])}
									id='edit-user-photo'
									name='photo'
									type='file'
									accept='image/png, image/jpeg'
									className={classes.imgInput}
								/>

								<Button
									component='label'
									htmlFor='edit-user-photo'
									variant='outlined'
									color='primary'
									size='small'
									startIcon={<AddAPhotoIcon />}>
									Pick a photo
								</Button>

								{photo ? (
									<Typography
										variant='subtitle2'
										display='block'
										gutterBottom
										className={classes.marginTop}>
										{photo.name}
									</Typography>
								) : undefined}
							</div>
						</div>

						<TextField
							onChange={(event) => setFullName(event.target.value)}
							defaultValue={user.fullName}
							placeholder={user.fullName}
							helperText={fullNameError}
							error={Boolean(fullNameError)}
							label='Full Name'
							type='name'
							name='fullName'
							id='edit-user-name'
							variant='outlined'
							margin='dense'
							fullWidth
							className={classes.marginTop}
						/>

						<TextField
							onChange={(event) =>
								setPhone(`+880${event.target.value.replace('+880', '')}`)
							}
							value={phone}
							placeholder={user.phone}
							helperText={phoneError}
							error={Boolean(phoneError)}
							label='Phone'
							type='name'
							name='phone'
							id='edit-phone-number'
							variant='outlined'
							margin='dense'
							fullWidth
							className={classes.marginTop}
						/>

						<TextField
							onChange={(event) => setGender(event.target.value)}
							value={gender}
							label='Gender'
							select
							name='gender'
							id='edit-user-gender'
							variant='outlined'
							margin='dense'
							fullWidth
							className={classes.marginTop}>
							{genders.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								onChange={(date) => setBirthDate(date)}
								value={birthDate}
								margin='dense'
								id='edit-user-date-picker-dialog'
								label='Birth Date'
								format='dd/MM/yyyy'
								variant='inline'
								inputVariant='outlined'
								fullWidth
								disableFuture
								KeyboardButtonProps={{
									'aria-label': 'change birth date',
								}}
								className={classes.marginTop}
							/>
						</MuiPickersUtilsProvider>

						<Button
							onClick={(event) => handleProfileSave(event)}
							disabled={alertMessage === 'Loading...'}
							variant='contained'
							color='primary'
							fullWidth
							type='submit'
							className={classes.marginTop}>
							Save
						</Button>
					</Grid>

					<Grid item xs={12} md={4}>
						<Button
							onClick={() => setIsEmailDialogOpen(true)}
							variant='outlined'
							color='primary'
							fullWidth>
							Change email
						</Button>

						<Button
							onClick={() => setIsPassDialogOpen(true)}
							variant='outlined'
							color='primary'
							fullWidth
							className={classes.marginTop}>
							Change password
						</Button>

						<Button
							onClick={() => setIsDeleteDialogOpen(true)}
							variant='outlined'
							color='secondary'
							fullWidth
							className={classes.marginTop}>
							Delete account
						</Button>
					</Grid>
				</Grid>
			</div>

			<Dialog
				open={isEmailDialogOpen || isPassDialogOpen || isDeleteDialogOpen}
				onClose={handleDialogClose}
				aria-labelledby='edit-profile-dialog-title'
				maxWidth='xs'
				fullWidth>
				<DialogTitle id='edit-profile-dialog-title'>
					{isEmailDialogOpen ? 'Change email' : undefined}
					{isPassDialogOpen ? 'Change password' : undefined}
					{isDeleteDialogOpen ? 'Delete account' : undefined}
				</DialogTitle>

				<DialogContent dividers>
					{isEmailDialogOpen
						? [
								<TextField
									onChange={(event) => setEmail(event.target.value)}
									helperText={emailError}
									error={Boolean(emailError)}
									placeholder={user.email}
									label='New Email'
									type='email'
									name='email'
									id='signup-password-current'
									required
									variant='outlined'
									margin='dense'
									fullWidth
									className={classes.marginBottom}
								/>,

								<TextField
									onChange={(event) => setPassword(event.target.value)}
									helperText={passwordError}
									error={Boolean(passwordError)}
									label='Password'
									type='password'
									name='password'
									id='signup-password'
									required
									variant='outlined'
									margin='dense'
									fullWidth
									className={classes.marginBottom}
								/>,
						  ]
						: undefined}

					{isPassDialogOpen
						? [
								<TextField
									onChange={(event) => setPassCurrent(event.target.value)}
									helperText={passCurrentError}
									error={Boolean(passCurrentError)}
									label='Current Password'
									type='password'
									name='passwordCurrent'
									id='signup-password-current'
									required
									variant='outlined'
									margin='dense'
									fullWidth
									className={classes.marginBottom}
								/>,

								<TextField
									onChange={(event) => setPassword(event.target.value)}
									helperText={passwordError}
									error={Boolean(passwordError)}
									label='New Password'
									type='password'
									name='signup-password'
									id='signup-password'
									required
									variant='outlined'
									margin='dense'
									fullWidth
									className={classes.marginBottom}
								/>,

								<TextField
									onChange={(event) => setPassConfirm(event.target.value)}
									helperText={passConfirmError}
									error={Boolean(passConfirmError)}
									label='Confirm New Password'
									type='password'
									name='confirmPassword'
									id='signup-confirm-password'
									required
									variant='outlined'
									margin='dense'
									fullWidth
									className={classes.marginBottom}
								/>,
						  ]
						: undefined}

					{!isDeleteDialogOpen ? (
						<Typography variant='subtitle2' color='textSecondary' align='center'>
							You will be logged out from other sessions
						</Typography>
					) : undefined}

					{isDeleteDialogOpen
						? [
								<Typography variant='body1'>
									Are you sure you want to delete your account?
								</Typography>,

								<Typography variant='body1' color='secondary'>
									This cannot be undone.
								</Typography>,
						  ]
						: undefined}
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleDialogClose}
						color={isDeleteDialogOpen ? 'primary' : 'secondary'}
						autoFocus>
						Cancel
					</Button>

					{isEmailDialogOpen ? (
						<Button onClick={handleEmailSave} color='primary'>
							Save email
						</Button>
					) : undefined}

					{isPassDialogOpen ? (
						<Button onClick={handlePasswordSave} color='primary'>
							Save password
						</Button>
					) : undefined}

					{isDeleteDialogOpen ? (
						<Button onClick={handleDelete} color='secondary'>
							Delete account
						</Button>
					) : undefined}
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 768,
		padding: theme.spacing(2),
		margin: '0px auto',
		[theme.breakpoints.down('sm')]: {
			maxWidth: 480,
		},
	},
	avatarContainer: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		margin: theme.spacing(0, 0, 1, 0),
	},
	avatarLarge: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: theme.spacing(0, 2, 1, 0),
	},
	imgInput: {
		display: 'none',
	},
	marginTop: {
		margin: theme.spacing(2, 0, 0, 0),
	},
	marginBottom: {
		margin: theme.spacing(0, 0, 2, 0),
	},
}));
