import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Button, Container } from 'semantic-ui-react'
import './Dashboard.css'

export default class OverTimeLineGraph extends Component {
  constructor() {
    super()
    this.state = {
      // CAN DISPLAY '30 days', '12 weeks', and '12 months'
      display: '30 days'
    }
  }

  toggle30Days = () => {
    this.setState({
      display: '30 days'
    })
  }

  toggle12Weeks = () => {
    this.setState({
      display: '12 weeks'
    })
  }

  toggle12Months = () => {
    this.setState({
      display: '12 months'
    })
  }

  backgroundColorRendering = (dataArray) => {
    if (dataArray[dataArray.length - 1] > 0) {
      return ['rgba(0, 255, 0, .4)']
    } else {
      return ['rgba(255, 0, 0, .4)']
    }
  }

  borderColorRendering = (dataArray) => {
    if (dataArray[dataArray.length - 1] > 0) {
      return ['green']
    } else {
      return ['red']
    }
  }

  render() {

    let last30Days = {
      data: {
          labels: this.props.labels['30days'],
          datasets: [{
              label: 'Money Won/Lost',
              // CHANGE 'DATA' TO DISPLAY DATA POINTS
              data: this.props.data['30days'],
              backgroundColor: this.backgroundColorRendering(this.props.data['30days']),
              borderColor: this.borderColorRendering(this.props.data['30days']),
              borderWidth: 1
          }]
      }
    }

    let last12Weeks = {
      data: {
          labels: this.props.labels['12weeks'],
          datasets: [{
              label: 'Money Won/Lost',
              // CHANGE 'DATA' TO DISPLAY DATA POINTS
              data: this.props.data['12weeks'],
              backgroundColor: this.backgroundColorRendering(this.props.data['12weeks']),
              borderColor: this.borderColorRendering(this.props.data['12weeks']),
              borderWidth: 1
          }]
      }
    }

    let last12Months = {
      data: {
          labels: this.props.labels['12months'],
          datasets: [{
              label: 'Money Won/Lost',
              // CHANGE 'DATA' TO DISPLAY DATA POINTS
              data: this.props.data['12months'],
              backgroundColor: this.backgroundColorRendering(this.props.data['12months']),
              borderColor: this.borderColorRendering(this.props.data['12months']),
              borderWidth: 1
          }]
      }
    }

    return (
      <Container >
        {this.state.display === '30 days' ?
          <Line
            data={last30Days.data}
            width={700}
            height={500}
            options={{
              title: {
                text: 'Last 30 Day Winnings',
                display: true,
                fontsize: 200
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }}
          /> : null}

        {this.state.display === '12 weeks' ?
        <Line
          data={last12Weeks.data}
          width={750}
          height={500}
          options={{
            title: {
              text: 'Quarter to Date Winnings',
              display: true,
              fontsize: 200
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
        : null}

        {this.state.display === '12 months' ?
        <Line
          data={last12Months.data}
          width={750}
          height={500}
          options={{
            title: {
              text: 'Year to Date Winnings',
              display: true,
              fontsize: 200
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        /> : null}
        <Button onClick={this.toggle30Days} color='blue'>30 Days</Button>
        <Button onClick={this.toggle12Weeks} color='blue'>3 Months</Button>
        <Button onClick={this.toggle12Months} color='blue'>1 Year</Button>
      </Container>
    )
  }
}
