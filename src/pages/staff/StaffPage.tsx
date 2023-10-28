import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import WorkOnIcon from '@mui/icons-material/Work';
import { useDeleteStaff, useGetStaff, useGetStaffs } from "../../hooks/useStaff";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const columns: Column[] = [
    { key: 'id', value: 'Mã nhân viên'},
    { key: 'name', value: 'Họ tên' },
    { key: 'gender', value: 'Giới tính'},
    { key: 'phoneNumber', value: 'Số điện thoại'},
    { key: 'dob', value: 'Ngày sinh'},
    { key: 'email', value: 'Email'},
    { key: 'isWorking', value: 'Đang làm việc'},
]

const StaffPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetStaffs()
    const navigate = useNavigate()
    const getStaff = useGetStaff()
    const deleteStaff = useDeleteStaff()
    const [openConfirmDialog, props] = useConfirmDialog(deleteStaff.mutate)
    const clickAdd = () => {
        navigate('/staffs/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa thông tin nhân viên bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa thông tin nhân viên này không?"
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
                    Quản lí nhân viên
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
                        keyTable='staff-table'
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
                                    {
                                        rowValue.status ?
                                            <Tooltip title="Cho nghỉ việc">
                                                <IconButton
                                                    color='error'
                                                    onClick={() => { getStaff.mutate(rowValue.id) }}
                                                >
                                                    <WorkOffIcon></WorkOffIcon>
                                                </IconButton>
                                            </Tooltip>
                                            
                                            :
                                            <Tooltip title="Làm việc">
                                                <IconButton
                                                    color='success'
                                                    onClick={() => { getStaff.mutate(rowValue.id) }}
                                                >
                                                <WorkOnIcon></WorkOnIcon>
                                                </IconButton>
                                            </Tooltip >
                                            
                                    }
                                    <Tooltip title="Xóa thông tin nhân viên">
                                        <IconButton
                                            color='error'
                                            onClick={() => { openConfirmDialog(rowValue.id) }}
                                        >
                                            <DeleteIcon></DeleteIcon>
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

export default StaffPage;