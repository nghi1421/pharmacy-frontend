import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputListProps } from "../../types/props/FormInputListProps";

export const FormInputRadio: React.FC<FormInputListProps> = ({
  name,
  control,
  label,
  list
}) => {
  const generateRadioOptions = () => {
      return list.map((singleOption, index) => (
          <FormControlLabel
              value={singleOption.value}
              label={singleOption.label}
              control={<Radio key={`${index}index-${singleOption.label}`} />}
          />
      ));
  };  
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <RadioGroup value={value} onChange={onChange}>
              {generateRadioOptions()}
            </RadioGroup>
          )}
      />
    </FormControl>
  );
};