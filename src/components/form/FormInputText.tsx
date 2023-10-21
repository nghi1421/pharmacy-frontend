import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "../../types/props/FormInputProps";
import '../../assets/styles/Input.css'

export const FormInputText: React.FC<FormInputProps> = ({ name, control, label, placeholder }) => {
  return (
    <Controller
        name={name}
        control={control}
        render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
        }) => (
          <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label={label}
              variant="outlined"
              placeholder={placeholder}
          />
        )}
    />
  );
};