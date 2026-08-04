import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

const FormEditProfile = ({
  userLoggedin,
  isEdit,
  handleChangeForm,
  form,
  isValidForm,
}) => {
  return (
    <Grid container direction="row" columnSpacing={10} rowSpacing={5}>
      <Grid item xl={6} md={6} sm={12}>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              NIP/Username{" "}
              <Typography variant="span" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.username || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              error={!isValidForm.username}
              helperText={
                !isValidForm.username && "Username tidak boleh kosong!"
              }
              onChange={(e) => handleChangeForm("username", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Email{" "}
              <Typography variant="span" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.email || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              error={!isValidForm.email}
              helperText={!isValidForm.email && "Email tidak valid!"}
              onChange={(e) => handleChangeForm("email", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Nama Depan{" "}
              <Typography variant="span" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.given_name || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              error={!isValidForm.given_name}
              helperText={
                !isValidForm.given_name && "Nama Depan tidak boleh kosong!"
              }
              onChange={(e) => handleChangeForm("given_name", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Nama Belakang
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.family_name || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              onChange={(e) => handleChangeForm("family_name", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Role
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={userLoggedin?.role?.toString() || ""}
              disabled
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={6} md={6} sm={12}>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              OPD/Organisasi{" "}
              <Typography variant="span" color="error">
                *
              </Typography>
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.local_goverment_agencies || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              error={!isValidForm.local_goverment_agencies}
              helperText={
                !isValidForm.local_goverment_agencies &&
                "OPD/Organisasi tidak boleh kosong!"
              }
              onChange={(e) =>
                handleChangeForm("local_goverment_agencies", e.target.value)
              }
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Bidang/Unit Kerja
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.work_unit || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              onChange={(e) => handleChangeForm("work_unit", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" className="my-5">
          <Grid item xl={4} md={4} sm={4}>
            <Typography color="#008444" fontFamily="Inter" fontWeight={500}>
              Jabatan
            </Typography>
          </Grid>
          <Grid item xl={8} md={8} sm={8}>
            <TextField
              size="small"
              fullWidth
              value={form?.occupation || ""}
              disabled={!isEdit}
              sx={{
                ".OutlinedInput-notchedOutline": {
                  border: "solid 1px #AAD6C1",
                  fontFamily: "Inter",
                },
              }}
              onChange={(e) => handleChangeForm("occupation", e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormEditProfile;
