import { createSlice } from '@reduxjs/toolkit';

export const scratchSlice = createSlice({
	name: 'scratchpads',
	initialState: [],
	reducers: {
		createPad: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: () => ({
				payload: { title: 'New Scratch', content: '', id: Date.now() },
			}),
		},
		deletePad: (state, action) => {
			return state.filter((scratch) => scratch.id !== action.payload);
		},
		editPad: (state, action) => {
			const scratch = action.payload;
			const index = state.findIndex((pad) => pad.id === scratch.id);
			state[index] = scratch;
		},
	},
});

export const { createPad, deletePad, editPad } = scratchSlice.actions;

export default scratchSlice.reducer;
