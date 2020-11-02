import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import ConfirmModal from './ConfirmModal';

import closeIcon from '../images/close.svg';

const Tab = (props) => {
	const { activeTab, title, hasContent, id, onClick, onDelete } = props;

	const [showModal, setShowModal] = useState(false);

	const onTabClick = (e) => {
		onClick(e, id);
	};

	const onTabDelete = () => {
		if (!hasContent) onDelete(id);

		setShowModal(!showModal);
	};

	const onModalCancel = () => {
		setShowModal(!showModal);
	};

	const onModalConfirm = () => {
		onDelete(id);
	};

	return (
		<>
			<AnimatePresence>
				{showModal ? (
					<ConfirmModal
						onConfirm={onModalConfirm}
						onCancel={onModalCancel}
						title="Delete Scratchpad"
						content="Are you sure you want to delete this scratchpad?"
						confirmText="Delete"
					/>
				) : null}
			</AnimatePresence>
			<li className={`tab-list-item ${activeTab === id ? 'tab-list-active' : ''}`} onClick={onTabClick} title={title}>
				<p className="title">{title}</p>
				{onDelete ? <img className="close-icon" src={closeIcon} alt="close icon" onClick={onTabDelete} /> : null}
			</li>
		</>
	);
};

Tab.propTypes = {
	activeTab: PropTypes.number,
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
};

export default Tab;
