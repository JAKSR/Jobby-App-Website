import React from 'react'
import './index.css'

const TypeOfEmpList = props => {
  const {empDetails, changeEmpType} = props
  const {label, employmentTypeId} = empDetails

  const onChangeEmpType = () => {
    changeEmpType(employmentTypeId)
  }

  return (
    <>
      <li className="li-style">
        <input
          id={employmentTypeId}
          type="checkbox"
          onChange={onChangeEmpType}
        />
        <label htmlFor={employmentTypeId} className="emp-label">
          {label}
        </label>
      </li>
    </>
  )
}

export default TypeOfEmpList
