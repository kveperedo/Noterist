import { createSlice } from '@reduxjs/toolkit';

import generateColor from './../functions/generateColor';

export const notesSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers: {
		createNoteGroup: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: () => {
				return {
					payload: {
						groupName: '[:Enter Group Name:]',
						id: Date.now(),
						color: generateColor(),
						notes: [],
					},
				};
			},
		},

		editNoteGroupName: (state, action) => {
			const { id, groupName } = action.payload;
			const index = state.findIndex((group) => group.id === id);
			state[index].groupName = groupName;
		},

		editNoteGroupColor: {
			reducer: (state, action) => {
				const { id, color } = action.payload;
				const index = state.findIndex((group) => group.id === id);
				state[index].color = color;
			},
			prepare: (id, color) => ({ payload: { id, color: generateColor(color) } }),
		},

		deleteNoteGroup: (state, action) => {
			return state.filter((note) => note.id !== action.payload);
		},

		createNote: {
			reducer: (state, action) => {
				const { id: groupID, note } = action.payload;
				const index = state.findIndex((group) => group.id === groupID);
				state[index].notes.push(note);
			},
			prepare: (noteGroupID) => ({
				payload: {
					id: noteGroupID,
					note: { name: 'Sample Note', id: Date.now(), content: '', isReadOnly: false },
				},
			}),
		},

		editNote: {
			reducer: (state, action) => {
				const { noteGroupID, note } = action.payload;
				const groupIndex = state.findIndex((group) => group.id === noteGroupID);
				const noteIndex = state[groupIndex].notes.findIndex((statenote) => statenote.id === note.id);
				state[groupIndex].notes[noteIndex] = note;
			},
			prepare: (note, noteGroupID) => ({ payload: { note, noteGroupID } }),
		},

		deleteNote: {
			reducer: (state, action) => {
				const { noteID, noteGroupID } = action.payload;
				const groupIndex = state.findIndex((group) => group.id === noteGroupID);
				const notes = state[groupIndex].notes.filter((note) => {
					return note.id !== noteID;
				});
				state[groupIndex].notes = notes;
			},
			prepare: (noteID, noteGroupID) => ({ payload: { noteID, noteGroupID } }),
		},
	},
});

export const {
	createNoteGroup,
	editNoteGroupName,
	editNoteGroupColor,
	deleteNoteGroup,
	createNote,
	editNote,
	deleteNote,
} = notesSlice.actions;

export default notesSlice.reducer;
