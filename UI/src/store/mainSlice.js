/****************************************************************

Author: Shubham Jadhav
Emp ID: 11809
Description: Redux slice to manage state and actions

****************************************************************/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const config = require('../config.js')

/*******************************
* @desc this asynchronous function to authenticate user
*******************************/
export const authenticate = createAsyncThunk(
	"main/authenticate",
	async (userDetails , ) => {
		const promise = axios.post(`${config.urls.basePath}login`, userDetails)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

/*******************************
* @desc this asynchronous function to get userdetails
*******************************/
export const getUserDetail = createAsyncThunk(
	"main/getUserDetail",
	async ( userId ) => {
		const promise = axios.get(`${config.urls.basePath}details/personal/${userId}`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

/*******************************
* @desc this asynchronous function to user's basic details
*******************************/
export const getBasicDetails = createAsyncThunk(
	"main/getBasicDetails",
	async ( userId ) => {
		const promise = axios.get(`${config.urls.basePath}details/basicDetails/${userId}`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);

/*******************************
* @desc this asynchronous function to user's transaction details
*******************************/
export const getTransactionDetails = createAsyncThunk(
	"main/getTransactionDetails",
	async ( userId ) => {
		const promise = axios.get(`${config.urls.basePath}details/transaction/${userId}`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);


/*******************************
* @desc this asynchronous function to user's deposit details
*******************************/
export const getDeposits = createAsyncThunk(
	"main/getDeposits",
	async ( userId ) => {
		const promise = axios.get(`${config.urls.basePath}deposits/${userId}`)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);


/*******************************
* @desc this asynchronous function to create a Fixed Deposits
*******************************/
export const createFD = createAsyncThunk(
	"main/createFD",
	async (details) => {
		const promise = axios.post(`${config.urls.basePath}deposits/createFD`, details)
			.then(response => { return response.data; })
			.catch(error => { return "Error" });

		const result = await promise;
		return result;
	}
);


/*******************************
* @desc this asynchronous function to close a Fixed Deposits
*******************************/
export const closeFD = createAsyncThunk(
	"main/closeFD",
	async (details) => {
		const promise = axios.post(`${config.urls.basePath}deposits/closeFD`, details)
			.then(response => { return response.data; })
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
		//authentication
		userId: null,
		userName: null,
		name: null,
		loggedIn: false,
		loginInProcess: false,

		//landing page
		landingView: 'basic-details',

		//Personal Detail
		userDetails: null,

		//Basic Detail
		basicDetails: null,
		transactionDetails: [],

		//Deposits
		deposits: []
	},
	// initialize reducers
	reducers: {
		/*******************************
		* @desc this function logout the user and reset the state variables
		*******************************/
		logout: (state, action) => {
			state.userId = null;
			state.userName = null;
			state.name = null;
			state.loggedIn = false;
			state.loginInProcess = true;
			state.landingView = 'basic-details';
			state.userDetails = null;
			state.basicDetails = null;
			state.transactionDetails = [];
			state.deposits = [];
		},
		/*******************************
		* @desc this function sets loginInProcess state variable
		*******************************/
		logginIn: (state, action) => {
			state.loginInProcess = !state.loginInProcess
		},
		/*******************************
		* @desc this function sets landingView state variable
		*******************************/
		setLandingView: (state, action) =>{
			state.landingView = action.payload
		}
	},
	/*******************************
	* @desc reducers to handle async calls
	*******************************/
	extraReducers: {
		[authenticate.fulfilled]: (state, action) => {
			if(action.payload.userId){
				state.userId = action.payload.userId;
				state.userName = action.payload.userName;
				state.name = action.payload.name;
				state.loggedIn = true;
			} else {
				alert(action.payload)
			}
		},
		[getUserDetail.fulfilled]: (state, action) => {
			if(action.payload.userId){
				state.userDetails = action.payload
			}
		},
		[getBasicDetails.fulfilled]: (state, action) => {
			if(action.payload.userId){
				state.basicDetails = action.payload
			}
		},
		[getTransactionDetails.fulfilled]: (state, action) => {
			if(action.payload[0]){
				state.transactionDetails = action.payload
			}
		},
		[getDeposits.fulfilled]: (state, action) => {
			if(typeof(action.payload[0]) === 'object'){
				state.deposits = action.payload
			} else {
				state.deposits = []
			}
		},
		[createFD.fulfilled]: (state, action) => {},
		[closeFD.fulfilled]: (state, action) => {},
	}
});


/*******************************
* @desc Exports actions
*******************************/
export const { 
	logout,
	logginIn,
	setLandingView,
} = slice.actions;

export default slice.reducer;