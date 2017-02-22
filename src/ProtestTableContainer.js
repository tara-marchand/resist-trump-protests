import { find, orderBy } from 'lodash';
import maps from '@google/maps';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import ProtestTable from './ProtestTable';

const SPREADSHEET_ID = '1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE';

const periods = {
  current: {
    name: 'Current or Upcoming Actions',
    sheetId: 0,
  },
  past: {
    name: 'Past Actions',
    sheetId: 941154079
  }
};


class ProtestTableContainer extends Component {

  constructor() {
    super();

    this.state = {
      activeSheetTitle: 0,
      protests: [],
      protestsSort: {
        'key': '',
        'dir': ''
      },
      protestsPeriod: periods.current
    };
  }

  getData() {
    const self = this;

    window.gapi.client.init({
      'apiKey': process.env.REACT_APP_API_KEY,
      'discoveryDocs': [
        'https://sheets.googleapis.com/$discovery/rest?version=v4'
      ],
    }).then(function() {
      return window.gapi.client.request({
        'path': `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${self.state.protestsPeriod.name}!A3:F`
      });
    }).then(function(response) {
      self.setProtests(response.result.values);
    }, function(reason) {
      console.log('Error: ' + reason.details);
    });
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      this.getData();
    });
  }

  setProtests(protests) {
    protests = protests.map((protest, i) => {
      let row = i + 2;

      let date = protest[0] || '';
      let dateMoment = null;
      let dateUnix = 0;
      let dateString = '';

      if (date) {
        dateMoment = moment(date, 'ddd, MMM D');
        dateUnix = dateMoment.unix();
        dateString = dateMoment.format('ddd MMM D YYYY');
      }

      let city = protest[1] || '';
      let state = protest[2] || '';
      let time = protest[3] || '';
      let location = protest[4] || '';
      let url = protest[5] || '';

      return {
        row,
        dateUnix,
        dateString,
        city,
        state,
        time,
        location,
        url
      };
    });
    this.updateProtestsState(protests, periods.current,
      'dateUnix', 'asc');
  }

  updateProtestsState(protests, key, dir, currentOrPast) {
    this.setState({
      protests: orderBy(protests, [key], [dir]),
      protestsPeriod: currentOrPast,
      protestsSort: {
        key: key,
        dir: dir
      }
    });
  }

  sortByColumn = (e) => {
    var data = null;
    var dir = null;

    if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'I') {
      data = e.target.parentElement.dataset;
    } else if (e.target.nodeName === 'A') {
      data = e.target.dataset;
    } else if (e.target.nodeName === 'TD') {
      data = e.target.children[0].dataset;
    }

    if (data && 'key' in data) {
      if (data.key === this.state.protestsSort.key && this.state.protestsSort
          .dir === 'asc') {
        dir = 'desc';
      } else {
        dir = 'asc';
      }
      this.updateProtestsState(this.state.protests, data.key, dir);
    }
  }

  render() {
    return <ProtestTable protests={ this.state.protests } protestsSort={ this.state.protestsSort } sortByColumn={ this.sortByColumn } />;
  }
}

export default ProtestTableContainer;
