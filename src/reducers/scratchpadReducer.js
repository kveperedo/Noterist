import { CREATE_SCRATCHPAD, DELETE_SCRATCHPAD, EDIT_SCRATCHPAD } from '../actions/types';

const scratchpadReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_SCRATCHPAD:
			return [...state, action.payload];
		case DELETE_SCRATCHPAD:
			return state.filter((scratch) => scratch.id !== action.payload);
		case EDIT_SCRATCHPAD:
			return state.map((scratch) => (scratch.id === action.payload.id ? action.payload : scratch));
		default:
			return state;
	}
};

export default scratchpadReducer;
