import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import EditableText from '../EditableText';

import usePrevious from '../../hooks/usePrevious';

import '../../styles/ScratchContent.scss';

import editIcon from '../../images/edit-title.svg';

const ScratchContent = (props) => {
	const { pad, onTabEdit } = props;

	const [padData, setPadData] = useState(pad);
	const oldContentLength = usePrevious(padData.content.length);
	const selectionLocation = useRef();
	const textAreaRef = useRef();

	useEffect(() => {
		if (oldContentLength === padData.content.length) return;

		const timerID = setTimeout(() => {
			onTabEdit(padData);
		}, 400);

		return () => clearTimeout(timerID);
	}, [padData, onTabEdit, oldContentLength]);

	useLayoutEffect(() => {
		textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = selectionLocation.current;
	}, [padData]);

	const onEditableChange = (title) => {
		onTabEdit({ ...padData, name: title });
	};

	const onInputChange = (e) => {
		const { value, name, selectionStart } = e.target;

		selectionLocation.current = selectionStart;

		setPadData((prevData) => ({ ...prevData, [name]: value }));
	};

	const onTextAreaKeyDown = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			let { value, name, selectionStart } = e.target;

			value = value.substring(0, selectionStart) + '\t' + value.substring(selectionStart);
			selectionLocation.current = selectionStart + 1;

			document.execCommand('insertText', false, '\t');
			setPadData((prevData) => ({ ...prevData, [name]: value }));
		}
	};

	const renderWordCount = () => {
		const words = padData.content.match(/\S+/g) || [];
		const wordCount = words.length;
		return wordCount === 0 || wordCount > 1 ? `${wordCount} Words` : `${wordCount} Word`;
	};

	return (
		<div className="scratch-content">
			<div className="header">
				<EditableText
					value={padData.title}
					hasDoubleClick
					hasEnterAbility
					image={editIcon}
					onChange={onEditableChange}
				/>
			</div>
			<div className="content">
				<textarea
					className="text"
					name="content"
					value={padData.content}
					onChange={onInputChange}
					onKeyDown={onTextAreaKeyDown}
					spellCheck="false"
					ref={textAreaRef}
				/>
				<div className="word-count">{renderWordCount()}</div>
			</div>
		</div>
	);
};

export default ScratchContent;
