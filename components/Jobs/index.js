import React from 'react'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import TypeOfEmpList from '../TypeOfEmpList'
import SalaryList from '../SalaryList'
import JobCards from '../JobCards'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    userSearch: '',
    empType: '',
    lpaType: '',
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    profileData: [],
    jobsData: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetailsList()
  }

  getJobsDetailsList = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })
    const {userSearch, empType, lpaType} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${lpaType}&search=${userSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
      }))
      this.setState({
        jobsData: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsFailure = () => {
    const onClickRetryJobs = () => {
      this.getJobsDetailsList()
    }

    return (
      <div className="jobs-fail-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure view"
          className="jobs-fail-img"
        />
        <h1 className="jobs-fail-hd">Oops! Something Went Wrong</h1>
        <p className="jobs-fail-para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={onClickRetryJobs}
          className="profile-fail-btn"
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobsSuccess = () => {
    const {jobsData} = this.state

    return (
      <ul className="jobs-list-ul">
        {jobsData.map(eachItem => (
          <JobCards key={eachItem.id} jobCardDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getProfileDetails = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearch = event => {
    this.setState({userSearch: event.target.value})
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {name, shortBio, profileImageUrl} = profileData

    return (
      <>
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="h1">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </>
    )
  }

  renderProfileFailure = () => {
    const onClickRetry = () => {
      this.getProfileDetails()
    }

    return (
      <>
        <div className="profile-fail-div">
          <button
            type="button"
            onClick={onClickRetry}
            className="profile-fail-btn"
          >
            Retry
          </button>
        </div>
      </>
    )
  }

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickSearch = () => {
    const {userSearch} = this.state
    this.setState({userSearch}, this.getJobsDetailsList)
  }

  changeEmpType = empTypeId => {
    this.setState({empType: empTypeId}, this.getJobsDetailsList)
  }

  changeLpaType = lpaTypeId => {
    this.setState({lpaType: lpaTypeId}, this.getJobsDetailsList)
  }

  render() {
    const {userSearch} = this.state

    return (
      <>
        <Header />
        <div className="job-app-div">
          <div className="left-div">
            <div className="mobile-search-div">
              <input
                type="search"
                value={userSearch}
                onChange={this.onChangeSearch}
                placeholder="Search"
                className="search"
              />
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-div">{this.renderProfile()}</div>
            <hr className="hr" />
            <h1 className="job-heading">Type of Employment</h1>
            <ul className="ul-div">
              {employmentTypesList.map(each => (
                <TypeOfEmpList
                  key={each.employmentTypeId}
                  empDetails={each}
                  changeEmpType={this.changeEmpType}
                />
              ))}
            </ul>
            <hr className="hr" />
            <h1 className="job-heading">Salary Range</h1>
            <ul className="ul-div">
              {salaryRangesList.map(each => (
                <SalaryList
                  key={each.salaryRangeId}
                  salaryDetails={each}
                  changeLpaType={this.changeLpaType}
                />
              ))}
            </ul>
          </div>

          <div className="right-div">
            <div className="search-div">
              <input
                type="search"
                value={userSearch}
                onChange={this.onChangeSearch}
                placeholder="Search"
                className="search"
              />
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
