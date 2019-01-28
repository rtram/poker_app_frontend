import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import Home from './react/home/Home.js'
import SignUp from './react/login/SignUp.js'
import Login from './react/login/Login.js'
import PokerDashboard from './react/pokerdashboard/PokerDashboard.js'
import TransactionDashboard from './react/transfer/TransactionDashboard.js'
import BankTransfer from './react/transfer/bankTransfer/BankTransfer.js'
import UserSearchContainer from './react/transfer/usersearch/UserSearchContainer.js'
import CasinoMap from './react/casinoMap/CasinoMap.js'
import InboxContainer from './react/inbox/InboxContainer.js'
import ProfilePageContainer from './react/transfer/profilePage/ProfilePageContainer'
import MyProfileContainer from './react/myProfile/MyProfileContainer'
// import Loading from './Loading.js'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { Header } from 'semantic-ui-react'

class Body extends Component {

  render() {

   // if (this.props.searchBarRedirect) {
   //   return <Redirect to={`/user/${this.props.redirectID}`}/>;
   // }

    return (
      <>

        <div class='main'>
          <Switch>
            <Route exact path='/' render={() => {
              return <Home />
            }} />
            <Route exact path='/home' render={() => {
              return <Home />
            }} />
            <Route path='/map' render={props => {
              return <CasinoMap />
            }} />
            <Route exact path='/login' render={() => {
                if (localStorage.getItem('token')) {
                  return <Redirect to='/dashboard' />
                } else {
                  return <Login />
                }
              }} />
            <Route path='/signup' render={props => {
              if (localStorage.getItem('token')) {
                return <Redirect to='/dashboard' />
              } else {
              return <SignUp />
              }
            }} />
            <Route exact path='/pokerdashboard' render={() => {
              if (localStorage.getItem('token')) {
                return <PokerDashboard />
              } else {
                return <Redirect to='/login' />
              }
            }}/>

  {// TRANSFER DROPDOWN------------------------------------------------------
  }
            <Route path='/transactiondashboard' render={() => {
              if (localStorage.getItem('token')) {
                return <TransactionDashboard />
              } else {
                return <Redirect to='/login' />
              }
            }}/>
            <Route path='/banktransfer' render={() => {
              if (localStorage.getItem('token')) {
                return <BankTransfer />
              } else {
                return <Redirect to='/login' />
              }
            }}/>
            <Route path='/usersearch' render={() => {
              if (localStorage.getItem('token')) {
                return <UserSearchContainer />
              } else {
                return <Redirect to='/login' />
              }
            }}/>
            <Route path='/user/:id' render={props => {
              let id = props.match.params.id
              if (localStorage.getItem('token')) {
                return <ProfilePageContainer id={id}/>
              } else {
                return <Redirect to='/login' />
              }
            }}/>
  {// ---------------------------------------------------------------
  }
            <Route path='/inbox' render={() => {
              if (localStorage.getItem('token')) {
                return <InboxContainer />
              } else {
                return <Redirect to='/login' />
              }
            }}/>
            <Route path='/myprofile' render={() => {
              if (localStorage.getItem('token')) {
                return <MyProfileContainer />
              } else {
                return <Redirect to='/login' />
              }
            }}/>
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    loading: state.loading,
    // searchBarRedirect: state.searchBarRedirect,
    // redirectID: state.redirectID
  }
}

export default withRouter(connect(mapStateToProps)(Body));