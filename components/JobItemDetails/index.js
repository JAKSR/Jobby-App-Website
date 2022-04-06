import React from 'react'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLocationPlus} from 'react-icons/bi'
import {FiExternalLink} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Skills from '../Skills'
import SimilarCards from '../SimilarCards'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    selectedJobData: '',
    similarJobsData: [],
    jobApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSelectedJobData()
  }

  getFormattedJobDetailsData = each => ({
    companyLogo: each.company_logo_url,
    companyWebsite: each.company_website_url,
    jobDescription: each.job_description,
    employmentType: each.employment_type,
    location: each.location,
    rating: each.rating,
    title: each.title,
    lpa: each.lpa,
    id: each.id,
    skills: each.skills.map(eachSkill => ({
      name: eachSkill.name,
      skillsImageUrl: eachSkill.image_url,
    })),
    description: each.life_at_company.description,
    compImageUrl: each.life_at_company.image_url,
  })

  getFormattedSimilarJobData = job => ({
    title: job.title,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    id: job.id,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
  })

  getSelectedJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      jobApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const newSelectedJobData = this.getFormattedJobDetailsData(
        data.job_details,
      )

      const newSimilarJobsData = data.similar_jobs.map(similarJob =>
        this.getFormattedSimilarJobData(similarJob),
      )

      this.setState({
        jobApiStatus: apiStatusConstants.success,
        selectedJobData: newSelectedJobData,
        similarJobsData: newSimilarJobsData,
      })
    }
    if (response.status === 404) {
      this.setState({
        jobApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSelectedJobSuccess = () => {
    const {selectedJobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      skills,
      compImageUrl,
      description,
    } = selectedJobData

    return (
      <>
        <div className="clicked-job-card">
          <h1>Job Card</h1>
          <div className="job-card-li">
            <div className="jobs-card-link">
              <div className="job-card-img-div">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
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

              <div className="desc-hd-visit-link-div">
                <h1 className="job-title">Description</h1>
                <div>
                  <a href={companyWebsiteUrl} className="visit-link">
                    Visit
                  </a>
                  <FiExternalLink className="pin pin-clr" />
                </div>
              </div>
              <p className="description">{jobDescription}</p>
              <h1 className="skills-hd">Skills</h1>
              <ul className="skills-ul">
                {skills.map(eachSkill => (
                  <Skills key={eachSkill.id} skillDetails={eachSkill} />
                ))}
              </ul>
              <h1 className="life-at-cmp-hd">Life at Company</h1>
              <div className="desc-img-div">
                <p className="desc">{description}</p>
                <img
                  src={compImageUrl}
                  alt="life at company"
                  className="desc-img"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-div">
          <h1 className="sim-jobs-h1">Similar Jobs</h1>
          <ul className="similar-ul">
            {similarJobsData.map(eachCard => (
              <SimilarCards key={eachCard.id} cardDetails={eachCard} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSelectedJobFailure = () => <h1 className="white">Job Search Failed</h1>

  renderSelectedJobDetails = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case apiStatusConstants.success:
        return this.renderSelectedJobSuccess()
      case apiStatusConstants.failure:
        return this.renderSelectedJobFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-card-app-div">
          {this.renderSelectedJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
