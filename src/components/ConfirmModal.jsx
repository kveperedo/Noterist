import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

import PropTypes from 'prop-types';

import '../styles/ConfirmModal.scss';
import closeIcon from '../images/close.svg';

const ConfirmModal = (props) => {
	const {
		title = 'Confirm',
		content = 'Are you sure you want to confirm?',
		onConfirm,
		onCancel,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
	} = props;

	return ReactDOM.createPortal(
		<motion.div
			className="container"
			transition={{ ease: 'easeOut', duration: 0.2 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="confirm-modal">
				<div className="header">
					<h1 className="title">{title ? title : 'Confirm'}</h1>
					<img src={closeIcon} className="close-icon" alt="close" onClick={onCancel} />
				</div>
				<div className="content">
					<p className="text">{content ? content : 'Are you sure you want to confirm'}</p>
				</div>
				<div className="actions">
					<button className="confirm" onClick={onConfirm}>
						{confirmText}
					</button>
					<button className="cancel" onClick={onCancel}>
						{cancelText}
					</button>
				</div>
			</div>
		</motion.div>,
		document.querySelector('#modal-root')
	);
};

ConfirmModal.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
};

export default ConfirmModal;
