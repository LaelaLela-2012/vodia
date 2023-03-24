import React, { useState } from 'react'
import './BrowseContent.css'
import TopTrailerComponent from 'components/Video/TopTrailerComponent/TopTrailerComponent'
import Button from 'components/UI/Button/Button'
import VideoCarousel from 'components/Video/VideoCarousel/VideoCarousel'
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { buildVideoModal } from 'utils/transformations'
import useVideoInfoHandlers from 'hooks/useVideoInfoHandlers'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'
import useHoverStyleButton from 'hooks/useHoverStyleButton'
import CircularSoundButton from 'components/UI/CircularSoundButton/CircularSoundButton'
import parse from 'html-react-parser'


const NewBrowseContent = props => {
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
    
    // const trailer=`${firstVideo ? firstVideo.video_trailer: null}`
    const trailer= `${firstVideo ? firstVideo.video_trailer: null}`

    return (!videoInfoError ? (
        <div className="BrowseContent">
            <video src={trailer} preload='true' autoPlay={true} loop muted className='VideoComponent' />
            <div className="TextsAndButtons">
                <div className="verticalItem" >
                    <h3 > {firstVideo ? (firstVideo.name || firstVideo.title) : null} </h3>
                    <span>{parse(firstVideo ? firstVideo.description || firstVideo.overview : null)}</span>
                    {/* <span>{parse(truncate((firstVideo ? firstVideo.description || firstVideo.overview : null), 150))}</span> */}
                    {/* <span> {firstVideo ? firstVideo.video_trailer: null} </span> */}
                    <div className="horizontalButtonsHolder">
                        <Button backgroundColor="#fff"
                            textColor="rgb(24, 24, 24)"
                            playButton image icon={faPlay}
                            onButtonHover={
                                () => onButtonHoverHandler('playButton')}
                            hoverStatus={buttonHovered['playButton']} >
                            Play
                        </Button>

                        {/* <Button backgroundColor="rgba(133, 133, 133, 0.6)"
                            textColor="white"
                            playButton image icon={faInfoCircle}
                            onButtonHover={
                                () => onButtonHoverHandler('infoButton')}
                            hoverStatus={buttonHovered['infoButton']} >
                            More Info </Button> */}
                    </div>
                </div>
                {/* <div className='verticalItem'>
                    <CircularSoundButton
                        topTrailerSoundButtonClickHandler={topTrailerSoundButtonClickHandler}
                        topTrailerSoundOn={topTrailerSoundOn} />
                </div> */}
            </div>
            <div className="Carousels">
                {carousels}
            </div>
            {detailModalComponent}

        </div>) :
        <ErrorPage errors={videoInfoError} />
    )
}

export default NewBrowseContent