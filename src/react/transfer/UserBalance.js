import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Container, Header } from 'semantic-ui-react'

class UserBalance extends Component {

  // RETURNS OBJECT'S FULL NAME STRING
  fullNameConverter = (object) => {
    return this.props.first_name + ' ' + this.props.last_name
  }

  // RETURNS INTEGER NUMBER TO FLOAT
  integerToFloat = (integer) => {
    let float = Math.round(integer * 100) / 100

    return float
  }

  render() {
    return (
      <Fragment>
        {this.props ?
          <Container className='userInfo' style={{ width: '50vh' }}>
            <Header as='h1'>{this.fullNameConverter()}</Header>
            <Header as='h2'>Username: {this.props.username}</Header>
            <Header as='h2'>Account Balance: ${this.integerToFloat(this.props.balance)}</Header>
          </Container> : null}
      </Fragment>
    )
  }
}


const mapStateToProps = state => {
  return {
    username: state.user.username,
    first_name: state.user.first_name,
    last_name: state.user.last_name,
    balance: state.balance
  }
}

export default connect(mapStateToProps)(UserBalance)
