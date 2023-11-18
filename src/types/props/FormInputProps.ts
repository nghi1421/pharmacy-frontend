import { TextFieldPropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  placeholder: string;
  type?: string
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  withTime?: boolean
}