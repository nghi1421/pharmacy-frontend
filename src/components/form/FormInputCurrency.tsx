import { TextField, TextFieldPropsSizeOverrides } from "@mui/material";
import { Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format";
import { OverridableStringUnion } from '@mui/types';

interface FormInputCurrencyProps {
    control: any
    name: string
    label: string
    placeholder: string
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>
}

export const FormInputCurrency: React.FC<FormInputCurrencyProps> = ({control, name, label, placeholder, size}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, name, value }, fieldState: { error } }) => (
                <NumericFormat 
                    sx={{ width: '100%' }}
                    label={label}
                    size={ size ? size : "small"}
                    placeholder={placeholder}
                    error={!!error}
                    thousandSeparator=","
                    customInput={TextField}
                    suffix={'  VND'}
                    name={name}
                    value={value}
                    onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
                />
            )}
      />
    )
}