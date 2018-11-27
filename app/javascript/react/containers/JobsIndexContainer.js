import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

class JobsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <h1>This is the IndexRoute</h1>
      </div>
    )
  }
}

export default JobsIndexContainer;
