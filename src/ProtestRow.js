import React, { Component } from 'react';
import './ProtestRow.css';

class Protest extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.protest['dateString']}</td>
            <td>{this.props.protest['city']}</td>
            <td>{this.props.protest['state']}</td>
            <td>{this.props.protest['time']}</td>
            <td>{this.props.protest['location']}</td>
            <td><a href={this.props.protest['url']} target="_blank">Link</a></td>
        </tr>
    );
  }
}

export default Protest;
