import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const netflixAdapter = createEntityAdapter()

export const fetchNetflixOriginals = createAsyncThunk('netflixOriginalsSlice/fetchNetflixOriginals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_VODIA_API_ENDPOINT}`
            )
            return response.data.results
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    })

const netflixOriginalsSlice = createSlice({
    name: 'netflixOriginals',
    initialState: netflixAdapter.getInitialState({ error: null }),
    extraReducers: {
        [fetchNetflixOriginals.fulfilled]: (state, action) => {
            netflixAdapter.upsertMany(state, action.payload)
        },

        [fetchNetflixOriginals.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const {
    selectAll: selectAllNetflixOriginals
} = netflixAdapter.getSelectors(state => state.netflixOriginals)
export const selectNetflixError = state => state.netflixOriginals.error

export default netflixOriginalsSlice.reducer 