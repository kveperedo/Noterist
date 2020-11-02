import React from 'react';
import NoteList from './NoteList';
import NoteContent from './NoteContent';

import '../../styles/Notes.scss';

const Notes = (props) => {
	const { selectedNotes } = props;
	return (
		<div className="notes">
			<NoteList />
			<NoteContent selectedNotes={selectedNotes} />
		</div>
	);
};

export default Notes;
