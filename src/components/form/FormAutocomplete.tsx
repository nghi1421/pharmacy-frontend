import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormAutoCompleteProps {
  control: any
  name: string  
  label: string
  placeholder: string
  options: any[]
}

export const FormAutocomplete: React.FC<FormAutoCompleteProps> =
  ({ control, label, name, placeholder, options }) => {
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Autocomplete
          options={options}
          id="autocomplete-key"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              label={label}
              variant="outlined"
            />
          )}
          onChange={(_, data) => onChange(data)}
        />
      )}
      name={name}
      control={control}
    />
  );
}