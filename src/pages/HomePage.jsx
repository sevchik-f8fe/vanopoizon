import { Box, Typography, Drawer, Button, FormControl } from "@mui/material";
import { useEffect } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import Navigation from "../components/Navigation";
import CatalogContainer from "../components/Catalog/CatalogContainer";
import BottomBoard from "../components/BottomBoard";
import axios from "axios";
import { useUserData } from "../utils/store";
import { useCatalog, useFilters } from "../components/Catalog/store";
import Price from "../components/FilterBlocks/Price";
import Sort from "../components/FilterBlocks/Sort";
import Brand from "../components/FilterBlocks/Brand";
import Caterogy from "../components/FilterBlocks/Category";
import Fit from "../components/FilterBlocks/Fit";
import { checkFilter } from "../utils/utilFuncs";
import { useFavorites } from "./FavoritePage/store";
import { useCart } from "./CartPage/store";

const HomePage = () => {
    let tg = window.Telegram.WebApp;
    const { user, setUser } = useUserData();
    const { propsOfSearch, setPropsValue, setFieldValues, activeFilter, setActiveFilter, values } = useFilters()
    const { setPage, setProducts } = useCatalog();
    const { setFavorites, favorites } = useFavorites();
    const { setSpuIds, spuIds } = useCart();
    const location = useLocation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        tg.ready();
        tg.BackButton.hide();
        tg.MainButton.hide();
        try {
            tg.requestFullscreen();
        } catch (error) {
            tg.expand();
        }
        tg.disableVerticalSwipes();
        tg.enableClosingConfirmation();

        const sendDataToValidate = async () => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/auth',
                { tg: tg.initData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    setUser(res?.data?.user)

                    if (favorites?.length === 0) setFavorites(res?.data?.user?.favorites);
                    if (spuIds?.length === 0) setSpuIds(res?.data?.user?.cart)
                })
                .catch(err => console.log(`err: ${err}`));
        }

        sendDataToValidate();
    }, []);

    return (
        <Box
            sx={{
                ...(isSmallScreen && {
                    flexDirection: 'column',
                    justifyContent: 'center',
                }),
                ...(!isSmallScreen && {
                    alignItems: 'start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }),
                display: 'flex',
                gap: '1em',
            }}
        >
            {isSmallScreen ? (
                <>
                    <Navigation />
                    <BottomBoard />
                    <CalculateBlock />
                    <CatalogContainer />

                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: 'transparent',
                            },
                        }}
                        anchor={'bottom'}
                        open={activeFilter !== null
                        }
                        onClose={() => setActiveFilter(null)}
                    >
                        <Box
                            sx={{
                                borderRadius: '1em 1em 0 0',
                                backgroundColor: '#2E2E3A',
                                p: '1em 1.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1em'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: "center",
                                    alignItems: 'center',

                                }}
                            >
                                <Typography variant="caption">Фильтры</Typography>
                            </Box>

                            {activeFilter === 'price' && <Price />}
                            {activeFilter === 'sort' && <Sort />}
                            {activeFilter === 'brand' && <Brand />}
                            {activeFilter === 'category' && <Caterogy />}
                            {activeFilter === 'fit' && <Fit />}

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '.5em'
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        switch (activeFilter) {
                                            case 'price': {
                                                setPropsValue('lowestPrice', values.lowestPrice);
                                                setPropsValue('highestPrice', values.highestPrice);
                                                break;
                                            };
                                            case 'sort':
                                                setPropsValue('sortType', values.sort.type);
                                                setPropsValue('sortMode', values.sort.mode);
                                                break;
                                            case 'brand':
                                                setPropsValue('brandId', values.brandsId);
                                                break;
                                            case 'category':
                                                setPropsValue('categoryId', values.categoriesId);
                                                break;
                                            case 'fit':
                                                setPropsValue('fitId', values.fitId);
                                                break;
                                            default:
                                                console.log('ups');
                                        }

                                        setProducts([]);
                                        setPage(1);
                                        setActiveFilter(null);
                                    }}
                                >Применить</Button>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '.5em',

                                    }}
                                >

                                    <Button
                                        sx={{
                                            flex: 1
                                        }}

                                        onClick={() => {
                                            switch (activeFilter) {
                                                case 'price': {
                                                    setPropsValue('lowestPrice', '');
                                                    setPropsValue('highestPrice', '');

                                                    setFieldValues('lowestPrice', '')
                                                    setFieldValues('highestPrice', '')
                                                    break;
                                                };
                                                case 'sort':
                                                    setPropsValue('sortType', null);
                                                    setPropsValue('sortMode', null);

                                                    setFieldValues('sort', { type: null, mode: null })
                                                    break;
                                                case 'brand':
                                                    setPropsValue('brandId', []);

                                                    setFieldValues('brandsId', [])
                                                    break;
                                                case 'category':
                                                    setPropsValue('categoryId', []);

                                                    setFieldValues('categoriesId', [])
                                                    break;
                                                case 'fit':
                                                    setPropsValue('fitId', null);
                                                    setFieldValues('fitId', null)
                                                    break;
                                            }

                                            setActiveFilter(null);
                                            setProducts([]);
                                            setPage(1);
                                        }}
                                        variant="danger"
                                    >Сбросить</Button>

                                    <Button
                                        sx={{
                                            flex: 1
                                        }}
                                        onClick={() => setActiveFilter(null)}
                                        variant="hide"
                                    >Отмена</Button>
                                </Box>
                            </Box>

                        </Box>
                    </Drawer>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: '4em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1em',
                            alignItems: 'start',
                            maxWidth: '25%',
                        }}
                    >
                        <Navigation />
                        <BottomBoard />
                        <CalculateBlock />
                    </Box>

                    <CatalogContainer />
                </>
            )}
        </Box>
    );
}

const CalculateBlock = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Link
            to={`/calc`}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    minWidth: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '.6em',
                    gap: '1em',
                    borderRadius: '1em',
                }}
            >
                <CalculateIcon
                    sx={{
                        color: '#fff',
                        fontSize: '4em'
                    }}
                />
                <Typography variant={'h5'}>{window.location.origin + location.pathname + location.search + location.hash}</Typography>
                {/* <Typography variant={'h5'}>Рассчитать стоимость товара из Poizon</Typography> */}
                <ArrowOutwardIcon
                    sx={{
                        color: '#fff',
                    }}
                />
            </Box>
        </Link>
    );
}

export default HomePage;