import React, { Component } from 'react'

const JobTile = (props) => {
  let trash;
  if(props.handleDelete != undefined){
    trash = <i className="far fa-trash-alt" onClick={props.handleDelete} id="trash"></i>
  }
  return (
  <div key={props.id} className="job-item">
    <p><a href={props.url} target="_blank">{props.company}</a>&nbsp; {props.interest}
      <span>&nbsp;{trash}</span>
    </p>
  </div>
  )
}

export default JobTile;
