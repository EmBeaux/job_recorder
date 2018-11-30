import React, { Component } from 'react'

const JobTile = (props) => {
  let trash;
  let mark;


  if(props.handleDelete != undefined){
    trash = <i className="far fa-trash-alt" onClick={props.handleDelete} id="trash"></i>
    if(props.applied){
      mark = <i className="fas fa-check"></i>
    }else{
      mark = <i className="fas fa-times" onClick={props.handleApply} id="false-apply"></i>
    }
  }

  return (
  <div key={props.id} className="job-item">
    <p><a href={props.url} target="_blank">{props.company}</a>&nbsp; {props.interest}
      <span>&nbsp;{trash}&nbsp;{mark}</span>
    </p>
  </div>
  )
}

export default JobTile;
