import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Subtitle, Title } from "@/components/_legacy";

const Footer = dynamic(() => import("@/components/molecules/footer"));
const Header = dynamic(() => import("@/components/molecules/header"));
const Container = dynamic(() => import("@/components/atoms/container"));
const Pilar = dynamic(() => import("@/components/pages/dashboard/pilar"));
const PilarDetail = dynamic(() =>
  import("@/components/pages/dashboard/pilarDetail")
);

const Dashboard = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V2 }) => {
  const [pilarDetail, setPilarDetail] = React.useState(null);

  return (
    <>
      <Head>
        <title>Dashboard | Simawas Pagi</title>
        <meta
          name="description"
          content="Sistem informasi kewaspadaan pangan dan gizi"
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main>
        <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
          <Title
            text="Dashboard Ketahanan Pangan Jawa Barat"
            style={{ marginBottom: "0px" }}
          />
          <Subtitle
            text="Dashboard Ketahanan Pangan Jawa Barat digunakan untuk memantau komponen - komponen pendukung 3 pilar ketahanan pangan yang terdiri dari ketersediaan, keterjangkauan, dan pemanfaatan."
            style={{ marginTop: "5px" }}
          />
          {pilarDetail ? <PilarDetail pilarDetail={pilarDetail} BASE_URL_API_V2={BASE_URL_API_V2} /> : <Pilar setPilarDetail={setPilarDetail} />}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
      BASE_URL_API_V2: process.env.BASE_URL_API_V2,
    },
  };
};

export default Dashboard;
