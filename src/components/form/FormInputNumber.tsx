import { TextField, TextFieldPropsSizeOverrides } from "@mui/material";
import { Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format";
import { OverridableStringUnion } from '@mui/types';

interface FormInputNumberProps {
    control: any
    name: string
    label: string
    placeholder: string
    suffix?: string
    prefix?: string
    size?: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>
}

export const FormInputNumber: React.FC<FormInputNumberProps> =
    ({ control, name, label, placeholder, prefix, suffix, size }) => {
        return (
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, name, value }, fieldState }) => (
                    <NumericFormat
                        size={size ? size : 'small'}
                        sx={{ width: '100%' }}
                        label={label}
                        placeholder={placeholder}
                        thousandSeparator=","
                        customInput={TextField}
                        prefix={prefix ? prefix : ''}
                        suffix={suffix ? suffix : ''}
                        error={!!fieldState.error?.message}
                        helperText={fieldState.error?.message}
                        name={name}
                        value={value}
                        onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
                    />
                )}
            />
        )
    }