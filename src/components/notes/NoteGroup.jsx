import React, { useEffect, useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';
import Dropdown from '../Dropdown';

import { createNote, deleteNoteGroup, editNoteGroupName, editNoteGroupColor } from '../../actions/index';

import ExpandedNotesContext from '../../context/ExpandedNotesContext';

import '../../styles/NoteGroup.scss';

import optionsIcon from '../../images/more.svg';

const images = [];
const INITIAL_GROUP_NAME = '[:Enter Group Name:]';

const list = [
	{ name: 'Add Note', id: 'addnote' },
	{ name: 'Edit Note Group Title', id: 'editnotegroup' },
	{ name: 'Change Note Color', id: 'changenotecolor' },
	{ name: 'Delete Note Group', id: 'deletenotegroup' },
];

const NoteGroup = (props) => {
	const { groupName, id, color, notes } = props;

	const dispatch = useDispatch();
	const titleRef = useRef();
	const inputRef = useRef();
	const { expandedNotes, setExpandedNotes } = useContext(ExpandedNotesContext);
	const [isEditable, setIsEditable] = useState(groupName === INITIAL_GROUP_NAME);
	const isExpanded = expandedNotes.includes(id);

	useEffect(() => {
		const optionsImg = new Image();
		const addNoteImg = new Image();
		optionsImg.src = optionsIcon;
		images.push(optionsImg, addNoteImg);
	}, []);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	useEffect(() => {
		if (isEditable && inputRef.current) inputRef.current.focus();
	}, [isEditable]);

	const onMenuClick = (type) => {
		switch (type) {
			case 'editnotegroup':
				setIsEditable(true);
				break;
			case 'changenotecolor':
				dispatch(editNoteGroupColor(id, color));
				break;
			case 'deletenotegroup':
				const hasNotes = notes.length > 0;

				if (!hasNotes) dispatch(deleteNoteGroup(id));

				if (hasNotes && window.confirm('Are you sure you want to delete this Note Group'))
					dispatch(deleteNoteGroup(id));
				break;
			case 'addnote':
				dispatch(createNote(id));
				setExpandedNotes((prevIDs) => [...prevIDs, id]);
				break;
			default:
				break;
		}
	};

	const toggleGroup = (e) => {
		if (e.target.closest('div.title') !== titleRef.current) return;

		if (expandedNotes.includes(id)) {
			setExpandedNotes((prevIDs) => {
				return prevIDs.filter((prevID) => prevID !== id);
			});
		} else {
			setExpandedNotes((prevIDs) => [...prevIDs, id]);
		}
	};

	const onInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			const { value } = e.target;
			dispatch(editNoteGroupName({ id, groupName: value }));
			setIsEditable(false);
		}
	};

	const onInputBlur = (e) => {
		const { value } = e.target;

		if (!value && notes.length === 0) {
			dispatch(deleteNoteGroup(id));
		} else {
			dispatch(editNoteGroupName({ id, groupName: value }));
			setIsEditable(false);
		}
	};

	const renderNoteItems = () => {
		return (
			<motion.ul
				className="content"
				layout
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.05 }}
			>
				{notes.map((note) => {
					return <NoteItem {...note} color={color} key={note.id} groupID={id} />;
				})}
			</motion.ul>
		);
	};

	return (
		<motion.div className={`note-group ${isExpanded ? '' : 'minimized'}`} layout>
			<motion.div
				className="title"
				style={{ backgroundColor: color }}
				ref={titleRef}
				onClick={(e) => toggleGroup(e)}
				layout
			>
				{isEditable ? (
					<input
						className="text"
						spellCheck="false"
						onKeyPress={onInputKeyPress}
						ref={inputRef}
						onBlur={onInputBlur}
						defaultValue={groupName === INITIAL_GROUP_NAME ? '' : groupName}
					/>
				) : (
					<p className="text">{groupName}</p>
				)}
				<Dropdown list={list} onMenuClick={onMenuClick}>
					<img className="options" alt="options" title="Options" src={optionsIcon} />
				</Dropdown>
			</motion.div>
			<AnimatePresence>{isExpanded && renderNoteItems()}</AnimatePresence>
		</motion.div>
	);
};

NoteGroup.propTypes = {
	groupName: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	notes: PropTypes.array.isRequired,
};

export default NoteGroup;
