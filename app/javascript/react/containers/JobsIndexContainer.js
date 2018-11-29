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

  render() {
    let mappedCompanies;

    if(this.state.jobs.length > 0){
      mappedCompanies = this.state.jobs.map(job => {
        return(
          <JobTile
            id = {job.id}
            key = {job.id}
            company = {job.company}
            url = {job.url}
            interest = {job.interest}
          />
        )
      })
    }

    return(
      <div>
        <h1 className="index-logo">Welcome to Job Recorder!</h1>
        <JobsFormContainer
          handleJobsChange = {this.handleJobsChange}
        />
        {mappedCompanies}
      </div>
    )
  }
}

export default JobsIndexContainer;
