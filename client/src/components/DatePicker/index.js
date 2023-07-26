import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function MyDatePicker({ diveDate, handleDateChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select Dive Date"
        name="diveDate"
        value={diveDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;