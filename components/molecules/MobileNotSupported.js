import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Typography = dynamic(() => import("@mui/material/Typography"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

const MobileNotSupported = () => {
  return (
    <>
      <Head>
        <title>Sebaran Kasus PMK | Simawas Pagi </title>
        <meta name="description" content="Sebaran Kasus PMK | Simawas Pagi" />
      </Head>
      <Header />
      <Typography
        variant="h1"
        sx={{
          marginTop: 25,
          textAlign: "center",
          width: "100%",
          fontSize: 24,
        }}
      >
        Maaf, saat ini tampilan untuk mobile masih dikerjakan tim kami 🥺.
      </Typography>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", width: "100%", fontSize: 18, marginTop: 5 }}
      >
        Datang lagi ya nanti 🥰
      </Typography>
    </>
  );
};

export default MobileNotSupported;
