import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLocationPlus} from 'react-icons/bi'

import './index.css'

const SimilarCards = props => {
  const {cardDetails} = props
  const {
    title,
    companyLogoUrl,
    empType,
    jobDescription,
    location,
    rating,
  } = cardDetails

  return (
    <li className="similar-card-li">
      <div className="job-card-img-div">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="job-card-logo-para-div">
          <h1 className="job-title">{title}</h1>
          <div className="star-div">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-title">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-div">
        <BiLocationPlus className="pin" />
        <p className="job-card-location">{location}</p>
        <BsBriefcaseFill className="pin" />
        <p className="job-card-location">{empType}</p>
      </div>
    </li>
  )
}

export default SimilarCards
