import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './notesSlice';
import scratchpadReducer from './scratchSlice';

import { loadLocalStorage } from './../localStorage';

const reducer = { scratchpads: scratchpadReducer, notes: notesReducer };

const persistedState = loadLocalStorage();

export default configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: persistedState,
});
