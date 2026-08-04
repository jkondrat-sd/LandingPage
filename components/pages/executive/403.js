import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));
import Container from "@/components/atoms/container";
import Head from "next/head";

const Custom403 = () => {
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
      <Header />
      <Box sx={{background: "#F8FCFB"}}>
        <Container maxWidth="xl">
          <Box className="text-center p-10">
            <Typography variant="h4" fontFamily="Inter" fontWeight={700}>
              Akses Terbatas
            </Typography>
            <Typography sx={{my:5}} fontFamily="Lato" fontSize="1.2rem" color="#9E9E9E">
              Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini terbatas hanya untuk user tertentu saja. Apabila Anda merasa ada kesalahan mohon hubungi kami untuk bantuan
            </Typography>
            <Link href="/" passHref>
              <a style={{ marginTop: 20 }}>
                <Button type="" color="success" variant="contained" className="capitalize">
                  Kembali ke Beranda
                </Button>
              </a>
            </Link>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "350px",
                width: "100%",
                my: 10
              }}
            >
              <Image
                src="/media/forbidden.svg"
                alt="forbidden"
                layout="fill"
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Custom403;
