import React, { Component } from 'react';
import Table from '../Table';
import './ProtestTable.css';
import ProtestRow from './ProtestRow';

class ProtestTable extends Component {
  constructor(props) {
    super(props);

    this.headers = [
      {
        isSortable: true,
        dataKey: 'dateUnix',
        name: 'Date',
      },
      {
        isSortable: true,
        dataKey: 'city',
        name: 'City',
      },
      {
        isSortable: true,
        dataKey: 'state',
        name: 'State',
      },
      {
        isSortable: false,
        dataKey: '',
        name: '',
      },
      {
        isSortable: false,
        dataKey: '',
        name: '',
      },
      {
        isSortable: false,
        dataKey: '',
        name: '',
      }
    ];
  }

  render() {
    if (this.props.visible) {
      return (
        <div>
          <this.button />
          <div className="callout">
            <p>Data from <a href="https://docs.google.com/spreadsheets/d/1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE/edit#gid=0" target="_blank">this Google Sheet</a> compiled by <a href="https://twitter.com/igorvolsky" target="_blank">@igorvolsky</a>.</p>
            <p>{this.props.lastUpdate}</p>
          </div>
          <Table headers={this.headers} rows={this.props.protests} sortByColumn={this.props.sortByColumn} getSortIcon={this.props.getSortIcon} getRowEl={this.getRowEl} />
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

  getRowEl(protest) {
    return <ProtestRow key={protest.row} protest={protest}/>
  }

  button = () => {
    const classNames = ['button']    
    return (
      <a href="#0" className={classNames.join(' ')} onClick={this.props.toggleProtestsVisible}>
        {this.props.visible ? 'Hide' : 'Show'} Protests
      </a>
    )
  }
}

export default ProtestTable;
