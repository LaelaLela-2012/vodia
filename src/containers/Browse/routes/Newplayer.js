import React, { useEffect, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import axios from 'axios';
import './newplayer.css';
import { ShareOutlined } from "@material-ui/icons";
import Modal from './components/Modal';
import NewBrowseContentNoBanner from 'containers/Browse/BrowseContent/BrowseContentNoBanner';
import Footer from 'components/Footer/Footer';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShare, faTimes } from '@fortawesome/free-solid-svg-icons'


export default function NewPlayer({match}) {

  const id = match.params.id;

  const [ movie, setMovie ] = useState({
    video_url: '',
    subtitle: {},
    audio: {},
  });

  useEffect(() => {
    const fetchVideo = async  () => {
      return await axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/movie/${id}/detail`).then(res => {
        const data = res.data.data;

        const type = data.type;

        if(type === "film") {
          const video = data.video.video_url;
          setMovie(data.video);

          //inisialiasi player ketika sudah mendapatkan data video
          initPlayer(video);
        }

        if(type === "series") {
          //inisialiasi player ketika sudah mendapatkan data & mendapatkan video season 1 episode 1
          const video = data.seasons[0].episodes[0].video.video_url;
          initPlayer(video)
        }
      }); 
    }

    fetchVideo();

  }, [id]);

  const initPlayer = (videoUrl) => {
    console.log('loading player');
      var video = document.querySelector('video');
    
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
        });
      }
      
      new Plyr(video)
  }

  const [ video, setVideo ] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);

  const getRelatedMovies = async () => {
    return await axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/movie/${id}/get-related-movies`)
  }

  useEffect(() => {
    getRelatedMovies().then((res) => {
      const movies = res.data.data.movies
      setRelatedMovies(movies)
    })
  }, [])

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const myComponentStyle = {
    fill: 'currentColor',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: '0',
    userSelect: 'none',
    position: 'absolute',
    color: '#fff',
    zIndex: '100',
    right: '0',
    margin: '20px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none'
  }

  const playerStyle = {
    backgroundColor: 'black'
  }

  let videoSection = [];
  let component;

  if(relatedMovies.length > 0) {
    videoSections.push({title: 'Related Movies', videos: relatedMovies})
    if(videoSections.length > 0) {
        component = <NewBrowseContentNoBanner videoSections={videoSections} />
    }
  }

  console.log(component)
    
  return (
    <div style={playerStyle}>
    <div>
    <Link to="">
        <FontAwesomeIcon className="ExtraOptions" size="sm" icon={faArrowLeft} />
      </Link>
      {!show && <button onClick={openModal} style={myComponentStyle}><ShareOutlined /></button>}
      <Modal closeModal={closeModal} show={show} />
        <video controls crossOrigin="true" playsInline>
        </video>
    </div>
    {component}
    <Footer />
  </div>
  )
}