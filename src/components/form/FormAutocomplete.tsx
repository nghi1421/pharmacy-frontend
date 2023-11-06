import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormAutoCompleteProps {
  control: any
  name: string  
  label: string
  placeholder: string
  options: any[]
  disable?: boolean
}

export const FormAutocomplete: React.FC<FormAutoCompleteProps> =
  ({ control, label, name, placeholder, options, disable }) => {
  return (
    <Controller
      render={({ field: { onChange} }) => (
        <Autocomplete
          options={options}
          disabled={disable ? disable : false}
          id='autocomplete'
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
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
      defaultValue=""
      control={control}
    />
  );
}