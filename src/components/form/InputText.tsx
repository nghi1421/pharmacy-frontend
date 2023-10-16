import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

type TextInputProps = {
    label: string
    type?: string
    placeHolder: string
    value: string
    onChange: (newValue: string) => void
}
const TextInput: React.FC<TextInputProps> = ({ label, type, placeHolder, value, onChange }) => {
    if (!type) {
        type = 'text'
    }
    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value)
    }

    return <TextField
        margin="normal"
        fullWidth
        label={label}
        variant="outlined"
        placeholder={placeHolder}
        type={type}
        value={value}
        onChange={changeValue}
    />
}

export default TextInput 