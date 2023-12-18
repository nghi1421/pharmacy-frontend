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
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
}

export const FormAutocomplete: React.FC<FormAutoCompleteProps> =
  ({ control, label, name, placeholder, options, disable, size }) => {
    return (
      <Controller
        render={({ field: { onChange }, fieldState: { error } }) => (
          <Autocomplete
            options={options}
            disabled={disable ? disable : false}
            id='autocomplete'
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error ? error.message : null}
                size={size ? size : 'small'}
                placeholder={placeholder}
                label={label}
                variant="outlined"
              />
            )}
            onChange={(_, data) => onChange(data)}
          />
        )}
        name={name}
        rules={{ required: 'Required field' }}
        defaultValue=""
        control={control}
      />
    );
  }