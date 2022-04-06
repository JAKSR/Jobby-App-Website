import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-div">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="links-div">
        <li className="home-li">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="home-li">
          <Link to="/jobs" className="link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={onClickLogout} className="btn">
        Logout
      </button>
      <ul className="mobile-btn">
        <li className="home-li">
          <Link to="/">
            <AiFillHome className="mobile-logos" />
          </Link>
        </li>
        <li className="home-li">
          <Link to="/jobs">
            <BsBriefcaseFill className="mobile-logos" />
          </Link>
        </li>

        <li className="home-li">
          <button
            type="button"
            onClick={onClickLogout}
            className="mobile-logout"
          >
            <FiLogOut className="mobile-logos" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
