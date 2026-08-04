import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";
import useMediaQuery from "@/hooks/useMediaQuery";

// MUI
import { Box, Grid, Typography } from "@mui/material";

// _legacy
import {
  CustomCheckbox,
  CustomInput,
  CustomSelect,
  FilterAccordion,
  Pagination,
} from "@/components/_legacy";

import { pilarData } from "@/utils/constant/publicDashboardPilar";
import Link from "next/link";
import Image from "next/image";

const PilarDetail = ({ BASE_URL_API_V2, pilarDetail }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const router = useRouter();
  const [datasetList, setDatasetList] = React.useState([]);
  const [pageInfo, setPageInfo] = React.useState({});
  // const [pilar, setPilar] = React.useState([]);
  const [organization, setOrganization] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(pilarDetail);

  const defaultLimit = {
    limit: 10,
    skip: 0,
  };
  const [filter, setFilter] = React.useState({
    pilar_id: pilarDetail?.id,
    dinas_ids: [],
    ...defaultLimit,
  });
  // const [isLoading, setIsLoading] = React.useState(false);

  const sortOptions = [
    { value: "abjad", label: "Abjad" },
    { value: "terbaru", label: "Terbaru" },
  ];
  const showOptions = [
    { value: "seluruhnya", label: "Seluruhnya" },
    { value: "perhalaman", label: "Perhalaman" },
  ];

  React.useEffect(() => {
    if (filter.pilar_id) {
      setSelected(pilarData.find((item) => item.id === filter.pilar_id) || {});
    }
  }, [filter]);

  React.useEffect(() => {
    setPageInfo({
      count: selected.cards?.length,
      limit: 10,
      skip: 0,
    });
  }, [selected]);

  React.useEffect(() => {
    // getPilar();
    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (router?.query?.search) {
      setFilter({
        ...filter,
        search: router.query.search,
      });
      setSearch(router.query.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.search]);

  // React.useEffect(() => {
  //   getDataset({
  //     ...filter,
  //     pilar_id: filter.pilar_id,
  //     dinas_ids: filter.dinas_ids.join() || undefined,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);

  // const getDataset = async (params = {}) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(BASE_URL_API_V2 + "/dataset/meta/all", {
  //       params,
  //     });
  //     setDatasetList(res?.data?.data?.data || []);
  //     setPageInfo(res?.data?.data?.page_info || {});
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  //   setIsLoading(false);
  // };

  // const getPilar = async () => {
  //   try {
  //     const res = await axios.get(BASE_URL_API_V2 + "/dataset/pillar/all");
  //     setPilar(res?.data?.data || []);
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // };

  const getOrganization = async () => {
    try {
      const res = await axios.get(BASE_URL_API_V2 + "/organization/all");
      setOrganization(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const changeHandler = (key, value) => {
    if (key === "limit" || key === "skip") {
      setFilter({
        ...filter,
        [key]: value,
      });
    } else {
      setFilter({
        ...filter,
        [key]: value,
        ...defaultLimit,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 1000),
    []
  );

  const totalPage =
    pageInfo?.limit > 0 ? Math.ceil(pageInfo?.count / pageInfo?.limit) : 1;

  return (
    <Box className="py-10">
      <Grid container direction="row" spacing={2} sx={{ marginTop: "50px" }}>
        {!mobileTab && (
          <>
            <Grid item xl={3} md={3} sm={12} xs={12}>
              <CustomSelect
                value={filter.sort}
                placeholder="Urutkan"
                options={sortOptions}
                icon="/icons/sort-descending.svg"
                onChange={(value) => changeHandler("sort", value)}
              />
            </Grid>
            <Grid item xl={3} md={3} sm={12} xs={12}>
              <CustomSelect
                placeholder="Tampilkan"
                options={showOptions}
                icon="/icons/adjustments.svg"
                onChange={(value) => {
                  if (value === "seluruhnya") {
                    changeHandler("skip", undefined);
                    changeHandler("limit", undefined);
                  } else {
                    changeHandler("skip", 0);
                    changeHandler("limit", 10);
                  }
                }}
              />
            </Grid>
          </>
        )}
        <Grid item xl={6} md={6} sm={12} xs={12}>
          <CustomInput
            value={search}
            placeholder="Cari Data"
            icon="/icons/search.svg"
            onChange={(e) => {
              debouncedChangeHandler("search", e.target.value);
              setSearch(e.target.value);
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid
          item
          xl={3}
          md={3}
          sm={12}
          xs={12}
          className="flex justify-between"
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: "Lato",
              fontSize: mobileTab ? "20px" : "28px",
            }}
          >
            Filter
          </Typography>
          <Typography
            className="text-sm my-auto"
            style={{ fontFamily: "Lato" }}
          >
            Menampilkan{" "}
            {selected.cards?.length > 0 &&
              pageInfo.skip + 1 + "-" + selected.cards?.length + " dari "}{" "}
            {pageInfo.count} Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xl={3} md={3} sm={12} xs={12}>
          <Box className="shadow-md w-full">
            <FilterAccordion
              title="Asal Organisasi"
              expanded={mobileTab ? false : true}
            >
              {organization.map((item) => (
                <CustomCheckbox
                  key={item._id}
                  label={item.name}
                  value={item._id}
                  id={item._id}
                  onChange={(value) => {
                    if (value) {
                      const val = filter.dinas_ids;
                      val.push(value);
                      changeHandler("dinas_ids", val);
                    } else {
                      const val = filter.dinas_ids;
                      const index = val.indexOf(item._id);
                      if (index > -1) {
                        val.splice(index, 1);
                      }
                      changeHandler("dinas_ids", val);
                    }
                  }}
                />
              ))}
            </FilterAccordion>
            <FilterAccordion
              title="Pilar Ketahanan Pangan"
              expanded={mobileTab ? false : true}
            >
              {pilarData.map((item) => (
                <div
                  className="form-check flex align-middle my-2"
                  key={item._id}
                >
                  <input
                    className="form-check-input appearance-none h-5 w-5 border border-gray-400 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer my-auto"
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    style={{
                      backgroundImage: 'url("/icons/check.png")',
                      backgroundSize: "75%",
                    }}
                    checked={item.id === filter.pilar_id}
                    onChange={() => {
                      changeHandler("pilar_id", item.id);
                    }}
                  ></input>
                  <label
                    className="form-check-label inline-block text-gray-900 text-sm font-normal capitalize"
                    htmlFor={item.id}
                    style={{ maxWidth: "85%" }}
                  >
                    {item.title?.toLocaleLowerCase()}
                  </label>
                </div>
              ))}
            </FilterAccordion>
          </Box>
        </Grid>
        <Grid item xl={9} md={9} sm={12} xs={12}>
          <Box className="w-full flex">
            {selected.cards?.length > 0 ? (
              selected.cards.map((item) => (
                <div
                  className="xl:w-1/4 lg:w-1/4 md:w-1/2 sm:w-full w-full px-5 mb-5"
                  key={item}
                >
                  <Link href={item.url} passHref>
                    <div
                      className="text-center hover:shadow-lg rounded-xl p-4 cursor-pointer"
                      style={{ background: selected.secondaryColor }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src="/logos/dkpp-circle.svg"
                          layout="fill"
                          alt="icon"
                        />
                      </div>
                      <Typography
                        fontFamily="Inter"
                        fontWeight="500"
                        fontSize="0.8rem"
                        className="mt-3"
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <Typography className="subtitle p-5">Belum ada!</Typography>
            )}
          </Box>
          <div style={{ marginTop: mobileTab ? "25px" : "50px" }}>
            <Pagination
              rowOptions={totalPage > 0 ? [10, 20, 50, 100] : []}
              pageOptions={Array.from({ length: totalPage }, (_, i) => i + 1)}
              onChangeTotalRow={(limit) => {
                setFilter({
                  ...filter,
                  skip: 0,
                  limit: limit,
                });
              }}
              onChangePageNumber={(page) => {
                setFilter({
                  ...filter,
                  skip: (page - 1) * filter.limit,
                });
              }}
              totalData={pageInfo?.count}
              totalPage={totalPage}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PilarDetail;
