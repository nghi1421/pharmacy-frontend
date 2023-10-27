import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetDrugCategories, useGetDrugCategory, useDeleteDrugCategory } from "../../hooks/useDrugCategory";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const columns: Column[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'formatedPrice', value: 'Giá' },
    { key: 'minimalUnit', value: 'Đơn vị bán'},
    { key: 'unit', value: 'Đơn vị nhập'},
    { key: 'vat', value: 'VAT'},
    { key: 'form', value: 'Dạng thuốc'},
    { key: 'use', value: 'Công dụng'},
]

const DrugCategoryPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetDrugCategories()
    const navigate = useNavigate()
    const getDrugCategory = useGetDrugCategory()
    const deleteDrugCategory = useDeleteDrugCategory()
    const [openConfirmDialog, props] = useConfirmDialog(deleteDrugCategory.mutate)
    
    const clickAdd = () => {
        navigate('/drug-categories/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa danh mục thuốc bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa danh mục thuốc này không?"
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
                    Quản lí danh mục thuốc
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
                        keyTable='drug-category-table'
                        columns={columns}
                        hasAction={true}
                        action={(rowValue: any) => 
                                <TableCell
                                    align="left"
                                    key={`row-action-drug-category-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                    <IconButton
                                        color='success'
                                        onClick={() => { getDrugCategory.mutate(rowValue.id) }}
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
                    />
            }
        </Paper>
    )
    
}

export default DrugCategoryPage;