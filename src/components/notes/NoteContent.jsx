import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import EmptyContent from '../EmptyContent';
import EditableText from '../EditableText';

import { editNote } from '../../actions';
import { modules, formats } from '../../data/reactQuillData';

import '../../styles/NoteContent.scss';

import editTitleLogo from '../../images/edit-title.svg';
import emptyNotesLogo from '../../images/empty-notes.svg';
import readOnlyEnabledLogo from '../../images/read-only-enabled.svg';
import readOnlyDisabledLogo from '../../images/read-only-disabled.svg';

const findNote = (noteGroups, { groupID, noteID }) => {
	const selectedGroup = noteGroups.find((group) => group.id === groupID) || null;
	if (!selectedGroup) return [null, null];
	const selectedNote = selectedGroup.notes.find((note) => note.id === noteID) || {};
	return [selectedNote, groupID];
};

const NoteContent = (props) => {
	const { selectedNotes } = props;

	const dispatch = useDispatch();
	const noteGroups = useSelector((state) => state.notes);
	const [selectedNote, noteGroupID] = findNote(noteGroups, selectedNotes);
	const [isReadOnly, setisReadOnly] = useState(selectedNote && selectedNote.isReadOnly);
	const [title, setTitle] = useState(selectedNote && selectedNote.name);
	const [content, setContent] = useState(selectedNote && selectedNote.content);

	useEffect(() => {
		if (!selectedNote) return;

		setTitle(selectedNote.name);
		setContent(selectedNote.content);
		setisReadOnly(selectedNote.isReadOnly);
	}, [selectedNote]);

	useEffect(() => {
		if (!selectedNote) return;

		const didTitleUpdate = title !== selectedNote.name;
		const didContentUpdate = content !== selectedNote.content;
		const didReadOnlyUpdate = isReadOnly !== selectedNote.isReadOnly;

		if (!didTitleUpdate && !didContentUpdate && !didReadOnlyUpdate) return;

		let timerID = null;

		if (didContentUpdate) {
			timerID = setTimeout(() => {
				dispatch(
					editNote(
						{
							...selectedNote,
							name: title,
							content: content,
							isReadOnly: isReadOnly,
						},
						noteGroupID
					)
				);
			}, 500);
		}

		if (didTitleUpdate || didReadOnlyUpdate) {
			dispatch(
				editNote(
					{
						...selectedNote,
						name: title,
						content: content,
						isReadOnly: isReadOnly,
					},
					noteGroupID
				)
			);
		}

		return () => clearTimeout(timerID);
	}, [title, content, isReadOnly]);

	if (selectedNote === null || !Object.values(selectedNote).length)
		return (
			<div className="empty">
				<EmptyContent
					image={emptyNotesLogo}
					title="No Notes Selected!"
					subtitle="Select a note to open its contents."
				/>
			</div>
		);

	return (
		<div className="note-content">
			<div className="header">
				<div className="title">
					<EditableText value={title} image={editTitleLogo} hasDoubleClick hasEnterAbility onChange={setTitle} />
				</div>
				<div className="actions">
					<img
						className="read-only"
						src={isReadOnly ? readOnlyEnabledLogo : readOnlyDisabledLogo}
						alt="read only"
						title="Enable/Disable Read-Only"
						onClick={() => setisReadOnly(!isReadOnly)}
					/>
				</div>
			</div>
			<ReactQuill
				className="content"
				theme="bubble"
				value={content}
				onChange={setContent}
				modules={modules}
				formats={formats}
				readOnly={isReadOnly}
				preserveWhitespace
			/>
		</div>
	);
};

export default NoteContent;
