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
    this.handleApply = this.handleApply.bind(this)
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

  handleApply(updatePayload) {
    fetch(`/api/v1/jobs/${updatePayload.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(updatePayload),
      headers: { 'Content-Type': 'application/json' }
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
      body.applied = false
      let updatedJobIndex = this.state.jobs.indexOf(body)
      body.applied = true
      let newJobs = this.state.jobs
      newJobs.splice(updatedJobIndex, 1, body);
      this.setState({jobs: newJobs})
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
        let handleApply = () => {
          job.applied = true
          this.handleApply(job)
        }
        return(
          <JobTile
            applied = {job.applied}
            id = {job.id}
            key = {job.id}
            company = {job.company}
            url = {job.url}
            interest = {job.interest}
            handleDelete={handleDelete}
            handleApply={handleApply}
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
