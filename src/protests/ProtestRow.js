import React, { Component } from 'react';
import './ProtestRow.css';

class Protest extends Component {
  render() {
    if (!this.props.protest) {
        return null;
    }
    return (
        <tr>
            <td>{this.props.protest['dateString']}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.protest['city']}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.protest['state']}</td>
            <td>{this.props.protest['time']}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.protest['location']}</td>
            <td className="mdl-data-table__cell--non-numeric"><a href={this.props.protest['url']} target="_blank">Link</a></td>
        </tr>
    );
  }
}

export default Protest;
