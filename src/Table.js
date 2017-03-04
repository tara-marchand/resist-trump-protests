import React, { Component } from 'react';
import { orderBy } from 'lodash';
import classnames from 'classnames';

class Table extends Component {
    constructor() {
        super();

        this.state = {
            rows: [],
            sortKey: '',
            sortDir: 'asc',
        };

        this.renderHeaderCell = this.renderHeaderCell.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.sortByColumn = this.sortByColumn.bind(this);
        this.getSortIcon = this.getSortIcon.bind(this);
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
            if (data.key === this.state.sortKey && this.state.sortDir === 'asc') {
                dir = 'desc';
            } else {
                dir = 'asc';
            }
            this.setState({
                protests: orderBy(this.state.protests, [data.key], [dir]),
                sortKey: data.key,
                sortDir: dir
            });
        }
    }

    getSortIcon(thisKey) {
        var prefix = '';
        var suffix = '';
        var classes = null;

        if (thisKey === this.state.sortKey) {
            prefix = 'fi-arrow-';
            if (this.state.sortDir === 'asc') {
                suffix = 'up';
            } else {
                suffix = 'down';
            }
        }

        classes = classnames((prefix + suffix));

        return (<i className={classes}> </i>);
    }

    renderHeaderCell(header, index) {
        if (header.isSortable) {
            return (
                <td key={index} onClick={this.sortByColumn}>
                  <a href="#" data-key={header.dataKey}>
                    <span>{header.name}</span>
                    {this.getSortIcon(header.dataKey)}
                  </a>
                </td>
            )
        } else {
            return <td key={index}>{header.name}</td>;
        }
    }

    renderRow(row) {
        if (row) {
            return this.props.getRowEl(row);
        }
        return null;
    }

    render() {
        return (
            <table>
        <thead>
          <tr>
            {this.props.headers.map(this.renderHeaderCell)}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(this.renderRow)}
        </tbody>
      </table>
        )
    }
}

export default Table;
