import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import TextField from '../components/TextField.js'
class JobsFormContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: "",
        interest: "0",
        url: "",
        error: "",
        applied: false
      }
      this.handleURLChange = this.handleURLChange.bind(this)
      this.handleInterestChange = this.handleInterestChange.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleAppliedChange = this.handleAppliedChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleURLChange(event) {
    this.setState({url: event.target.value})
    }

    handleNameChange(event) {
      this.setState({name: event.target.value})
    }

    handleInterestChange(event) {
      this.setState({interest: event.target.value})
    }
    handleAppliedChange(event) {
      this.setState({applied: event.target.value})
    }

    handleClear() {
      this.setState({
        name: "",
        interest: "",
        url: ""
      })
    }

    handleSubmit(event){
      event.preventDefault()
      let createdJob;

        createdJob = {
          company: this.state.name,
          interest: this.state.interest,
          url: this.state.url,
          applied: this.state.applied
        }
      fetch('/api/v1/jobs', {
        credentials: 'same-origin',
        method: "post",
        body: JSON.stringify(createdJob),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
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
        this.setState({error: ""})
        this.props.handleJobsChange(body)
        this.handleClear()
      })
      .catch(error => {
        this.setState({ error })
      });
    }

    componentDidMount() {
    }


  render() {
    return(
      <div className="small-2 large-4 columns">
        <h5>{this.state.error}</h5>
        <h2>Make a new Job!</h2>
        <form className="callout" onSubmit={this.handleSubmit}>
          <TextField
            label = "Company Name"
            content = {this.state.name}
            handleChange = {this.handleNameChange}
            name="name"
          />
          <TextField
            label = 'Company URL'
            content = {this.state.url}
            handleChange = {this.handleURLChange}
            name="URL"
          />
          <label>How Interested are you?</label>
          <select value={this.state.interest} onChange={this.handleInterestChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Have you applied?</label>
          <select value={this.state.applied} onChange={this.handleAppliedChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default JobsFormContainer;
