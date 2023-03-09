import { configureStore } from "@reduxjs/toolkit";
import bucketNamesSlice from './bucketNames-slice';
import multipleIdSlice from "./multiple-slice";
import mediaLinkSlice from './mediaLink-slice';

const store = configureStore({
    reducer: {
        bucketNames: bucketNamesSlice.reducer,
        multiple: multipleIdSlice.reducer,
        mediaLink: mediaLinkSlice.reducer
    }
})

export default store;