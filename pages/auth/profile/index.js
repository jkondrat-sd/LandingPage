import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Container from "@/components/atoms/container";
import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import { Title } from "@/components/_legacy";
import useMediaQuery from "@/hooks/useMediaQuery";
import { CheckRounded, Edit } from "@mui/icons-material";
import { checkIsLoggedIn } from "@/server/auth";
import { serialize } from "cookie";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { getCookie } from "cookies-next";
import { formatDateId } from "@/utils/common";
import FormChangePassword from "@/components/pages/auth/FormChangePassword";
import { axiosClient } from "@/utils/axios";
import { checkSURole } from "@/utils/constant/role";
import FormEditProfile from "@/components/pages/auth/FormEditProfile";
import { userLogout } from "@/utils/auth";
import { EMAIL_REGEX } from "@/utils/constant";
import { ERROR_MESSAGE } from "@/utils/constant/error_message";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

const Profile = ({ BASE_URL_API_V2_CLIENT }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const [userLoggedin, setUserLoggedin] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isSuccessUpdateProfile, setIsSuccessUpdateProfile] = React.useState(false);
  const [errorUpdateProfile, setErrorUpdateProfile] = React.useState(null);
  const [isChangePassword, setIsChangePassword] = React.useState(false);
  const [isSuccessChangePassword, setIsSuccessChangePassword] = React.useState(false);
  const [errorChangePassword, setErrorChangePassword] = React.useState(null);
  const userCookie = getCookie("user");
  const [form, setForm] = React.useState();
  const [isValidForm, setIsValidForm] = React.useState({
    username: true,
    email: true,
    given_name: true,
    local_goverment_agencies: true,
  });

  React.useEffect(() => {
    if (userCookie) {
      setUserLoggedin(JSON.parse(userCookie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCookie]);


  React.useEffect(() => {
    if (userLoggedin) {
      setForm({
        username: userLoggedin?.username,
        email: userLoggedin?.email,
        given_name: userLoggedin?.profile?.given_name,
        family_name: userLoggedin?.profile?.family_name,
        local_goverment_agencies: userLoggedin?.profile?.local_goverment_agencies,
        work_unit: userLoggedin?.profile?.work_unit,
        occupation: userLoggedin?.profile?.occupation,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedin]);

  const handleClickEdit = () => {
    if (!userLoggedin.sso && !checkSURole(userLoggedin.role)) {
      setIsEdit(true);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setErrorUpdateProfile(false);
    setForm({
      username: userLoggedin?.username,
      email: userLoggedin?.email,
      given_name: userLoggedin?.profile?.given_name,
      family_name: userLoggedin?.profile?.family_name,
      local_goverment_agencies: userLoggedin?.profile?.local_goverment_agencies,
      work_unit: userLoggedin?.profile?.work_unit,
      occupation: userLoggedin?.profile?.occupation,
    });
    setIsValidForm({
      username: true,
      email: true,
      given_name: true,
      local_goverment_agencies: true,
    });
  };

  const handleChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
    if (value && value !== "") {
      setIsValidForm({
        ...isValidForm,
        [key]: true,
      });
    } else {
      setIsValidForm({
        ...isValidForm,
        [key]: false,
      });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setErrorUpdateProfile(false);
    if (
      form.username &&
      form.email &&
      form.given_name &&
      form.local_goverment_agencies
    ) {
      if (!EMAIL_REGEX.test(form.email)) {
        setIsValidForm({
          ...isValidForm,
          email: false
        })
      } else if (BASE_URL_API_V2_CLIENT && !userLoggedin.sso && !checkSURole(userLoggedin.role)) {
        setLoadingUpdate(true);
        try {
          const data = await axiosClient(BASE_URL_API_V2_CLIENT).patch(
            "/user/update",
            { ...form }
          );
          if (data?.data?.success) {
            setIsSuccessUpdateProfile(true);
          }
        } catch (error) {
          setErrorUpdateProfile(error?.response?.data?.error_code);
        }
        setLoadingUpdate(false);
        setIsEdit(false);
      }
    } else {
      setIsValidForm({
        username: form.username ? true : false,
        email: form.email ? true : false,
        given_name: form.given_name ? true : false,
        local_goverment_agencies: form.local_goverment_agencies ? true : false,
      });
    }
  };

  const handleClickChangePassword = () => {
    if (!userLoggedin.sso && !checkSURole(userLoggedin.role)) {
      setErrorChangePassword(null);
      setIsChangePassword(true);
    }
  };

  const handleChangePassword = async (formChangePassword) => {
    if (BASE_URL_API_V2_CLIENT && !userLoggedin.sso && !checkSURole(userLoggedin.role)) {
      setLoading(true);
      try {
        const data = await axiosClient(BASE_URL_API_V2_CLIENT).patch(
          "/user/change-password",
          { ...formChangePassword }
        );
        if (data?.data?.success) {
          await userLogout({ BASE_URL_API_V2_CLIENT, redirect: "/auth/login" });
          setIsSuccessChangePassword(true);
        }
      } catch (error) {
        setErrorChangePassword(error?.response?.data?.error_code);
      }
      setLoading(false);
      // setIsChangePassword(false);
    }
  };

  const handleCancelChangePassword = () => {
    setIsChangePassword(false);
  };

  return (
    <>
      <Head>
        <title>Simawas Pagi</title>
        <meta
          name="description"
          content="Tentang Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main
        style={{
          backgroundColor: "#F8FCFB",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ minHeight: "90vh" }}>
            <Box className="p-5">
              <Title text="Profile" style={{ fontFamily: "Inter" }} />
            </Box>
            <Paper elevation={0} className="p-5">
              {
                !userLoggedin.sso && !checkSURole(userLoggedin.role) && (
                  <Grid container direction="row" className="my-5">
                    <Grid item xl={4} md={4} sm={12}>
                      <Button
                        sx={{
                          border: "solid 1px #AAD6C1",
                          fontFamily: "Inter",
                          textTransform: "capitalize",
                          color: "#000000",
                          fontWeight: 500,
                          cursor: "default",
                          ":hover": {
                            background: "none",
                          },
                        }}
                      >
                        Update Terakhir: {formatDateId(userLoggedin?.update_at)}
                      </Button>
                    </Grid>
                    <Grid item xl={4} md={4} sm={12}>
                      {errorUpdateProfile && (
                        <Alert severity="error">
                          {ERROR_MESSAGE.update_profile[errorUpdateProfile] || errorUpdateProfile}
                        </Alert>
                      )}
                    </Grid>
                    {!isEdit ? (
                      <Grid
                        item
                        xl={4}
                        md={4}
                        sm={12}
                        className="flex gap-3 justify-end"
                      >
                        <Button
                          color="success"
                          sx={{
                            border: "solid 1px #AAD6C1",
                            fontFamily: "Inter",
                            textTransform: "capitalize",
                            color: "#008444",
                            fontWeight: 500,
                            display: "flex",
                            gap: 1,
                          }}
                          onClick={handleClickChangePassword}
                        >
                          <Edit />
                          Ubah password
                        </Button>
                        <Button
                          color="success"
                          sx={{
                            border: "solid 1px #AAD6C1",
                            fontFamily: "Inter",
                            textTransform: "capitalize",
                            color: "#008444",
                            fontWeight: 500,
                            display: "flex",
                            gap: 1,
                          }}
                          onClick={handleClickEdit}
                        >
                          <PencilSquareIcon width={20} />
                          Edit Profile
                        </Button>
                      </Grid>
                    ) : (
                      <Grid
                        item
                        xl={4}
                        md={4}
                        sm={12}
                        className="flex gap-3 justify-end"
                      >
                        <Button
                          color="success"
                          variant="outlined"
                          sx={{
                            border: "solid 1px #AAD6C1",
                            fontFamily: "Inter",
                            textTransform: "capitalize",
                            color: "#008444",
                            fontWeight: 500,
                            display: "flex",
                            gap: 1,
                          }}
                          onClick={handleCancel}
                        >
                          Batal
                        </Button>
                        <Button
                          color="success"
                          variant="contained"
                          type=""
                          sx={{
                            fontFamily: "Inter",
                            textTransform: "capitalize",
                            color: "#ffffff",
                            background: "#008444",
                            fontWeight: 500,
                            display: "flex",
                            gap: 1,
                          }}
                          onClick={handleUpdate}
                        >
                          Simpan
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                )
              }
              <FormEditProfile
                userLoggedin={userLoggedin}
                isEdit={isEdit}
                handleChangeForm={handleChangeForm}
                form={form}
                isValidForm={isValidForm}
                errorUpdateProfile={errorUpdateProfile}
              />
            </Paper>
          </Box>
        </Container>
        <Footer />
        <FormChangePassword
          isChangePassword={isChangePassword}
          handleCancelChangePassword={handleCancelChangePassword}
          handleChangePassword={handleChangePassword}
          loading={loading}
          isSuccessChangePassword={isSuccessChangePassword}
          setIsSuccessChangePassword={isSuccessChangePassword}
          errorChangePassword={errorChangePassword}
        />
        <Dialog
          open={loadingUpdate || isSuccessUpdateProfile}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              color: "#ffffff",
              background: "#008444",
              fontFamily: "Inter",
            }}
          >
            {loadingUpdate ? "Menyimpan Data Profile" : "Sukses Update Profile"}
          </DialogTitle>
          {loadingUpdate ? (
            <DialogContent>
              <Box className="text-center p-10">
                <CircularProgress color="success" />
                <Typography>Menyimpan Data Profile ...</Typography>
              </Box>
            </DialogContent>
          ) : (
            <DialogContent>
              <Box className="p-10 text-center">
                <CheckRounded sx={{ color: "#008444", fontSize: "8rem" }} />
                <Typography
                  fontFamily="Lato"
                  className="px-14 pb-5"
                  fontWeight={500}
                >
                  Profile berhasil diubah
                </Typography>
                <Button
                  color="success"
                  variant="contained"
                  type=""
                  sx={{
                    fontFamily: "Inter",
                    textTransform: "capitalize",
                    color: "#ffffff",
                    background: "#008444",
                    fontWeight: 500,
                    marginTop: 5,
                  }}
                  onClick={() => setIsSuccessUpdateProfile(false)}
                >
                  OK
                </Button>
              </Box>
            </DialogContent>
          )}
        </Dialog>
      </main>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  if (!checkIsLoggedIn(ctx.req)) {
    ctx.res.setHeader("Set-Cookie", serialize("last_page", "/auth/profile"));
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }

  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
    },
  };
};

export default Profile;
