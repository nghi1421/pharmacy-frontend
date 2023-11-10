import { Autocomplete, TextField, TextFieldPropsSizeOverrides } from "@mui/material";
import { Controller } from "react-hook-form";
import { OverridableStringUnion } from '@mui/types';

interface FormAutoCompleteProps {
  control: any
  name: string  
  label: string
  placeholder: string
  options: any[]
  disable?: boolean
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>
}

export const FormAutocomplete: React.FC<FormAutoCompleteProps> =
  ({ control, label, name, placeholder, options, disable, size }) => {
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
              size={ size ? size : 'medium'}
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