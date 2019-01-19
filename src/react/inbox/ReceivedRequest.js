import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Header, Button } from 'semantic-ui-react'

import { completingTransaction } from '../../redux/actions/requests'
import { updatingUserBalance, updatingRecipientBalance } from '../../redux/actions/balances'

class ReceivedRequest extends Component {

  handleComplete = () => {
    let currentUserBalanceObject = {
      id: this.props.currentUser,
      balance: this.calculateTotal()
    }

    let recipientBalance = parseFloat(this.props.request.requestor.balance) + parseFloat(this.props.request.amount)

    let recipientBalanceObject = {
      id: this.props.request.requestor.id,
      balance: recipientBalance
    }

    this.props.updatingUserBalance(currentUserBalanceObject)
    this.props.updatingRecipientBalance(recipientBalanceObject)

    let transactionObject = {
      sender_id: this.props.request.requestee.id,
      recipient_id: this.props.request.requestor.id,
      message: this.props.request.message,
      amount: this.props.request.amount,
      date: this.formatDate()
    }
    this.props.completingTransaction(transactionObject)

  }

  // RETURNS THE PRESENT DAY IN PROPER FORMAT
  formatDate = () => {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // RETURNS UPDATED BALANCE AS THE DIFF OF OLD BALANCE - PAYMENT
  calculateTotal = () => {
    let balance = this.props.balance
    if (isNaN(balance)) {
      balance = 0
    }
    let payment = this.props.request.amount

    let newTotal = parseFloat(balance) - parseFloat(payment)
    return newTotal
  }


  render() {
    return(
      <Container>
        <Header as='h3'>{this.props.request.requestor.first_name} {this.props.request.requestor.last_name}</Header>
        <Header as='h4'>{this.props.request.date}</Header>
        <Header as='h4'>{this.props.request.amount}</Header>
        <p>{this.props.request.message}</p>
        <Button onClick={this.handleComplete}>Complete</Button>
        <Divider />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    balance: state.balance,
  }
}

export default connect(mapStateToProps, { completingTransaction, updatingUserBalance, updatingRecipientBalance })(ReceivedRequest)
