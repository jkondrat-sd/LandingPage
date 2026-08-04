import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetRegionKecamatan = ({ BASE_URL_API_V1, query }) => {
  const [dataRegionKecamatan, setDataRegionKecamatan] = useState([]);
  const [filterRegionKecamatan, setFilterRegionKecamatan] = useState([]);
  const [loadingGetRegionKecamatan, setLoadingGetRegionKecamatan] =
    useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (
          !filterRegionKecamatan.length ||
          (query && query !== "sebaran_kasus")
        )
          return;

        setLoadingGetRegionKecamatan(true);
        const res = await axios.post(
          BASE_URL_API_V1 + "/extra/kecamatan_map_region",
          { filters: filterRegionKecamatan }
        );
        setDataRegionKecamatan(res.data.data || []);
        setLoadingGetRegionKecamatan(false);
      } catch (error) {
        console.log("error : ", error);
        setLoadingGetRegionKecamatan(false);
      }
    })();
  }, [BASE_URL_API_V1, filterRegionKecamatan, query]);

  return {
    setFilterRegionKecamatan,
    loadingGetRegionKecamatan,
    dataRegionKecamatan,
  };
};

export default useGetRegionKecamatan;
