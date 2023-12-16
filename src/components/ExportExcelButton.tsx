import { IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import excelImage from '../assets/images/excelicon.png'

interface ExportExcelButtonProps {
    data: any[]
    fileName: string
}

export const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({ data, fileName }) => {
    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `${fileName}.xlsx`);
    }, [data]);

    return (
        <IconButton color='success' onClick={exportFile}>
            <img src={excelImage} alt="logo" style={{ height: 20, width: 20 }} />
            <Typography sx={{ pl: 1 }}>
                Xuất file excel
            </Typography>
        </IconButton >
    );
};