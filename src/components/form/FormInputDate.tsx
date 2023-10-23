import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types/props/FormInputProps";
import dayjs from "dayjs";
import React from "react";

export const FormInputDate: React.FC<FormInputProps> = ({ name, control, label }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error }, }) => (
            
              <DatePicker
                  value={dayjs(value)}
                  onChange={onChange}
                  disableFuture
                  format="DD-MM-YYYY"
                  label={label}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
      
              
            )}
        />
    </LocalizationProvider>
  );
};