import { Box, Typography } from "@mui/material"
import { Item } from "../../types/props/FormInputListProps"

interface InfoBox {
    rows: Item[]
    data: any
    title: string
}

export const InfoBox: React.FC<InfoBox> = ({ rows, data, title}) => {
    return (
        <Box
            sx={{
                height: '100%',
                border: 1,
                borderColor: 'grey.300',
                px: 2,
                borderRadius: 2,
                boxShadow: 1
            }}
        >
        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', fontSize: 16, mt: 2 }}>
            {title}
        </Typography>
        {
            data && rows.map((row) => (
                <Typography
                    mt='8px'
                    mb='8px'
                >
                    <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                        {row.label}:
                    </Typography>

                    <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                        { data[row.value] }
                    </Typography>
                </Typography>
            ))
        }           
        </Box>
    )
}