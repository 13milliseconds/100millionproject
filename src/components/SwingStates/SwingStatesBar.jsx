import React, { Component } from "react";
import BarChart from "../Charts/BarChart";
import AppHeader from "../AppHeader/AppHeader";
import { swingStates } from "../../Data/sharedData.js";
import { Select } from "../Shared/Select";
import "./SwingStatesBar.scss";
import { Redirect } from "react-router-dom"

class SwingBarChart extends Component {
  constructor() {
    super();
    this.state = {
      // value: 0
    };
  }
  componentDidMount() {
    console.log('here')
    let idx = window.location.pathname.lastIndexOf("/")
    let id = window.location.pathname.substring(idx + 1)
    console.log('id', idx, parseInt(id))
    console.log(isNaN(id))
    let stateId = isNaN(parseInt(id)) ? 0 : id 

    // let stateId = isNaN(idx) ? 0 : 1
    console.log(stateId)
    this.setState({
      value: stateId
    });
  }
  componentDidUpdate(prevProps, prevState){
    console.log('dup')
    if(this.props.withoutID !== prevState.withoutID){
   
      this.componentDidMount()
    }
  }
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      value:event.target.value,
      redirect: true
    })
  };

  render() {
    let options = swingStates.map((stateName, i) => (
      <option key={i} value={i}>
        {stateName}
      </option>
    ));
    console.log(this.state.value)
    let redirect = this.state.redirect && <Redirect to={`./${this.state.value}`}/> 
    return (
      <div className="swingstates-bar">
        {redirect}
        <AppHeader />
        <main className="swingstates-bar-main">
          <h3 className="swingstates-bar-title">Swing States</h3>
          <form>
            <div className="select-box">
              <Select
                value={this.state.value}
                handleChange={this.handleChange}
                options={options}
                className={"select"}
              />
            </div>
          </form>
          { 
          <BarChart type={"bar"} value={this.state.value} />}
        </main>
      </div>
    );
  }
}

export default SwingBarChart;
