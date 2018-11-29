import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import JobsFormContainer from './JobsFormContainer'
import JobTile from '../components/JobTile.js'

class JobsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
    this.handleJobsChange = this.handleJobsChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let endpoints = [`/api/v1/jobs`]

    let promises = endpoints.map((endpoint) => {
      return fetch(endpoint)
    })

    Promise.all(promises).then((responses) =>{
      let parsedResponses = responses.map((response) => {
        return response.json();
      })
      return Promise.all(parsedResponses)
    })
    .then(responses => {
      this.setState({
        jobs: responses[0],
      })
    })
  }

  handleJobsChange(payload){
    payload.id = this.state.jobs[this.state.jobs.length - 1].id + 1
    let newJobs = this.state.jobs.concat(payload)
    this.setState({jobs: newJobs})
  }

  handleDelete(id) {
    let newJobs = this.state.jobs.filter(job => job.id != id )
    this.setState({jobs: newJobs})
    fetch(`/api/v1/jobs/${id}`,{
      credentials: 'same-origin',
      method: "delete"
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    let mappedCompanies =
    <JobTile
      company = "Click this link to get Started!"
      url = "http://www.indeed.com"
      interest = "Come back when you are ready to start adding jobs."
    />

    if(this.state.jobs.length > 0){
      mappedCompanies = this.state.jobs.map(job => {
        let handleDelete = () => {
          this.handleDelete(job.id)
        }
        return(
          <JobTile
            id = {job.id}
            key = {job.id}
            company = {job.company}
            url = {job.url}
            interest = {job.interest}
            handleDelete={handleDelete}
          />
        )
      })
    }

    return(
      <div>
        <h1 className="index-logo">Welcome to Job Recorder!</h1>
        <div className="row">
          <JobsFormContainer
            handleJobsChange = {this.handleJobsChange}
          />
          <div className="small-2 large-4 columns">
            <h2>List of Jobs</h2>
            {mappedCompanies}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsIndexContainer;
