import React from 'react'
import './index.css'

const SalaryList = props => {
  const {salaryDetails, changeLpaType} = props
  const {label, salaryRangeId} = salaryDetails

  const onChangeLpaType = () => {
    changeLpaType(salaryRangeId)
  }

  return (
    <>
      <li className="sal-li-style">
        <input id={salaryRangeId} type="radio" onChange={onChangeLpaType} />
        <label htmlFor={salaryRangeId} className="sal-label">
          {label}
        </label>
      </li>
    </>
  )
}

export default SalaryList
