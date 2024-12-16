import { Box, Typography, IconButton, Skeleton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TuneIcon from '@mui/icons-material/Tune';
import { nanoid } from "nanoid";
import { useEffect } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import SearchField from "../SearchField/SearchField";
import CatalogElement from "./CatalogElement";
import { useCatalog } from "./store";
import { shortTitle, toNormalPrice, toRub, objectToQueryString } from "../../utils/utilFuncs";

const CatalogContainer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box
            // id="catalog"
            sx={{
                flexGrow: 1,
                ...(!isSmallScreen && {
                    maxWidth: 'calc(75% - 1em)',
                }),
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <CatalogHeader />
            <CatalogContent />

        </Box>
    );
}

const CatalogHeader = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                mb: '1em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.6em',
                        fontWeight: '900'
                    }}
                >
                    Каталог
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em'
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigate('/filter');
                        }}
                    >
                        <TuneIcon
                            sx={{
                                color: '#fff',
                                fontSize: '1.2em',
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>

            <SearchField />
        </Box>
    );
}

const CatalogContent = () => {
    const { products, propsOfSearch, typeOfSearch, page, setNextPage, setMoreProducts, hasMore, setHasMore } = useCatalog();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchProducts = async () => {
            axios.post('https://vanopoizonserver.ru/vanopoizon/api/getProducts', { page }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response?.data?.products.length <= 0) setHasMore(false);
                    else setMoreProducts(response?.data?.products);
                })
                .catch(error => {
                    console.log('Ошибка: ', error.response ? error.response.data : error.message)
                })
        }

        const fetchFilteredProducts = async () => {
            axios.post('https://vanopoizonserver.ru/vanopoizon/api/getFilteredProducts', { page, props: objectToQueryString(propsOfSearch) }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response?.data?.products.length <= 0) setHasMore(false);
                    else setMoreProducts(response?.data?.products);
                })
                .catch(error => {
                    console.error('Ошибка: ', error)
                })
        }

        if (typeOfSearch == 'filtered') {
            fetchFilteredProducts();
        } else {
            fetchProducts();
        }
    }, [page])

    return (
        <>
            <InfiniteScroll
                dataLength={products?.length}
                next={() => setNextPage()}
                hasMore={hasMore}
                loader={<LoadingComponent />}
                endMessage={
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#fff3',
                                fontWeight: 700,
                                fontSize: '1em',
                            }}
                        >Пожалуй, на этом все</Typography>
                    </Box>
                }
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        minWidth: '100%',
                    }}
                >
                    <Grid sx={{ minWidth: '100%' }} container spacing={2}>
                        {products && products?.map((elem) => <CatalogElement key={nanoid()} spuId={elem?.spuId} price={toRub(toNormalPrice(elem?.price))} link={'/product'} title={shortTitle(elem?.title)} picture={elem?.logoUrl} />)}
                    </Grid>

                </Box>
            </InfiniteScroll>
        </>
    );
}

const LoadingComponent = () => {
    return (
        <Box
            sx={{
                minWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '.5em',
                pt: '.5em',
            }}
        >
            <Grid container spacing={2} sx={{ minWidth: '100%' }}>
                {[1, 2].map((elem) => <FreakElement key={nanoid()} />)}
            </Grid>
        </Box>
    );
}

const FreakElement = () => {
    return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
                sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '1em',
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <IconButton
                    size="small"
                    sx={{
                        '&:hover': {
                            backgroundColor: '#fff',
                        },
                        '&:active': {
                            backgroundColor: '#fff9',
                        },
                        top: '.1em',
                        right: '.1em',
                        position: 'absolute',
                    }}
                >
                    <FavoriteBorderIcon sx={{ color: '#F34213' }} />
                </IconButton>

                <Box>
                    <Skeleton
                        sx={{
                            borderRadius: '1em 1em 0 0'
                        }}
                        animation="wave" variant="rounded" width='100%' height='10em'
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: '.5em',
                            p: '.5em'
                        }}
                    >
                        <Skeleton
                            animation="wave" variant="rectangular" width='100%' height='1.5em'
                        />
                        <Skeleton
                            animation="wave" variant="rectangular" width='100%' height='1em'
                        />
                    </Box>
                </Box>

                <CustomButton
                    isDisabled={false}
                >В корзину</CustomButton>
            </Box>
        </Grid>
    );
}

const CustomButton = ({ children, isDisabled }) => {
    return (
        <>
            <button
                disabled={isDisabled}
                style={{
                    cursor: 'pointer',
                    border: '0',
                    borderRadius: '0 0 1em 1em',
                    textAlign: 'center',
                    fontSize: '.9em',
                    width: '100%',
                    padding: '.5em .7em',
                    backgroundColor: '#F3421310',
                    fontWeight: '500',
                    ...(isDisabled && {
                        color: '#F3421350',
                    }),
                    ...(!isDisabled && {
                        color: '#F34213',
                    }),
                }}
            >
                {children}
            </button >
        </>
    );
}

export default CatalogContainer;