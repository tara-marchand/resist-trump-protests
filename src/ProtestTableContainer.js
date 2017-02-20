import { orderBy } from 'lodash';
import maps from '@google/maps'
import moment from 'moment-timezone';
import React, { Component } from 'react';
import ProtestTable from './ProtestTable'

class ProtestTableContainer extends Component {
    constructor() {
        super();
        this.state = { 
        	protests: [],
        	protestsSort: {
        		'key': '',
        		'dir': ''
        	}
        }
    }

    getData() {
        const self = this;

        window.gapi.client.init({
            'apiKey': process.env['REACT_APP_API_KEY'],
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(function() {
            return window.gapi.client.request({
                'path': 'https://sheets.googleapis.com/v4/spreadsheets/1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE/values/A3:F'
            })
        }).then(function(response) {
            self.getProtests(response);
        }, function(reason) {
            console.log('Error: ' + reason.details);
        });
    }

    componentDidMount() {
        window.gapi.load('client', () => {
            this.getData(true, this.getProtests);
        });
    }

    getProtests(response) {
        let protests = response.result.values || [];
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

            return { row, dateUnix, dateString, city, state, time, location, url }
        });
        this.updateProtestsState(protests, 'dateUnix', 'asc');
    }

    updateProtestsState(protests, key, dir) {
      this.setState({
        protests: orderBy(protests, [key], [dir]),
        protestsSort: {
          key: key,
          dir: dir
        }
      });
    }

    sortByColumn = (e) => {
      var data = null;
      var dir = 'asc';

      if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'I') {
        data = e.target.parentElement.dataset;
      } else if (e.target.nodeName === 'A') {
        data = e.target.dataset;
      } else if (e.target.nodeName === 'TD') {
        data = e.target.children[0].dataset;
      }

    	if (data && 'key' in data) {
        if (data.key === this.state.protestsSort.key && this.state.protestsSort.dir === 'asc') {
          dir = 'desc';
        }
        this.updateProtestsState(this.state.protests, data.key, dir);
      }
    }

    render() {
        return <ProtestTable protests={this.state.protests} protestsSort={this.state.protestsSort} sortByColumn={this.sortByColumn}/>;
    }
}

export default ProtestTableContainer;
