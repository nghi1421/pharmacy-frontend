import { TextFieldPropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';

export interface FormInputFloatProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    max: number;
    min: number;
    step: string;
    postfix: string;
    prefix: string
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}