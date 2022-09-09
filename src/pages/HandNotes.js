import React from 'react';
//React helmet
import { Helmet } from 'react-helmet';
//Custom Components
import CardNoteBlog from '../components/CardNoteBlog';
export default function HandNotes() {
	const notes = [
		{
			title: 'React notes 1',
			description: 'This note contains the Useful react cheat sheets and documentation links',
			tags: ['JavaScript', 'React'],
			author: 'Anisuzzaman Shayak',
			date: '15/07/2021',
			id: '/handnotes/note1',
			cover: `${process.env.PUBLIC_URL}/assets/images/install-pwa-android.png`,
		},
		{
			title: 'React notes 2',
			description: 'This note contains the Useful react cheat sheets and documentation links',
			tags: ['JavaScript', 'React'],
			author: 'Anisuzzaman Shayak',
			date: '15/07/2021',
			id: '/handnotes/note1',
			cover: `${process.env.PUBLIC_URL}/assets/images/install-pwa-desktop-urlbar.jpg`,
		},
		{
			title: 'React notes 3',
			description: 'This note contains the Useful react cheat sheets and documentation links',
			tags: ['JavaScript', 'React'],
			author: 'Anisuzzaman Shayak',
			date: '15/07/2021',
			id: '/handnotes/note1',
			cover: `${process.env.PUBLIC_URL}/assets/images/install-pwa-desktop-menu.jpg`,
		},
		{
			title: 'React notes 4',
			description: 'This note contains the Useful react cheat sheets and documentation links',
			tags: ['JavaScript', 'React'],
			author: 'Anisuzzaman Shayak',
			date: '15/07/2021',
			id: '/handnotes/note1',
			cover: `${process.env.PUBLIC_URL}/assets/images/install-pwa-ios.png`,
		},
	];
	const notesArray = notes.map((note) => {
		return (
			<CardNoteBlog
				title={note.title}
				description={note.description}
				tags={note.tags}
				author={note.author}
				date={note.date}
				id={note.id}
				cover={note.cover}
				key={note.id}
			/>
		);
	});
	return (
		<React.Fragment>
			<Helmet>
				<title>{`Hand Notes - BD-Jobs`}</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				{notesArray}
			</div>
		</React.Fragment>
	);
}
