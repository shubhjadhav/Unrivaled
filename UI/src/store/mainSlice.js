/****************************************************************
# Author: Shubham Jadhav
# Description: Redux slice to manage state and actions
****************************************************************/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const config = require('../config.js')

export const dummy = createAsyncThunk(
	"main/dummy",
	async ( ) => {
		const promise = axios.get(`${config.urls.dummyPath}`)
			.then(response => { return response.data.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const getAllResumes = createAsyncThunk(
	"main/getAllResumes",
	async ( ) => {
		const promise = axios.get(`${config.urls.basePath}getAllResumes`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const getAllJDs = createAsyncThunk(
	"main/getAllJDs",
	async ( ) => {
		const promise = axios.get(`${config.urls.basePath}getAllJDs`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const uploadFile = createAsyncThunk(
	"main/uploadFile",
	async ( body, customConfig ) => {
		const promise = axios.post(`${config.urls.basePath}uploadFile`, body, customConfig)
			.then(response => { alert("File successfully uploaded") })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const analytics = createAsyncThunk(
	"main/analytics",
	async ( body ) => {
		const promise = axios.post(`${config.urls.basePath}analyze`, body)
			.then(response => { })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const slice = createSlice({
	name: "main", 
	initialState: {
		dummyData : [],
		resumeList : [],
		jdList: [],
		username: "Shubham",
		resumeSelected: null,
		jdSelected: null
	},
	reducers: {
		setResumeSelection: (state, action) => {
			state.resumeSelected = action.payload
		},
		setJDSelection: (state, action) => {
			state.jdSelected = action.payload
		}
	 },
	extraReducers: {
		[dummy.fulfilled]: (state, action) => {
			state.dummyData = action.payload
		},
		[analytics.fulfilled]: (state, action) => {},
		[getAllResumes.fulfilled]: (state, action) => {
			state.resumeList = action.payload
		},
		[getAllJDs.fulfilled]: (state, action) => {
			state.jdList = action.payload
		}
	}
});

export const { 
	setResumeSelection,
	setJDSelection
} = slice.actions;

export default slice.reducer;