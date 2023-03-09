import { createSlice } from "@reduxjs/toolkit";

const bucketNamesSlice = createSlice({
    name: 'bucketNames',
    initialState: {
        bucketNames: []
    },
    reducers: {
        updatebucketNames(state, action) {
            let newBucketName = action.payload;
            if (state.bucketNames.length === 0) {
                state.bucketNames.push(newBucketName);
            }
            else if (state.bucketNames.indexOf(newBucketName) > -1) {
                return
            }
            else {
                state.bucketNames.push(newBucketName);
            }
        }
    }

})
export const bucketNamesAction = bucketNamesSlice.actions;
export default bucketNamesSlice;