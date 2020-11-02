import {
	CREATE_NOTE_GROUP,
	EDIT_NOTE_GROUP_NAME,
	EDIT_NOTE_GROUP_COLOR,
	DELETE_NOTE_GROUP,
	CREATE_NOTE,
	EDIT_NOTE,
	DELETE_NOTE,
} from '../actions/types';

const notesReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_NOTE_GROUP:
			return [...state, action.payload];
		case EDIT_NOTE_GROUP_NAME:
			return state.map((note) => {
				if (note.id === action.payload.id) {
					note.groupName = action.payload.groupName;
				}
				return note;
			});
		case EDIT_NOTE_GROUP_COLOR:
			return state.map((note) => {
				if (note.id === action.payload.id) {
					note.color = action.payload.color;
				}
				return note;
			});
		case DELETE_NOTE_GROUP:
			return state.filter((note) => {
				return note.id !== action.payload;
			});
		case CREATE_NOTE:
			const index = state.findIndex((note) => note.id === action.payload.id);
			state[index].notes.push(action.payload.note);
			return state;
		case EDIT_NOTE: {
			const noteGroupIndex = state.findIndex((group) => group.id === action.payload.noteGroupID);
			const noteIndex = state[noteGroupIndex].notes.findIndex((note) => note.id === action.payload.note.id);
			state[noteGroupIndex].notes[noteIndex] = { ...state[noteGroupIndex].notes[noteIndex], ...action.payload.note };
			return state;
		}
		case DELETE_NOTE: {
			const noteGroupIndex = state.findIndex((group) => group.id === action.payload.noteGroupID);
			const notes = state[noteGroupIndex].notes.filter((note) => {
				return note.id !== action.payload.noteID;
			});
			state[noteGroupIndex].notes = notes;
			return state;
		}
		default:
			return state;
	}
};

export default notesReducer;
