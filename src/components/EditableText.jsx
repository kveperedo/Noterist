import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../styles/EditableText.scss';

const EditableText = (props) => {
	const { value, onChange, hasDoubleClick, hasEnterAbility, image } = props;

	const inputRef = useRef();
	const [isEditable, setIsEditable] = useState(false);
	const [editedValue, setEditedValue] = useState(value);

	useEffect(() => {
		setEditedValue(value);
	}, [value]);

	useEffect(() => {
		if (isEditable) inputRef.current.focus();
	}, [isEditable]);

	const onEditTitleClick = () => {
		setIsEditable(!isEditable);

		if (isEditable) onChange(editedValue);
	};

	const onTextDoubleClick = () => {
		if (!hasDoubleClick) return;

		setIsEditable(!isEditable);
	};

	const onInputEnter = (e) => {
		if (!hasEnterAbility) return;

		if (e.key === 'Enter') {
			setIsEditable(!isEditable);
			onChange(editedValue);
		}
	};

	return (
		<div className="editable-text">
			{isEditable ? (
				<input
					className="editable-input"
					value={editedValue}
					onChange={(e) => setEditedValue(e.target.value)}
					onKeyDown={onInputEnter}
					name="title"
					autoComplete="off"
					spellCheck="false"
					ref={inputRef}
				/>
			) : (
				<h1 className="editable-value" onDoubleClick={onTextDoubleClick}>
					{editedValue}
				</h1>
			)}
			<img className="editable-image" onClick={onEditTitleClick} src={image} alt="edit text" title="Edit Text" />
		</div>
	);
};

EditableText.propTypes = {
	onChange: PropTypes.func.isRequired,
	image: PropTypes.node.isRequired,
	value: PropTypes.string,
	hasDoubleClick: PropTypes.bool,
	hasEnterAbility: PropTypes.bool,
};

export default EditableText;
