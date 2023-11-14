import { InputBasePropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';

export type Item = {
    value: string
    label: string
}

export interface FormInputListProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  initValue?: any[];
  list: Item[];
  placeholder: string;
  size?:  OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides>
}