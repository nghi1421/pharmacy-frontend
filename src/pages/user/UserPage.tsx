import { Box, CircularProgress, IconButton, InputAdornment, Menu, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableComponent from "../../components/table/TableComponent";
import { useGetUsers } from "../../hooks/useAccount";
import { useSearchQuery } from '../../hooks/useSearchQuery'
import React from "react";
import { FormInputMultiCheckbox } from "../../components/form/FormInputMultiCheckbox";
import { useSearchableList } from "../../hooks/useSearchableList";
import { useFilter } from "../../hooks/useFilter";
import { GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { getSearchColums, warningSearchField } from "../../utils/helper";

const columnsList = [
    { key: 'id', value: 'Mã tài khoản', sortable: true, searchable: true, enableSearch: true },
    { key: 'username', value: 'Tên đăng nhập', sortable: true, searchable: true, enableSearch: true },
    { key: 'role', value: 'Quyền', sortable: true, searchable: true, enableSearch: true },
    { key: 'createdAt', value: 'Thời gian tạo', sortable: true, searchable: false },
    { key: 'updatedAt', value: 'Cập nhật', sortable: true, searchable: false },
]
const UserPage: React.FC<{}> = () => {
    const { query, actionChangePage, actionSort } = useSearchQuery()
    const { data, isLoading } = useGetUsers(query)
    const [columns, watchSearchList, control, setValue ] = useSearchableList(columnsList)
    const [filterEl, openSetting, onOpenFilter, onCloseFilter] = useFilter()

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí tài khoản
            </Typography>
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
                    data
                    ?
                        <React.Fragment>
                            <Paper sx={{ px: 3, py: 1, w: 200, display: 'flex', gap: 2 }}>
                                <TextField
                                    onChange={handleSearchData}
                                    onClick={() =>
                                        {
                                            if (getSearchColums(columns, GET_SEARCHABLE_KEY).length === 0) {
                                                warningSearchField()
                                            }
                                        }
                                    }
                                    sx={{ width: '40%' }}
                                    label="Tìm kiếm"
                                    disabled={getSearchColums(columns, GET_SEARCHABLE_KEY).length === 0}
                                    placeholder="Nhập thông tin tìm kiếm"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position='end'
                                            >
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <IconButton onClick={onOpenFilter}>
                                    <FilterListIcon />
                                    <Typography>
                                        Bộ lọc
                                    </Typography>
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={filterEl}
                                    open={openSetting}
                                    onClose={onCloseFilter}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Box sx={{ px:3, py:2 }}>
                                        <FormInputMultiCheckbox
                                            initValue={getSearchColums(columns, GET_SEARCHABLE_KEY)}
                                            name='searchableList'
                                            label='Tìm kiếm theo'
                                            placeholder="x"
                                            setValue={setValue}
                                            control={control}
                                            list={getSearchColums(columnsList, GET_SEARCHABLE_LIST)}
                                        />
                                    </Box>
                                </Menu>
                            </Paper>

                            <TableComponent
                                rows={data.data}
                                keyTable='user-table'
                                columns={columns}
                                hasPagination={true}
                                page={query.page}
                                query={{ orderBy: query.orderBy, orderDirection: query.orderDirection }}
                                actionSort={actionSort}
                                actionChangePage={actionChangePage}
                                totalPage={data.meta.totalPage}
                            />
                        </React.Fragment>
                    :
                    <>No response</>
            }
            
        </Paper>
    )
    
}

export default UserPage;