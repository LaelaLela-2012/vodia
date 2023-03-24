import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Footer from 'components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function ContactUs(match) {
    const slug = window.location.href.split('/')[3]
    console.log(slug);

    const [ contactUs, setContactUs ] = useState({
      title: '',
      body: ''
    });

    useEffect(() => {
      const getContactUs = async () => {
        await axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/page/${slug}`)
        .then(res => {
          console.log(res.data.data)
          setContactUs(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
      getContactUs();
    }, [])

    const contactUsFooter = `${ contactUs?.body }`;
    console.log(parse(contactUsFooter))

  return (
    <div className="App">
      <div className='container'>
      <Link to="/">
        <FontAwesomeIcon className="ExtraOptions" size="sm" icon={faArrowLeft} />
      </Link>
        <>
        <h2 className='title'>{`${contactUs?.title}`}</h2>
          <p className='articleContent'>
            {parse(contactUs?.body)}</p>
        </>
      </div>
        <Footer />
      </div>
  );
}

export default ContactUs;
