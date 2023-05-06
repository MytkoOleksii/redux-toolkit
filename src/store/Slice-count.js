import {createSlice} from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'count',
    initialState: {
        count: 0,
    },
    reducers:{
        increment(state) {
            state.count = state.count + 1
        },
        decrement(state) {
          if(state.count <= 0){
              state.count = 0
          } else {
              state.count =  state.count - 1
          }
        },
        reset(state) {
            state.count = 0
        },
    },
});

export default countSlice.reducer;
export const {increment,decrement,reset} = countSlice.actions
