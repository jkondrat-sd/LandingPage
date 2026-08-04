import React from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";

import { SearchInput } from ".";
import { neraca_status } from "@/utils/constant";
import { main as sortBasic } from "@/utils/table/sorting";
import { formatDateId } from "@/utils/common";

const Comodity = ({ data, loading }) => {

  const columns = [
    {
      name: "Nama Kabupaten/Kota",
      selector: (row) => row.name,
    },
    {
      name: "Harga Acuan (Rp/kg)",
      selector: (row) => row.compared_price,
      sortable: true,
    },
    {
      name: "Harga Sekarang (Rp/kg)",
      selector: (row) => row.current_price,
      sortable: true,
    },
    {
      name: "Pembaruan terakhir",
      sortable: true,
      selector: (row) => formatDateId(row?.current_time_day),
      sortFunction: (a, b) => sortBasic(a, b, "current_time_day"),
    },
    {
      name: "Status",
      selector: (row) => {
        const status =
          row.status == "rise" || row.status == "rise_high" ? (
            <p className="text-red-500">↑ Naik</p>
          ) : row.status == "fall" ? (
            <p className="text-green-500">↓ Turun</p>
          ) : row.status == "stagnant" ? (
            <p className="text-yellow-500">ᛨ Stagnan</p>
          ) : (
            <p className="text-gray-500">Tidak ada harga</p>
          );
        return status;
      },
      sortable: true,
      sortFunction: (a, b) => sortBasic(a, b, "status"),
    },
  ];
  const [filterText, setFilterText] = React.useState("");
  const dataInjected = data.map((e) => {
    return { ...e, statusId: neraca_status[e.status] };
  });
  const dataSorted = _.chain(dataInjected)
    .orderBy(["current_time_day", "statusId"], ["desc", "asc"])
    .value();
  const filteredRows = dataSorted.filter((row) => {
    return (
      row.name && row.name.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <SearchInput
        onFilter={(e) => setFilterText(e.target.value)}
        filterText={filterText}
      />
    );
  }, [filterText]);
  return (
    <>
      {
        <DataTable
          columns={columns}
          data={filteredRows}
          pagination
          highlightOnHover
          fixedHeader
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          progressPending={loading}
          onColumnOrderChange={(cols) => console.log(cols)}
        />
      }
    </>
  );
};

export default Comodity;
