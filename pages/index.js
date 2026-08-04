import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

// Page child
const Hero = dynamic(() => import("@/components/pages/home/hero"));
const Harga = dynamic(() => import("@/components/pages/home/harga"));
const Penghargaan = dynamic(() => import("@/components/pages/home/penghargaan"));
const Pilar = dynamic(() => import("@/components/pages/home/pilar"));
const Dataset = dynamic(() => import("@/components/pages/home/dataset"));
const Dashboard = dynamic(() => import("@/components/pages/home/dashboard"));

export default function Home({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V3_CLIENT }) {
  const priceReff = React.useRef(null);

  const executePriceScroll = () =>
    priceReff.current.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Head>
        <title>Simawas Pagi</title>
        <meta
          name="description"
          content="Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main
        style={{
          backgroundColor: "#F8FCFB",
        }}
      >
        <Hero executePriceScroll={executePriceScroll} />
        <Penghargaan />
        <Harga priceReff={priceReff} BASE_URL_API_V3_CLIENT={BASE_URL_API_V3_CLIENT} />
        {/* <Pilar /> */}
        {/* <Dataset /> */}
        {/* <Dashboard /> */}
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
      BASE_URL_API_V3_CLIENT: process.env.BASE_URL_API_V3_CLIENT,
    },
  };
};
