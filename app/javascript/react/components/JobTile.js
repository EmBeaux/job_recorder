import React, { Component } from 'react'

const JobTile = (props) => {

  return (
  <ul className="small-block-grid-3" key={props.id}>
    <li>{props.company}</li>
    <li>{props.url}</li>
    <li>{props.interest}</li>
  </ul>
  )
}

export default JobTile;
