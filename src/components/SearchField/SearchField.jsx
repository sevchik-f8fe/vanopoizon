import { TextField, InputAdornment, Box, IconButton, Typography, Skeleton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CloseIcon from '@mui/icons-material/Close';
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useCallback } from "react";
import _ from "lodash";

import { shortTitle } from "../../utils/utilFuncs";
import { useSearchField } from "./store";
import { useCatalog, useFilters } from "../Catalog/store";

const SearchField = () => {
    const { fieldValue, setFieldValue, isTyping, setIsTyping, setMiniProductList } = useSearchField();
    const { setProducts, setPage } = useCatalog();
    const { typeOfSearch, setPropsValue, setTypeOfSearch } = useFilters();

    const fetchMiniList = useCallback(_.debounce(async () => {
        setMiniProductList([]);

        if (fieldValue.length > 0) {
            setIsTyping(true);
            try {
                const response = await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getMiniProductList', { props: fieldValue }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setMiniProductList(response?.data?.products);
            } catch (error) {
                console.error('Ошибка: ', error);
            }
        } else {
            setIsTyping(false);
        }
    }, 300), [fieldValue]);

    useEffect(() => {
        const timer = setTimeout(fetchMiniList, 300);
        return () => clearTimeout(timer);
    }, [fetchMiniList])

    return (
        <Box
            sx={{
                w: '100%',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '.5em',
                                    }}
                                >
                                    <IconButton
                                        onClick={() => {
                                            setIsTyping(false);
                                            setMiniProductList([]);
                                            setFieldValue('');
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
                                    <IconButton
                                        onClick={() => {
                                            if (fieldValue.length > 0) {
                                                setPropsValue('keyword', fieldValue);
                                                setTypeOfSearch('filtered');
                                                setProducts([]);
                                                setPage(1);
                                            } else {
                                                if (typeOfSearch != 'default') {
                                                    setProducts([]);
                                                    setPage(1);
                                                    setTypeOfSearch('default');
                                                }
                                                setPropsValue('keyword', null);
                                            }
                                            setIsTyping(false);
                                            setMiniProductList([]);
                                        }}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#F34213',
                                            '&:hover': {
                                                backgroundColor: '#F34213',
                                            },
                                            '&:active': {
                                                backgroundColor: '#F3421390'
                                            },
                                        }}
                                    >
                                        <ArrowOutwardIcon
                                            sx={{
                                                fontSize: '.9em',
                                                color: '#ffffff',
                                            }} />
                                    </IconButton>
                                </Box>
                            </InputAdornment>
                        )
                    },
                }}
                sx={{
                    flex: '1',
                }}
                onChange={(e) => { setFieldValue(e.target.value) }}
                value={fieldValue}
                placeholder="Nike Air Zoom"
                size="small"
                variant="outlined"
            />
            {isTyping && <MiniListContainer />}
        </Box>
    );
}

const MiniListContainer = () => {
    const { miniProductList } = useSearchField();

    return (
        <Box
            sx={{
                zIndex: 100,
                backgroundColor: '#2E2E3A',
                position: 'absolute',
                minWidth: '100%',
                top: '100%',
                borderRadius: '1em',
                p: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            {miniProductList.length > 0 ? (
                miniProductList?.map(elem => <MiniListComponent spuId={elem?.spuId} title={shortTitle(elem?.title)} img={elem?.logoUrl} key={nanoid()} />)
            ) : (
                [1, 2, 3, 4].map(elem => <MiniListLoader key={nanoid()} />)
            )}
        </Box>
    )
}

const MiniListLoader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                gap: '.5em',
                justifyContent: 'space-between',
                borderBottom: '1px solid #fff3',
                pb: '.5em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '.5em',
                }}
            >
                <Skeleton
                    sx={{
                        borderRadius: '.5em'
                    }}
                    animation="wave" variant="rounded" width='4em' height='3em'
                />

                <Skeleton
                    sx={{
                        mt: '.5em',
                    }}
                    animation="wave" variant="rounded" width='12em' height='1.5em'
                />
            </Box>

            <ArrowOutwardIcon
                sx={{
                    color: '#fff',
                    fontSize: '1.2em'
                }}
            />
        </Box>
    );
}

const MiniListComponent = ({ spuId, title, img }) => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => {
                navigate('/product', { state: { spu: spuId } })
            }}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'start',
                gap: '.5em',
                justifyContent: 'space-between',
                borderBottom: '1px solid #fff3',
                pb: '.5em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '.5em',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '.5em',
                        backgroundColor: 'white',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '3em',
                        minWidth: '4em',
                    }}
                ></Box>

                <Typography
                    sx={{
                        pt: '.5em',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '1em'
                    }}
                >{title}</Typography>
            </Box>

            <ArrowOutwardIcon
                sx={{
                    color: '#fff',
                    fontSize: '1.2em'
                }}
            />
        </Box>
    );
}



export default SearchField;