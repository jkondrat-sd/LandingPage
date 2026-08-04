import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { CancelRounded, SaveRounded } from "@mui/icons-material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { checkAnalystPermissions } from "@/utils/constant/role";

const PopupConfirm = ({ open, setOpen, handleSubmit, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Simpan Perubahan Hasil Analisis?
      </DialogTitle>
      {loading ? (
        <DialogContent>
          <Box className="text-center p-10">
            <CircularProgress color="success" />
            <Typography>Menyimpan Hasil Analisis ...</Typography>
          </Box>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <DialogContentText>
              Apakah anda yakin akan menyimpan hasil analisis?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleSubmit()}
              autoFocus
            >
              Simpan
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
const Summary = ({ analysis, params, url, getData }) => {
  const userCookie = getCookie("user");
  const token = getCookie("Authorization");
  const [isEdit, setIsEdit] = React.useState(false);
  const [userLoggedin, setUserLoggedin] = React.useState({});
  const [input, setInput] = React.useState(analysis?.analysis || "");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  React.useEffect(() => {
    if (userCookie) {
      setUserLoggedin(JSON.parse(userCookie));
    }
  }, [userCookie]);

  React.useEffect(() => {
    if (analysis) {
      setInput(analysis.analysis);
    }
  }, [analysis]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        url,
        {
          date: params.date,
          city: params.city,
          analysis: input,
          analyst: `${userLoggedin?.profile?.given_name || ""} ${
            userLoggedin?.profile?.family_name || ""
          }`,
        },
        { headers: { Authorization: token } }
      );
      await getData();
      setIsEdit(false);
    } catch (err) {
      setError(err?.response?.data);
    }
    setOpenPopup(false);
    setLoading(false);
  };
  return (
    <Box
      sx={{
        p: 2,
        my: 5,
        borderRadius: "6px",
        background: "#F8FCFB",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Box className="flex justify-between items-center">
        <Typography
          className="font-lato-500 w-full mb-3"
          fontSize="1.8em"
          sx={{ borderBottom: "1px solid #008444", color: "#008444" }}
        >
          Hasil Analisis
        </Typography>
        {checkAnalystPermissions(userLoggedin?.role) ? (
          !isEdit ? (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                setIsEdit(true);
                setError(null);
              }}
            >
              <PencilSquareIcon width={20} className="mr-2" />
              Ubah
            </Button>
          ) : (
            <Box className="flex gap-2">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setIsEdit(false);
                  setError(null);
                }}
              >
                <CancelRounded className="mr-2" />
                Batal
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setOpenPopup(true);
                }}
                autoFocus
              >
                <SaveRounded className="mr-2" />
                Simpan
              </Button>
            </Box>
          )
        ) : (
          <></>
        )}
      </Box>
      {error && (
        <Alert severity="error" sx={{ width: "100%", my: 2 }}>
          {error}
        </Alert>
      )}
      {!isEdit ? (
        <>
          <Typography className="font-lato pt-3" fontSize="1.2em">
            {analysis?.analysis || "Dalam Proses Analisis"}
          </Typography>
          <Typography className="font-lato pt-3 text-right" fontSize="0.9em">
            {`Analis Oleh: ${analysis?.analyst || "-"}`}
          </Typography>
        </>
      ) : (
        <TextField
          fullWidth
          sx={{
            pt: 3,
            ".InputBase-root": {
              fontFamily: "Lato",
              fontSize: "1.2em",
              backgroundColor: "#F8FCFB",
            },
          }}
          color="success"
          id="analyst-input"
          multiline
          rows={5}
          value={input}
          onChange={(e) => {
            setError(null);
            setInput(e.target.value);
          }}
        />
      )}
      <PopupConfirm
        open={openPopup}
        setOpen={setOpenPopup}
        input={input}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default Summary;
