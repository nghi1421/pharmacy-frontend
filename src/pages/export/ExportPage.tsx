import { Box, Button, CircularProgress, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useGetExport, useGetExports } from "../../hooks/useExport";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { TableExtension } from "../../components/table/TableExtension";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { getSearchColums } from "../../utils/helper";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { useSearchableList } from "../../hooks/useSearchableList";
import { green, red } from "@mui/material/colors";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const columnsList: Column[] = [
    { key: 'id', value: 'Mã xuất thuốc', sortable: false, searchable: false},
    { key: 'staffName', value: 'Được tạo bởi' , sortable: false, searchable: false},
    { key: 'customerName', value: 'Người mua hàng', sortable: false, searchable: false},
    { key: 'note', value: 'Ghi chú', sortable: false, searchable: false},
    { key: 'prescriptionId', value: 'Mã lô hàng', sortable: false, searchable: false},
    { key: 'exportDate', value: 'Ngày xuất hàng', sortable: false, searchable: false},
]

const ExportPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getImport = useGetExport()
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetExports(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    return (
        <Paper>
            <Box sx={{
                display: 'flex',
                gap: 2,
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
                    sx={{ px:3, py: 2, flex: 1 }}
                >
                    Quản lí xuất hàng
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: green[500],
                        '&:hover': {
                            backgroundColor: green[700],
                        }
                    }}
                    size="small"
                    onClick={() => navigate('/admin/sales-exports/create')}
                >
                    <AttachMoneyIcon></AttachMoneyIcon>
                    <Typography
                        textTransform='none'
                        variant='button'
                        color='inheric'
                        marginLeft='4px'
                    >
                        Bán hàng
                    </Typography>
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: red[600],
                        '&:hover': {
                            backgroundColor: red[800],
                        }
                    }}
                    size="small"
                    onClick={() => navigate('/admin/cancel-exports/create')}
                >
                    <HighlightOffIcon></HighlightOffIcon>
                    <Typography
                        textTransform='none'
                        variant='button'
                        color='inheric'
                        marginLeft='4px'
                    >
                        Hủy hàng
                    </Typography>
                </Button>
            </Box>

            <TableExtension
                setValue={setValue}
                initValueSearch={query.searchTerm}
                initSearchColumns={getSearchColums(columns, GET_SEARCHABLE_KEY)}
                searchColumns={getSearchColums(columnsList, GET_SEARCHABLE_LIST)}
                control={control}
                actionSearch={actionSearch}
                watchSearchList={watchSearchList}
            />
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
                        isLoading={isLoading}
                        rows={data ? data.data : undefined}
                        keyTable='export-table'
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
                                    key={`row-action-provider-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title="Xem thông tin chi tiết">
                                            <IconButton
                                                color='success'
                                                onClick={() => { getImport.mutate(rowValue.id) }}
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