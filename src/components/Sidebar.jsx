import React from 'react';
import Tablist from './Tablist';
import Footer from './Footer';

import tabs from '../data/sidebarData';

import useLocalStorage from '../hooks/useLocalStorage';

import '../styles/Sidebar.scss';
import minimizeLogo from '../images/minimize.svg';

const Sidebar = ({ selectedTab, setSelectedTab }) => {
	const [isMinimized, setIsMinimized] = useLocalStorage('isMinimized', true);

	const onResizeClick = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<aside className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
			<img className="resize-button" onClick={onResizeClick} src={minimizeLogo} alt="back" />
			{/* Searchbar */}
			<Tablist tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} isMinimized={isMinimized} />
			<Footer isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
		</aside>
	);
};

export default Sidebar;
