import { TextField } from "@mui/material";
import { Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format";

interface FormInputCurrencyProps {
    control: any
    name: string
    label: string
    placeholder: string
}

export const FormInputCurrency: React.FC<FormInputCurrencyProps> = ({control, name, label, placeholder}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, name, value } }) => (
                <NumericFormat 
                    sx={{ width: '100%' }}
                    label={label}
                    placeholder={placeholder}
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