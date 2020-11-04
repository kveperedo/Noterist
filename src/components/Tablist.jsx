import React from 'react';

import '../styles/Tablist.scss';

const Tablist = (props) => {
	const { tabs, selectedTab, setSelectedTab, isMinimized } = props;

	const renderTabs = () =>
		tabs.map((tab) => {
			const isSelectedTab = selectedTab === tab.id ? ' selected' : '';
			const isDisabled = tab.disabled ? ' disabled' : '';
			const className = 'tab' + isDisabled + isSelectedTab;

			return (
				<li className={className} key={tab.id} onClick={() => setSelectedTab(tab.id)} title={tab.name}>
					<img
						className="tab-icon"
						src={selectedTab === tab.id ? tab.iconSelected : tab.icon}
						alt={tab.name}
						key={selectedTab === tab.id ? tab.iconSelected : tab.icon}
					/>
					<p className="tab-name">{tab.name}</p>
				</li>
			);
		});

	return <ul className={`tablist ${isMinimized ? 'minimized' : ''}`}>{renderTabs()}</ul>;
};

export default Tablist;
