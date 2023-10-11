import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function MyDatePicker({ diveDate, handleDateChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
      required
        label="Select Dive Date"
        disableFuture
        name="diveDate"
        value={diveDate ? new Date(diveDate) : null}
        onChange={handleDateChange}
        className="customDatePicker"
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;