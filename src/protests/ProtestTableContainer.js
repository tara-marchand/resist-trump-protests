import { find } from 'lodash';
// import maps from '@google/maps';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import ProtestTable from './ProtestTable';

const SPREADSHEET_ID = '1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE';
const SHEET_NAME = 'Current or Upcoming Actions';

class ProtestTableContainer extends Component {

    constructor() {
        super();

        this.state = {
            protests: [],
            visible: false
        }
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
                'path': `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=${SHEET_NAME}!G1&ranges=${SHEET_NAME}!A3:F`
            });
        }).then(function(response) {
            var lastUpdate = find(response.result.valueRanges, function(val) {
                return val.range === ('\'' + SHEET_NAME + '\'!G1') }).values[0][0];
            var protests = find(response.result.valueRanges, function(val) {
                return val.range.indexOf('!A3') > -1 }).values;

            self.setState({
                lastUpdate: lastUpdate
            });
            self.setProtests(protests);
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

            if (dateMoment.isBefore(moment(), 'day')) {
                return null;
            } else {
                return {
                    row,
                    dateMoment,
                    dateUnix,
                    dateString,
                    city,
                    state,
                    time,
                    location,
                    url
                };
            }
        });

        this.setState({
            protests: protests,
        });
    }

    toggleProtestsVisible = (e) => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }));
    }

    render() {
        return (<ProtestTable protests={this.state.protests}
            visible={this.state.visible}
            toggleProtestsVisible={this.toggleProtestsVisible}
            lastUpdate={this.state.lastUpdate} />
        );
    }
}

export default ProtestTableContainer;
