import React from "react";
import {
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types/props/FormInputProps";

export const FormInputCheckBox: React.FC<FormInputProps> = ({
    name,
    control,
    setValue,
    label,
}) => {

    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({field: { value, ref, ...field }}) => {
                        return (
                            <Checkbox
                                {...field}
                                inputRef={ref}
                                checked={!!value}
                                color='secondary'
                            />
                        );
                    }}
                />
            }
            label={label}
            key={label}
        />
    );
};