import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent, { QuerySort } from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useGetUsers } from "../../hooks/useAccount";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Query } from "../../types/Query";
import { QueryBuilder } from "@mui/icons-material";

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản', sortable: true},
  { key: 'username', value: 'Tên đăng nhập', sortable: true},
  { key: 'role', value: 'Quyền', sortable: true},
  { key: 'createdAt', value: 'Thời gian tạo', sortable: true},
  { key: 'updatedAt', value: 'Cập nhật', sortable: true},
]

const UserPage: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<Query>({
        page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
        perPage: 5,
        orderBy: searchParams.get('order_by') ? searchParams.get('order_by') as string : 'id',
        orderDirection: searchParams.get('order_direction') ? searchParams.get('order_direction') as string: 'asc',
    })
    const { data, isLoading } = useGetUsers(query)

    const actionChangePage = (page: number) => {
        setQuery({ ...query, page });
        let searchQuery = new URLSearchParams('?');
        searchQuery.set('page', page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', query.orderBy)
        searchQuery.set('orderDirection', query.orderDirection)
        setSearchParams(searchQuery)
    }

    const actionSort = (querySort: QuerySort) => {
        setQuery({...query, ...querySort })
        let searchQuery = new URLSearchParams('?');
        searchQuery.set('page', query.page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', querySort.orderBy)
        searchQuery.set('orderDirection', querySort.orderDirection)
        setSearchParams(searchQuery)
    }

    useEffect(() => {
        console.log(query)
    }, [query])

    // useEffect(() => {
    //     setQuery({
    //         page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
    //         perPage: searchParams.get('per_page') ? parseInt(searchParams.get('per_page') as string) : 5,
    //         orderBy: searchParams.get('order_by') ? searchParams.get('order_by') as string : 'id',
    //         orderDirection: searchParams.get('order_direction') ? searchParams.get('order_direction') as string: 'asc',
    //     })
    // }, [searchParams]);

    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí tài khoản
            </Typography>
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
                    data
                    ?
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
                        ></TableComponent>
                    :
                    <>No response</>
            }
            
        </Paper>
    )
    
}

export default UserPage;