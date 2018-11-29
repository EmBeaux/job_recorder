import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import TextField from '../components/TextField.js'
class JobsFormContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: "",
        interest: "",
        url: "",
        error: ""
      }
      this.handleURLChange = this.handleURLChange.bind(this)
      this.handleInterestChange = this.handleInterestChange.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
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

    handleSubmit(event){
      event.preventDefault()
      let createdJob;

        createdJob = {
          company: this.state.name,
          interest: this.state.interest,
          url: this.state.url,
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
        this.props.handleJobsChange(createdJob)
      })
      .catch(error => {
        debugger
        this.setState({ error })
      });
    }

    componentDidMount() {
    }


  render() {
    return(
      <div>
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
          <TextField
            label = "Company Rating"
            content = {this.state.interest}
            handleChange = {this.handleInterestChange}
            name="interest"
          />
          <input type="submit" className="button-group" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default JobsFormContainer;
