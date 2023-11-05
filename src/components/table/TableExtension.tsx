import { Box, IconButton, InputAdornment, Menu, Paper, TextField, Typography } from "@mui/material"
import { warningSearchField } from "../../utils/helper"
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FormInputMultiCheckbox } from "../form/FormInputMultiCheckbox";
import { useState } from "react";
import { QuerySearch } from "../../hooks/useSearchQuery";
import { useFilter } from "../../hooks/useFilter";
import { Item } from "../../types/props/FormInputListProps";

interface TableExtensionProps {
    watchSearchList: string[],
    initValueSearch: string,
    actionSearch: (q: QuerySearch) => void,
    initSearchColumns: string[],
    searchColumns: Item[],
    control: any,
    setValue: (value: any) => void
}

export const TableExtension: React.FC<TableExtensionProps> = ({
    actionSearch,
    initValueSearch,
    watchSearchList,
    control,
    setValue,
    initSearchColumns,
    searchColumns
}) => {
    const [search, setSearch] = useState<string>(initValueSearch)
    const [time, setTime] = useState<number>(0)
    const [filterEl, openSetting, onOpenFilter, onCloseFilter] = useFilter()

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(time);
        setSearch(event.target.value as string)
            setTime(setTimeout(() => {
                actionSearch({
                    searchTerm: event.target.value as string,
                    searchColumns: watchSearchList
                })
            }, 500)
        )
    }

    return (
        <Paper sx={{ px: 3, py: 1, display: 'flex', gap: 2 }}>
            <TextField
                onChange={handleSearchData}
                onClick={() =>
                    {
                        if (watchSearchList.length === 0) {
                            warningSearchField()
                        }
                    }
                }
                sx={{ width: '40%' }}
                label="Tìm kiếm"
                value={search}
                disabled={watchSearchList.length === 0}
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
                        initValue={initSearchColumns}
                        name='searchableList'
                        label='Tìm kiếm theo'
                        placeholder="x"
                        setValue={setValue}
                        control={control}
                        list={searchColumns}
                    />
                </Box>
            </Menu>
        </Paper>
        
    )
}