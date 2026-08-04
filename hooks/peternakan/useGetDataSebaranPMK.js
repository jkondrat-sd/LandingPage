import React, { useState, useEffect } from "react";
import axios from "axios";

const useGetDataSebaranPMK = ({ pageQuery, BASE_URL_API_V1 }) => {
  const [dataSebaran, setDataSebaran] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (pageQuery !== "sebaran_kasus" && pageQuery) return;
        const resGroup = await axios.get(
          BASE_URL_API_V1 + "/peternakan/pmk/penyebaran_kasus?type=grouped"
        );
        setDataSebaran(resGroup.data.data.list || []);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    getData();
  }, [pageQuery, BASE_URL_API_V1]);

  return { dataSebaran, setDataSebaran };
};

export default useGetDataSebaranPMK;
