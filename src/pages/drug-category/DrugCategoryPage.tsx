import { Box, IconButton, Paper, TableCell } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetDrugCategories, useGetDrugCategory, useDeleteDrugCategory } from "../../hooks/useDrugCategory";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { PageHeader } from "../../components/PageHeader";
import { TableExtension } from "../../components/table/TableExtension";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { useSearchQuery } from "../../hooks/useSearchQuery";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã thuốc', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Tên thuốc' , sortable: true, searchable: true, enableSearch: true},
    { key: 'formatedPrice', value: 'Giá' , sortable: true, searchable: false},
    { key: 'minimalUnit', value: 'Đơn vị bán', sortable: true, searchable: false},
    { key: 'unit', value: 'Đơn vị nhập', sortable: true, searchable: false},
    { key: 'vat', value: 'VAT', sortable: true, searchable: false},
    { key: 'form', value: 'Dạng thuốc', sortable: true, searchable: false},
    { key: 'use', value: 'Công dụng', sortable: true, searchable: false},
]

const DrugCategoryPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getDrugCategory = useGetDrugCategory()
    const deleteDrugCategory = useDeleteDrugCategory()
    const [openConfirmDialog, props] = useConfirmDialog(deleteDrugCategory.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetDrugCategories(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

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
            <PageHeader
                title='Quản lí danh mục thuốc'
                clickAdd={clickAdd}
            />

            <TableExtension
                setValue={setValue}
                initValueSearch={query.searchTerm}
                initSearchColumns={getSearchColums(columns, GET_SEARCHABLE_KEY)}
                searchColumns={getSearchColums(columnsList, GET_SEARCHABLE_LIST)}
                control={control}
                actionSearch={actionSearch}
                watchSearchList={watchSearchList}
            />

            <TableComponent
                isLoading={isLoading}
                rows={data ? data.data : undefined}
                keyTable='position-table'
                columns={columns}
                hasPagination={true}
                page={query.page}
                query={{ orderBy: query.orderBy, orderDirection: query.orderDirection }}
                actionSort={actionSort}
                actionChangePage={actionChangePage}
                totalPage={data ? data.meta.totalPage : undefined}
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
        </Paper>
    )
    
}

export default DrugCategoryPage;