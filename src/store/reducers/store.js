import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import trendingReducer from './slices/trendingSlice'
import topRatedReducer from './slices/topratedSlice'
import netflixOriginalsReducer from './slices/netflixOriginalsSlice'
import moviesByGenresReducer from './slices/moviesByGenreSlice'
import tvByGenresReducer from './slices/tvByGenreSlice'
import latestVideoReducer from './slices/latestVideoSlice'
import movieSlice from './slices/movieSlice'
import moviesByGenresSlice from './slices/moviesByGenreAuthSlice'
import tvByGenresSlice from './slices/tvByGenreAuthSlice'
import movieAuthSlice from './slices/movieAuthSlice'

const store = configureStore({
    reducer: {
        trending: trendingReducer,
        toprated: topRatedReducer,
        netflixOriginals: netflixOriginalsReducer,
        moviesByGenre: moviesByGenresReducer,
        tvByGenre: tvByGenresReducer,
        latestVideos: latestVideoReducer,
        movie: movieSlice,
        moviesByGenresAuth: moviesByGenresSlice,
        tvByGenreAuthSlice: tvByGenresSlice,
        movieAuth: movieAuthSlice
    },
    // Clear this in production, as it is done by default 
    middleware: [...getDefaultMiddleware({ immutableCheck: false })]
})

export default store 
