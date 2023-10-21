export type Radio = {
    value: string
    label: string
}

export interface FormInputListProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  list: Radio[]
}