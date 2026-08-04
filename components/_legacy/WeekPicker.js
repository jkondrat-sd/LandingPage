import React from "react"

import { LocalizationProvider, MobileDatePicker, dayPickerClasses, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/id"
import { TextField, textFieldClasses } from "@mui/material";

moment.locale("id", {
  week: {
    dow: 1
  }
});


const WeekPicker = ({value, setValue, format="YYYY-MM-DD", disableFuture, minDate, maxDate}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        view='day'
        value={moment(value)}  
        onChange={(newValue) => {
          setValue(newValue.weekday(0))
        }}
        closeOnSelect
        format={format}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
        slots={{
          textField: (params) => <TextField
            {...params}
            size="small"
            value={`${moment(params.value).format("DD MMM YYYY")} - ${moment(params.value).weekday(6).format("DD MMM YYYY")}`}
            variant="outlined"
            color="success"
            fullWidth
            sx={{
              backgroundColor: '#ffffff',
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
          actionBar: () => {},
          toolbar: () => {},
        }}
        dayOfWeekFormatter={(day) => `${day}`}
      />
    </LocalizationProvider>
  )
}

export default WeekPicker