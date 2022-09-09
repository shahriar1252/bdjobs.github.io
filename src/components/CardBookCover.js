import React from 'react';
//Material UI Core
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const NoteBlogCard = ({ title, author, cover }) => {
	const classes = useStyles();

	return (
		<Card variant='outlined' className={classes.noteBlogCardContainer}>
			<CardActionArea>
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
						className={classes.noteBlogCardSubtitle}></Typography>
				</CardContent>
				<CardMedia
					image={cover}
					title='Cover Image'
					className={classes.noteBlogCardMedia}
				/>
				<CardContent>
					<Typography variant='body2' color='textPrimary'>
						by {author}
					</Typography>
					<Typography variant='subtitle2' color='textSecondary'></Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	noteBlogCardChip: {
		margin: theme.spacing(0, 0.5, 0.5, 0),
	},
	noteBlogCardContainer: {
		width: 160,
		margin: theme.spacing(1.5),
	},
	noteBlogCardSubtitle: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '2',
	},
	noteBlogCardMedia: {
		height: 240,
	},
}));

export default NoteBlogCard;
