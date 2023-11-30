import { Box, Tooltip, Typography } from "@mui/material"
import { SalesTodayType } from "./TodaySales"
import React from "react"
import { useGetExportToday } from "../hooks/useExport"

interface TodaySalesRowProps {
    saleToday: SalesTodayType
}

export const TodaySalesRow: React.FC<TodaySalesRowProps> = ({ saleToday }) => {
    const getExportToday = useGetExportToday()
    const bgColor = (type: number): string => {
        switch (type) {
            case 0: return '#ffedd5'
            case 2: return '#a5b4fc'
            default: return '#ffffff';
        }
    }
    const tooltip = (type: number): string => {
        switch (type) {
            case 0: return 'Đơn hủy'
            case 2: return 'Đơn hoàn'
            default: return 'Đơn hàng thành công.';
        }
    }
    return (
        <Tooltip title={tooltip(saleToday.type)}>
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
                backgroundColor: saleToday.checked ? '#eef2ff' : bgColor(saleToday.type),
                ml: saleToday.checked ? 1 : 0,
                padding: saleToday.checked ? 2 : 1,
            }}      
                onClick={() => {
                    getExportToday.mutate(saleToday.id.toString())
                    // updateSalesToday(saleToday)
                }}
            >
                <Typography variant='body2' sx={{ fontWeight: saleToday.checked ? 'bold' : 'normal', flex: 1, pl:1 }}>{saleToday.id}</Typography>
                <Typography variant='body2' sx={{ fontWeight: saleToday.checked ? 'bold' : 'normal', flex: 1, textAlign: 'center' }}>{saleToday.exportDate}</Typography>
                <Typography variant='body2' sx={{ fontWeight: saleToday.checked ? 'bold' : 'normal', flex: 2, textAlign: 'right' }}>{saleToday.total}</Typography>
            </Box>
        </Tooltip>
    )
}