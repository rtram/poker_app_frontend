import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { loggingIn } from '../../redux/actions/login.js'
import { Link } from 'react-router-dom'
import '../../App.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  clearLoginState = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = () => {
    let loginObject = {
      user: this.state
    }
    this.props.loggingIn(loginObject)
  }

  render() {
    return (
      <div class='margin-top'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='white' textAlign='center'>
              <Icon name='sign-in' /> Log-in to your account
            </Header>
            {this.props.loginError.length > 0 ? <Header as='h4' color='red' textAlign='center'>
              <Icon name='hand spock outline' /> {this.props.loginError[0].message}
            </Header>
            : null
            }
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  name='username'
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                />

                <Button onClick={this.handleLogin} color='blue' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/signup'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  }
}

export default connect(mapStateToProps, { loggingIn })(Login);
