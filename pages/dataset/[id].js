import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// MUI
import {
  Dialog,
  DialogContent,
  DialogContentText,
  LinearProgress,
  Slide,
  Typography,
} from "@mui/material";

// atoms
const Container = dynamic(() => import("@/components/atoms/container"));

// molecules
const Footer = dynamic(() => import("@/components/molecules/footer"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

// _legacy
import { CustomTabs } from "@/components/_legacy";

import HeaderData from "@/components/pages/dataset/headerData";
import Data from "@/components/pages/dataset/data";
import Metadata from "@/components/pages/dataset/metadata";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateId } from "@/utils/common";
import { utils, write } from "xlsx";
import moment from "moment";
import FileSaver from "file-saver";
import { ArrowCircleDown } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DatasetDetail({
  BASE_URL_API_V2,
  BASE_URL_API_V2_CLIENT,
}) {
  const router = useRouter();
  const defaultLimit = {
    limit: 10,
    skip: 0,
  };

  const [filter, setFilter] = React.useState({
    nama_kabupaten_kota: [],
    bps_nama_kabupaten_kota: [],
    nama_komoditas: [],
    nama_prov: [],
    asal_provinsi: [],
    tahun: [],
    ...defaultLimit,
  });
  const [data, setData] = React.useState({});
  const [surveyPurpose, setSurveyPurpose] = React.useState([]);
  const [surveySector, setSurveySector] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingExport, setIsLoadingExport] = React.useState(false);
  const [tableHeader, setTableHeader] = React.useState(["Data"]);
  const [metaFilter, setMetaFilter] = React.useState({
    header_id: "",
  });
  const [isOpenSurvey, setIsOpenSurvey] = React.useState(false);

  React.useEffect(() => {
    getData({
      ...filter,
      nama_kabupaten_kota: filter.nama_kabupaten_kota.join() || undefined,
      bps_nama_kabupaten_kota:
        filter.bps_nama_kabupaten_kota.join() || undefined,
      nama_prov: filter.nama_prov.join() || undefined,
      asal_provinsi: filter.asal_provinsi.join() || undefined,
      tahun: filter.tahun.join() || undefined,
      nama_komoditas: filter.nama_komoditas.join() || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getData = async (params = {}) => {
    setIsLoading(true);
    try {
      if (router.query?.id) {
        const res = await axios.get(
          BASE_URL_API_V2 + `/dataset/meta/${router.query?.id}/detail`,
          { params }
        );
        setData(res?.data?.data || []);
      } else {
        setData({});
      }
    } catch (error) {
      console.log("error : ", error);
    }
    setIsLoading(false);
  };

  const getSurveyPurpose = async () => {
    try {
      const res = await axios.get(BASE_URL_API_V2_CLIENT + "/survey/purpose");
      setSurveyPurpose(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getSurveySector = async () => {
    try {
      const res = await axios.get(BASE_URL_API_V2_CLIENT + "/survey/sector");
      setSurveySector(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  React.useEffect(() => {
    if (BASE_URL_API_V2_CLIENT) {
      getSurveyPurpose();
      getSurveySector();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL_API_V2_CLIENT]);

  React.useEffect(() => {
    if (data?.header?._id && data?.header?._id !== metaFilter.header_id) {
      setMetaFilter(data?.meta_filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleExport = async (fileExtension = ".xlsx") => {
    setIsLoadingExport(true);
    try {
      let dataExport = [tableHeader];

      const res = await axios.get(
        BASE_URL_API_V2 + `/dataset/meta/${router.query?.id}/detail`,
        { params: { ...filter, limit: undefined, skip: undefined } }
      );
      const rows = res?.data?.data?.detail || [];

      rows.map((item) => {
        let arr = [];
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const element = item[key];
            for (let i = 0; i < tableHeader.length; i++) {
              if (key === tableHeader[i]) {
                arr[i] = element;
              }
            }
          }
        }
        dataExport.push(arr);
      });

      const worksheet = utils.aoa_to_sheet(dataExport);

      let fileType;
      let fileBuffer;
      if (fileExtension === ".xlsx") {
        worksheet["!cols"] = fitToColumn(dataExport);
        function fitToColumn(arrayOfArray) {
          // get maximum character of each column
          return arrayOfArray[0].map((a, i) => ({
            wch: Math.max(
              ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
            ),
          }));
        }
        const new_workbook = utils.book_new();
        utils.book_append_sheet(
          new_workbook,
          worksheet,
          moment().format("DD MMMM YYYY")
        );
        // Exporting the file with the desired name and extension.
        fileBuffer = write(new_workbook, {
          bookType: "xlsx",
          type: "array",
        });
        fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      } else if (fileExtension === ".csv") {
        fileType = "text/csv;encoding:utf-8";
        fileBuffer = utils.sheet_to_csv(worksheet);
      }

      const fileData = new Blob([fileBuffer], { type: fileType });
      FileSaver.saveAs(
        fileData,
        `${data.header?.title} - ${moment().format("DD MMMM YYYY")}` +
          fileExtension
      );
    } catch (error) {
      console.log("error : ", error);
    }
    setIsLoadingExport(false);
    setIsOpenSurvey(true)
  };

  const tabsContent = [
    {
      label: "Data",
      content: (
        <Data
          detail={data.detail || []}
          pageInfo={data.page_info || {}}
          metaFilter={metaFilter || {}}
          filter={filter}
          setFilter={setFilter}
          isLoading={isLoading}
          handleExport={handleExport}
          tableHeader={tableHeader}
          setTableHeader={setTableHeader}
          apiLink={BASE_URL_API_V2 + `/dataset/meta/${router.query?.id}/detail`}
          defaultLimit={defaultLimit}
          surveyPurpose={surveyPurpose}
          surveySector={surveySector}
          datasetId={router.query?.id}
          BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
          isOpenSurvey={isOpenSurvey}
          setIsOpenSurvey={setIsOpenSurvey}
        />
      ),
    },
    {
      label: "Metadata",
      content: (
        <Metadata metadata={data.meta_data || {}} isLoading={isLoading} />
      ),
    },
  ];

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
        <Dialog
          open={isLoadingExport}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {}}
          aria-describedby="export-loading"
        >
          <DialogContent>
            <DialogContentText id="export-loading" className="text-center p-7">
              <ArrowCircleDown
                color="success"
                sx={{ fontSize: 100 }}
                className="animate-bounce"
              />
              <LinearProgress
                color="success"
                sx={{ minWidth: "50vh" }}
                className="my-7"
              />
              <Typography className="font-lato text-lg">
                Download Dataset ...
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
          <HeaderData
            title={data.header?.title}
            organization={data.header?.dinas?.name}
            pilar={data.header?.pilar?.name}
            pilarImage={
              data.header?.pilar?.image || "/media/ilustrasi_pilar.svg"
            }
            date={formatDateId(data.header?.update_at)}
            years={
              data.header?.range[0] +
              " - " +
              data.header?.range[data.header?.range?.length - 1]
            }
          />
          <CustomTabs tabsContent={tabsContent} />
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
