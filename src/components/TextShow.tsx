import { Typography } from "@mui/material"

interface TextShowProps {
    title: string;
    data: string
}
export const TextShow: React.FC<TextShowProps> = ({title, data}) => {
    return (
        <Typography
            variant="subtitle2" 
        >
        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                {title}:
            </Typography>
            <Typography display="inline" sx={{ textDecoration: 'none'}}>
                {` ${data}`}
            </Typography>
        </Typography>
    )
}