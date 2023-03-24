import React from 'react'
import './VideoModal.css'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import { getSeasonsOrMovieLength } from 'utils/time'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/UI/Button/Button'
import useHoverStyleButton from 'hooks/useHoverStyleButton'
import { Link } from 'react-router-dom';


if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

// Don't move this to css; it has to be here for the shouldCloseOnOverlay prop to work 
const overlayStyle = {
    overlay: {
        backgroundColor: 'rgba(17,17,17,0.7)'
    }
}

const VideoModal = props => {
    const { videoDetailModal, closeModalHandler, videoInfo } = props
    const [buttonHovered, onButtonHoverHandler] = useHoverStyleButton({
        'playButton': true,
        'plusButton': true
    })

    const {
        vote_average, seasons, runtime,
        video_trailer, backdrop_path, poster_path, title, name, first_air_date, description, 
         duration
    } = videoInfo

    const voteAverage = vote_average * 10
    const voteStyle = { color: voteAverage > 49 ? '#46d369' : 'red' }
    const videoTime = getSeasonsOrMovieLength(seasons, runtime)

    const styles = {
        backgroundImage: `url(${backdrop_path}`,
        backgroundSize: 'cover'
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + '...' : str;
    }
    
    return (
        <Modal
            className="ModalStyles"
            style={overlayStyle}
            isOpen={videoDetailModal}
            contentLabel="Modal is open"
            shouldCloseOnOverlayClick
            onRequestClose={closeModalHandler}
        >
            {/* <div className="VideoDetailSection"> */}
            <div className="VideoDetailSection" style={styles}>
            {/* <video src={video_trailer} autoPlay={true} loop muted /> */}
                <FontAwesomeIcon onClick={closeModalHandler} style={{ color: 'white', float: 'right', padding: '14px', cursor: 'pointer' }}
                    size="2x"
                    icon={faTimes}
                />
                <div className="shadowedSection">
                    <h1>{title || name}</h1>
                    <div className="Overview">{parse((description))}</div>
                    <div className="horizontalStyles">
                        {/* <Link to={`/newplayer/${videoInfo.id}`}> */}
                        <Link to={`/play/${videoInfo.id}`}>
                            <Button
                                backgroundColor="#fff"
                                margin-left='10px'
                                textColor="rgb(24, 24, 24)"
                                playButton
                                height="38px"
                                width="138px"
                                padding="0 !important"
                                image
                                icon={faPlay}
                                onButtonHover={() => onButtonHoverHandler('playButton')}
                                hoverStatus={buttonHovered['playButton']}>
                                Play
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(VideoModal)