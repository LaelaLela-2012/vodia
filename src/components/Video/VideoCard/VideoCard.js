import React, { useState } from "react"
import './VideoCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import CircularSoundButton from "components/UI/CircularSoundButton/CircularSoundButton"

const videoCard = (props) => {

    const {
        name, poster_path, genres, release_date, maturity_rating, duration, type, video_trailer, time_duration, trailer_path
    } = props

    const [isHovered, setIsHovered] = useState(false);
    
    const genreList = genres && genres.map((genres, index) => (
        <span key={genres.id}>
            {index !== genres.length - 1 ? '●' : null}{genres} &nbsp;
        </span>

    ))

    const style = {
        border: '1px solid gray', padding: '1px 3px', margin: '0 2px', margin: '0 3px'
    }

    
    const [topTrailerSoundOn, setTopTrailerSoundOn] = useState(true)
    const topTrailerSoundButtonClickHandler = () => setTopTrailerSoundOn(prevState => !prevState)

    return (
        <div className="VideoCard" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} >
            <img src={poster_path} alt="" />
            {isHovered && (
                <>
                    <video src={trailer_path} autoPlay={true} loop  />
                <div className="VideoInfo">
                <div className='playIconBtn'>
                    <FontAwesomeIcon className="ExtraOptions" size="sm" icon={faPlay} />
                </div>
                <CircularSoundButton
                    topTrailerSoundButtonClickHandler={topTrailerSoundButtonClickHandler}
                    topTrailerSoundOn={topTrailerSoundOn} />
                    <span>{release_date}</span>
                    <span style={style}>{maturity_rating}</span><br/>
                    <h6>{name}</h6>
                    <span>{genreList}</span>
                    {/* <span>{release_date}</span> */}
                    {/* <span>{genreList}</span> */}
                </div>
                </>
            )}
            
        </div>
    )
}

export default React.memo(videoCard)