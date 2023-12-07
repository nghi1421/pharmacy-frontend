import { Box, Typography } from "@mui/material"
import React from "react"

interface InventoryImportProps {
    inventoryImport: any
}

export const InventoryImport: React.FC<InventoryImportProps> = ({ inventoryImport }) => {
    return (
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'row', 
                p: 1, 
                borderBottom: 1,
                borderColor: '#ffffff',
            }}      
            >
                <Typography variant='body2' sx={{flex: 1}}>{inventoryImport.importId}</Typography>
                <Typography variant='body2' sx={{flex: 1, textAlign: 'center' }}>{inventoryImport.importDate}</Typography>
                <Typography variant='body2' sx={{flex: 1, textAlign: 'right' }}>{inventoryImport.inventory}</Typography>
            </Box>
    )
}