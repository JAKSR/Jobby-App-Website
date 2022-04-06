import React from 'react'
import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {skillsImageUrl, name} = skillDetails

  return (
    <li className="skills-li">
      <div className="skills-div">
        <img src={skillsImageUrl} alt={name} className="skill-img" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default Skills
