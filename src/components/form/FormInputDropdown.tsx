import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputListProps } from "../../types/props/FormInputListProps";

export const FormInputDropdown: React.FC<FormInputListProps> = ({
  name,
  control,
  label,
  list, 
  placeholder,
  size
}) => {
  const generateSingleOptions = () => {
    return list.map((option, index) => {
      return (
        <MenuItem key={`${index}-index-${option.value}`} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl fullWidth>
      <InputLabel size={size ? size : 'small'}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select size={size ? size : 'small'} onChange={onChange} value={value} placeholder={placeholder}  label={label}>
              {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};