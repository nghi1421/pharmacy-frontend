import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputListProps } from "../../types/props/FormInputListProps";

export const FormInputDropdown: React.FC<FormInputListProps> = ({
  name,
  control,
  label,
  list, 
  placeholder
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
      <InputLabel >{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} placeholder={placeholder}  label={label}>
              {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};