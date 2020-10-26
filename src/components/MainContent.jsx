import React from 'react'
import ScratchPad from './scratchpad/ScratchPad'
import Notes from './notes/Notes'
import Todos from './todos/Todos'

import useLocalStorage from '../hooks/useLocalStorage'

import ExpandedNotesContext from '../context/ExpandedNotesContext'
import SelectedNoteContext from '../context/SelectedNoteContext.js'

import '../styles/MainContent.css'

const MainContent = ({ selectedTab }) => {
    const [expandedNotes, setExpandedNotes] = useLocalStorage('expandedNotes', [])
    const [selectedNotes, setSelectedNotes] = useLocalStorage('selectedNote', { noteID: null, groupID: null })

    const renderMainContent = () => {
        switch (selectedTab) {
            case 'ScratchPad':
                return <ScratchPad />
            case 'Notes':
                return (
                    <SelectedNoteContext.Provider value={{ selectedNotes, setSelectedNotes }}>
                        <ExpandedNotesContext.Provider value={{ expandedNotes, setExpandedNotes }}>
                            <Notes selectedNotes={selectedNotes} />
                        </ExpandedNotesContext.Provider>
                    </SelectedNoteContext.Provider>
                )
            case 'Todos':
                return <Todos />
            default:
                return null
        }
    }

    return (
        <div className="main-content">
            {renderMainContent()}
        </div>
    )
}

export default MainContent