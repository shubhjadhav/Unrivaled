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

export const login = createAsyncThunk(
	"main/login",
	async ( body, customConfig ) => {
		const promise = axios.post(`${config.urls.basePath}login`, body, customConfig)
			.then(response => { return response.data })
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
			.then(response => {  })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

export const analytics = createAsyncThunk(
	"main/analytics",
	async ( body ) => {
		const promise = axios.post(`${config.urls.basePath}analyze`, body)
			.then(response => { return response.data })
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
		username: "",
		login: false,
		resumeSelected: null,
		jdSelected: null,
		analyticsView: false,
		loader: false,
		analyticsResult: {}
	},
	reducers: {
		setResumeSelection: (state, action) => {
			state.resumeSelected = action.payload
		},
		setJDSelection: (state, action) => {
			state.jdSelected = action.payload
		},
		setAnalyticsView: (state, action) => {
			state.analyticsView = action.payload
			state.resumeSelected = null
			state.jdSelected = null
		},
		setLoading: (state, action) => {
			state.loader = action.payload
		},
		logout: (state, action) => {
			state.login = false
			state.username = ""
			state.analyticsView = false
			state.resumeSelected = null
			state.jdSelected = null
			state.resumeList = []
			state.jdList = []
		},
	 },
	extraReducers: {
		[dummy.fulfilled]: (state, action) => {
			state.dummyData = action.payload
		},
		[analytics.fulfilled]: (state, action) => {
			state.analyticsResult = action.payload

			state.analyticsView = true
			state.loader = false
			state.resumeSelected = null
			state.jdSelected = null
		},
		[getAllResumes.fulfilled]: (state, action) => {
			state.resumeList = action.payload
			state.loader = false
		},
		[getAllJDs.fulfilled]: (state, action) => {
			state.jdList = action.payload
			state.loader = false
		},
		[login.fulfilled]: (state, action) => {

			state.login = action.payload.registered
			state.loader = false

			if (!action.payload.registered){
				alert("You are not registered user!")
				
			} else {
				state.username = action.payload.username
			}
		}
	}
});

export const { 
	setResumeSelection,
	setJDSelection,
	setAnalyticsView,
	setLoading,
	logout
} = slice.actions;

export default slice.reducer;