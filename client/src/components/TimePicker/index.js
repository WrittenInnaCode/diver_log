import React from 'react';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function MyTimePicker({ type, selectedTime, handleTimeChange }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={`Time ${type === 'in' ? 'In' : 'Out'}`}
                value={selectedTime ? new Date(selectedTime) : null}
                onChange={handleTimeChange}
                className='customTimePicker'
            />
        </LocalizationProvider>

    );

}