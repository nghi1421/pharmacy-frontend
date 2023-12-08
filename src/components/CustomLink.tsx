import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface LinkProps {
    title: string
    link: string
}

export const CustomLink: React.FC<LinkProps> = ({ title, link }) => {
    const navigate = useNavigate()
    return (
        <Typography variant="body2"
            sx={{ 
                color: '#0ea5e9',
                '&:hover': {
                    color: '#0284c7',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }
                }}
            onClick={() => { navigate(link)}}
            >
            {title}
        </Typography>
    )
}