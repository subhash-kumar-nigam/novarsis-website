import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

// GlobalFilter Component
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder={`Search ${count} records...`}
      />
    </div>
  );
}

// PropTypes for GlobalFilter
GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired
};

// AdminTable Component
const AdminTable = ({ tableHeaders, tableData }) => {
  const data = React.useMemo(() => (tableData.length ? tableData : []), [tableData]);
  const columns = React.useMemo(() => (tableHeaders.length ? tableHeaders : []), [tableHeaders]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize
  } = useTable({ columns, data, initialState: { pageSize: 6 } }, useGlobalFilter, useSortBy, usePagination);

  return (
    <div className="container-fluid mt-5 pl-4 pr-4">
      {/* Search Input */}
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* Table */}
      <div className="table-responsive">
        <table {...getTableProps()} className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={colIndex} className="text-center">
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, cellIndex) => (
                    <td {...cell.getCellProps()} key={cellIndex} className="text-center">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button className="btn-lg border-0 previousbtn" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button className="btn-lg border-0 nextbtn ml-2" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div>
          <select
            className="form-control previousbtn"
            value={state.pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ width: '100px' }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// PropTypes for AdminTable
AdminTable.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired
};

export default AdminTable;
