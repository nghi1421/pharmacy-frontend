export type Item = {
    value: string
    label: string
}

export interface FormInputListProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  list: Item[];
  placeholder: string;
}