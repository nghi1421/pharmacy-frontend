// import { Typography } from "@mui/material";

// const ImportPage: React.FC<{}> = () => {
//     return (
//         <Typography
//             color='red'
//         >
//             This is import page
//         </Typography>
//     )
// }

// export default ImportPage;

import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputMultiCheckbox } from "../../components/form/FormInputMultiCheckbox";
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputRadio } from "../../components/form/FormInputRadio";

interface IFormInput {
  textValue: string;
  radioValue: string;
  checkboxValue: string[];
  dateValue: Date;
  dropdownValue: string;
  sliderValue: number;
}

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

const radioList = [{
    value: '1',
    label: 'List item 1'
},
{
    value: '2',
    label: 'List item 2'
}]

const dropdownList = [{
    value: '1',
    label: 'Dropdown item 1'
},
{
    value: '2',
    label: 'Dropdown item 2'
}]

const checkBoxList = [{
    value: '1',
    label: 'Checkbox item 1'
},
{
    value: '2',
    label: 'Checkbox item 2'
}]

dropdownList


export default () => {
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });
    const onSubmit = (data: IFormInput) => console.log(data);
    
  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h4"> Form Demo</Typography>
      <FormInputText name="textValue" control={control} label="Text Input" />
      <FormInputRadio
        name={"radioValue"}
        control={control}
        label={"Radio Input"}
        list={radioList}
      />
      <FormInputDropdown
        name="dropdownValue"
        control={control}
        label="Dropdown Input"
        list={dropdownList}
      />
      <FormInputDate name="dateValue" control={control} label="Date Input" />
      <FormInputMultiCheckbox
        control={control}
        setValue={setValue}
        name={"checkboxValue"}
        label={"Checkbox Input"}
        list={checkBoxList}
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Paper>
  );
};