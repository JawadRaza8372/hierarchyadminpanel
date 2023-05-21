import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	cources: [],
	offers: [],
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setUsers: (state, action) => {
			if (action.payload.users === null) {
				state.users = [];
			} else {
				state.users = action.payload.users;
			}
		},
		setCources: (state, action) => {
			if (action.payload.cources === null) {
				state.cources = [];
			} else {
				state.cources = action.payload.cources;
			}
		},
		setOffers: (state, action) => {
			if (action.payload.offers === null) {
				state.offers = [];
			} else {
				state.offers = action.payload.offers;
			}
		},
	},
});

export const { setUsers, setCources, setOffers } = projectSlice.actions;

export default projectSlice.reducer;
