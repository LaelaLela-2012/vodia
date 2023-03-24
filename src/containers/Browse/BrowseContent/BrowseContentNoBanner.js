import React, { useState } from 'react'
import './BrowseContent.css'
import VideoCarousel from 'components/Video/VideoCarousel/VideoCarousel'
import { buildVideoModal } from 'utils/transformations'
import useVideoInfoHandlers from 'hooks/useVideoInfoHandlers'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'
import useHoverStyleButton from 'hooks/useHoverStyleButton'


const NewBrowseContentNoBanner = props => {
    const [stateVideoSections, setVideoSection] = useState({
        title : '',
        videos : []
    });

    const [
        videoInfo, videoInfoError, detailModal, cardClickHandler,
        cardHoverHandler, closeModalHandler
    ] = useVideoInfoHandlers()

    const [buttonHovered, onButtonHoverHandler] = useHoverStyleButton({
        'playButton': true,
        'infoButton': true
    })

    const [topTrailerSoundOn, setTopTrailerSoundOn] = useState(true)

    const { videoSections } = props
     
    const [firstVideo, ...remainingVideos] = videoSections[0].videos
    // const imageUrl = firstVideo ? `${firstVideo.backdrop_path}` : null
    const videoUrl = firstVideo ? `${firstVideo.video_trailer}` : null
 
    const detailModalComponent = buildVideoModal(detailModal, videoInfo, { closeModalHandler })

    const carousels = videoSections.map((videoSection, index) => {
        // console.log(videoSection);
       return <VideoCarousel key={videoSection.title}
            carouselName={videoSection.title}
            carouselVideo={index === 0 ? remainingVideos : videoSection.videos}
            carouselClickHandler={cardClickHandler}
            carouselHoverHandler={cardHoverHandler}
            videoInfo={videoInfo}
            videoDetailModal={detailModal}
        />
})

    const topTrailerSoundButtonClickHandler = () => setTopTrailerSoundOn(prevState => !prevState)

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + '...' : str;
    }
    
    return (!videoInfoError ? (
        <div className="BrowseContent">
            <div className="Carousels">
                {carousels}
            </div>
            {detailModalComponent}

        </div>) :
        <ErrorPage errors={videoInfoError} />
    )
}

export default NewBrowseContentNoBanner