import { orderBy } from 'lodash';
import { hash } from './utils';
import { get } from './localStorage';

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, callback) {
    window.gapi.auth.authorize({
        'client_id': process.env.SHEETS_CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/spreadsheets',
        'immediate': immediate
    }, callback);
}

/**
 * Load the quotes from the spreadsheet
 * Embellish them with user own likes
 */
export function load(callback) {
  let userLikes = get('likes') || [];

  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BHLcMeNwk779OHpYjvMRqDQKXiJAqsmhkvrYQzU8CtE',
      range: 'A3:F'
    }).then((response) => {
      const data = response.result.values || [];

      let protests = data.map((protest, i) => {
        let row = i + 3; // Save row ID for later update
        let date = row[0];
        let dateParsed = Date.parse(date);
        let city = row[1] || '';
        let state = row[2] || '';
        let time = row[3] || '';
        let loc = row[4] || '';
        let url = row[5] || '';

        // There might be no date or in an unrecognized format
        if (!isNaN(dateParsed)) {
          date = dateParsed;
        }

        return {
          row,
          date,
          city,
          state,
          time,
          loc,
          url
        }
      });

      // Initially order quotes by date, most recent first
      quotes = orderBy(quotes, ['date'], ['desc']);
      // And authors alphabetically
      authors.sort();

      callback({
        quotes,
        authors
      });
    }, (response) => {
      callback(false, response.result.error);
    });
  });
}
