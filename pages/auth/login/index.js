import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";

// constant
import {
  CustomInput,
  Subtitle,
  Title,
  CustomCheckbox,
} from "@/components/_legacy";

import { Alert, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userLogin } from "@/utils/auth";
import { checkIsLoggedIn } from "@/server/auth";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/router";

// MUI
const Box = dynamic(() => import("@mui/material/Box"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Button = dynamic(() => import("@mui/material/Button"));

// atoms
const Container = dynamic(() => import("@/components/atoms/container"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

const Login = ({
  BASE_SSO_JABAR,
  SSO_JABAR_CLIENT_ID,
  BASE_URL,
  BASE_URL_API_V4_CLIENT,
}) => {
  const router = useRouter();
  const { isMobile } = useMediaQuery();
  const headerRef = React.useRef(null);
  const [headerHeight, setHeaderHeight] = React.useState(null);
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [loadingTamu, setLoadingTamu] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  const handleLogin = async ({username=undefined, password=undefined}) => {
    username ? setLoadingTamu(true) : setLoading(true);
    try {
      await userLogin({
        BASE_URL_API_V4_CLIENT,
        credentials: {
          username_or_email: username || input.username,
          password: password || input.password,
        },
        redirect: "/executive",
      });
    } catch (error) {
      setError("Username atau Password yang anda masukkan tidak sesuai!");
      console.log("error : ", error?.response?.data);
      username ? setLoadingTamu(false) : setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.username || !input.password) {
      setError("Username dan Password harus diisi!");
    } else {
      handleLogin({});
    }
  };

  const handleOnchangeInput = ({ e, field }) => {
    if (error) setError(null);
    setInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLoginSSO = () => {
    router.push(
      `${BASE_SSO_JABAR}/protocol/openid-connect/auth?response_type=code&client_id=${SSO_JABAR_CLIENT_ID}&redirect_uri=${BASE_URL}auth/sso`
    );
  };

  return (
    <>
      <Head>
        <title> Masuk | Simawas Pagi </title>
        <meta
          name="description"
          content="Masuk ke Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
      </Head>
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#F8FCFB",
          overflow: "auto",
          fontSize: isMobile ? "12px" : "16px",
        }}
      >
        <Header headerRef={headerRef} />
        <Container maxWidth="xl" sx={{ height: "85vh" }}>
          <Grid
            container
            className="h-full"
            direction="row"
            justifyContent="center"
            alignItems="center"
            p={isMobile ? 0 : 5}
          >
            <Grid item xl={6} lg={6} md={6} sm={12}>
              <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="flex-start"
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: isMobile ? "300px" : "500px",
                    width: isMobile ? "350px" : "80%",
                  }}
                >
                  <Image
                    src="/media/ilustrasi_pilar.svg"
                    alt="pilar"
                    layout="fill"
                  />
                </Box>
                {/* Subtitle */}
              </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} p={isMobile ? 0 : 5}>
              <Box
                sx={{
                  width: "100%",
                  px: 3,
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiTextField-root": { width: "25ch" },
                  }}
                >
                  <Title
                    text="Wilujeng Sumping!"
                    style={{ fontSize: "1.6em", textAlign: "left" }}
                  />
                  <Subtitle
                    text="Silahkan melakukan login terlebih dahulu untuk mengakses Dashboard Ketahanan Pangan Jawa Barat."
                    style={{
                      fontSize: "1.2em",
                      textAlign: "left",
                      marginTop: 0,
                    }}
                  />
                  {error && (
                    <Alert severity="error" className="my-3">
                      {error}
                    </Alert>
                  )}
                  <CustomInput
                    name="username"
                    type="username"
                    placeholder="Username / Email"
                    value={input.username}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) =>
                      handleOnchangeInput({ e, field: "username" })
                    }
                  />
                  <CustomInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={input.password}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) =>
                      handleOnchangeInput({ e, field: "password" })
                    }
                    actionButton={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <div className="flex justify-between mb-5 align-middle">
                    <CustomCheckbox
                      label="Ingat Saya"
                      onChange={() => {}}
                      value=""
                      id="remember"
                    />
                    <a
                      href=""
                      className="my-2 font-lato"
                      style={{ color: "#E8331A", fontSize: "0.875rem" }}
                    >
                      Lupa Password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    disabled={loading}
                    sx={{
                      color: "#008444 !important",
                      backgroundColor: "#ffffff !important",
                      "&:hover": {
                        backgroundColor: "#ffffff !important",
                      },
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      borderRadius: "16px",
                    }}
                    className="font-lato"
                    onClick={() => !loading && handleSubmit}
                  >
                    {loading && (
                      <CircularProgress
                        color="success"
                        sx={{
                          mr: 3,
                        }}
                      />
                    )}
                    Log In
                  </Button>
                  <Button
                    sx={{
                      color: "white !important",
                      backgroundColor: "#008444 !important",
                      "&:hover": {
                        backgroundColor: "#0f6930 !important",
                      },
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      borderRadius: "16px",
                      mt: 3,
                    }}
                    className="font-lato"
                    disabled={loadingTamu}
                    onClick={() => {
                      if (!loadingTamu) {
                        handleLogin({
                          username: "tamu",
                          password: "tamu",
                        })
                      }
                    }}
                  >
                    {loadingTamu && (
                      <CircularProgress
                        sx={{
                          mr: 3,
                          color: "#FFFFFF"
                        }}
                      />
                    )}
                    Log In sebagai Tamu
                  </Button>
                  <Button
                    sx={{
                      color: "white !important",
                      backgroundColor: "#008444 !important",
                      "&:hover": {
                        backgroundColor: "#0f6930 !important",
                      },
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      borderRadius: "16px",
                      mt: 3,
                    }}
                    className="font-lato"
                    onClick={handleLoginSSO}
                  >
                    Log In dengan Smart JABAR
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  if (checkIsLoggedIn(ctx.req)) {
    return {
      redirect: {
        destination: "/executive",
      },
    };
  }

  return {
    props: {
      BASE_URL_API_V1_CLIENT: process.env.BASE_URL_API_V1_CLIENT,
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
      BASE_URL_API_V4_CLIENT: process.env.BASE_URL_API_V4_CLIENT,
      BASE_URL_API_V2: process.env.BASE_URL_API_V2,
      BASE_SSO_JABAR: process.env.BASE_SSO_JABAR,
      SSO_JABAR_CLIENT_ID: process.env.SSO_JABAR_CLIENT_ID,
      BASE_URL: process.env.BASE_URL,
    },
  };
};

export default Login;
