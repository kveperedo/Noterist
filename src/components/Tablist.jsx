import React, { useEffect } from 'react'

import '../styles/Tablist.scss'

let images = [] //Used for preloading images

const Tablist = ({ tabs, selectedTab, setSelectedTab, isMinimized }) => {
    useEffect(() => {
        tabs.forEach(tab => {
            const img = new Image()
            const imgSelected = new Image()
            img.src = tab.icon
            imgSelected.src = tab.iconSelected
            images.push(img, imgSelected)
        })
    }, [])

    const renderTabs = () => tabs.map(tab => (
        <li
            className={`tab ${selectedTab === tab.id ? 'selected' : ''}`}
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            title={tab.name}

        >
            <img
                className="tab-icon"
                src={selectedTab === tab.id ? tab.iconSelected : tab.icon}
                alt={tab.name}
                key={selectedTab === tab.id ? tab.iconSelected : tab.icon}
            />
            <p className="tab-name">{tab.name}</p>
        </li>
    ))

    return (
        <ul className={`tablist ${isMinimized ? 'minimized' : ''}`} >
            { renderTabs()}
        </ul >
    )
}

export default Tablist