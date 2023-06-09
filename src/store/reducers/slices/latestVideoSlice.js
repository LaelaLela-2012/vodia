import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const fetchLatestVideos = createAsyncThunk('latestVideoSlice/fetchLatestVideos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Promise.all([
                axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}`)
                    .then(response => ({ title: "Latest Movies", videos: response.data.results })),
                axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}`)
                    .then(response => ({ title: "Latest TV Shows", videos: response.data.results }))
            ])

            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    })

const initialState = {
    latestVideos: [],
    status: 'idle',
    error: null
}

const latestVideoSlice = createSlice({
    name: 'latestVideos',
    initialState: initialState,
    extraReducers: {
        [fetchLatestVideos.pending]: (state, _) => {
            state.status = 'loading'
        },

        [fetchLatestVideos.fulfilled]: (state, action) => {
            action.payload.forEach(latestVideo => {
                state.latestVideos.push({ ...latestVideo })
            })

            state.status = 'success'
        },

        [fetchLatestVideos.rejected]: (state, action) => {
            state.status = 'error'
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const selectLatestVideos = state => state.latestVideos

export default latestVideoSlice.reducer