import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Footer from 'components/Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function LegalNotices() {
  const slug = window.location.href.split('/')[3]
  console.log(slug);

    const [ legalNotices, setLegalNotices ] = useState({
      title: '',
      body: ''
    });

    useEffect(() => {
      const getLegalNotices = async () => {
        await axios.get(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/page/${slug}`)
        .then(res => {
          console.log(res.data.data)
          setLegalNotices(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
      getLegalNotices();
    }, [])

    const legalNoticesFooter = `${ legalNotices?.body }`;
    console.log(parse(legalNoticesFooter))

  return (
    <div className="App">
      <div className='container'>
      <Link to="/">
        <FontAwesomeIcon className="ExtraOptions" size="sm" icon={faArrowLeft} />
      </Link>
        <>
        <h2 className='title'>{`${legalNotices?.title}`}</h2>
          <p className='articleContent'>
            {parse(legalNotices?.body)}</p>
        </>
      </div>
        <Footer />
      </div>
  );
}

export default LegalNotices;
