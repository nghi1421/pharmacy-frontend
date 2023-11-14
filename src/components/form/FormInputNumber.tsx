import { TextField } from "@mui/material";
import { Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format";

interface FormInputNumberProps {
    control: any
    name: string
    label: string
    placeholder: string
    suffix?: string
    prefix?: string
    size?: 'medium' | 'max' | 'small'
}

export const FormInputNumber: React.FC<FormInputNumberProps> =
    ({ control, name, label, placeholder, prefix, suffix, size }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, name, value } }) => (
                <NumericFormat 
                    size={size ? size : 'small'}
                    sx={{ width: '100%' }}
                    label={label}
                    placeholder={placeholder}
                    thousandSeparator=","
                    customInput={TextField}
                    prefix={ prefix ? prefix : ''}
                    suffix={ suffix ? suffix : ''}
                    name={name}
                    value={value}
                    onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
                />
            )}
      />
    )
}