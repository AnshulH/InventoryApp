import React, { Component } from 'react';

export default class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // Shallow comparison of props
        for (let key in nextProps) {
            if (nextProps[key] !== this.props[key]) {
                return true;
            }
        }
        for (let key in this.props) {
            if (!(key in nextProps)) {
                return true;
            }
        }

        // Shallow comparison of state
        for (let key in nextState) {
            if (nextState[key] !== this.state[key]) {
                return true;
            }
        }
        
        for (let key in this.state) {
            if (!(key in nextState)) {
                return true;
            }
        }

        return false;
    }

    render() {
        return <>{this.props.children}</>;
    }
}
