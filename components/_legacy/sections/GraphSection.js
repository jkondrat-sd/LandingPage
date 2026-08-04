/* eslint-disable @next/next/no-img-element */
import React from "react";
import Select from "react-select";
import dynamic from "next/dynamic";
// import Papa from "papaparse";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
moment.locale("ID");

const GroupedBarChart = dynamic(
  () => import("@/components/_legacy/Graphs/GroupedBarChart"),
  { ssr: false }
);

import {
  districtOrCityList,
  comodityList,
  commodityPublicIconPath,
  strategicCommodityList,
} from "@/utils/constant";

const statisticModel = {
  ketersediaanHighest: {
      minggu: '-',
      value: '-'
  },
  ketersediaanLowest: {
      minggu: '-',
      value: '-'
  },
  kebutuhanLowest: {
      minggu: '-',
      value: '-'
  },
  kebutuhanHighest: {
      minggu: '-',
      kebutuhan: '-'
  }
};

const GraphSection = ({ BASE_URL_API_V1_CLIENT }) => {
  let router = useRouter();
  const { location: locationQuery, commodity: commodityQuery } = router.query;

  const handleNavigation = (location, commodityId) => {
    router.push(
      `/ketahanan_pangan/neraca_pangan/detail?location=${location}&commodity=${commodityId}`
    );
  };

  const options = React.useMemo(
    () =>
      Object.keys(districtOrCityList).map((k) => {
        const toSpace = districtOrCityList[k].replaceAll("_", " ");
        const option = {
          value: k,
          label: toSpace,
        };

        return option;
      }),
    []
  );

  const optionsCommodityMemo = React.useMemo(() => optionsCommodity(), []);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [commodity, setCommodity] = React.useState(null);
  const [initialCityOrCountry, setInitialCityOrCountry] = React.useState(null);
  const [barData, setBarData] = React.useState({
    ketersediaan: [],
    kebutuhan: [],
  });
  const [statistic, setStatistic] = React.useState(statisticModel);

  React.useEffect(() => {
    if (!options || !optionsCommodityMemo) return;

    if (!locationQuery && !commodityQuery) {
      handleNavigation('3201', '3001');
    } else if (!locationQuery) {
      handleNavigation('3201', commodityQuery);
    } else if (!commodityQuery) {
      handleNavigation(locationQuery, '3001');
    } else if (locationQuery && commodityQuery) {
      let commoDitySelectedQuery;

      const loc = options.find((item) => {
        const withUnderscore = item.label.replaceAll(" ", "_");
        return item.value === locationQuery;
      });

      Object.keys(comodityList).find((keyCommo) => {
        if (keyCommo === commodityQuery) {
          commoDitySelectedQuery = optionsCommodityMemo.find(
            (item) => item.value === keyCommo.toString()
          );
        }
      });

      setInitialCityOrCountry(loc);
      handleChange(loc);
      setCommodity(commoDitySelectedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationQuery, commodityQuery, options, optionsCommodityMemo]);

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await axios.get(
        BASE_URL_API_V1_CLIENT + "/neraca/latest_detail",
        {params: {
          kode_kabupaten_atau_kota: Number(value),
          kode_komoditas: Number(commodity?.value),
        }}
      );
      setStatistic(data?.statistic);
      setBarData(data?.chart);

      setLoading(false);
    }
    if (value && commodity) getData();

  }, [value, commodity, BASE_URL_API_V1_CLIENT]);

  const handleChange = (val) => {
    setValue(val?.value);
  };

  const handleSelectCommodity = (val) => {
    setCommodity(val);
  };

  return (
    <div className="flex flex-col mx-auto rounded-lg border border-gray-300 shadow-xl">
      <section className="m-5">
        <div className="flex flex-wrap divide-x">
          <div className="xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-1/2 w-1/2 px-2 mb-4 pr-7">
            {initialCityOrCountry && options && (
              <Select
                options={options}
                placeholder="Pilih Kabupaten/Kota"
                onChange={handleChange}
                defaultValue={initialCityOrCountry}
                styles={selectStyles}
              />
            )}
          </div>
          <div className="xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-1/2 w-1/2 px-2 mb-4 pl-7">
            {commodity && optionsCommodityMemo && (
              <Select
                options={optionsCommodityMemo}
                placeholder="Pilih komoditas"
                defaultValue={commodity}
                onChange={handleSelectCommodity}
                styles={selectStylesCommodity}
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-full w-full px-2 mb-4">
            {barData?.length > 0 && (
                <GroupedBarChart barData={barData} />
              )}
          </div>
          <div className="xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-full w-full px-2 mb-4 border border-gray-300 rounded-lg">
            <div className="m-2">
              <h4 className="text-green-700 text-lg">Statistik</h4>
              <div className="my-3">
                <div className="flex flex-wrap mt-6">
                  <div className="rounded-full h-3 w-3 items-center bg-blue-700 mr-4"></div>
                  <h4 className="pb-1">Ketersediaan (Ton)</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex mr-4">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 4.33334C0 2.1242 1.79086 0.333344 4 0.333344H16C18.2091 0.333344 20 2.1242 20 4.33334V16.3333C20 18.5425 18.2091 20.3333 16 20.3333H4C1.79086 20.3333 0 18.5425 0 16.3333V4.33334Z"
                          fill="#E4F9E9"
                        />
                        <path
                          d="M15.7631 8.78761L10.5237 3.5482C10.4676 3.4992 10.4045 3.45884 10.3365 3.42845L10.2767 3.38354C10.1851 3.35242 10.0889 3.33723 9.99223 3.33863C9.93006 3.33158 9.86729 3.33158 9.80511 3.33863H9.70781C9.65943 3.36596 9.61424 3.3986 9.57308 3.43593L9.46081 3.5033L4.2214 8.7427C4.15125 8.81228 4.09556 8.89507 4.05756 8.98628C4.01956 9.07749 4 9.17532 4 9.27413C4 9.37294 4.01956 9.47077 4.05756 9.56198C4.09556 9.65319 4.15125 9.73597 4.2214 9.80555C4.29098 9.87571 4.37377 9.93139 4.46498 9.96939C4.55619 10.0074 4.65402 10.027 4.75283 10.027C4.85164 10.027 4.94947 10.0074 5.04068 9.96939C5.13189 9.93139 5.21467 9.87571 5.28425 9.80555L9.24375 5.86851V17.1781C9.24375 17.3767 9.3226 17.567 9.46297 17.7074C9.60334 17.8478 9.79372 17.9266 9.99223 17.9266C10.1907 17.9266 10.3811 17.8478 10.5215 17.7074C10.6619 17.567 10.7407 17.3767 10.7407 17.1781V5.89845L14.7002 9.8804C14.7698 9.95056 14.8526 10.0062 14.9438 10.0442C15.035 10.0822 15.1328 10.1018 15.2316 10.1018C15.3304 10.1018 15.4283 10.0822 15.5195 10.0442C15.6107 10.0062 15.6935 9.95056 15.7631 9.8804C15.8378 9.81039 15.8975 9.72577 15.9382 9.63178C15.979 9.5378 16 9.43645 16 9.33401C16 9.23157 15.979 9.13021 15.9382 9.03623C15.8975 8.94224 15.8378 8.85762 15.7631 8.78761Z"
                          fill="#16A75C"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm pt-1 ml-2">
                        Data Tertinggi
                      </p>
                    </div>
                    <h2 className="text-lg text-gray-900 font-bold ml-7">
                      {loading
                        ? "Loading"
                        : statistic?.ketersediaanHighest?.value || "-"}
                    </h2>
                    <p className="text-base text-gray-900 ml-7">
                      {loading
                        ? "Loading"
                        : "Minggu " + statistic?.ketersediaanHighest?.minggu ||
                          "-"}
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex mr-4">
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 4.33334C0 2.1242 1.79086 0.333344 4 0.333344H16C18.2091 0.333344 20 2.1242 20 4.33334V16.3333C20 18.5425 18.2091 20.3333 16 20.3333H4C1.79086 20.3333 0 18.5425 0 16.3333V4.33334Z"
                            fill="#FFEBEE"
                          />
                          <path
                            d="M4.23694 12.8791L9.47634 18.1185C9.53241 18.1675 9.59548 18.2079 9.66346 18.2382L9.72334 18.2831C9.81489 18.3143 9.91109 18.3295 10.0078 18.3281C10.0699 18.3351 10.1327 18.3351 10.1949 18.3281L10.2922 18.3281C10.3406 18.3007 10.3858 18.2681 10.4269 18.2308L10.5392 18.1634L15.7786 12.924C15.8488 12.8544 15.9044 12.7716 15.9424 12.6804C15.9804 12.5892 16 12.4914 16 12.3926C16 12.2938 15.9804 12.1959 15.9424 12.1047C15.9044 12.0135 15.8488 11.9307 15.7786 11.8611C15.709 11.791 15.6262 11.7353 15.535 11.6973C15.4438 11.6593 15.346 11.6397 15.2472 11.6397C15.1484 11.6397 15.0505 11.6593 14.9593 11.6973C14.8681 11.7353 14.7853 11.791 14.7157 11.8611L10.7563 15.7982L10.7563 4.48854C10.7563 4.29003 10.6774 4.09965 10.537 3.95928C10.3967 3.81891 10.2063 3.74005 10.0078 3.74005C9.80926 3.74005 9.61888 3.81891 9.47851 3.95928C9.33814 4.09965 9.25928 4.29003 9.25928 4.48854L9.25928 15.7682L5.29979 11.7863C5.2302 11.7161 5.14742 11.6604 5.05621 11.6224C4.965 11.5844 4.86717 11.5649 4.76836 11.5649C4.66955 11.5649 4.57172 11.5844 4.48051 11.6224C4.3893 11.6604 4.30652 11.7161 4.23694 11.7863C4.16215 11.8563 4.10254 11.9409 4.06178 12.0349C4.02103 12.1289 4 12.2302 4 12.3327C4 12.4351 4.02103 12.5365 4.06178 12.6305C4.10254 12.7244 4.16215 12.8091 4.23694 12.8791Z"
                            fill="#EF5350"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm pt-1 ml-2">
                          Data Terendah
                        </p>
                      </div>
                      <h2 className="text-lg text-gray-900 font-bold ml-7">
                        {loading
                          ? "Loading"
                          : statistic?.ketersediaanLowest?.value || "-"}
                      </h2>
                      <p className="text-base text-gray-900 ml-7">
                        {loading
                          ? "Loading"
                          : "Minggu " + statistic?.ketersediaanLowest?.minggu ||
                            "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <div className="flex flex-wrap mt-6">
                  <div className="rounded-full h-3 w-3 items-center bg-red-700 mr-4"></div>
                  <h4 className="pb-1">Kebutuhan (Ton)</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex mr-4">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 4.33334C0 2.1242 1.79086 0.333344 4 0.333344H16C18.2091 0.333344 20 2.1242 20 4.33334V16.3333C20 18.5425 18.2091 20.3333 16 20.3333H4C1.79086 20.3333 0 18.5425 0 16.3333V4.33334Z"
                          fill="#E4F9E9"
                        />
                        <path
                          d="M15.7631 8.78761L10.5237 3.5482C10.4676 3.4992 10.4045 3.45884 10.3365 3.42845L10.2767 3.38354C10.1851 3.35242 10.0889 3.33723 9.99223 3.33863C9.93006 3.33158 9.86729 3.33158 9.80511 3.33863H9.70781C9.65943 3.36596 9.61424 3.3986 9.57308 3.43593L9.46081 3.5033L4.2214 8.7427C4.15125 8.81228 4.09556 8.89507 4.05756 8.98628C4.01956 9.07749 4 9.17532 4 9.27413C4 9.37294 4.01956 9.47077 4.05756 9.56198C4.09556 9.65319 4.15125 9.73597 4.2214 9.80555C4.29098 9.87571 4.37377 9.93139 4.46498 9.96939C4.55619 10.0074 4.65402 10.027 4.75283 10.027C4.85164 10.027 4.94947 10.0074 5.04068 9.96939C5.13189 9.93139 5.21467 9.87571 5.28425 9.80555L9.24375 5.86851V17.1781C9.24375 17.3767 9.3226 17.567 9.46297 17.7074C9.60334 17.8478 9.79372 17.9266 9.99223 17.9266C10.1907 17.9266 10.3811 17.8478 10.5215 17.7074C10.6619 17.567 10.7407 17.3767 10.7407 17.1781V5.89845L14.7002 9.8804C14.7698 9.95056 14.8526 10.0062 14.9438 10.0442C15.035 10.0822 15.1328 10.1018 15.2316 10.1018C15.3304 10.1018 15.4283 10.0822 15.5195 10.0442C15.6107 10.0062 15.6935 9.95056 15.7631 9.8804C15.8378 9.81039 15.8975 9.72577 15.9382 9.63178C15.979 9.5378 16 9.43645 16 9.33401C16 9.23157 15.979 9.13021 15.9382 9.03623C15.8975 8.94224 15.8378 8.85762 15.7631 8.78761Z"
                          fill="#16A75C"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm pt-1 ml-2">
                        Data Tertinggi
                      </p>
                    </div>
                    <h2 className="text-lg text-gray-900 font-bold ml-7">
                      {loading
                        ? "Loading"
                        : statistic?.kebutuhanHighest?.value || "-"}
                    </h2>
                    <p className="text-base text-gray-900 ml-7">
                      {loading
                        ? "Loading"
                        : "Minggu " + statistic?.kebutuhanHighest?.minggu || "-"}
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex mr-4">
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 4.33334C0 2.1242 1.79086 0.333344 4 0.333344H16C18.2091 0.333344 20 2.1242 20 4.33334V16.3333C20 18.5425 18.2091 20.3333 16 20.3333H4C1.79086 20.3333 0 18.5425 0 16.3333V4.33334Z"
                            fill="#FFEBEE"
                          />
                          <path
                            d="M4.23694 12.8791L9.47634 18.1185C9.53241 18.1675 9.59548 18.2079 9.66346 18.2382L9.72334 18.2831C9.81489 18.3143 9.91109 18.3295 10.0078 18.3281C10.0699 18.3351 10.1327 18.3351 10.1949 18.3281L10.2922 18.3281C10.3406 18.3007 10.3858 18.2681 10.4269 18.2308L10.5392 18.1634L15.7786 12.924C15.8488 12.8544 15.9044 12.7716 15.9424 12.6804C15.9804 12.5892 16 12.4914 16 12.3926C16 12.2938 15.9804 12.1959 15.9424 12.1047C15.9044 12.0135 15.8488 11.9307 15.7786 11.8611C15.709 11.791 15.6262 11.7353 15.535 11.6973C15.4438 11.6593 15.346 11.6397 15.2472 11.6397C15.1484 11.6397 15.0505 11.6593 14.9593 11.6973C14.8681 11.7353 14.7853 11.791 14.7157 11.8611L10.7563 15.7982L10.7563 4.48854C10.7563 4.29003 10.6774 4.09965 10.537 3.95928C10.3967 3.81891 10.2063 3.74005 10.0078 3.74005C9.80926 3.74005 9.61888 3.81891 9.47851 3.95928C9.33814 4.09965 9.25928 4.29003 9.25928 4.48854L9.25928 15.7682L5.29979 11.7863C5.2302 11.7161 5.14742 11.6604 5.05621 11.6224C4.965 11.5844 4.86717 11.5649 4.76836 11.5649C4.66955 11.5649 4.57172 11.5844 4.48051 11.6224C4.3893 11.6604 4.30652 11.7161 4.23694 11.7863C4.16215 11.8563 4.10254 11.9409 4.06178 12.0349C4.02103 12.1289 4 12.2302 4 12.3327C4 12.4351 4.02103 12.5365 4.06178 12.6305C4.10254 12.7244 4.16215 12.8091 4.23694 12.8791Z"
                            fill="#EF5350"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm pt-1 ml-2">
                          Data Terendah
                        </p>
                      </div>
                      <h2 className="text-lg text-gray-900 font-bold ml-7">
                        {loading
                          ? "Loading"
                          : statistic?.kebutuhanLowest?.value || "-"}
                      </h2>
                      <p className="text-base text-gray-900 ml-7">
                        {loading
                          ? "Loading"
                          : "Minggu " + statistic?.kebutuhanLowest?.minggu || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs italic text-700 mb-4">
            <span className="text-red-600 text-sm">*</span>
            <i>Sumber data: Badan Ketahanan Pangan</i>
          </p>
        </div>
      </section>
    </div>
  );
};

const optionCommodity = (imgPath, title) => {
  return (
    <div className="grid grid-flow-col auto-cols-max gap-1">
      <img src={imgPath} style={{ width: 30, height: 30 }} alt="" />
      <p className="leading-7 w-full capitalize">{title}</p>
    </div>
  );
};

const optionsCommodity = () => {
  let cache = { ...comodityList };
  let data = [];

  Object.keys(cache).map((key) => {
    const imgPath = commodityPublicIconPath.find(
      (item) => item.key.toString() === key
    ).path;
    const commodityTitle = strategicCommodityList.find(
      (commodityEl) => commodityEl.key.toString() === key.toString()
    ).commodityTitle;
    data.push({
      value: key,
      label: optionCommodity(imgPath, commodityTitle),
    });
  });
  return data;
};

const selectStyles = {
  container: (provided) => ({
    ...provided,
    textTransform: "capitalize",
  }),
};

const selectStylesCommodity = {
  container: (provided) => ({
    ...provided,
    textTransform: "capitalize",
  }),
};

export default GraphSection;
