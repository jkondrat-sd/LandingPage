import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/components/_legacy/Logo";
const dkppLogo = "/logos/dkpp_logo.svg";
const jabarLogo = "/logos/jawa_barat_logo.svg";
const silindaLogo = "/logos/silinda_jabar_logo.svg";

import Landscape from "@/components/_legacy/Landscape";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";

const Footer = () => {
  const { isMobile } = useMediaQuery();

  return (
    <footer
      className="bg-gray-50"
      style={{ fontSize: isMobile ? "12px" : "16px" }}
    >
      <Landscape />
      <div className="max-w-screen-2xl px-6 mx-auto mt-8 pb-12">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="grid-rows-1 gap-2">
            <div>
              <Link href="/">
                <a>
                  <Image
                    src="/logo_simawas_pagi_detail_long.svg"
                    alt="Simawas Pagi"
                    width={466}
                    height={48}
                  />
                  <span className="sr-only"></span>
                </a>
              </Link>
            </div>
            <div className="flex flex-row">
              {customImage({
                id: "dkpp-logo-img",
                src: dkppLogo,
                w: 100,
                h: 47,
                ismobile: isMobile,
              })}
              {customImage({
                id: "jabar-logo-img",
                src: jabarLogo,
                w: 56,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "silinda-logo-img",
                src: "/logos/logo-unpad.svg",
                w: 85,
                h: 63,
                ismobile: isMobile,
              })}
            </div>
            <Typography
              className="mt-5"
              style={{ color: "#133C6B" }}
              fontSize="18px"
              fontWeight={700}
            >
              Sumber Data
            </Typography>
            <div className="flex flex-row">
              {customImage({
                id: "dkpp-logo-img",
                src: dkppLogo,
                w: 100,
                h: 47,
                ismobile: isMobile,
              })}
              {customImage({
                id: "silinda-logo-img",
                src: silindaLogo,
                w: 135,
                h: 55,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/distanhortijabar.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/unnamed 2.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/bapanas.svg",
                w: 135,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/adTHCNtq_400x400 1.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
            </div>
            <div className="flex flex-row">
              {customImage({
                id: "logo-img",
                src: "/logos/opd/dpmdesjabar.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/images 1.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/images 2.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/bpbd jabar.svg",
                w: 63,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/disbunjabar.svg",
                w: 135,
                h: 63,
                ismobile: isMobile,
              })}
              {customImage({
                id: "logo-img",
                src: "/logos/opd/indag.svg",
                w: 100,
                h: 63,
                ismobile: isMobile,
              })}
            </div>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <Address />
            {!isMobile && <Email />}
            <div className="grid grid-cols-2 gap-4">
              <Phone />
              <div style={{ fontSize: "1em" }}>
                <h5>Faks</h5>
                <p>022-87354100</p>
              </div>
            </div>
            {isMobile && <Email />}
            {!isMobile && (
              <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full text-center p-5 text-sm">
        &copy; Copyright 2024,{" "}
        <a
          href="https://wa.me/6289666171323"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Pusat Komando Ketahanan Pangan Jawa Barat
        </a>
      </div>
    </footer>
  );
};

const Address = () => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <svg
          width="14"
          height="19"
          viewBox="0 0 14 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 2.49333C8.83334 2.49333 10.3333 3.99333 10.3333 5.82666C10.3333 7.57666 8.58334 10.41 7 12.41C5.41667 10.3267 3.66667 7.57666 3.66667 5.82666C3.66667 3.99333 5.16667 2.49333 7 2.49333ZM7 0.82666C4.25 0.82666 2 3.07666 2 5.82666C2 9.57666 7 14.9933 7 14.9933C7 14.9933 12 9.49333 12 5.82666C12 3.07666 9.75 0.82666 7 0.82666ZM7 4.15999C6.08334 4.15999 5.33334 4.90999 5.33334 5.82666C5.33334 6.74333 6.08334 7.49333 7 7.49333C7.91667 7.49333 8.66667 6.74333 8.66667 5.82666C8.66667 4.90999 7.91667 4.15999 7 4.15999ZM13.6667 14.9933C13.6667 16.8267 10.6667 18.3267 7 18.3267C3.33334 18.3267 0.333336 16.8267 0.333336 14.9933C0.333336 13.91 1.33334 12.9933 2.91667 12.3267L3.41667 13.0767C2.58334 13.4933 2 13.9933 2 14.5767C2 15.7433 4.25 16.66 7 16.66C9.75 16.66 12 15.7433 12 14.5767C12 13.9933 11.4167 13.4933 10.5 13.0767L11 12.3267C12.6667 12.9933 13.6667 13.91 13.6667 14.9933Z"
            fill="#D32F2F"
          />
        </svg>
        <Typography sx={{ ml: "9.33px", fontSize: "1em" }}>Alamat</Typography>
      </Box>
      <Typography sx={{ ml: "23.33px", fontSize: "1em" }}>
        Jl. Kawaluyaan Indah Raya No.6 Lt.5 Soekarno-Hatta
      </Typography>
    </div>
  );
};

const Phone = () => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.88 1.175L3.8525 0.882498C4.38524 0.721851 4.95823 0.760523 5.46456 0.991298C5.97088 1.22207 6.37594 1.62918 6.60416 2.13666L7.35583 3.80833C7.55205 4.24483 7.60669 4.73181 7.51209 5.20095C7.41749 5.67008 7.17838 6.09782 6.82833 6.42416L5.58333 7.585C5.54694 7.61891 5.52388 7.66473 5.51833 7.71416C5.48166 8.045 5.70583 8.68916 6.2225 9.585C6.59833 10.2358 6.93916 10.6933 7.22833 10.9492C7.43 11.1283 7.54083 11.1667 7.58833 11.1533L9.26333 10.6408C9.72076 10.5009 10.2105 10.5076 10.6639 10.6601C11.1173 10.8125 11.5117 11.103 11.7917 11.4908L12.8592 12.9708C13.1838 13.4209 13.3341 13.9735 13.2821 14.526C13.2302 15.0785 12.9795 15.5933 12.5767 15.975L11.8383 16.675C11.4465 17.0461 10.9652 17.3094 10.4413 17.4392C9.9175 17.569 9.36897 17.561 8.84916 17.4158C6.55416 16.775 4.49666 14.8383 2.65333 11.6458C0.807498 8.44916 0.159998 5.69583 0.756664 3.385C0.890977 2.86528 1.1569 2.38892 1.52881 2.00183C1.90072 1.61474 2.36606 1.32998 2.88 1.175ZM3.24083 2.3725C2.93256 2.46538 2.6534 2.63607 2.43023 2.86814C2.20707 3.10021 2.04742 3.38583 1.96666 3.6975C1.465 5.64083 2.03916 8.08166 3.73583 11.0208C5.43 13.9558 7.25416 15.6725 9.18583 16.2125C9.49761 16.2993 9.82656 16.304 10.1407 16.226C10.4548 16.148 10.7434 15.9901 10.9783 15.7675L11.7175 15.0675C11.9007 14.894 12.0146 14.6599 12.0383 14.4087C12.0619 14.1575 11.9935 13.9063 11.8458 13.7017L10.7792 12.2225C10.6519 12.046 10.4725 11.9138 10.2663 11.8445C10.06 11.7751 9.83722 11.7721 9.62916 11.8358L7.95 12.35C6.975 12.64 6.09 11.8558 5.14 10.21C4.5 9.10166 4.20166 8.24333 4.27583 7.57583C4.315 7.22916 4.47583 6.90916 4.73083 6.67083L5.97583 5.51C6.13502 5.36168 6.24376 5.16723 6.28681 4.95396C6.32985 4.74068 6.30503 4.51928 6.21583 4.32083L5.46416 2.64916C5.36043 2.41867 5.17643 2.23376 4.94645 2.12889C4.71647 2.02402 4.45621 2.00635 4.21416 2.07916L3.24083 2.3725Z"
            fill="#069550"
          />
        </svg>
        <Typography sx={{ ml: "9.33px", fontSize: "1em" }}>Telepon</Typography>
      </Box>
      <Typography sx={{ ml: "23.33px", fontSize: "1em" }}>
        022-87327711
      </Typography>
    </div>
  );
};
const Fax = () => {};
const Email = () => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <svg
          width="17"
          height="14"
          viewBox="0 0 17 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.1 0.76001H13.9C14.5641 0.759966 15.2031 1.01405 15.6858 1.47015C16.1685 1.92624 16.4584 2.54977 16.496 3.21281L16.5 3.36001V10.96C16.5001 11.6241 16.246 12.2631 15.7899 12.7458C15.3338 13.2285 14.7103 13.5184 14.0472 13.556L13.9 13.56H3.1C2.43589 13.5601 1.79694 13.306 1.31422 12.8499C0.831494 12.3938 0.541599 11.7703 0.504 11.1072L0.5 10.96V3.36001C0.499957 2.6959 0.754044 2.05695 1.21014 1.57423C1.66623 1.0915 2.28976 0.801609 2.9528 0.76401L3.1 0.76001ZM15.3 5.05841L8.78001 8.49042C8.70639 8.52931 8.62548 8.55245 8.54243 8.55837C8.45938 8.56429 8.376 8.55287 8.29761 8.52482L8.22081 8.49121L1.7 5.05921V10.96C1.70001 11.3114 1.83214 11.6499 2.07015 11.9083C2.30815 12.1668 2.63464 12.3263 2.9848 12.3552L3.1 12.36H13.9C14.2515 12.36 14.5901 12.2278 14.8486 11.9896C15.1071 11.7514 15.2665 11.4247 15.2952 11.0744L15.3 10.96V5.05841ZM13.9 1.96001H3.1C2.74865 1.96002 2.41015 2.09215 2.15169 2.33015C1.89323 2.56816 1.73371 2.89465 1.7048 3.24481L1.7 3.36001V3.70321L8.50001 7.28161L15.3 3.70241V3.36001C15.3 3.00853 15.1677 2.66992 14.9296 2.41144C14.6914 2.15297 14.3647 1.99353 14.0144 1.96481L13.9 1.96001Z"
            fill="#FF7500"
          />
        </svg>
        <Typography sx={{ ml: "9.33px", fontSize: "1em" }}>Email</Typography>
      </Box>
      <Typography sx={{ ml: "23.33px", fontSize: "1em" }}>
        dkpp@jabarprov.go.id
      </Typography>
    </div>
  );
};

const customImage = ({ classNameProps, src, w, h, ismobile }) => {
  return (
    <Box
      className={classNameProps}
      sx={{
        marginLeft: ismobile ? "auto" : "unset",
        marginRight: ismobile ? "auto" : "50px !important",
        marginTop: "30px !important",
      }}
    >
      <Image src={src} alt={src} width={w} height={h} />
    </Box>
  );
};

export default Footer;
