import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const movieAdapter = createEntityAdapter()

export const fetchMovie = createAsyncThunk('movieSlice/fetchMovie',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_VODIA_API_ENDPOINT}/frontend/home/unauthenticated?front=home`
            )
            const data = response.data.data

            return data
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    })

const movieSlice = createSlice({
    name: 'movie',
    initialState: movieAdapter.getInitialState({ error: null }),
    reducers: {},
    extraReducers: {
        [fetchMovie.fulfilled]: (state, action) => {
            movieAdapter.upsertMany(state, action.payload)
        },

        [fetchMovie.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

// export const {
//     selectAll: selectAllMovieVideos,
//     selectById: selectMovieById,
// } = movieAdapter.getSelectors(state => state.movie)

export const movieSelectors = movieAdapter.getSelectors(state => state.movie)

export const selectMovieError = state => state.movie.error

export default movieSlice.reducer
