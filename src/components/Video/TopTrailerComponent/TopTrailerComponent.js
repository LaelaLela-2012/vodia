import React from 'react'
import './TopTrailerComponent.css'

const TopTrailerComponent = (props) => {
    const videoBg = {
        backgroundVideo: `url(${props.videoUrl})`
    }

    const trailer="https://storage.vodia.id/voi.tv/Videos/Bharada%20E%20Dapat%20Perlindungan%20Darurat,%20Ini%20Kata%20LPSK_VP8.webm"

    return (
            <div className="VideoComponent">
            <video src={trailer} autoPlay={true} loop muted className='VideoComponent'>
                {props.children}
            </video>
        </div>
    )
}

export default TopTrailerComponent