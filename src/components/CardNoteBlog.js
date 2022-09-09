import React from 'react';
//Material UI Core
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { blogView } from '../utils/fixedRoutes';

const NoteBlogCard = ({ title, subject, banner, author, likes, dislikes, updatedAt, id }) => {
	const classes = useStyles();

	return (
		<Card variant='outlined' className={classes.noteBlogCardContainer}>
			<CardActionArea component={Link} to={`${blogView}/${id}`}>
				<CardContent className={classes.noteBlogCardTitleContainer}>
					<Typography
						variant='body1'
						color='textPrimary'
						display='block'
						gutterBottom
						className={classes.noteBlogCardTitle}>
						{title}
					</Typography>

					<Typography variant='subtitle2' color='textSecondary'>
						{subject}
					</Typography>
				</CardContent>

				<CardMedia
					image={banner}
					title='Cover Image'
					className={classes.noteBlogCardMedia}
				/>

				<CardContent>
					<Typography variant='body2' color='textPrimary'>
						by {author}
					</Typography>

					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Typography variant='body2' color='textSecondary'>
							{new Date(updatedAt).toDateString()}
						</Typography>

						<div>
							<Chip
								icon={<ThumbUpAltIcon />}
								label={likes}
								size='small'
								variant='outlined'
								className={classes.noteBlogCardChips}
							/>

							<Chip
								icon={<ThumbDownAltIcon />}
								label={dislikes}
								size='small'
								variant='outlined'
								className={classes.noteBlogCardChips}
							/>
						</div>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	noteBlogCardContainer: {
		width: 256,
		margin: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			margin: theme.spacing(1.25, 0),
		},
	},
	noteBlogCardTitleContainer: {
		minHeight: 107,
		[theme.breakpoints.down('xs')]: {
			minHeight: 0,
		},
	},
	noteBlogCardChips: {
		padding: theme.spacing(0, 0.5),
		margin: theme.spacing(0, 0, 0, 0.5),
	},
	noteBlogCardTitle: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '2',
	},
	noteBlogCardMedia: {
		height: 160,
	},
}));

export default NoteBlogCard;
