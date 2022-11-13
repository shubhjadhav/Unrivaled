/****************************************************************
# Author: Shubham Jadhav
# Description: Configure a store and initialize reducers
****************************************************************/

import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import main from './mainSlice.js';

const store = configureStore({
    reducer: {
      main: main
     },
    middleware: [thunk]
});

export default store;