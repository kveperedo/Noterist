import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import '../styles/Dropdown.scss';

const Dropdown = (props) => {
	const { children, list, onMenuClick } = props;
	const [isExpanded, setIsExpanded] = useState(false);
	const [isDropdownTop, setIsDropdownTop] = useState(true);
	const dropdownRef = useRef();
	const mouseLocationRef = useRef();

	useLayoutEffect(() => {
		if (!isExpanded) return;

		const dropdownY = dropdownRef.current.getBoundingClientRect().y;
		const windowY = window.innerHeight;
		const isTop = windowY / 2 > dropdownY;
		setIsDropdownTop(isTop);
	}, [isExpanded]);

	const handleChildClick = (e) => {
		e.stopPropagation();

		mouseLocationRef.current = { x: e.clientX, y: e.clientY };
		setIsExpanded(!isExpanded);
	};

	const onMenuDropdownClick = (id) => {
		setIsExpanded(!isExpanded);
		onMenuClick(id);
	};

	let dropdownStyle = {};

	if (mouseLocationRef.current) {
		dropdownStyle = {
			borderRadius: isDropdownTop ? '0 10px 10px 10px' : '10px 10px 10px 0',
			[isDropdownTop ? 'top' : 'bottom']: isDropdownTop
				? mouseLocationRef.current.y + 10
				: -mouseLocationRef.current.y + 10,
			left: mouseLocationRef.current.x + 10,
		};
	}

	return (
		<div className="dropdown" ref={dropdownRef} onClick={handleChildClick}>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					className: `${child.props.className} ${isExpanded ? 'open' : ''}`,
				});
			})}
			{isExpanded && (
				<AnimatePresence>
					<DropdownList
						list={list}
						onMenuClick={onMenuDropdownClick}
						setIsExpanded={setIsExpanded}
						style={dropdownStyle}
					/>
				</AnimatePresence>
			)}
		</div>
	);
};

const DropdownList = (props) => {
	const { list, onMenuClick, setIsExpanded, style } = props;

	useEffect(() => {
		delayHandle.current = setTimeout(() => {
			setIsExpanded(false);
		}, 1000);

		return () => clearTimeout(delayHandle.current);
	}, []);

	const listRef = useRef();
	const delayHandle = useRef();

	const onMouseLeave = () => {
		delayHandle.current = setTimeout(() => {
			setIsExpanded(false);
		}, 500);
	};

	const onMouseEnter = () => {
		clearTimeout(delayHandle.current);
	};

	return ReactDOM.createPortal(
		<motion.div
			className="dropdown-list"
			ref={listRef}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			transition={{ duration: 0.2 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{list.map((item) => (
				<li className="list-item" key={item.id} onClick={() => onMenuClick(item.id)}>
					{item.name}
				</li>
			))}
		</motion.div>,
		document.querySelector('#modal-root')
	);
};

Dropdown.propTypes = {
	list: PropTypes.array.isRequired,
	onMenuClick: PropTypes.func.isRequired,
};

export default Dropdown;
