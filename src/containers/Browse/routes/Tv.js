import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import NewBrowseContent from '../BrowseContent/NewBrowseContent'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'
import { selectAllTrendingVideos, selectTrendingError } from 'store/reducers/slices/trendingSlice'
import { fetchMovie, movieSelectors, selectMovieError } from 'store/reducers/slices/tvByGenreSlice'

const Tv = () => {
    const trendingVideos = useSelector(selectAllTrendingVideos)
    // console.log(trendingVideos);
    // const topRatedVideos = useSelector(selectAllTopRatedVideos)
    // const netflixOriginals = useSelector(selectAllNetflixOriginals)
    const fetchMovies = useSelector(movieSelectors.selectAll);

    const trendingError = useSelector(selectTrendingError)
    // const topRatedError = useSelector(selectTopRatedError)
    // const netflixError = useSelector(selectNetflixError)
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
            // <ErrorPage errors={[trendingError, topRatedError, netflixError]} />
            <ErrorPage errors={[trendingError]} />
        )
    }

    return component
}

export default Tv