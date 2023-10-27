import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useDeletePosition, useGetPosition, useGetPositions } from "../../hooks/usePosition";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const columns: Column[] = [
    { key: 'id', value: 'Mã chức vụ'},
    { key: 'name', value: 'Tên' },
    { key: 'createdAt', value: 'Thời gian tạo'},
    { key: 'updatedAt', value: 'Cập nhật'},
]

const PositionPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetPositions()
    const getPosition = useGetPosition()
    const deletePosition = useDeletePosition()
    const [openConfirmDialog, props] = useConfirmDialog(deletePosition.mutate)
    const navigate = useNavigate()

    const clickAdd = () => {
        navigate('/positions/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa phân chức vụ bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa chức vụ?"
                { ...props }
            />
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
                    Quản lí chức vụ
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
                        keyTable='provider-table'
                        columns={columns}
                        hasAction={true}
                        action={(rowValue: any) => 
                                <TableCell
                                    align="left"
                                    key={`row-action-type-by-use-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                    <IconButton
                                        color='success'
                                        onClick={() => { getPosition.mutate(rowValue.id) }}
                                    >
                                        <CreateIcon></CreateIcon>
                                    </IconButton>
                                    <IconButton
                                        color='error'
                                        onClick={() => { openConfirmDialog(rowValue.id) }}
                                    >
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </Box>
                            </TableCell>
                        }
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default PositionPage;