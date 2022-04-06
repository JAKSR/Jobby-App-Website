import React from 'react'
import './index.css'

const NotFound = () => (
  <div className="not-found-div">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-hd">Page Not Found</h1>
    <p className="not-found-para">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
