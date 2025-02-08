import { Box, Typography, IconButton, Skeleton } from "@mui/material";
import Grid from '@mui/material/Grid2';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import { nanoid } from "nanoid";
import { useEffect } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme, useMediaQuery } from "@mui/material";

import SearchField from "../SearchField/SearchField";
import CatalogElement from "./CatalogElement";
import { useCatalog } from "./store";
import { useFilters } from "./store";
import { shortTitle, toNormalPrice, toRub, objectToQueryString } from "../../utils/utilFuncs";
import EndMessage from "../EndMessage";

const CatalogContainer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
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
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
            }}
        >
            <SearchField />
            <FilterContainer />
        </Box>
    );
}

const FilterContainer = () => {
    const filterItems = [
        { icon: SwapVertIcon, title: null, type: 'sort' },
        { icon: null, title: 'Бренд', type: 'brand' },
        { icon: null, title: 'Категории', type: 'category' },
        { icon: null, title: 'Цена', type: 'price' },
        { icon: null, title: 'Пол', type: 'fit' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'no-wrap',
                overflowX: 'auto',
                gap: '.5em',
                mb: '.5em',
                alignItems: 'center',
            }}
        >
            {filterItems.map((elem) => <FilterElement Icon={elem?.icon} title={elem.title} type={elem.type} key={nanoid()} />)}
        </Box>
    );
}

const FilterElement = ({ Icon, title, type }) => {
    const { propsOfSearch, setActiveFilter } = useFilters();

    const isUse = (type) => {
        switch (type) {
            case 'price': return propsOfSearch.lowestPrice.value !== '' || propsOfSearch.highestPrice.value !== '';
            case 'sort': return propsOfSearch.sortType.value !== null || propsOfSearch.sortMode.value !== null;
            case 'brand': return propsOfSearch.brandId.value.length > 0;
            case 'category': return propsOfSearch.categoryId.value.length > 0;
            case 'fit': return propsOfSearch.fitId.value !== null;
            default: console.log('ups');
        }
    }

    return (
        <IconButton
            onClick={() => setActiveFilter(type)}
            size="small"
            sx={{
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A',
                position: 'relative',
                p: '.4em .6em',
                ...(isUse(type) && {
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '.5em',
                        height: '.5em',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                    },
                }),
            }}
        >
            {Icon ? (
                <Icon sx={{ color: '#fff', fontSize: '1.1em' }} />
            ) : (
                <Typography variant="body1">{title}</Typography>
            )}
        </IconButton>
    );
}

const CatalogContent = () => {
    const { products, page, setNextPage, setMoreProducts, hasMore, setHasMore } = useCatalog();
    const { propsOfSearch } = useFilters();

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getFilteredProducts', { page, props: objectToQueryString(propsOfSearch) }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response?.data?.products.length <= 0) setHasMore(false);
                    else setMoreProducts(response?.data?.products);
                })
                .catch(error => {
                    console.error('Ошибка')
                })
        }

        setHasMore(true);

        fetchFilteredProducts();
    }, [page])

    return (
        <>
            <InfiniteScroll
                dataLength={products?.length}
                next={() => setNextPage()}
                hasMore={hasMore}
                loader={<LoadingComponent />}
                endMessage={<EndMessage title='Товары закончились. Измените запрос или проверьте интернет.' />}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        minWidth: '100%',
                    }}
                >
                    <Grid sx={{ minWidth: '100%' }} container spacing={1}>
                        {products && products
                            ?.filter(elem => elem?.logoUrl?.length > 0 && elem?.price > 0 && elem?.title?.length > 0)
                            ?.map((elem) => <CatalogElement key={nanoid()} spuId={elem?.spuId} price={toRub(toNormalPrice(elem?.price))} title={shortTitle(elem?.title)} picture={elem?.logoUrl} />)}
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
            }}
        >
            <Grid container spacing={1} sx={{ minWidth: '100%' }}>
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