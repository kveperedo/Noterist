// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immer';
import produce from 'immer';

import scratchpadReducer from './scratchpadReducer';
import notesReducer from './notesReducer';

export default combineReducers(produce, {
	scratchpads: scratchpadReducer,
	notes: notesReducer,
});
