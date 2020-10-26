import {
    CREATE_SCRATCHPAD,
    DELETE_SCRATCHPAD,
    EDIT_SCRATCHPAD,
    CREATE_NOTE_GROUP,
    EDIT_NOTE_GROUP_NAME,
    EDIT_NOTE_GROUP_COLOR,
    DELETE_NOTE_GROUP,
    CREATE_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
} from './types'

import generateColor from '../functions/generateColor'

// SCRATCHPADS

export const createScratch = () => {
    const id = Date.now()

    return {
        type: CREATE_SCRATCHPAD,
        payload: {
            title: 'New Scratch',
            content: '',
            id: id
        }
    }
}

export const deleteScratch = (id) => {
    return {
        type: DELETE_SCRATCHPAD,
        payload: id
    }
}

export const editScratch = (scratch) => {
    return {
        type: EDIT_SCRATCHPAD,
        payload: scratch
    }
}

// NOTES

export const createNoteGroup = () => {
    const id = Date.now()

    return {
        type: CREATE_NOTE_GROUP,
        payload: {
            groupName: '[:Enter Group Name:]',
            id: id,
            color: generateColor(),
            notes: []
        }
    }
}

export const deleteNoteGroup = id => {
    return {
        type: DELETE_NOTE_GROUP,
        payload: id
    }
}

export const editNoteGroupName = (payload) => {
    return {
        type: EDIT_NOTE_GROUP_NAME,
        payload: payload
    }
}

export const editNoteGroupColor = (id, prevColor) => {
    return {
        type: EDIT_NOTE_GROUP_COLOR,
        payload: { id: id, color: generateColor(prevColor) }
    }
}

export const createNote = noteGroupID => {
    const id = Date.now()
    return {
        type: CREATE_NOTE,
        payload: {
            id: noteGroupID,
            note: {
                name: 'Sample Note',
                id: id,
                content: '',
                isReadOnly: false,
            }
        }
    }
}

export const editNote = (note, noteGroupID) => {
    return {
        type: EDIT_NOTE,
        payload: { note, noteGroupID: noteGroupID }
    }
}

export const deleteNote = (noteID, noteGroupID) => {
    return {
        type: DELETE_NOTE,
        payload: { noteID, noteGroupID }
    }
}