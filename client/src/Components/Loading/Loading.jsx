import React, { Component } from 'react';
import "./Loading.sass"

class Loading extends Component {
    render() {
        return (
            <div id="loading-container">
                <svg height="100" width="250">
                    <circle cx="50" cy="50%" r="0"  fill="#f6393d">
                    <animate attributeType="XML" attributeName="r" from="0" to="10" dur="1s" repeatCount="indefinite"begin="0s"/>
                    </circle>
                    <circle cx="125" cy="50%" r="0" fill="#f6393d">
                    <animate attributeType="XML" attributeName="r" from="0" to="10" dur="1s" repeatCount="indefinite" begin="0.05s"/>
                    </circle>
                    <circle cx="200" cy="50%" r="0" fill="#f6393d">
                    <animate attributeType="XML" attributeName="r" from="0" to="10" dur="1s" repeatCount="indefinite"begin="0.1s"/>
                    </circle>
                </svg>
            </div>
        );
    }
}

export default Loading;