import classnames from 'classnames';
import React, { Component } from 'react';
import ProtestRow from './ProtestRow';
import './ProtestTable.css';

function getArrowText(thisKey, sortByKey, dir) {
  var prefix = 'arrow_drop_';

  if (thisKey === sortByKey) {
    if (dir === 'asc') {
      return prefix + 'up';
    }
    return prefix + 'down';
  } else {
    return '';
  }
}


class ProtestTable extends Component {
  render() {
    let key = this.props.protestsSort.key;
    let dir = this.props.protestsSort.dir;

    let classes = classnames('material-icons', 'md-18');
    let dateArrowText = getArrowText('dateUnix', key, dir);
    let cityArrowText = getArrowText('city', key, dir);
    let stateArrowText = getArrowText('state', key, dir);

    return (
      <table className="mdl-data-table mdl-js-data-table">
        <thead>
            <tr>
                <td onClick={this.props.sortByColumn}>
                  <a href="#" data-key="dateUnix">
                    <span>Date</span>
                    <i className={classes}>{dateArrowText}</i>
                  </a>
                </td>
                <td onClick={this.props.sortByColumn} className="mdl-data-table__cell--non-numeric">
                  <a href="#" data-key="city">
                    <span>City</span>
                    <i className={classes}>{cityArrowText}</i>
                    </a>
                </td>
                <td onClick={this.props.sortByColumn} className="mdl-data-table__cell--non-numeric">
                  <a href="#" data-key="state">
                    <span>State</span>
                    <i className={classes}>{stateArrowText}</i>
                  </a>
                </td>
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
