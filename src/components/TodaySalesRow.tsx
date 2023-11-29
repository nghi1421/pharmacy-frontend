import { Box, Typography } from "@mui/material"
import { SalesTodayType } from "./TodaySales"
import React from "react"

interface TodaySalesRowProps {
    updateSalesToday: (t: SalesTodayType) => void
    saleToday: SalesTodayType
}

export const TodaySalesRow: React.FC<TodaySalesRowProps> = ({ updateSalesToday, saleToday }) => {
    const bgColor = (type: number): string => {
        switch (type) {
            case 0: return '#ffedd5'
            case 1: return '#dcfce7'
            case 2: return '#a5b4fc'
            default: return '#ffffff';
        }
    }
    return (
         <Box sx={{ 
            display: 'flex',
            flexDirection: 'row', 
            p: 1, 
            borderBottom: 1,
            borderColor: '#f4f4f5',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: saleToday.checked ? '#38bdf8' :'#daf0ee' 
            },
            backgroundColor: bgColor(saleToday.type),
            paddingLeft: saleToday.checked ? 1 : 0
        }}      
            onClick={() => updateSalesToday(saleToday)}
        >
            <Typography variant='body2' sx={{ flex: 1 }}>{saleToday.id}</Typography>
            <Typography variant='body2' sx={{ flex: 1, textAlign: 'center' }}>{saleToday.exportDate}</Typography>
            <Typography variant='body2' sx={{ flex: 2, textAlign: 'right' }}>{saleToday.total}</Typography>
        </Box>
    )
}