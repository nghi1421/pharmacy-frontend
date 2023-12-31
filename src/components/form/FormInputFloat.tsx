import { InputAdornment, TextField } from "@mui/material";
import { FormInputFloatProps } from "../../types/props/FormInputFloatProps";
import { Controller } from "react-hook-form";

export const FormInputFloat: React.FC<FormInputFloatProps> = ({name, label, control, max, min, step, postfix, prefix, size}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    fullWidth
                    size={size ? size : 'small'}
                    type="number"
                    value={value}
                    label={label}
                    variant="outlined"
                    inputProps={{
                        step: step,
                        max: max,
                        min: min,
                    }}
                    InputProps={{ 
                        startAdornment: (<InputAdornment position='start'>{ prefix }</InputAdornment>),
                        endAdornment: (<InputAdornment position='end'>{postfix}</InputAdornment>) 
                    }}
                    onChange={onChange}
                />

            )}
        />
    );
}