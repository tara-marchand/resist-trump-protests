import React, { Component } from 'react';
import ProtestRow from './ProtestRow';
import './ProtestTable.css';

class ProtestTable extends Component {
  render() {
    return (
        <table className="mdl-data-table mdl-js-data-table">
            <thead>
                <tr>
                    <td>Date</td>
                    <td className="mdl-data-table__cell--non-numeric">City</td>
                    <td className="mdl-data-table__cell--non-numeric">State</td>
                    <td>Time</td>
                    <td className="mdl-data-table__cell--non-numeric">Location</td>
                    <td className="mdl-data-table__cell--non-numeric">Link</td>
                </tr>
            </thead>
            <tbody>
            {this.props.protests.map((protest) => (
                <ProtestRow key={protest.row} protest={protest}/>
            ))}
            </tbody>
        </table>
    );
  }
}

export default ProtestTable;
