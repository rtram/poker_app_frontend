import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Icon,
  Container,
  Dropdown,
  Image,
  Menu,
  Search
} from 'semantic-ui-react'
import './App.css'
import { fetchingUserBalances } from './redux/actions/users.js'
import { userLogout } from './redux/actions/login.js'

class NavBar extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.fetchingUserBalances(localStorage.getItem('currentUser'))
    }
  }

  handleLogout = () => {
    this.props.userLogout()
  }

  render() {
    return(
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            <Link to='/home'>
              <Image size='tiny' src='https://i.imgur.com/Frwwd8f.png' style={{  marginRight: '1.5em' }}  />
            </Link>
          </Menu.Item>
          <Menu.Item >
            <Link to='/map'>
            <Icon name='map marker alternate' color='red'/>
              Casino Map
            </Link>
          </Menu.Item>
          <Menu.Item>
          <Search
            style={{
              width:'15em'
            }}
            placeholder='Search for Poker Players'
            fluid
            />
          </Menu.Item>
          <Menu.Menu position='right'>
          <Menu.Item >
            <Link to='/dashboard'>
            <Icon name='dashboard'/>
              Poker Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item >
            <Icon name='dollar sign' color='green'/>
            <Dropdown item text='Transfers'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link style={{ color: 'black' }} to='/transferhome'>
                    Transfer Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={{ color: 'black' }} to='/bank'>
                    Deposit or Withdraw Funds
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={{ color: 'black' }} to='/transferform'>
                    Pay Or Request Funds
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item >
            <Link to='/inbox'>
              <Icon name='mail' color='brown'>
                {this.props.received_requests && this.props.received_requests.length > 0?
                  <span className='inbox-badge'>
                    {this.props.received_requests.length}
                  </span>
                  : null}
              </Icon>
              Inbox
            </Link>
          </Menu.Item>
          <Menu.Item >
            {localStorage.getItem('token') ?
            <Link to='/home'>
              <Icon onClick={this.handleLogout} name='sign-out' color='blue'/>
                Logout
            </Link>:
            <Link to='/login'>
              <Icon name='sign-in' color='blue'/>
              Login
            </Link>
            }
          </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    received_requests: state.received_requests
  }
}

export default connect(mapStateToProps, { fetchingUserBalances, userLogout })(NavBar)
