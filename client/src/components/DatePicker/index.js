import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function MyDatePicker() {
    const [diveDate, handleDateChange] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select Dive Date"
        name="diveDate"
        value={diveDate}
        onChange={(date) => handleDateChange(date)} // Update the selected date when a new date is picked
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;