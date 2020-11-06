import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import SelectedNoteContext from '../../context/SelectedNoteContext';

import { deleteNote } from '../../features/notesSlice';

import '../../styles/NoteItem.scss';

import selectedIcon from '../../images/selected-note.svg';
import deleteNoteIcon from '../../images/delete-note.svg';

const NoteItem = (props) => {
	const { id, groupID, name, color } = props;

	const dispatch = useDispatch();
	const { selectedNotes, setSelectedNotes } = useContext(SelectedNoteContext);

	const isSelected = selectedNotes.noteID === id;

	const onNoteItemClick = (e) => {
		if (e.target.tagName === 'IMG') return;

		setSelectedNotes({ noteID: id, groupID: groupID });
	};

	const onDeleteImageClick = () => {
		if (window.confirm('Do you want to delete this note?')) dispatch(deleteNote(id, groupID));
	};

	return (
		<motion.li className={`note-item ${isSelected ? 'selected' : ''}`} key={id} layout onClick={onNoteItemClick}>
			<p style={{ color: isSelected ? color : 'unset' }}>{name}</p>
			{isSelected && <img src={selectedIcon} className="selected-icon" alt="selected note" />}
			<img src={deleteNoteIcon} className="delete-note" alt="delete note" onClick={onDeleteImageClick} />
		</motion.li>
	);
};

export default NoteItem;
