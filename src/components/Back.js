import React from 'react'
import { ArrowBack } from "@material-ui/icons";
import "./back.css";
import { Link } from 'react-router-dom';



export default function Back() {
  return (
    <>
    <div className='backShare'>
      <Link to='/'>
      <div className='back'>
        <ArrowBack className="icon" />
      </div>
      </Link>
    </div>
    </>
  )
}

