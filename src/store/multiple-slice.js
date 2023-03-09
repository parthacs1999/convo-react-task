import { createSlice } from "@reduxjs/toolkit";



const multipleIdSlice = createSlice({
    name: 'multiple',
    initialState: {
        idData: []
    },
    reducers: {
        updateIds(state, action) {
            const newId = action.payload;
            if (state.idData.indexOf(newId) > -1) {
                state.idData.splice(state.idData.indexOf(newId), 1);
                return;
            }
            state.idData.push(action.payload);
        }
    }
})

export const multipleSliceAction = multipleIdSlice.actions;
export default multipleIdSlice;