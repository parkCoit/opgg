
import { configureStore, createSlice } from '@reduxjs/toolkit'

let summoner = createSlice({ // useState 역할
    name : 'summoner',
    initialState : []
})

let history = createSlice({
    name : 'history',
    initialState : [],
    reducers : {

    }
})

export default configureStore({
	reducer: { 
        summoner : summoner.reducer, //등록
        history : history.reducer
	}
})