import React, { Component } from "react"

import AllChart from "./AllChart"
import "./Chart.scss"
import ChartSelect from "../Shared/ChartSelect"

import { surveyData } from "../../Data/sharedData.js"

class Chart extends Component {
  state = {
    surveyDataIndex: 0
  }


  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  formatData(data) {
    let dataSets = []

    // Figure out the number of data sets
    const dataSetNumber = data.legend.length
    
    data.children 
      ? data.children.forEach(dataPoint => {
      //Extract one value out of all values
      let values =
        dataPoint.values[this.props.stateId] || dataPoint.values.average

      //Place each each number in its own array according to the legend
      for (let i = 0; i < dataSetNumber; i++) {
        let newDataPoint = {
          name: dataPoint.name,
          value: values[i] ? values[i] : 0
        }
        dataSets[i]
          ? dataSets[i].push(newDataPoint)
          : (dataSets[i] = [newDataPoint])
        }
      })
      :dataSets[0] = data.values

    return dataSets
  }

  handleChartSelect = index => {
    this.setState({
      surveyDataIndex: index
    })
  }

  leftArrow = () => {
    let newIndex =
      this.state.surveyDataIndex > 0
        ? this.state.surveyDataIndex - 1
        : surveyData.length - 1

    this.setState({
      surveyDataIndex: newIndex
    })
  }

  rightArrow = () => {
    let newIndex =
      this.state.surveyDataIndex < surveyData.length - 1
        ? this.state.surveyDataIndex + 1
        : 0

    this.setState({
      surveyDataIndex: newIndex
    })
  }

  render() {
    let fullData = surveyData[this.state.surveyDataIndex]

    let renderChart =(     
        <AllChart
          stateId={this.props.stateId}
          data={this.formatData(fullData)}
          legend={fullData.legend}
          maxValue={fullData.maxValue}
          name={fullData.name}
          type={fullData.type}
        />
      ) 

    return (
      <>
        <div>
          <div className="chart-header">
        <div className="nav nav-left">
            <i className="fal fa-angle-left" onClick={() => this.leftArrow()}></i>
          </div>
          <h4>{fullData.name}</h4>
          <div className="nav nav-right">
            <i className="fal fa-angle-right" onClick={this.rightArrow}></i>
            </div>
            </div>
        <div className="chartContainer">
          
          <div className="chart-wrap">{renderChart}</div>
        </div>
        <ChartSelect
          index={this.state.surveyDataIndex}
          handleChartSelect={this.handleChartSelect}
        />
        </div>
      </>
    )
  }
}

export default Chart
