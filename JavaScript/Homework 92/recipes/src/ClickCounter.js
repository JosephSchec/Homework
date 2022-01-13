import React, { Component } from 'react'

export default class ClickCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
    handleClick2 = () => {
        this.setState({ count: this.state.count + 1 });
    }
    render() {
        return (
            <div>
                This button was clicked <button className='btn btn-secondary'
                    onClick={/*this.handleClick*/ /*() => this.handleClick()*/ this.handleClick2}>{this.state.count}</button>
                times
            </div>
        )
    }
}
