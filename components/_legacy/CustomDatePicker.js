import React from "react"

import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = ({views, value, setValue, format="DD MMM YYYY", disableFuture, minDate, maxDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        views={views || ['day', 'month', 'year']}
        value={dayjs(value)}  
        onAccept={(newValue) => setValue(newValue)}
        format={format}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
        size="small"
        slots={{
          textField: (params) => <TextField size="small" {...params} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            fontFamily: 'Lato',
            border: "1px solid #AAD6C1"
          }}
          className={`w-full border border-green-500 focus:outline-none focus:border-green-700 focus:invalid:border-pink-500 invalid:border-pink-300 invalid:text-pink-600 rounded-md`}
          />
        }}
        dayOfWeekFormatter={(day) => `${day}`}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker