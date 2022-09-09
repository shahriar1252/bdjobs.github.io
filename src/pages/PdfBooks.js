import React, { useContext, useEffect, useMemo, useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import axiosInstance from '../utils/axiosInstance';
import AlertContext from '../config/AlertContext';
import handleAxiosErrors from '../utils/axiosErrorHandler';

import DialogIFrameViewer from '../components/DialogIFrameViewer';
import { backend } from '../utils/fixedRoutes';

export default function QuestionBank() {
	const { setAlertMessage, setAlertSeverity } = useContext(AlertContext);

	const [books, setBooks] = useState([]);

	const [search, setSearch] = useState('');

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			axiosInstance({
				method: 'get',
				url: `/books?search=${search}&sort=subject`,
			})
				.then(function (response) {
					setBooks(response.data.data);
				})
				.catch(function (error) {
					handleAxiosErrors(error, setAlertMessage, setAlertSeverity);
				});
		}
		return () => (isMounted = false);
	}, [search]);

	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);
	const [iFrameDownloadLink, setIFrameDownloadLink] = useState(false);

	const handleLinkOpen = (title, fileID) => {
		setIFrameTitle(title);
		setIFrameLink(`https://drive.google.com/file/d/${fileID}/preview`);
		setIFrameDownloadLink(`https://drive.google.com/uc?id=${fileID}&export=download`);
		setIFrameDialogIsOpen(true);
	};

	const classes = useStyles();

	const BooksArray = useMemo(() => {
		if (books && books.length > 0) {
			return books.map((item) => {
				return (
					<Card key={item._id} variant='outlined' className={classes.cardContainer}>
						<CardActionArea onClick={() => handleLinkOpen(item.title, item.driveId)}>
							<CardMedia
								image={`${backend}${item.photo}`}
								title='Cover Image'
								className={classes.cardImage}
							/>

							<div className={classes.cardContent}>
								<Typography
									variant='body1'
									color='textPrimary'
									display='block'
									className={classes.lineClamp2}>
									{item.title}
								</Typography>

								<Typography
									variant='subtitle2'
									color='textSecondary'
									display='block'
									className={classes.lineClamp1}>
									{item.authorName}
								</Typography>

								<Typography
									variant='body2'
									color='textSecondary'
									display='block'
									className={classes.lineClamp1}>
									{item.subject}
								</Typography>
							</div>
						</CardActionArea>
					</Card>
				);
			});
		}

		return <Paper className={classes.emptyPlaceholder}>No Items</Paper>;
	}, [books, classes]);

	return (
		<React.Fragment>
			<Container maxWidth='xl'>
				<div className={classes.searchBarContainer}>
					<TextField
						onChange={(event) => {
							if (!event.target.value) setSearch('');
						}}
						onKeyPress={(event) => {
							if (event.key === ' ' || event.key === 'Enter')
								setSearch(event.target.value.trim());
						}}
						label='Search by title'
						variant='outlined'
						margin='dense'
						fullWidth
						className={classes.searchBar}
					/>
				</div>

				<div className={classes.arrayContainer}>{BooksArray}</div>
			</Container>

			<DialogIFrameViewer
				title={iFrameTitle}
				link={iFrameLink}
				downloadLink={iFrameDownloadLink}
				iFrameDialogIsOpen={iFrameDialogIsOpen}
				setIFrameDialogIsOpen={setIFrameDialogIsOpen}
			/>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 1200,
		margin: '0px auto',
		padding: theme.spacing(1, 2, 3, 2),
	},
	arrayContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	searchBarContainer: {
		padding: theme.spacing(1, 0),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBar: {
		maxWidth: 400,
	},
	addButton: {
		minWidth: 96,
		margin: theme.spacing(2, 0),
	},
	cardContainer: {
		width: 240,
		margin: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			margin: theme.spacing(1.25, 0),
		},
	},
	cardImage: {
		height: 260,
	},
	cardContent: {
		minHeight: 110,
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1.25),
		[theme.breakpoints.down('xs')]: {
			minHeight: 0,
		},
	},
	lineClamp1: {
		marginTop: 'auto',
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '1',
	},
	lineClamp2: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineClamp: '2',
	},
	editButton: {
		margin: '0px auto',
	},
	coverImage: {
		width: 140,
		height: 180,
		margin: '0px auto 16px auto',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		borderRadius: theme.shape.borderRadius,
	},
	addPhotoIcon: {
		padding: 4,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
		boxShadow: theme.shadows[2],
	},
	removePhotoIcon: {
		padding: 4,
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '50%',
		boxShadow: theme.shadows[2],
	},
	emptyPlaceholder: {
		width: '100%',
		minHeight: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	marginBottom: {
		margin: theme.spacing(0, 0, 2, 0),
	},
}));

