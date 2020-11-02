import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimateSharedLayout } from 'framer-motion';

import NoteGroup from './NoteGroup';

import { createNoteGroup } from '../../actions/';

import '../../styles/NoteList.scss';

import addGroup from '../../images/add-notesgroup.svg';

const NoteList = () => {
	const notes = useSelector((state) => state.notes);
	const dispatch = useDispatch();

	const onImageClick = () => {
		dispatch(createNoteGroup());
	};

	const renderNoteGroups = () => {
		return notes.map((group) => {
			return <NoteGroup {...group} key={group.id} />;
		});
	};

	return (
		<div className="note-list-container">
			<div className="note-list">
				<div style={{ height: '50px' }}>{/* Searchbar */}</div>
				<div className="header">
					<h1 className="title">MY NOTES</h1>
					<img src={addGroup} className="add-group" alt="add group" title="Add Notes Group" onClick={onImageClick} />
				</div>
				<AnimateSharedLayout>
					<motion.div className="groups" layout>
						{renderNoteGroups()}
					</motion.div>
				</AnimateSharedLayout>
			</div>
		</div>
	);
};

export default NoteList;
