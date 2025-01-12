import { Box, Typography, Drawer, Button, FormControl } from "@mui/material";
import { useEffect } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import Navigation from "../components/Navigation";
import CatalogContainer from "../components/Catalog/CatalogContainer";
import BottomBoard from "../components/BottomBoard";
import axios from "axios";
import { useUserData } from "../utils/store";
import { useFilters } from "../components/Catalog/store";
import Price from "../components/FilterBlocks/Price";
import Sort from "../components/FilterBlocks/Sort";
import Brand from "../components/FilterBlocks/Brand";
import Caterogy from "../components/FilterBlocks/Category";
import Fit from "../components/FilterBlocks/Fit";

const HomePage = () => {
    let tg = window.Telegram.WebApp;
    const { user, setUser } = useUserData();
    const { propsOfSearch, setPropsValue, setFieldValues, setTypeOfSearch, activeFilter, setActiveFilter, values } = useFilters()

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
            console.error('Ошибка при запросе полноэкранного режима:', error);
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
                p: '3em .5em 3.5em .5em',
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
                                <Typography
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}
                                >Фильтры</Typography>
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
                                                setPropsValue('brandsId', values.brandsId);
                                                break;
                                            case 'category':
                                                setPropsValue('categoriesId', values.categoriesId);
                                                break;
                                            case 'fit':
                                                setPropsValue('fitId', values.fitId);
                                                break;
                                            default:
                                                console.log('ups');
                                        }

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
                                                    setPropsValue('lowestPrice', null);
                                                    setPropsValue('highestPrice', null);

                                                    setFieldValues('lowestPrice', null)
                                                    setFieldValues('highestPrice', null)
                                                    break;
                                                };
                                                case 'sort':
                                                    setPropsValue('sortType', null);
                                                    setPropsValue('sortMode', null);

                                                    setFieldValues('sort', { type: null, mode: null })
                                                    break;
                                                case 'brand':
                                                    setPropsValue('brandsId', []);

                                                    setFieldValues('brandsId', [])
                                                    break;
                                                case 'category':
                                                    setPropsValue('categoriesId', []);

                                                    setFieldValues('categoriesId', [])
                                                    break;
                                                case 'fit':
                                                    setPropsValue('fitId', null);
                                                    setFieldValues('fitId', null)
                                                    break;
                                            }

                                            setActiveFilter(null)
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
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Рассчитать стоимость товара из Poizon</Typography>
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