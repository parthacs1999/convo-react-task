import { createSlice } from "@reduxjs/toolkit";

const mediaLinkSlice = createSlice({
    name: 'mediaLink',
    initialState: {
        link: '',
        type: ''
    },
    reducers: {
        getLink(state, action) {
            state.link = action.payload.link;
            state.type = action.payload.type.toLowerCase()
        }
    }
})

export const MediaLinkAction = mediaLinkSlice.actions;
export default mediaLinkSlice;