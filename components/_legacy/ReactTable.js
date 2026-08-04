import React from "react";

import {
  useTable,
  //   useBlockLayout,
  useResizeColumns,
  useFlexLayout,
} from "react-table";
import styled from "@emotion/styled";

const ReactTable = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 100,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // state,
    // resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    // useBlockLayout,
    useResizeColumns,
    useFlexLayout
  );

  return (
    <Styles>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup, index) => (
            <div
              key={index}
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
            >
              {headerGroup.headers.map((column, index) => (
                <div
                  key={index}
                  {...column.getHeaderProps(headerProps)}
                  className="th"
                >
                  {column.render("Header")}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div key={i} {...row.getRowProps()} className="tr">
                {row.cells.map((cell, index) => {
                  return (
                    <div
                      key={index}
                      {...cell.getCellProps(cellProps)}
                      className="td"
                    >
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
};

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const getStyles = (props, align = "left") => [
  props,
  {
    style: {
      //   justifyContent: align === "right" ? "flex-end" : "flex-start",
      justifyContent: align === "center" ? "center" : "center",
      alignItems: "center",
      display: "flex",
    },
  },
];

const Styles = styled.div`
  ${"" /* background: red; */}
  ${
    "" /* These styles are suggested for the table fill all available space in its containing element */
  }
  display: block;
  ${
    "" /* These styles are required for a horizontaly scrollable table overflow */
  }
  overflow: auto;
  border: 1px solid #e0e0e0;
  height: 75%;
  border-radius: 0.75rem;

  .table {
    border-spacing: 0;
    border: 1px solid #e1e1e1;
    width: 100%;
    .thead {
      ${
        "" /* These styles are required for a scrollable body to align with the header properly */
      }
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${"" /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #e1e1e1;
    }

    .th {
      background-color: #f9f9f9 !important;
      font-weight: bold;
      :first-of-type {
        position: sticky !important;
        left: 0;
        z-index: 1;
      }
    }

    .th,
    .td {
      :first-of-type {
        background-color: white;
        position: sticky !important;
        left: 0;
        z-index: 1;
        box-shadow: 2px 0 5px -2px hsla(0, 0%, 53%, 0.3);
      }
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid #e1e1e1;

      ${
        "" /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
        border-bottom: 0;
      }

      .resizer {
        right: 0;
        ${"" /* background: blue; */}
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;
        &:hover {
          background: #84b0f9;
        }
        &.isResizing {
          background: blue;
        }
      }
    }
  }
`;

export default ReactTable;
