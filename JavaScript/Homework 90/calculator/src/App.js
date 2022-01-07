import React, { Component } from 'react'
import './App.css'
export default class App extends Component {

  state = {
    current: 0
  }

  updateCurrent = (e) => {
    e.preventDefault();
    this.setState({
      current: e.target.value,
    });
    e.target.value = '';
  }

  updateOperator = (e) => {
    e.preventDefault();
    this.setState({
      total: this.state.current,
      operator: e.target.innerText
    });
  }

  calculate = (e) => {
    e.preventDefault();

    if (this.state.operator === '+') {
      this.setState({
        current: (Number(this.state.current) + Number(this.state.total)),
        total: (Number(this.state.current) + Number(this.state.total))
      });
    }
    else if (this.state.operator === '-') {
      this.setState({
        current: (Number(this.state.total) - Number(this.state.current)),
        total: (Number(this.state.total) - Number(this.state.current))
      });
    }
    else if (this.state.operator === '/') {
      this.setState({
        current: (Number(this.state.total) / Number(this.state.current)),
        total: (Number(this.state.total) / Number(this.state.current))
      });
    } else if (this.state.operator === '*') {
      this.setState({
        current: (Number(this.state.current) * Number(this.state.total)),
        total: (Number(this.state.current) * Number(this.state.total))
      });
    }
  }

  render() {
    return (
      <>
        <h1 className='text-center'>Calculator</h1>
        <hr />
        <div className="container text-center">
          <div className="row justify-content-center">
            {<form className="d-block">
              <div className='row justify-content-center'>
                <div id="display" className='row col-sm-7 col-lg-4 bg-dark text-white justify-content-center align-items-center fs-1'>{this.state.total ? this.state.total : this.state.current}</div>
              </div>
              <div className='row justify-content-center'>
                <input type='number' className=" input-sm row col-sm-7 col-lg-4 m-4 " placeholder='Enter a number' onBlur={this.updateCurrent} />
              </div>


              <div className='col-12'>
                <button className='btn btn-light m-2' onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    current: 0,
                    operator: null,
                    total: null
                  });
                }}> AC </button>

                <button className='btn btn-light m-2' onClick={this.updateOperator}> + </button>
                <button className='btn btn-light m-2' onClick={this.updateOperator}> - </button>
                <button className='btn btn-light m-2' onClick={this.updateOperator}> * </button>
                <button className='btn btn-light m-2' onClick={this.updateOperator}> / </button>
                <button className='btn btn-light m-2' onClick={this.calculate}> = </button>
              </div>
            </form>}
          </div>
        </div>
      </>
    )
  }
}

