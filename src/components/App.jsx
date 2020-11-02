import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

import useLocalStorage from './../hooks/useLocalStorage';

import '../styles/App.css';

const App = () => {
	const [selectedTab, setSelectedTab] = useLocalStorage('sidemenu', 'ScratchPad');

	return (
		<div className="noterist-app">
			<Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
			<MainContent selectedTab={selectedTab} />
		</div>
	);
};

export default App;
