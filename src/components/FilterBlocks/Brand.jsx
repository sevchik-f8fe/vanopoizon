import { useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox, Skeleton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import _ from "lodash";

import { useFilters } from "../Catalog/store";
import { useBrands } from "./store";
import { nanoid } from "nanoid";

const Brand = () => {
    const { data, setData, currentPage, isLoading, hasMore, setIsLoading, setHasMore, setCurrentPage } = useBrands();
    const { values, searchValue, setSearchValue, setFieldValues, removeFieldValues, propsOfSearch } = useFilters();

    useEffect(() => {
        setSearchValue('');
        setFieldValues('brandsId', propsOfSearch?.brandId?.value);
    }, [])

    useEffect(() => {
        const getBrandList = async () => {
            setIsLoading(true);
            setHasMore(true);

            await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getBrands', { page: currentPage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.data.brands.data.length == 0) {
                        setHasMore(false);
                    } else {
                        setData(response.data.brands.data);
                    }
                })
                .catch(error => console.error('Ошибка: ', error))
                .finally(() => setIsLoading(false))
        };

        getBrandList();
    }, [currentPage])

    useEffect(() => {
        const debouncedCheckAndFetchMore = _.debounce(async () => {
            const filteredData = filterListHandle(data, searchValue);

            if (filteredData.length === 0 && hasMore && !isLoading) {
                setCurrentPage(currentPage + 1);
            }
        }, 250);

        if (data.length > 0) debouncedCheckAndFetchMore();
    }, [searchValue, isLoading, hasMore]);

    const filterListHandle = (array, searchTerm) => {
        return array?.filter(item => item?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
    }

    return (
        <Box
            sx={{
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                backgroundColor: '#202029',
                p: '.5em',
                borderRadius: "1em"
            }}
        >
            <TextField
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#ffffff50' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setSearchValue('');
                                    }}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#fff2',
                                        '&:hover': {
                                            backgroundColor: '#fff2',
                                        },
                                        '&:active': {
                                            backgroundColor: '#fff1'
                                        },
                                    }}
                                >
                                    <CloseIcon
                                        sx={{
                                            fontSize: '.9em',
                                            color: '#fff8'
                                        }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    },
                }}

                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}

                sx={{
                    flex: '1',
                }}

                placeholder="Поиск по списку"
                size="small"
                variant="outlined"
            />

            <Box
                sx={{
                    height: "60vh",
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {(!isLoading && (filterListHandle(data, searchValue).length > 0)) ? (filterListHandle(data, searchValue)
                    .filter((elem, id) => id < 40)
                    .map(elem => (
                        <FormControlLabel
                            labelPlacement="start"
                            sx={{
                                justifyContent: 'space-between',
                                maxWidth: '90%',
                                '& .MuiFormControlLabel-label': {
                                    color: '#fff',
                                    fontSize: '.9em',
                                    fontWeight: '500',
                                },
                            }}
                            key={nanoid()}
                            control={<Checkbox
                                checked={values?.brandsId?.some(brandId => brandId === elem.id)}
                                onChange={() => {
                                    if (!values?.brandsId?.some(brandId => brandId === elem.id)) {
                                        setFieldValues('brandsId', [...values?.brandsId, elem.id])
                                    } else {
                                        removeFieldValues('brandsId', elem.id)
                                    }
                                }}
                            />}
                            label={elem.name}
                        />
                    ))) : (
                    [1, 2, 9, 1, 2, 3, 34, 4, 5, 5, 6, 7].map((elem) => (
                        <Box
                            key={nanoid()}
                            sx={{
                                mb: '.5em'
                            }}
                        >
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width='100%'
                                height='2em'
                            />
                        </Box>
                    ))
                )}
            </Box>
        </Box >
    );
}

export default Brand;