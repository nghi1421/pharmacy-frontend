import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useGetImport, useGetImports } from "../../hooks/useImport";

const columns: Column[] = [
    { key: 'id', value: 'Mã phiếu nhập'},
    { key: 'staffName', value: 'Được tạo bởi' },
    { key: 'providerName', value: 'Đối tác'},
    { key: 'note', value: 'Ghi chú'},
    { key: 'paid', value: 'Đã thanh toán'},
    { key: 'maturityDate', value: 'Ngày đáo hạn'},
    { key: 'importDate', value: 'Ngày nhập hàng'},
]

const ImportPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetImports()
    const navigate = useNavigate()
    const getStaff = useGetImport()
    const clickAdd = () => {
        navigate('/imports/create')
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
                    Quản lí nhập thuốc
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

export default ImportPage;