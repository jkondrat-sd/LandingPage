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
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CheckRounded, Close } from "@mui/icons-material";
import Image from "next/image";
import axios from "axios";

const scores = [
  {
    value: 1,
    label: "Sangat Tidak Puas",
  },
  {
    value: 2,
    label: "Tidak Puas",
  },
  {
    value: 3,
    label: "Cukup Puas",
  },
  {
    value: 4,
    label: "Puas",
  },
  {
    value: 5,
    label: "Sangat Puas",
  },
];

const initialValidForm = {
  score: true,
  purpose_id: true,
  sector_id: true,
  data_request: true,
  input: true,
};

const SurveyForm = ({
  open,
  setOpen,
  surveyPurpose,
  surveySector,
  datasetId,
  BASE_URL_API_V2_CLIENT,
}) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    data_id: datasetId,
    score: 0,
    purpose_id: "",
    purpose_detail: "",
    sector_id: "",
    sector_detail: "",
    data_request: "",
    input: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isValidForm, setIsValidForm] = React.useState(initialValidForm);
  const [otherSelected, setOtherSelected] = React.useState({});

  const handleChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
    if (key === "purpose_id") {
      const selected = surveyPurpose.find((item) => item._id === value);
      if (selected?.name === "Lainnya") {
        setOtherSelected({
          ...otherSelected,
          purpose: true,
        });
      } else {
        setOtherSelected({
          ...otherSelected,
          purpose: false,
        });
      }
    }
    if (key === "sector_id") {
      const selected = surveySector.find((item) => item._id === value);
      if (selected?.name === "Lainnya") {
        setOtherSelected({
          ...otherSelected,
          sector: true,
        });
      } else {
        setOtherSelected({
          ...otherSelected,
          sector: false,
        });
      }
    }
    if (value) {
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

  const sendSurvey = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        BASE_URL_API_V2_CLIENT + "/survey/dataset/download",
        {
          ...form,
          data_id: datasetId,
          purpose_detail: form.purpose_detail || "",
          sector_detail: form.sector_detail || "",
        }
      );
      if (data?.data?.success) {
        setIsSuccess(true);
      } else {
        console.log(data?.message);
        setIsError(true);
        setErrorMessage(data?.message);
      }
    } catch (error) {
      console.log("error : ", error);
      setIsError(true);
      setErrorMessage(JSON.stringify(error));
    }
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      form.score &&
      form.purpose_id &&
      form.sector_id &&
      form.data_request &&
      form.input
    ) {
      sendSurvey();
    } else {
      setIsValidForm({
        score: form.score ? true : false,
        purpose_id: form.purpose_id ? true : false,
        sector_id: form.sector_id ? true : false,
        data_request: form.data_request ? true : false,
        input: form.input ? true : false,
      });
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title" className="px-10">
        <Box className="flex justify-between">
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "50px",
              width: "150px",
            }}
          >
            <Image
              src="/Simawas_logo_long.svg"
              alt="Simawas Pagi"
              layout="fill"
            />
          </Box>
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => {
              setForm({});
              setIsValidForm(initialValidForm);
              setOpen(false);
              setIsError(false);
              setErrorMessage(null);
              setIsSuccess(false);
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box className="w-full text-center py-5">
          <Typography
            fontFamily="Lato"
            fontSize="1.3rem"
            fontWeight={600}
            color="#404040"
          >
            Survei dan Feedback SIMAWASPAGI
          </Typography>
          <Typography fontFamily="Lato" fontSize="0.9rem" color="#757575">
            Feedback dari Anda dapat membantu SIMAWASPAGI menyediakan layanan
            yang lebih baik.
          </Typography>
        </Box>
      </DialogTitle>
      {loading ? (
        <DialogContent className="px-10">
          <Box className="text-center p-10">
            <CircularProgress color="success" />
            <Typography>Mengirim Survey dan Feedback ...</Typography>
          </Box>
        </DialogContent>
      ) : (
        <>
          <DialogContent className="px-10">
            {isSuccess ? (
              <Box className="p-10 text-center">
                <CheckRounded sx={{ color: "#008444", fontSize: "8rem" }} />
                <Typography
                  fontFamily="Lato"
                  className="px-14 pb-5"
                  fontWeight={500}
                >
                  Survey dan Feedback berhasil dikirim.
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
                    setForm({});
                    setIsValidForm(initialValidForm);
                    setOpen(false);
                    setIsError(false);
                    setErrorMessage(null);
                    setIsSuccess(false);
                  }}
                >
                  OK
                </Button>
              </Box>
            ) : (
              <Box>
                {isError && (
                  <Alert severity="error" className="my-3">
                    {errorMessage}
                  </Alert>
                )}
                <Box>
                  <Typography fontFamily="Lato" color="#404040">
                    Seberapa puaskah Anda dengan layanan pada SIMAWASPAGI?
                  </Typography>
                  <FormControl
                    sx={{ mt: 2, mb: 3 }}
                    size="small"
                    fullWidth
                    error={!isValidForm.score}
                  >
                    <Box className="flex">
                      {scores.map((item) => (
                        <Box
                          className="flex-1 text-center cursor-pointer rounded-md p-2"
                          sx={{
                            background:
                              item.value === form.score ? "#CCE6DA" : "#FFFFFF",
                            border:
                              item.value === form.score
                                ? "solid 1px #CCE6DA"
                                : "none",
                            "&:hover": {
                              border: "solid 1px #CCE6DA",
                            },
                          }}
                          key={item.value}
                          onClick={() => handleChangeForm("score", item.value)}
                        >
                          <Typography fontFamily="Lato" color="#008444">
                            {item.value}
                          </Typography>
                          <Typography
                            fontFamily="Lato"
                            color="#404040"
                            fontSize="0.8rem"
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    {!isValidForm.score && (
                      <FormHelperText>
                        Nilai kepuasan harus dipilih
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Typography fontFamily="Lato" color="#404040">
                    Apakah tujuan Anda mengunduh dataset tersebut?
                  </Typography>
                  <FormControl
                    sx={{ mt: 2, mb: 3 }}
                    size="small"
                    fullWidth
                    error={!isValidForm.purpose_id}
                  >
                    <InputLabel id="label-tujuan">
                      Pilih tujuan mengunduh data
                    </InputLabel>
                    <Select
                      labelId="label-tujuan"
                      id="select-tujuan"
                      value={form.purpose_id}
                      onChange={(e) =>
                        handleChangeForm("purpose_id", e.target.value)
                      }
                      label="Pilih tujuan mengunduh data"
                      size="small"
                    >
                      {surveyPurpose.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {otherSelected.purpose && (
                      <TextField
                        sx={{ mt: 2 }}
                        size="small"
                        fullWidth
                        label="Tuliskan tujuan mengunduh data"
                        id="data-belum-tersedia"
                        value={form.purpose_detail}
                        onChange={(e) =>
                          handleChangeForm("purpose_detail", e.target.value)
                        }
                      />
                    )}
                    {!isValidForm.purpose_id && (
                      <FormHelperText>Tujuan harus dipilih</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Typography fontFamily="Lato" color="#404040">
                    Berasal dari instansi/sektor manakah Anda?
                  </Typography>
                  <FormControl
                    sx={{ mt: 2, mb: 3 }}
                    size="small"
                    fullWidth
                    error={!isValidForm.sector_id}
                  >
                    <InputLabel id="label-instansi">
                      Pilih instansi/sektor
                    </InputLabel>
                    <Select
                      labelId="label-instansi"
                      id="select-instansi"
                      value={form.sector_id}
                      onChange={(e) =>
                        handleChangeForm("sector_id", e.target.value)
                      }
                      label="Pilih instansi/sektor"
                      size="small"
                    >
                      {surveySector.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {otherSelected.sector && (
                      <TextField
                        sx={{ mt: 2 }}
                        size="small"
                        fullWidth
                        label="Tuliskan instansi/sektor"
                        id="data-belum-tersedia"
                        value={form.sector_detail}
                        onChange={(e) =>
                          handleChangeForm("sector_detail", e.target.value)
                        }
                      />
                    )}
                    {!isValidForm.sector_id && (
                      <FormHelperText>
                        Instansi/Sektor harus dipilih
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Typography fontFamily="Lato" color="#404040">
                    Data terkait pangan dan gizi apa yang Anda butuhkan namun
                    belum tersedia di SIMAWASPAGI?
                  </Typography>
                  <TextField
                    sx={{ mt: 2, mb: 3 }}
                    size="small"
                    fullWidth
                    label="Tuliskan data yang belum tersedia"
                    id="data-belum-tersedia"
                    value={form.data_request}
                    onChange={(e) =>
                      handleChangeForm("data_request", e.target.value)
                    }
                    error={!isValidForm.data_request}
                    helperText={
                      !isValidForm.data_request &&
                      "Silahkan isi data yang belum tersedia"
                    }
                  />
                </Box>
                <Box>
                  <Typography fontFamily="Lato" color="#404040">
                    Apakah kesan atau saran Anda terhadap layanan SIMAWASPAGI?
                  </Typography>
                  <TextField
                    sx={{ mt: 2 }}
                    size="small"
                    fullWidth
                    label="Tuliskan kesan dan saran Anda disini"
                    id="kesan"
                    value={form.input}
                    onChange={(e) => handleChangeForm("input", e.target.value)}
                    error={!isValidForm.input}
                    helperText={
                      !isValidForm.input &&
                      "Silahkan isi kesan dan saran Anda disini"
                    }
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          {!isSuccess && (
            <DialogActions className="p-10">
              <Button
                color="success"
                variant="contained"
                size="large"
                type=""
                sx={{
                  fontFamily: "Inter",
                  textTransform: "capitalize",
                  color: "#ffffff",
                  background: "#008444",
                  fontWeight: 500,
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
};

export default SurveyForm;
