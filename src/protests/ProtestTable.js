import React, { Component } from 'react';
import ProtestRow from './ProtestRow';
import './ProtestTable.css';

class ProtestTable extends Component {
  render() {
    if (this.props.visible) {
      return (
        <div>
          <this.button />
          <div className="callout">
            <p>Data from <a href="https://docs.google.com/spreadsheets/d/1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE/edit#gid=0" target="_blank">this Google Sheet</a> compiled by <a href="https://twitter.com/igorvolsky" target="_blank">@igorvolsky</a>.</p>
            <p>{this.props.lastUpdate}</p>
          </div>
          <this.table />
        </div>
      )
    } else {
      return (
        <div>
          <this.button/>
        </div>
      )
    }
  }

  button = () => {
    const classNames = ['button']    
    return (
      <a href="#0" className={classNames.join(' ')} onClick={this.props.toggleProtestsVisible}>
        {this.props.visible ? 'Hide' : 'Show'} Protests
      </a>
    )
  }

  table = () => {
    return (
      <table>
        <thead>
          <tr>
              <td onClick={this.props.sortByColumn}>
                <a href="#" data-key="dateUnix">
                  <span>Date</span>
                  {this.props.getSortIcon('dateUnix')}
                </a>
              </td>
              <td onClick={this.props.sortByColumn}>
                <a href="#" data-key="city">
                  <span>City</span>
                  {this.props.getSortIcon('city')}
                  </a>
              </td>
              <td onClick={this.props.sortByColumn}>
                <a href="#" data-key="state">
                  <span>State</span>
                  {this.props.getSortIcon('state')}
                </a>
              </td>
              <td>Time</td>
              <td>Location</td>
              <td>Link</td>
          </tr>
        </thead>
        <tbody>
          {this.props.protests.map(function(protest) {
            if (protest) {
              return <ProtestRow key={protest.row} protest={protest}/>
            }
            return null;
          })}
        </tbody>
      </table>
      )
  }
}

export default ProtestTable;
