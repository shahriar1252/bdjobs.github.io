import React from 'react';
//Material UI Core
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
//Material UI Lab
//import Rating from '@material-ui/lab/Rating';

import { courseOverview, moderatorCourses } from '../utils/fixedRoutes';

const CourseCard = ({ title, subject, author, price, photo, id, edit }) => {
	const classes = useStyles();

	return (
		<Card variant='outlined' className={classes.courseCardContainer}>
			<CardActionArea component={Link} to={`${courseOverview}/${id}`}>
				<CardContent className={classes.courseCardTitleContainer}>
					<Typography
						variant='body1'
						color='textPrimary'
						display='block'
						gutterBottom
						className={classes.courseCardTitle}>
						{title}
					</Typography>

					<Typography variant='subtitle2' color='textSecondary'>
						{subject}
					</Typography>
				</CardContent>

				<CardMedia image={photo} title='Cover Image' className={classes.courseCardMedia} />

				<CardContent>
					<Typography variant='body2' color='textPrimary'>
						by {author}
					</Typography>

					<Typography variant='body1' color='primary'>
						{price === 0 ? 'FREE' : `৳${price}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			{edit ? (
				<CardActions>
					<Button
						component={Link}
						to={`${moderatorCourses}/edit/${id}`}
						size='small'
						variant='outlined'
						startIcon={<EditIcon />}
						style={{ margin: '0px auto' }}>
						edit
					</Button>
				</CardActions>
			) : undefined}
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	courseCardContainer: {
		width: 256,
		margin: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			margin: theme.spacing(1.25, 0),
		},
	},
	courseCardTitleContainer: {
		minHeight: 107,
		[theme.breakpoints.down('xs')]: {
			minHeight: 0,
		},
	},
	courseCardTitle: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '2',
	},
	courseCardMedia: {
		height: 160,
	},
}));

export default CourseCard;
