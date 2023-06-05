import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	cources: [],
	offers: [],
	adsplan: [],
	ads: [],
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
		setAdsplan: (state, action) => {
			if (action.payload.adsplan === null) {
				state.adsplan = [];
			} else {
				state.adsplan = action.payload.adsplan;
			}
		},
		setAds: (state, action) => {
			if (action.payload.ads === null) {
				state.ads = [];
			} else {
				state.ads = action.payload.ads;
			}
		},
	},
});

export const { setUsers, setCources, setOffers, setAdsplan, setAds } =
	projectSlice.actions;

export default projectSlice.reducer;
