import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import NewBrowseContent from '../BrowseContent/NewBrowseContent'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'
import { selectAllTrendingVideos, selectTrendingError } from 'store/reducers/slices/trendingSlice'
import { fetchMovie, movieSelectors, selectMovieError } from 'store/reducers/slices/movieSlice'

const Home = () => {
    const trendingVideos = useSelector(selectAllTrendingVideos)
    const fetchMovies = useSelector(movieSelectors.selectAll);

    const trendingError = useSelector(selectTrendingError)
    const moviesError = useSelector(selectMovieError);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovie())
    }, [dispatch])

    

    let videoSections = []

    let component 
    if (!trendingError && !moviesError) {


        fetchMovies.forEach((item, index) => {
            videoSections.push({title: item.name, videos: item.movies})
        });

        component = null;
        
        if(videoSections.length > 0) {
            component = <NewBrowseContent videoSections={videoSections} />
        }
    } else {
        component = (
            <ErrorPage errors={[trendingError]} />
        )
    }

    return component
}

export default Home