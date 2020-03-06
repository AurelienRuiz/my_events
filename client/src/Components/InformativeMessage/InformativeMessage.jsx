import React, { Component } from 'react';
import "./InformativeMessage.sass"

class InformativeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: props.message ? "open" : "close"
        }
    }
    componentDidUpdate(prevProps)
    {
        if(prevProps.message != this.props.message && this.props.message)
        {
            this.setState({state: "open"})
            setTimeout(() => {
                this.setState({state: "close"})
                this.props.end()
            }, this.props.duration)
        }
    }
    render() {
        return (
            <div className={`${this.props.color} informative_message_${this.state.state}`}>
                {this.props.message}
            </div>
        );
    }
}

export default InformativeMessage;