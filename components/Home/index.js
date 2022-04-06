import {withRouter, Link} from 'react-router-dom'
import React from 'react'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props

    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-div">
        <div className="details-div">
          <h1 className="home-hd">Find the job that Fits your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company details. Find the job that Fits your Life.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              onClick={onClickFindJobs}
              className="home-btn home-link"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default withRouter(Home)
