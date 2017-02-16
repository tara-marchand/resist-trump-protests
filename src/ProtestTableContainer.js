import { orderBy } from 'lodash';
import maps from '@google/maps'
import moment from 'moment-timezone';
import promise from 'promise'
import React, { Component } from 'react';
import ProtestTable from './ProtestTable'



        // const self = this;

        // window.gapi.client.init({
        //     'apiKey': process.env['REACT_APP_API_KEY'],
        //     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        // }).then(function() {
        //     return window.gapi.client.request({
        //         'path': 'https://sheets.googleapis.com/v4/spreadsheets/1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE/values/A3:F'
        //     })
        // }).then(function(response) {
        //     self.load(response);
        // }, function(reason) {
        //     console.log('Error: ' + reason.details);
        // });

const loadClient = (callback) => window.gapi.load('client', callback);
// , () => {
//     let protests = getProtests().then(processProtests());
//     this.setState({protests});
// });

const initClient = () => window.gapi.client.init({
    'apiKey': process.env['REACT_APP_API_KEY'],
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
})

const getSheet = () => window.gapi.client.request({
    'path': 'https://sheets.googleapis.com/v4/spreadsheets/1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE/values/A3:F'
})

const getProtests = (response) => {
    let protests = response.values;
    this.setState({protests});
};

const processProtests = (protests) => {
    protests = protests.map((protest, i) => {
        let row = i + 2;

        let date = protest[0] || '';
        let dateMoment = null;
        let dateString = '';
        if (date) {
            dateMoment = moment(date, 'ddd, MMM D');
            dateString = dateMoment.format('ddd MMM D YYYY')
        }

        let city = protest[1] || '';
        let state = protest[2] || '';
        let time = protest[3] || '';
        let location = protest[4] || '';
        let url = protest[5] || '';

        return { row, dateString, city, state, time, location, url }
    });
    return orderBy(protests, ['date']);
}

class ProtestTableContainer extends Component {
    constructor() {
        super();
        this.state = { protests: [] }
    }

    componentDidMount() {
        loadClient().then(initClient().then(getSheet));
        // .then(initClient().then(getSheet().then(getProtests())));   
    }

    render() {
        return <ProtestTable protests={ this.state.protests }
        />;
    }
}

export default ProtestTableContainer;
