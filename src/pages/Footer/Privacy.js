import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Footer from 'components/Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Privacy(match) {
  const slug = window.location.href.split('/')[3]
  console.log(slug)
    
    const [ privacy, setPrivacy ] = useState({
      title: '',
      body: ''
    });

    useEffect(() => {
      const getPrivacy = async () => {
        await axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/page/${slug}`)
        .then(res => {
          console.log(res.data.data)
          setPrivacy(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
      getPrivacy();
    }, [])

    const privacyFooter = `${ privacy?.body }`;
    console.log(parse(privacyFooter))

  return (
    <div className="App">
      <div className='container'>
      <Link to="/">
        <FontAwesomeIcon className="ExtraOptions" size="sm" icon={faArrowLeft} />
      </Link>
        <>
        <h2 className='title'>{`${privacy?.title}`}</h2>
          <p className='articleContent'>
            {parse(privacy?.body)}</p>
        </>
      </div>
        <Footer />
      </div>
  );
}

export default Privacy;
