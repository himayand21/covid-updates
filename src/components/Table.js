import React, { Component } from "react";
import PropTypes from "prop-types";

import LeftArrow from '../assets/leftArrow.svg';

const noOptions = "-- select --";

class Table extends Component {
  state = {
    search: {},
    sort: {},
    pageNo: 1
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.data.length && this.props.data.length) {
      this.setState({ pageNo: 1 });
    }
  }

  handlePrevious = () => this.setState({ pageNo: this.state.pageNo - 1 });

  handleNext = () => this.setState({ pageNo: this.state.pageNo + 1 });

  handleSearch = event => {
    const { target } = event;
    const { value, dataset } = target;
    const { searchkey } = dataset;
    this.setState({
      search: {
        ...this.state.search,
        [searchkey]: value
      },
      pageNo: 1
    });
  };

  handleSelect = event => {
    const { target } = event;
    const { value, name } = target;
    if (value === noOptions) {
      this.setState({ search: {} });
    } else {
      this.setState({
        search: {
          [name]: value
        }
      });
    }
  }

  handleSort = event => {
    const { target } = event;
    const { dataset } = target;
    const { sortkey } = dataset;
    const { [sortkey]: oldSortValue } = this.state.sort;
    this.setState({
      sort: {
        [sortkey]: oldSortValue === "ASC" ? "DESC" : "ASC"
      }
    });
  };

  render() {
    const { data, columns, className, paginate, sizePerPage } = this.props;
    const { search, sort, pageNo } = this.state;

    const filteredData = data.filter(row => {
      const filterableColumns = columns.filter(column => column.filterable);
      return (filterableColumns.every(column => {
        const { key, accessor, filterMethod, filterable } = column;
        if (!search[key]) return true;
        if (filterable === "select") {
          return (
            accessor(row) === search[key]);
        }
        if (filterMethod) {
          return (
            filterMethod(search[key], accessor(row))
          )
        }
        return (
          accessor(row)
            .toString()
            .toLowerCase()
            .includes(search[key].toString().toLowerCase())
        );
      }));
    });

    const sortedData = filteredData.sort((first, second) => {
      const sortableColumns = columns.filter(column => column.sortable);
      const sortColumn = sortableColumns.find(each => sort[each.key]);
      if (sortColumn) {
        const { key, accessor } = sortColumn;
        const secondValue = accessor(second);
        const firstValue = accessor(first);
        if (typeof firstValue === 'undefined' || firstValue === null || secondValue === null || typeof secondValue === 'undefined') {
          return 1;
        }
        if (isNaN(firstValue) || isNaN(secondValue)) {
          if (sort[key] === "ASC") {
            return firstValue.localeCompare(secondValue);
          } else {
            return secondValue.localeCompare(firstValue);
          }
        } else {
          if (sort[key] === "ASC") {
            return firstValue - secondValue;
          } else {
            return secondValue - firstValue;
          }
        }
      }
    });

    const slicedData = paginate
      ? sortedData.slice((pageNo - 1) * sizePerPage, pageNo * sizePerPage)
      : sortedData;
    
    let tableData = slicedData;
    
    if (slicedData.length < sizePerPage && paginate) {
      const emptyRows = Array.apply(null, Array(sizePerPage - slicedData.length)).map(function () {});
      tableData = [ ...slicedData, ...emptyRows ];
    }

    return (
      <table className={`reusable_table ${className}`}>
        <thead>
          <tr>
            {columns.map(column => {
              const { header, headerStyle } = column;
              return (
                <td style={headerStyle}>
                  {header}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {columns.some(column => column.filterable || column.sortable) ? (
            <tr className="search_row">
                {columns.map(column => {
                  const { key, filterable, accessor, sortable } = column;
                  let filterComponent = null;
                  let sortComponent = null;
                  if (filterable === "select") {
                    const options = data.map((row) => accessor(row));
                    const uniqueOptions = [noOptions, ...new Set(options.filter(Boolean))];
                    filterComponent = (
                      <select
                        value={search[key] || uniqueOptions[0]}
                        onChange={this.handleSelect}
                        name={key}
                      >
                        {uniqueOptions.map((option) => {
                          return (
                            <option
                              selected={search[key] ? (option === search[key]) : noOptions}
                            >
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    )
                  } else if (filterable) {
                    filterComponent = (
                      <input
                        value={search[key]}
                        onChange={this.handleSearch}
                        data-searchkey={key}
                        placeholder="Search"
                      />
                    );
                  }
                  if (sortable) {
                    const sortableClass = sortable ? "sortable_cell" : "";
                    const sortedClass = sort[key] ? `${sort[key]}_cell` : "";
                    sortComponent = (
                      <span
                        className={`${sortableClass} ${sortedClass}`}
                        onClick={sortable ? this.handleSort : null}
                        data-sortkey={key}
                      />
                    )
                  }
                  return (
                    <td>
                      <div className="action_cell">
                        {filterComponent}
                        {sortComponent}
                      </div>
                    </td>
                  )
                })}
            </tr>
          ) : null}
          {tableData.map(row => {
            if (!row) return (
              <tr>
                {columns.map(() => <td><div>{" "}</div></td>)}
              </tr>
            );
            return (
              <tr>
                {columns.map(column => {
                  const { cell, accessor, key } = column;
                  const value = accessor(row);
                  return (
                    <td className={`cell-${key}`}>{cell ? cell(value, row) : value}</td>
                  );
                })}
              </tr>
            );
          })}
          {paginate ? (
            <tr className="pagination_row">
              <td colSpan={columns.length}>
                <div>
                  <button onClick={this.handlePrevious} disabled={pageNo === 1}>
                    <img src={LeftArrow} />
                  </button>
                  <span className="pagination_options">
                    {`${pageNo} / ${Math.ceil(
                      sortedData.length / sizePerPage
                    )}`}
                  </span>
                  <button
                    onClick={this.handleNext}
                    disabled={
                      pageNo === Math.ceil(sortedData.length / sizePerPage)
                    }
                  >
                    <img src={LeftArrow} />
                  </button>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cell: PropTypes.func,
      accessor: PropTypes.func.isRequired
    })
  ).isRequired,
  sizePerPage: PropTypes.number,
  className: PropTypes.string
};

Table.defaultProps = {
  sizePerPage: 10
}

export default Table;