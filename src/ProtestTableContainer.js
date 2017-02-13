import { orderBy } from 'lodash';
import React, { Component } from 'react';
import ProtestTable from './ProtestTable'

class ProtestTableContainer extends Component {
    constructor() {
        super();
        this.state = { protests: [] }
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
            self.load(response);
        }, function(reason) {
            console.log('Error: ' + reason.details);
        });
    }

    componentDidMount() {
        window.gapi.load('client', () => {
            this.getData(true, this.load);
        });
    }

    load(response) {
        let protests = response.result.values || [];
        protests = protests.map((protest, i) => {
            let row = i + 2;

            let date = protest[0] || '';
            let dateString = '';
            if (date) {
                let dateArray = date.split(' ');
                let year = dateArray.length > 3 ? parseInt(dateArray[3], 10) : 2017;
                date = new Date(date + ' ' + year + ' ' + protest[3])
                dateString = date.toDateString();
            }

            let city = protest[1] || '';
            let state = protest[2] || '';
            let time = protest[3] || '';
            let location = protest[4] || '';
            let url = protest[5] || '';

            return {
                row,
                dateString,
                city,
                state,
                time,
                location,
                url
            }
        });
        protests = orderBy(protests, ['date'], ['time']);
        this.setState({protests});
    }

    render() {
        return <ProtestTable protests={ this.state.protests }
        />;
    }
}

export default ProtestTableContainer;