/* 
import React, { useState } from 'react';
//Material UI Core
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//React helmet
import { Helmet } from 'react-helmet';
//Custom components
import DialogIFrameViewer from '../components/DialogIFrameViewer';

export default function PdfBooks() {
	const jobPdfBooks = [
		{
			title: 'MP3-BANGLA',
			fileID: '1RCLhZS3I00UWhrPk30WOXgPFeOena42P',
		},
		{
			title: 'DIGEST BANGLA LITERATURE',
			fileID: '1jcYF0gpHkB-JxVIgnfnpISUSqJvFdmR_',
		},

		{
			title: 'KHAIRUL BASIC MATH',
			fileID: '1VQbImmY_si48x46KtEw3cRitZOJipvRD',
		},
		{
			title: 'SAIFURS MATH',
			fileID: '1JTDIhSNvXzxwGzby38bx4FvigGZuR9-P',
		},
		{
			title: 'ORACLE MATH',
			fileID: '1pObLnqc-KJWbUf3KAMMiI7cfxr_aZvcR',
		},
		{
			title: 'WORD SMART 1-2',
			fileID: '1XWJzPC0DHL6OZIQWS-dEvcLo1B6ebLoX',
		},
		{
			title: 'Emailing MP3 Geography, Environment & Disaster Management',
			fileID: '1CPjzfkjoriDQJZPeLCpVgw_s1CME_YeD',
		},
		{
			title: 'PROFESSORS BANGLA',
			fileID: '1eNjEd-lGgG7mR2XzcjJ-bBY24zvFowQA',
		},
		{
			title: 'ORACLE MENTAL ABILITY',
			fileID: '1PRfqf2894Rq3p0l3bliak00SqJs7vymx',
		},
		{
			title: 'NSI নিয়োগ গাইড ',
			fileID: '1Mlck81LuegPdSL7r7xyoHDfC7F434Nab',
		},
	];
	const [iFrameDialogIsOpen, setIFrameDialogIsOpen] = useState(false);
	const [iFrameTitle, setIFrameTitle] = useState(false);
	const [iFrameLink, setIFrameLink] = useState(false);
	const [iFrameDownloadLink, setIFrameDownloadLink] = useState(false);
	const handleLinkOpen = (title, fileID) => {
		setIFrameTitle(title);
		setIFrameLink(`https://drive.google.com/file/d/${fileID}/preview`);
		setIFrameDownloadLink(`https://drive.google.com/uc?id=${fileID}&export=download`);
		setIFrameDialogIsOpen(true);
	};
	const booksArrays = jobPdfBooks.map((book) => {
		return (
			<Card variant='outlined' style={{ margin: 12, width: 240 }} key={book.fileID}>
				<CardActionArea onClick={() => handleLinkOpen(book.title, book.fileID)}>
					<CardMedia
						image={`${process.env.PUBLIC_URL}/assets/images/job-search.jpg`}
						title='Cover Image'
						style={{ height: 200 }}
					/>
					<CardContent>
						<Typography variant='subtitle1' color='textPrimary'>
							{book.title}
						</Typography>
						<Typography variant='subtitle2' color='textSecondary'>
							Job Preparation
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	});
	return (
		<React.Fragment>
			<Helmet>
				<title>{`PDF Books - BD-Jobs`}</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				{booksArrays}
			</div>
			<DialogIFrameViewer
				title={iFrameTitle}
				link={iFrameLink}
				downloadLink={iFrameDownloadLink}
				iFrameDialogIsOpen={iFrameDialogIsOpen}
				setIFrameDialogIsOpen={setIFrameDialogIsOpen}
			/>
		</React.Fragment>
	);
}
 */
