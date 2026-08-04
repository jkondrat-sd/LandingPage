import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CheckRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { ERROR_MESSAGE } from "@/utils/constant/error_message";

const FormChangePassword = ({
  isChangePassword,
  handleCancelChangePassword,
  handleChangePassword,
  loading,
  isSuccessChangePassword,
  errorChangePassword,
}) => {
  const router = useRouter();
  const [oldPasswordShow, setOldPasswordShow] = React.useState(false);
  const [newPasswordShow, setNewPasswordShow] = React.useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [isValidForm, setIsValidForm] = React.useState({
    old_password: true,
    new_password: true,
    confirm_new_passwod: true,
  });

  const handleChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
    if (value && value !== "") {
      setIsValidForm({
        ...isValidForm,
        [key]: value.length >= 3,
      });
    } else {
      setIsValidForm({
        ...isValidForm,
        [key]: false,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      form.old_password.length >= 3 &&
      form.new_password.length >= 3 &&
      form.confirm_new_passwod.length >= 3
    ) {
      await handleChangePassword(form);
    } else {
      setIsValidForm({
        old_password: form.old_password.length >= 3 ? true : false,
        new_password: form.new_password.length >= 3 ? true : false,
        confirm_new_passwod: form.confirm_new_passwod.length >= 3 ? true : false,
      });
    }
  };

  return (
    <Dialog
      open={isChangePassword}
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
        Ubah Password
      </DialogTitle>
      {loading ? (
        <DialogContent>
          <Box className="text-center p-10">
            <CircularProgress color="success" />
            <Typography>Menyimpan Perubahan Password ...</Typography>
          </Box>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            {isSuccessChangePassword ? (
              <Box className="p-10 text-center">
                <CheckRounded sx={{ color: "#008444", fontSize: "8rem" }} />
                <Typography
                  fontFamily="Lato"
                  className="px-14 pb-5"
                  fontWeight={500}
                >
                  Password baru berhasil diubah
                </Typography>
                <Typography
                  fontFamily="Lato"
                  className="px-5 pb-5"
                  fontWeight={500}
                >
                  Silahkan Login kembali menggunakan password baru
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
                  onClick={() => {
                    setCookies("last_page", "/auth/profile");
                    router.push("/auth/login");
                  }}
                >
                  Ke Halaman Login
                </Button>
              </Box>
            ) : (
              <Box className="p-10">
                <Typography
                  fontFamily="Lato"
                  className="px-14 pb-5"
                  fontWeight={500}
                >
                  Silahkan lengkapi data untuk mengubah password
                </Typography>
                {errorChangePassword && (
                  <Alert severity="error" className="my-3">
                    {ERROR_MESSAGE.change_password[errorChangePassword] || errorChangePassword}
                  </Alert>
                )}
                <Grid container alignItems="center" className="my-5">
                  <Grid item xl={5} md={5} sm={5}>
                    <Typography
                      color="#008444"
                      fontFamily="Inter"
                      fontWeight={500}
                    >
                      Password Lama
                    </Typography>
                  </Grid>
                  <Grid item xl={7} md={7} sm={7}>
                    <TextField
                      value={form.old_password || ""}
                      error={!isValidForm.old_password}
                      helperText={
                        !isValidForm.old_password &&
                        "Password lama minimal 3 karakters!"
                      }
                      onChange={(e) =>
                        handleChangeForm("old_password", e.target.value)
                      }
                      sx={{
                        ".OutlinedInput-notchedOutline": {
                          border: "solid 1px #AAD6C1",
                          fontFamily: "Inter",
                        },
                      }}
                      fullWidth
                      size="small"
                      id="old_password"
                      type={oldPasswordShow ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setOldPasswordShow(!oldPasswordShow)
                              }
                              edge="end"
                            >
                              {oldPasswordShow ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" className="my-5">
                  <Grid item xl={5} md={5} sm={5}>
                    <Typography
                      color="#008444"
                      fontFamily="Inter"
                      fontWeight={500}
                    >
                      Password Baru
                    </Typography>
                  </Grid>
                  <Grid item xl={7} md={7} sm={7}>
                    <TextField
                      value={form.new_password || ""}
                      error={!isValidForm.new_password}
                      helperText={
                        !isValidForm.new_password &&
                        "Password baru minimal 3 karakters!"
                      }
                      onChange={(e) =>
                        handleChangeForm("new_password", e.target.value)
                      }
                      sx={{
                        ".OutlinedInput-notchedOutline": {
                          border: "solid 1px #AAD6C1",
                          fontFamily: "Inter",
                        },
                      }}
                      fullWidth
                      size="small"
                      id="new_password"
                      type={newPasswordShow ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setNewPasswordShow(!newPasswordShow)
                              }
                              edge="end"
                            >
                              {newPasswordShow ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" className="my-5">
                  <Grid item xl={5} md={5} sm={5}>
                    <Typography
                      color="#008444"
                      fontFamily="Inter"
                      fontWeight={500}
                    >
                      Konfirmasi Password
                    </Typography>
                  </Grid>
                  <Grid item xl={7} md={7} sm={7}>
                    <TextField
                      value={form.confirm_new_passwod || ""}
                      error={!isValidForm.confirm_new_passwod}
                      helperText={
                        !isValidForm.confirm_new_passwod &&
                        "Password konfirmasi minimal 3 karakters!"
                      }
                      onChange={(e) =>
                        handleChangeForm("confirm_new_passwod", e.target.value)
                      }
                      sx={{
                        ".OutlinedInput-notchedOutline": {
                          border: "solid 1px #AAD6C1",
                          fontFamily: "Inter",
                        },
                      }}
                      fullWidth
                      size="small"
                      id="confirm_new_passwod"
                      type={confirmPasswordShow ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setConfirmPasswordShow(!confirmPasswordShow)
                              }
                              edge="end"
                            >
                              {confirmPasswordShow ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          {!isSuccessChangePassword && (
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setForm({});
                  setIsValidForm({
                    old_password: true,
                    new_password: true,
                    confirm_new_passwod: true,
                  });
                  handleCancelChangePassword();
                }}
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
                onClick={handleSubmit}
              >
                Simpan
              </Button>
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
};

export default FormChangePassword;
