import React, { useState } from 'react';
//Material UI core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const ThemeChangerDialog = ({
	background,
	primary,
	secondary,
	isThemeChangerOpen,
	setIsThemeChangerOpen,
	setThemeChoice,
}) => {
	const classes = useStyles();

	const [backgroundSelected, setBackgroundSelected] = useState(background);
	const [primarySelected, setPrimarySelected] = useState(primary);
	const [secondarySelected, setSecondarySelected] = useState(secondary);

	const handleBackgroundChange = (event) => {
		setBackgroundSelected(event.target.value);
	};
	const handlePrimaryChange = (event) => {
		setPrimarySelected(event.target.value);
	};
	const handleSecondaryChange = (event) => {
		setSecondarySelected(event.target.value);
	};

	const handleCloseThemeDialog = () => {
		setBackgroundSelected(background);
		setPrimarySelected(primary);
		setSecondarySelected(secondary);
		setIsThemeChangerOpen(false);
	};
	const handleSaveThemeDialog = () => {
		setThemeChoice({
			background: backgroundSelected,
			primary: primarySelected,
			secondary: secondarySelected,
		});
		setIsThemeChangerOpen(false);
	};

	return (
		<Dialog
			open={isThemeChangerOpen}
			onClose={handleCloseThemeDialog}
			aria-labelledby='theme-selector-dialog-title'
			maxWidth='xs'>
			<DialogTitle id='theme-selector-dialog-title'>Select colors for theme</DialogTitle>

			<Divider />

			<div className={classes.themeDialogContent}>
				<Typography className={classes.themeDialogSubtitle} variant='subtitle2'>
					Background Color
				</Typography>

				<div className={classes.themeDialogRadioContainer}>
					<input
						type='radio'
						id='radio-background-auto'
						value='auto'
						checked={backgroundSelected === 'auto'}
						onChange={handleBackgroundChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-background-auto'
						className={classes.themeDialogRadioLabel}>
						Auto
					</Button>

					<input
						type='radio'
						id='radio-background-light'
						value='light'
						checked={backgroundSelected === 'light'}
						onChange={handleBackgroundChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-background-light'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#fff', color: '#000' }}>
						Light
					</Button>

					<input
						type='radio'
						id='radio-background-dark'
						value='dark'
						checked={backgroundSelected === 'dark'}
						onChange={handleBackgroundChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-background-dark'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#35363a', color: '#fff' }}>
						Dark
					</Button>
				</div>

				<Divider className={classes.themeDialogDivider} />

				<Typography className={classes.themeDialogSubtitle} variant='subtitle2'>
					Primary Color
				</Typography>

				<div className={classes.themeDialogRadioContainer}>
					<input
						type='radio'
						id='radio-primary-blue'
						value='blue'
						checked={primarySelected === 'blue'}
						onChange={handlePrimaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-primary-blue'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#039be5', color: '#fff' }}>
						Blue
					</Button>

					<input
						type='radio'
						id='radio-primary-green'
						value='green'
						checked={primarySelected === 'green'}
						onChange={handlePrimaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-primary-green'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#43a047', color: '#fff' }}>
						Green
					</Button>

					<input
						type='radio'
						id='radio-primary-violet'
						value='violet'
						checked={primarySelected === 'violet'}
						onChange={handlePrimaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-primary-violet'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#812fed', color: '#fff' }}>
						Violet
					</Button>
				</div>

				<Divider className={classes.themeDialogDivider} />

				<Typography className={classes.themeDialogSubtitle} variant='subtitle2'>
					Secondary Color
				</Typography>

				<div className={classes.themeDialogRadioContainer}>
					<input
						type='radio'
						id='radio-secondary-amber'
						value='amber'
						checked={secondarySelected === 'amber'}
						onChange={handleSecondaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-secondary-amber'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#f57c00', color: '#fff' }}>
						Amber
					</Button>

					<input
						type='radio'
						id='radio-secondary-orange'
						value='orange'
						checked={secondarySelected === 'orange'}
						onChange={handleSecondaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-secondary-orange'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#f4511e', color: '#fff' }}>
						Orange
					</Button>

					<input
						type='radio'
						id='radio-secondary-pink'
						value='pink'
						checked={secondarySelected === 'pink'}
						onChange={handleSecondaryChange}
						className={classes.themeDialogRadioButton}
					/>
					<Button
						component='label'
						htmlFor='radio-secondary-pink'
						className={classes.themeDialogRadioLabel}
						style={{ backgroundColor: '#f1436e', color: '#fff' }}>
						Pink
					</Button>
				</div>
			</div>

			<Divider />

			<DialogActions>
				<Button onClick={handleCloseThemeDialog} color='secondary'>
					Cancel
				</Button>
				<Button onClick={handleSaveThemeDialog} color='primary' autoFocus>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const useStyles = makeStyles((theme) => ({
	themeDialogContent: {
		padding: theme.spacing(1, 2, 2),
		overflow: 'auto',
	},
	themeDialogSubtitle: {
		textAlign: 'center',
		margin: theme.spacing(0, 0, 1),
	},
	themeDialogRadioContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	themeDialogRadioButton: {
		display: 'none',
		'&:checked+label': {
			boxShadow: `0px 0px 0px 2px ${theme.palette.text.disabled} inset, 0px 0px 0px 3px ${theme.palette.background.paper}, 0px 0px 0px 6px ${theme.palette.primary.main}`,
		},
	},
	themeDialogRadioLabel: {
		minWidth: 68,
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		textAlign: 'center',
		textTransform: 'none',
		fontWeight: 'normal',
		cursor: 'pointer',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		boxShadow: `0px 0px 0px 2px ${theme.palette.text.disabled} inset`,
		'&:hover': {
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
		},
	},
	themeDialogDivider: {
		margin: theme.spacing(1, 0),
	},
}));

export default ThemeChangerDialog;
