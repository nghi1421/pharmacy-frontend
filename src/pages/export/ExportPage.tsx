import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useGetExport, useGetExports } from "../../hooks/useExport";

const columns: Column[] = [
    { key: 'id', value: 'Mã xuất thuốc', sortable: false, searchable: false},
    { key: 'staffName', value: 'Được tạo bởi' , sortable: false, searchable: false},
    { key: 'customerName', value: 'Người mua hàng', sortable: false, searchable: false},
    { key: 'note', value: 'Ghi chú', sortable: false, searchable: false},
    { key: 'prescriptionId', value: 'Mã lô hàng', sortable: false, searchable: false},
    { key: 'exportDate', value: 'Ngày xuất hàng', sortable: false, searchable: false},
]

const ExportPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetExports()
    const navigate = useNavigate()
    const getStaff = useGetExport()
    
    const clickAdd = () => {
        navigate('/admin/exports/create')
    }
    return (
        <Paper>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
            >
                <Typography
                    variant="h4"
                    fontWeight='500'
                    sx={{ px:3, py: 2 }}
                >
                    Quản lí bán hàng
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={clickAdd}
                >
                    <Add></Add>
                    <Typography
                        color="inherit"
                        fontSize='16px'
                        marginLeft='4px'
                    >
                        Thêm mới
                    </Typography>
                </Button>
            </Box>

            <Divider></Divider>
            {
                isLoading
                ?   <Box sx={{
                        display: 'flex',
                        backgroundColor: 'white',
                        p: 4,
                        justifyContent: 'center'
                    }}>
                        <CircularProgress />
                    </Box> 
                :
                    <TableComponent
                        rows={data}
                        keyTable='import-table'
                        columns={columns}
                        hasAction={true}
                        action={(rowValue: any) => 
                                <TableCell
                                    align="left"
                                    key={`row-action-provider-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title="Xem thông tin chi tiết">
                                            <IconButton
                                                color='success'
                                                onClick={() => { getStaff.mutate(rowValue.id) }}
                                            >
                                                <CreateIcon></CreateIcon>
                                            </IconButton>
                                        </Tooltip>
                                </Box>
                            </TableCell>
                        }
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default ExportPage;