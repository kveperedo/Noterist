import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Tab from './Tab'

import useLocalStorage from '../hooks/useLocalStorage'

import usePrevious from '../hooks/usePrevious'

import addIcon from '../images/add-scratchpad.svg'

const Tabs = props => {
    const { children, onTabAdd, onTabDelete } = props

    const defaultTab = children.length ? children[0].props.id : null

    const [activeTab, setActiveTab] = useLocalStorage('selectedScratchpad', defaultTab)

    const oldChildrenCount = usePrevious(children.length)
    const tabRef = useRef()

    useEffect(() => {
        if (children.length === 1) setActiveTab(defaultTab)
        if (oldChildrenCount !== undefined && children.length > oldChildrenCount)
            setActiveTab(children[children.length - 1].props.id)
    }, [children, defaultTab, oldChildrenCount]) //TODO:

    const onTabClick = (e, tabID) => {
        if (onTabDelete && e.target.classList.contains('close-icon')) return null

        setActiveTab(tabID)
    }

    const onDelete = tabID => {
        onTabDelete(tabID)

        if (tabID === activeTab) {
            const activeTabIndex = children.findIndex(child => child.props.id === activeTab)
            if (activeTabIndex > 0) setActiveTab(children[activeTabIndex - 1].props.id)
        }
    }

    const onAdd = () => {
        onTabAdd()
    }

    const onTabWheel = e => {
        const target = tabRef.current

        const toLeft = e.deltaY < 0 && target.scrollLeft > 0
        const toRight = e.deltaY > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth

        if (toLeft || toRight) {
            target.scrollBy({ left: e.deltaY * 0.5 })
        }
    }

    const renderTabList = () => {
        if (children.map === undefined) return

        return children.map(child => {
            const { id, title, hasContent } = child.props

            return (
                <Tab
                    activeTab={activeTab}
                    id={id}
                    key={id}
                    title={title}
                    hasContent={hasContent}
                    onClick={onTabClick}
                    onDelete={onTabDelete ? onDelete : null}
                />
            )
        })
    }

    const renderTabContent = () => {
        if (children.map === undefined) return children

        return (
            <div className="tab-content">
                {children.map(child => {
                    return child.props.id !== activeTab
                        ? undefined
                        : child.props.children
                })}
            </div>
        )
    }

    return (
        <div className="tabs">
            <ol className="tab-list">
                <div className="tab" ref={tabRef} onWheel={onTabWheel}>
                    {renderTabList()}
                </div>
                {onTabAdd
                    ? <div className="add">
                        <img
                            className="add-tab"
                            src={addIcon}
                            alt="add"
                            onClick={onAdd}
                            title="Add new tab"
                        />
                    </div>
                    : null}
            </ol>
            {renderTabContent()}
        </div>
    )
}

Tabs.propTypes = {
    children: PropTypes.any.isRequired,
    onTabAdd: PropTypes.func,
    onTabDelete: PropTypes.func,
}

export default Tabs