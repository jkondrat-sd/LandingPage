import React from "react"

import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const MonthPicker = ({value, setValue, format="MMM YYYY"}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        views={["year", "month"]}
        value={dayjs(value)}  
        onChange={(newValue) => {
          setValue(newValue)
        }}
        closeOnSelect
        format={format}
        disableFuture
        slots={{
          textField: (params) => <TextField
            {...params}
            size="small"
            value={dayjs(params.value).format(format)}
            variant="outlined"
            color="success"
            fullWidth
            sx={{
              borderRadius: '0.375rem',
              fontFamily: 'Lato',
              border: "none",
              "& .OutlinedInput-notchedOutline": {
              borderRadius: '0.375rem',
              borderColor:"rgb(34 197 94)"
              }
            }}
            className="border border-green-500 focus:outline-none focus:border-green-700 focus:invalid:border-pink-500 invalid:border-pink-300 invalid:text-pink-600 rounded-md"
          />,
        }}
      />
    </LocalizationProvider>
  )
}

export default MonthPicker