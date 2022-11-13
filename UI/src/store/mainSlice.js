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

export const uploadFile = createAsyncThunk(
	"main/uploadFile",
	async ( body ) => {
		const promise = axios.post(`${config.urls.basePath}uploadFile`, body)
			.then(response => { alert("File successfully uploaded") })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);


/*******************************
* @desc this function initializes a slice
*******************************/
export const slice = createSlice({
	name: "main", // slice name
	// initialize state variables
	initialState: {
		dummyData : []
	},
	// initialize reducers
	reducers: {
		
	 },
	/*******************************
	* @desc reducers to handle async calls
	*******************************/
	extraReducers: {
		[dummy.fulfilled]: (state, action) => {
			state.dummyData = action.payload
		}
	}
});


/*******************************
* @desc Exports actions
*******************************/
export const { } = slice.actions;

export default slice.reducer;