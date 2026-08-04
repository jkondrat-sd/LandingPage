import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";
import useMediaQuery from "@/hooks/useMediaQuery";

// MUI
import { Box, Grid, Typography } from "@mui/material";

// atoms
const Container = dynamic(() => import("@/components/atoms/container"));

// molecules
const Footer = dynamic(() => import("@/components/molecules/footer"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

// _legacy
import {
  CustomCheckbox,
  CustomInput,
  CustomSelect,
  FilterAccordion,
  Subtitle,
  Title,
  Pagination
} from "@/components/_legacy";

// utils
import { formatDateId } from "@/utils/common";

import ItemList from "@/components/pages/dataset/itemList";

const DataLoader = () => (
  <div className="w-full p-5">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-400 h-24 w-24"></div>
      <div className="flex-1 space-y-6 py-3">
        <div className="h-3 bg-gray-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-3 bg-gray-400 rounded"></div>
            <div className="h-3 bg-gray-400 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-3 bg-gray-400 rounded"></div>
            <div className="h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Dataset({ BASE_URL_API_V2, BASE_URL_API_V2_CLIENT }) {

  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const router = useRouter();
  const [datasetList, setDatasetList] = React.useState([]);
  const [pageInfo, setPageInfo] = React.useState({});
  const [pilar, setPilar] = React.useState([]);
  const [organization, setOrganization] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const defaultLimit = {
    limit: 10,
    skip: 0,
  }
  const [filter, setFilter] = React.useState({
    pilar_ids: [],
    dinas_ids: [],
    ...defaultLimit
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const sortOptions = [
    { value: 'abjad', label: 'Abjad'},
    { value: 'terbaru', label: 'Terbaru'},
  ];
  const showOptions = [
    { value: 'seluruhnya', label: 'Seluruhnya'},
    { value: 'perhalaman', label: 'Perhalaman'},
  ];

  React.useEffect(() => {
    getPilar();
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

  React.useEffect(() => {
    getDataset({
      ...filter,
      pilar_ids: filter.pilar_ids.join() || undefined,
      dinas_ids: filter.dinas_ids.join() || undefined,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getDataset = async ( params={} ) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        BASE_URL_API_V2 + "/dataset/meta/all",
        { params }
      );
      setDatasetList(res?.data?.data?.data || []);
      setPageInfo(res?.data?.data?.page_info || {});
    } catch (error) {
      console.log("error : ", error);
    }
    setIsLoading(false);
  };

  const getPilar = async () => {
    try {
      const res = await axios.get(
        BASE_URL_API_V2 + "/dataset/pillar/all"
      );
      setPilar(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getOrganization = async () => {
    try {
      const res = await axios.get(
        BASE_URL_API_V2 + "/organization/all"
      );
      setOrganization(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const changeHandler = (key, value) => {
    if (key === 'limit' || key === 'skip') {
      setFilter({
        ...filter,
        [key]: value,
      })
    } else {
      setFilter({
        ...filter,
        [key]: value,
        ...defaultLimit
      })
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 1000)
  , []);

  const totalPage = pageInfo?.limit > 0 ? Math.ceil(pageInfo?.count / pageInfo?.limit) : 1;

  return (
    <>
      <Head>
        <title>Dataset | Simawas Pagi</title>
        <meta
          name="description"
          content="Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main>
        <Container maxWidth="xl" sx={{marginTop: '50px'}}>
          <Title text="Database Ketahanan Pangan" />
          <Subtitle 
            text="Dapatkan data-data Pangan dari ketiga pilar penyusun ketahanan pangan yang lengkap dan akurat secara cepat dan mudah. <br/>
            Berasal dari Organisasi Perangkat Daerah di Provinsi Jawa Barat." />

          <Grid container direction="row" spacing={2} sx={{marginTop: '50px'}}>
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <CustomInput value={search} placeholder="Cari Data" icon="/icons/search.svg" onChange={(e) => {
                debouncedChangeHandler('search', e.target.value);
                setSearch(e.target.value);
              }} />
            </Grid>
            {!mobileTab &&
              <>
                <Grid item xl={3} md={3} sm={12} xs={12}>
                  <CustomSelect value={filter.sort} placeholder="Urutkan" options={sortOptions} icon="/icons/sort-descending.svg" onChange={(value) => changeHandler('sort', value)} />
                </Grid>
                <Grid item xl={3} md={3} sm={12} xs={12}>
                  <CustomSelect placeholder="Tampilkan" options={showOptions} icon="/icons/adjustments.svg" onChange={(value) => {
                    if(value === 'seluruhnya') {
                      changeHandler('skip', undefined);
                      changeHandler('limit', undefined);
                    } else {
                      changeHandler('skip', 0);
                      changeHandler('limit', 10);
                    }
                  }} />
                </Grid>
              </>
            }
          </Grid>

          <Grid container spacing={2} sx={{marginTop: '16px'}}>
            <Grid item xl={3} md={3} sm={12} xs={12} className="flex justify-between">
              <Typography variant="h4" style={{fontFamily: "Lato", fontSize: mobileTab ? '20px' : '28px'}} >
                Filter
              </Typography>
              <Typography className="text-sm my-auto" style={{fontFamily: "Lato"}} >
                Menampilkan {datasetList.length > 0 && pageInfo.skip + 1 +'-'+ datasetList.length + ' dari '} {pageInfo.count} Dataset
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{marginTop: '16px'}}>
            <Grid item xl={3} md={3} sm={12} xs={12}>
              <Box className="shadow-md w-full">
                <FilterAccordion title="Asal Organisasi" expanded={mobileTab ? false : true}>
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
                          changeHandler('dinas_ids', val);
                        } else {
                          const val = filter.dinas_ids;
                          const index = val.indexOf(item._id);
                          if (index > -1) {
                            val.splice(index, 1);
                          }
                          changeHandler('dinas_ids', val);
                        }
                      }}
                    />
                  ))}
                </FilterAccordion>
                <FilterAccordion title="Pilar Ketahanan Pangan" expanded={mobileTab ? false : true}>
                  {pilar.map((item) => (
                    <CustomCheckbox
                      key={item._id}
                      label={item.name}
                      value={item._id}
                      id={item._id}
                      onChange={(value) => {
                        if (value) {
                          const val = filter.pilar_ids;
                          val.push(value);
                          changeHandler('pilar_ids', val);
                        } else {
                          const val = filter.pilar_ids;
                          const index = val.indexOf(item._id);
                          if (index > -1) {
                            val.splice(index, 1);
                          }
                          changeHandler('pilar_ids', val);
                        }
                      }}
                    />
                  ))}
                </FilterAccordion>
              </Box>
            </Grid>
            <Grid item xl={9} md={9} sm={12} xs={12}>
              <Box className="shadow-md w-full">
                {isLoading 
                  ? (
                      <>
                        <DataLoader />
                        <DataLoader />
                        <DataLoader />
                      </>
                    )
                  : datasetList.length > 0 ? datasetList.map((item) => (
                      <ItemList
                        key={item._id}
                        datasetId={item._id}
                        logo={item.avatar}
                        title={item.title}
                        organization={item.dinas?.name}
                        pilar={item.pilar?.name}
                        date={formatDateId(item.update_at)}
                        years={item.range[0]+' - '+item.range[item.range.length-1]}
                      />
                    )) : (
                      <Typography className="w-full text-center p-14">
                        Tidak ada data.
                      </Typography>
                    )
                }
              </Box>
              <div style={{marginTop: mobileTab ? '25px' : '50px'}}>
                <Pagination
                  rowOptions={totalPage > 0 ? [10,20,50,100] : []}
                  pageOptions={Array.from({length: totalPage}, (_, i) => i + 1)}
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
        </Container>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      BASE_URL_API_V2: process.env.BASE_URL_API_V2,
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
    },
  };
};
