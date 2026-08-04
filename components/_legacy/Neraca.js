import React from "react";
import axios from "axios"
import DataTable from "react-data-table-component";

import { SearchInput } from ".";
import { comodityList, districtOrCityList } from "@/utils/constant";

const Neraca = () => {
  const [rows, setRows] = React.useState([]);

  const findComodityName = (id) => {
    return comodityList[id];
  };
  
  const findDistrictOrCity = (id) => {
    return districtOrCityList[id];
  };
  
  const replaceUnderScore = (str) => {
    return str.replaceAll("_", " ");
  };
  
  React.useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/api/admin/neraca");

      let dataSpread = [...data];
      const modifiedRows = dataSpread.map((row) => {
        const neraca = row.ketersediaan - row.kebutuhan;
        const status =
          row.ketersediaan / row.kebutuhan <= 89 / 100
            ? "defisit"
            : row.ketersediaan / row.kebutuhan > 110 / 100
            ? "surplus"
            : row.ketersediaan / row.kebutuhan > 89 / 100 &&
              row.ketersediaan / row.kebutuhan <= 110 / 100
            ? "aman"
            : "data_kosong";
        const nama_kabupaten_atau_kota = replaceUnderScore(
          findDistrictOrCity(row.kode_kabupaten_atau_kota)
        );
        const nama_komoditas = replaceUnderScore(
          findComodityName(row.kode_komoditas)
        );
        return {
          ...row,
          neraca,
          status,
          nama_kabupaten_atau_kota,
          nama_komoditas,
        };
      });
      setRows(modifiedRows);
    }
    getData();
  }, []);
  

  // Let the column begin
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Kode Kabupaten/Kota",
      selector: (row) => row.kode_kabupaten_atau_kota,
      sortable: true,
    },
    {
      name: "Nama Kabupaten/Kota",
      selector: (row) => row.nama_kabupaten_atau_kota,
    },
    {
      name: "Kode Komoditas",
      selector: (row) => row.kode_komoditas,
      sortable: true,
    },
    {
      name: "Nama Komoditas",
      selector: (row) => row.nama_komoditas,
    },
    {
      name: "Ketersediaan (Ton)",
      selector: (row) => row.ketersediaan,
    },
    {
      name: "Kebutuhan (Ton)",
      selector: (row) => row.kebutuhan,
    },
    {
      name: "Harga (Rp/Kg)",
      selector: (row) => row.harga,
    },
    {
      name: "Neraca",
      selector: (row) => row.neraca,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Tahun",
      selector: (row) => row.tahun,
    },
    {
      name: "Bulan",
      selector: (row) => row.bulan,
    },
    {
      name: "Minggu",
      selector: (row) => row.minggu,
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const filteredRows = rows.filter((row) => {
    return (
      row.nama_kabupaten_atau_kota &&
      row.nama_kabupaten_atau_kota
        .toLowerCase()
        .includes(filterText.toLowerCase())
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
    <div className="m-6">
      <DataTable
        title="Data Neraca"
        columns={columns}
        data={filteredRows}
        pagination
        highlightOnHover
        fixedHeader
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeaderScrollHeight="600px"
      />
    </div>
  );
};

export default Neraca;
