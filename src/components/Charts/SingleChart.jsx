import React, { Component } from "react"
import AllChart from "./AllChart"
import "./Chart.scss"

class SingleChart extends Component {

  formatData(data) {
    let dataSets = []

    // Figure out the number of data sets
    const dataSetNumber = data.legend.length

    data.children
      ? data.children.forEach(dataPoint => {
      let values = dataPoint.values

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
      : dataSets[0] = data.values
    
    return dataSets
  }

  render() {
    let fullData = this.props.data
    let classes = "chart-wrap color-" + this.props.color;

    let renderChart =(     
      <AllChart
        {...this.props}
          data={this.formatData(fullData)}
          legend={fullData.legend}
          name={fullData.name}
          type={this.props.type ? this.props.type : fullData.type}
        />
      ) 

    return (
      <div className="chartContainer"> 
        <div className={classes} >
          <header className="chart-header">
            <h4>{fullData.name}</h4>
            </header>
            {renderChart}
          </div>
        </div>
    )
  }
}

export default SingleChart
