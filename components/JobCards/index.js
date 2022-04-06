import {Link} from 'react-router-dom'
import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLocationPlus} from 'react-icons/bi'

import './index.css'

const JobCards = props => {
  const {jobCardDetails} = props
  const {
    id,
    title,
    location,
    rating,
    jobDescription,
    companyLogoUrl,
    employmentType,
    packagePerAnnum,
  } = jobCardDetails

  return (
    <>
      <li className="job-card-li">
        <Link to={`/jobs/${id}`} className="jobs-card-link">
          <div className="job-card-img-div">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <div className="location-LPA-div">
            <div className="location-div">
              <BiLocationPlus className="pin" />
              <p className="job-card-location">{location}</p>
              <BsBriefcaseFill className="pin" />
              <p className="job-card-location">{employmentType}</p>
            </div>
            <p className="lpa">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="job-title">Description</h1>
          <p className="description">{jobDescription}</p>
        </Link>
      </li>
    </>
  )
}

export default JobCards
