import React, { Component } from 'react'

const JobTile = (props) => {

  return (
  <ul key={props.id} className="job-item">
    <li><a href={props.url} target="_blank">{props.company}</a></li>
    <li>{props.interest}</li>
  </ul>
  )
}

export default JobTile;
