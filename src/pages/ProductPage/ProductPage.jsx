import { Box, Typography, IconButton, Skeleton, Button, Link, Switch, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { nanoid } from "nanoid";
import Slider from "react-slick";
import { shareURL } from '@telegram-apps/sdk';
import { useEffect } from "react";
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import { useProductPage } from "./store";
import { showMainBtn, showShineMainBtn } from "../../utils/utilFuncs";
import { useLocation } from "react-router-dom";
import { toRub, calcPrice } from "../../utils/utilFuncs";
import { sliceChn, toNormalPrice, imagesForCurrentColor } from "../../utils/utilFuncs";
import { useTheme, useMediaQuery } from "@mui/material";
import { useFavorites } from "../FavoritePage/store";
import { useUserData } from "../../utils/store";
import { useCart } from "../CartPage/store";

const ProductPage = () => {
    const { setAccordion, setVariations, storeSpuId, setStoreSpuId, accordion, isSplit, useInsurance, setUseInsurance, setProduct, setPrices, product, currentProduct, setCurrentProductField } = useProductPage();
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const { user } = useUserData();
    const { spuIds, removeFromCart, addToCart } = useCart();

    let tg = window.Telegram.WebApp;
    const location = useLocation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const loadProductData = async () => {
            axios.post('https://vanopoizonserver.ru/vanopoizon/api/getProductBySpu', { spu: location.state.spu }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    setProduct(response?.data?.product);
                    setPrices(response?.data?.price);
                    setStoreSpuId(location.state.spu);

                    const sizes = response.data.product?.saleProperties?.list?.find(elem => elem.name === '尺码' || elem.name === '尺寸')
                    const colors = response.data.product?.saleProperties?.list?.find(elem => elem.name === '颜色')

                    setVariations('isColors', (colors))
                    setVariations('isSizes', (sizes))

                    setCurrentProductField('color', colors?.propertyValueId);
                    setCurrentProductField('size', sizes?.propertyValueId);
                    setCurrentProductField('images', imagesForCurrentColor(response.data.product?.image?.spuImage?.images, colors?.propertyValueId))

                    setCurrentProductField('price', calcPrice(response?.data?.product, response?.data?.price, currentProduct)(sizes?.propertyValueId)(colors?.propertyValueId));
                })
                .catch(error => console.error('Ошибка: ', error));
        };

        tg.BackButton.show();
        tg.MainButton.hide();

        if (storeSpuId != location.state.spu) {
            setPrices(null)
            setProduct(null);

            loadProductData();
        }
    }, []);

    const handleFavoriteClick = () => {
        if (favorites.some(item => item.spuId === location.state.spu)) {
            removeFromFavorites(location.state.spu, user._id);
        } else {
            addToFavorites({ photoUrl: picture, title, spuId: location.state.spu }, user._id);
        }
    }

    const handleCartClick = () => {
        if (spuIds.some(item => item.spuId === location.state.spu)) {
            removeFromCart(location.state.spu, user._id);
        } else {
            addToCart({ count: 1, size: currentProduct?.size, color: currentProduct?.color, spuId: location.state.spu }, user._id);
        }
    }

    return isSmallScreen ? (
        <>
            <Box
                sx={{
                    mt: '.5em',
                    borderRadius: '1em 1em 0 0',
                    position: 'relative',
                    backgroundColor: "#fff",
                    minWidth: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        // flexDirection: 'column',
                        top: '1em',
                        right: '1em',
                        position: 'absolute',
                        zIndex: '20',
                        gap: '.5em',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            shareURL('https://core.telegram.org', 'Оййй бляяя');
                        }}
                        sx={{
                            backgroundColor: '#F34213',
                            '&:hover': {
                                backgroundColor: '#F34213',
                            },
                            '&:active': {
                                backgroundColor: '#F3421390',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        <ShareIcon
                            sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#Fff',
                            }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => handleFavoriteClick()}
                        sx={{
                            backgroundColor: '#F34213',
                            '&:hover': {
                                backgroundColor: '#F34213',
                            },
                            '&:active': {
                                backgroundColor: '#F3421390',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        {favorites.some(item => item.spuId === location.state.spu) ? (
                            <FavoriteIcon sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#Fff',
                            }} />
                        ) : (
                            <FavoriteBorderIcon sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#Fff',
                            }} />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={() => handleCartClick()}
                        sx={{
                            backgroundColor: '#F34213',
                            '&:hover': {
                                backgroundColor: '#F34213',
                            },
                            '&:active': {
                                backgroundColor: '#F3421390',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        {spuIds.some(item => item.spuId === location.state.spu) ? (
                            <ShoppingCartCheckoutIcon sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#Fff',
                            }} />
                        ) : (
                            <AddShoppingCartIcon sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#Fff',
                            }} />
                        )}
                    </IconButton>
                </Box>

                {product ? (
                    <ProductSlider />
                ) : (
                    <Box>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height='13em' />
                    </Box>
                )}

                {product ? (
                    <Typography
                        sx={{
                            color: '#202029',
                            fontSize: '1.6em',
                            fontWeight: '900',
                            lineHeight: '1.2',
                            p: '.5em',
                        }}
                    >
                        {sliceChn(product?.detail?.title)}
                    </Typography>
                ) : (
                    <Box
                        sx={{ p: '.5em 0', mb: '.5em' }}
                    >
                        <Skeleton animation="wave" variant="rounded" width='100%' height='2em' />
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    borderRadius: '0 0 1em 1em',
                    backgroundColor: '#2E2E3A',
                    p: '.5em .8em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                }}
            >
                <Box
                    sx={{
                        pb: '.5em',
                        borderBottom: '1px solid #ffffff30',
                    }}
                >

                    {product ? (
                        <>
                            <Typography
                                variant="h2"
                                sx={{
                                    transition: '.3s ease',
                                    ...(!isSplit && {
                                        color: '#ffffff',
                                    }),
                                    ...(isSplit && {
                                        color: '#ffffff50',
                                    }),
                                }}
                            >
                                {(!isNaN(currentProduct?.price)) ? <>{toRub(toNormalPrice(currentProduct?.price))} &#8381;</> : currentProduct?.price}
                            </Typography>

                            <Typography variant="subtitle2">
                                Оплачивая заказ, вы соглашаетесь с условиями
                                <Link
                                    sx={{
                                        color: '#709ed9',
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                    onClick={() => { tg.openLink('https://ru.wikipedia.org/wiki/%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B0') }}
                                >публичной оферты</Link>
                            </Typography>
                        </>
                    ) : (
                        <Box
                            sx={{
                                p: '.5em 0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5em'
                            }}
                        >
                            <Skeleton animation="wave" variant="rectangular" width='100%' height='3em' />
                            <Skeleton animation="wave" variant="rectangular" width='100%' height='3.5em' />
                        </Box>
                    )}
                </Box>

                {product ? (
                    <>
                        <TypesContainer />
                    </>
                ) : (
                    <Box
                        sx={{
                            p: '.5em 0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.5em'
                        }}
                    >
                        <Skeleton animation="wave" variant="rectangular" width='100%' height='8em' />
                    </Box>
                )}

                <UsePointsContainer />
            </Box>

            <Box
                sx={{
                    mt: '.5em',
                    borderRadius: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <List sx={{ p: 0 }}>
                    <ListItemButton sx={{ borderRadius: '.5em .5em 0 0', p: '.8em .5em', display: 'flex', gap: '1em', justifyContent: 'space-between' }} onClick={() => setAccordion('insurance')}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1em'
                            }}
                        >
                            <Typography variant="h5">Страховка и безопасность</Typography>
                        </Box>

                        {accordion.insurance ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                    </ListItemButton>

                    <Collapse in={accordion.insurance} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: '1em' }}>
                                <ListItemText
                                    primaryTypographyProps={{
                                        color: '#fff',
                                        fontSize: '.9em',
                                        fontWeight: '500',
                                    }}
                                    primary="В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности." />
                            </ListItemButton>
                        </List>

                        <Box
                            sx={{
                                backgroundColor: '#202029',
                                borderRadius: '.5em',
                                p: '.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5em',
                                mx: '.8em',
                                mb: '.5em'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '.2em',
                                        alignItems: 'center',
                                    }}
                                >
                                    <HealthAndSafetyIcon
                                        sx={{
                                            fontSize: '1.5em',
                                            color: '#fff'
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: '700',
                                            fontSize: '.9em'
                                        }}
                                    >
                                        Страховка
                                    </Typography>
                                    <IconButton
                                        size="small"
                                    >
                                        <InfoIcon
                                            sx={{
                                                fontSize: '1.2em',
                                                color: '#709ed9'
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                <Switch
                                    checked={useInsurance}
                                    onChange={(e) => setUseInsurance(e.target.checked)}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ pl: '1em' }}>
                                Если пиздец <span style={{ paddingLeft: '1em' }}>+ 3 400 &#8381;</span>
                            </Typography>
                        </Box>
                    </Collapse>
                </List>
            </Box>

            <Box
                sx={{
                    borderRadius: '.5em',
                    mt: '.5em',
                    mb: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <List sx={{ p: 0 }}>
                    <ListItemButton sx={{ borderRadius: '.5em .5em 0 0', p: '.8em .5em', display: 'flex', gap: '1em', justifyContent: 'space-between' }} onClick={() => setAccordion('original')}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1em'
                            }}
                        >

                            <Typography variant="h5">Строго оригинал</Typography>
                        </Box>

                        {accordion.original ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                    </ListItemButton>

                    <Collapse in={accordion.original} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: '1em' }}>
                                <ListItemText
                                    primaryTypographyProps={{
                                        color: '#fff',
                                        fontSize: '.9em',
                                        fontWeight: '500',
                                    }}
                                    primary="Мы гарантируем, что все купленные товары в Unicorn оригинальные и прошли проверку на подлинность. Если по каким-то причинам у вас на руках окажется подделка — мы вернем деньги в двойном размере." />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>

            <ReviewContainer />

            {
                product ? (
                    <AddOnsContainer />
                ) : (
                    <Box
                        sx={{
                            p: '.5em'
                        }}
                    >
                        <Skeleton animation="wave" variant="rectangular" width='100%' height='5em' />
                    </Box>
                )
            }
        </>
    ) : (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1em',
                    alignItems: 'start',
                    borderRadius: '1em 1em 0 0',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        minWidth: '50%',
                        position: 'sticky',
                        borderRadius: '1em 1em 0 0',
                        minHeight: '100%',
                        top: '3em',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            backgroundColor: "#fff",
                            minWidth: '100%',
                            borderRadius: '1em 1em 0 0'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                bottom: '3.5em',
                                right: '1em',
                                position: 'absolute',
                                zIndex: '20',
                                gap: '.5em',
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    shareURL('https://core.telegram.org', 'Открой для себя стильную одежду по суперценам на VANOPOIZON и будь в тренде всегда!');
                                }}
                                sx={{
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                    },
                                    '&:active': {
                                        backgroundColor: '#fff9',
                                    },
                                    maxWidth: '1.5em',
                                    maxHeight: '1.5em'
                                }}
                            >
                                <ShareIcon
                                    sx={{
                                        maxWidth: '.8em',
                                        maxHeight: '.8em',
                                        color: '#F34213',
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                    },
                                    '&:active': {
                                        backgroundColor: '#fff9',
                                    },
                                    maxWidth: '1.5em',
                                    maxHeight: '1.5em'
                                }}
                            >
                                <FavoriteBorderIcon
                                    sx={{
                                        maxWidth: '.8em',
                                        maxHeight: '.8em',
                                        color: '#F34213'
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                    },
                                    '&:active': {
                                        backgroundColor: '#fff9',
                                    },
                                    maxWidth: '1.5em',
                                    maxHeight: '1.5em'
                                }}
                            >
                                <AddShoppingCartIcon
                                    sx={{
                                        maxWidth: '.8em',
                                        maxHeight: '.8em',
                                        color: '#F34213'
                                    }}
                                />
                            </IconButton>
                        </Box>

                        {product ? (
                            <ProductSlider size="large" />
                        ) : (
                            <Box>
                                <Skeleton animation="wave" variant="rectangular" width='100%' height='17em' />
                            </Box>
                        )}

                        {product ? (
                            <Typography
                                sx={{
                                    color: '#202029',
                                    fontSize: '1.6em',
                                    fontWeight: '900',
                                    lineHeight: '1.2',
                                    p: '.5em',
                                }}
                            >
                                {sliceChn(product?.detail?.title)}
                            </Typography>
                        ) : (
                            <Box
                                sx={{ p: '.5em 0', mb: '.5em' }}
                            >
                                <Skeleton animation="wave" variant="rounded" width='100%' height='2em' />
                            </Box>
                        )}
                    </Box>

                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: '0 0 1em 1em',
                            backgroundColor: '#2E2E3A',
                            p: '.5em .8em',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.5em',
                        }}
                    >
                        <Box
                            sx={{
                                pb: '.5em',
                                borderBottom: '1px solid #ffffff30',
                            }}
                        >

                            {product ? (
                                <>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            transition: '.3s ease',
                                            ...(!isSplit && {
                                                color: '#ffffff',
                                            }),
                                            ...(isSplit && {
                                                color: '#ffffff50',
                                            }),
                                        }}
                                    >
                                        {(!isNaN(currentProduct?.price)) ? <>{toRub(toNormalPrice(currentProduct?.price))} &#8381;</> : currentProduct?.price}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        Оплачивая заказ, вы соглашаетесь с условиями <Link
                                            sx={{
                                                color: '#709ed9',
                                                cursor: 'pointer',
                                                textDecoration: 'none'
                                            }}
                                            onClick={() => { tg.openLink('https://ru.wikipedia.org/wiki/%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B0') }}
                                        >публичной оферты</Link>
                                    </Typography>
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        p: '.5em 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '.5em'
                                    }}
                                >
                                    <Skeleton animation="wave" variant="rectangular" width='100%' height='3em' />
                                    <Skeleton animation="wave" variant="rectangular" width='100%' height='3.5em' />
                                </Box>
                            )}
                        </Box>

                        {product ? (
                            <>
                                <TypesContainer />
                            </>
                        ) : (
                            <Box
                                sx={{
                                    p: '.5em 0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '.5em'
                                }}
                            >
                                <Skeleton animation="wave" variant="rectangular" width='100%' height='8em' />
                            </Box>
                        )}
                    </Box>

                </Box>

                <Box sx={{ maxWidth: '50%', display: 'flex', flexDirection: 'column', gap: '.5em' }}>
                    <Box
                        sx={{
                            borderRadius: '.5em',
                            backgroundColor: '#2E2E3A',
                            p: '.5em'
                        }}
                    >
                        <UsePointsContainer />
                        {
                            product ? (
                                <AddOnsContainer />
                            ) : (
                                <Box
                                    sx={{
                                        p: '.5em'
                                    }}
                                >
                                    <Skeleton animation="wave" variant="rectangular" width='100%' height='4em' />
                                </Box>
                            )
                        }
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '.5em',
                            backgroundColor: '#2E2E3A'
                        }}
                    >
                        <List sx={{ p: 0 }}>
                            <ListItemButton sx={{ borderRadius: '.5em .5em 0 0', p: '.8em .5em', display: 'flex', gap: '1em', justifyContent: 'space-between' }} onClick={() => setAccordion('original')}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '1em'
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontSize: '1em',
                                            fontWeight: '700',
                                        }}
                                    >Строго оригинал</Typography>
                                </Box>

                                {accordion.original ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                            </ListItemButton>

                            <Collapse in={accordion.original} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: '1em' }}>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                color: '#fff',
                                                fontSize: '.9em',
                                                fontWeight: '500',
                                            }}
                                            primary="Мы гарантируем, что все купленные товары в Unicorn оригинальные и прошли проверку на подлинность. Если по каким-то причинам у вас на руках окажется подделка — мы вернем деньги в двойном размере." />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '.5em',
                            backgroundColor: '#2E2E3A'
                        }}
                    >
                        <List sx={{ p: 0 }}>
                            <ListItemButton sx={{ borderRadius: '.5em .5em 0 0', p: '.8em .5em', display: 'flex', gap: '1em', justifyContent: 'space-between' }} onClick={() => setAccordion('insurance')}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '1em'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '1em',
                                            fontWeight: '700',
                                        }}
                                    >Страховка и безопасность</Typography>
                                </Box>

                                {accordion.insurance ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                            </ListItemButton>

                            <Collapse in={accordion.insurance} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: '1em' }}>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                color: '#fff',
                                                fontSize: '.9em',
                                                fontWeight: '500',
                                            }}
                                            primary="В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности." />
                                    </ListItemButton>
                                </List>

                                <Box
                                    sx={{
                                        backgroundColor: '#202029',
                                        borderRadius: '.5em',
                                        p: '.5em',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '.5em',
                                        mx: '.8em',
                                        mb: '.5em'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '.2em',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <HealthAndSafetyIcon
                                                sx={{
                                                    fontSize: '1.5em',
                                                    color: '#fff'
                                                }}
                                            />
                                            <Typography variant="caption"
                                                sx={{
                                                    fontWeight: '700',
                                                    fontSize: '.9em'
                                                }}
                                            >
                                                Страховка
                                            </Typography>
                                            <IconButton
                                                size="small"
                                            >
                                                <InfoIcon
                                                    sx={{
                                                        fontSize: '1.2em',
                                                        color: '#709ed9'
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>
                                        <Switch
                                            checked={useInsurance}
                                            onChange={(e) => setUseInsurance(e.target.checked)}
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{ pl: '1em' }}>
                                        Если пиздец <span style={{ paddingLeft: '1em' }}>+ 3 400 &#8381;</span>
                                    </Typography>
                                </Box>
                            </Collapse>
                        </List>
                    </Box>
                    <ReviewContainer />
                </Box>
            </Box >
        </>
    );
};

const ProductSlider = ({ size }) => {
    const { currentProduct, isColors, product } = useProductPage();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <></>,
        prevArrow: <></>
    };

    return (
        <Slider {...settings}>
            {isColors ? (
                currentProduct?.images?.map((elem) => <SlideCell size={size} picture={elem} key={nanoid()} />)
            ) : (
                product?.image?.spuImage?.images?.map((elem) => <SlideCell size={size} picture={elem?.url} key={nanoid()} />)
            )}
        </Slider>
    );
}

const SlideCell = ({ picture, size }) => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${picture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '1em 1em 0 0',
                minWidth: 'calc(100%)',
                ...(size == 'large' && {
                    minHeight: '20em',
                    maxHeight: '20em',
                }),
                ...(size != 'large' && {
                    minHeight: '13em',
                    maxHeight: '13em',
                }),
            }}
        >
        </Box>
    );
}

const TypesContainer = () => {
    const { isSizes, isColors } = useProductPage();

    return (isSizes || isColors) ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                p: '.5em 0',
                borderBottom: '1px solid #ffffff30'
            }}
        >
            {isColors && <ColorsContainer />}
            {isSizes && <SizesContainer />}
        </Box>
    ) : (<></>);
}

const SizesContainer = () => {
    const navigate = useNavigate();
    const { product } = useProductPage();

    const findSizes = () => {
        return product?.saleProperties?.list
            .filter(elem => elem.name == "尺码" || elem.name === '尺寸')
            .sort((elem1, elem2) => elem1.sort - elem2.sort)
            .map(elem => ({ size: elem.value, sizeId: elem.propertyValueId }));
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'end'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Размер (EU)</Typography>
                {product?.sizeDto?.sizeInfo && (
                    <Typography
                        onClick={() => {
                            navigate('/sizes');
                        }}
                        sx={{
                            cursor: 'pointer',
                            color: '#709ed9',
                            fontSize: '.75em',
                            fontWeight: '500'
                        }}
                    >Таблица размеров</Typography>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.5em',
                    pb: '.5em',
                    overflowX: 'auto',
                    flexWrap: 'no-wrap'
                }}
            >
                {findSizes()?.map((elem) => <SizesElement key={nanoid()} size={elem?.size} sizeId={elem?.sizeId} />)}
            </Box>
        </>
    );
};

const SizesElement = ({ size, sizeId }) => {
    const { currentProduct, setCurrentProductField, prices, product } = useProductPage();

    return (
        <Box
            onClick={() => {
                setCurrentProductField('size', sizeId)
                setCurrentProductField('price', calcPrice(product, prices, currentProduct)(sizeId)());
            }}
            sx={{
                display: 'flex',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'center',
                p: '.5em .8em',
                alignItems: 'center',
                borderRadius: '.5em',
                minWidth: 'fit-content',
                ...(currentProduct?.size == sizeId && {
                    border: '1px solid #fff',
                }),
                ...(currentProduct?.size != sizeId && {
                    border: '1px solid #ffffff30',
                }),
            }}
        >
            <Typography variant="caption">{size}</Typography>
        </Box>
    );
};

const ColorsContainer = () => {
    const { product } = useProductPage();

    const findColors = () => {
        return product?.saleProperties?.list
            .filter(elem => elem.name == "颜色")
            .sort((elem1, elem2) => elem1.sort - elem2.sort)
            .map(elem => ({ color: elem.value, colorId: elem.propertyValueId }));
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'end'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Цвет</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    flexWrap: 'no-wrap',
                    alignItems: 'center',
                    gap: '.5em',
                    pb: '.5em',
                }}
            >
                {findColors().map((elem) => <ColorElement key={nanoid()} color={elem?.color} colorId={elem?.colorId} />)}
            </Box>
        </>
    );
}

const ColorElement = ({ color, colorId }) => {
    const { product, currentProduct, setCurrentProductField, prices } = useProductPage();

    return (
        <Box
            onClick={() => {
                setCurrentProductField('color', colorId);
                setCurrentProductField('images', imagesForCurrentColor(product?.image?.spuImage?.images, colorId))
                setCurrentProductField('price', calcPrice(product, prices, currentProduct)()(colorId));
            }}
            sx={{
                display: 'flex',
                cursor: 'pointer',
                justifyContent: 'center',
                p: '.5em .8em',
                alignItems: 'center',
                borderRadius: '.5em',
                minWidth: 'fit-content',
                ...(currentProduct?.color == colorId && {
                    border: '1px solid #fff',
                }),
                ...(currentProduct?.color != colorId && {
                    border: '1px solid #ffffff30',
                }),
            }}
        >
            <Typography variant="caption">{color}</Typography>
        </Box>
    );
}

const UsePointsContainer = () => {
    const { setUsePoints, usePoints } = useProductPage();

    return (
        <Box
            sx={{
                p: '.5em 0',
            }}
        >
            <Typography
                sx={{
                    color: '#F34213',
                    fontSize: '1em',
                    fontWeight: '700',
                }}
            >
                Баллы PoizonShop
            </Typography>

            <Box
                sx={{
                    p: '2px',
                    mt: '.5em',
                    backgroundColor: '#202029',
                    borderRadius: '.5em',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 'fit-content',
                    gap: '1em',
                }}
            >
                <Box
                    onClick={() => setUsePoints(true)}
                    sx={{
                        transition: '.3s ease',
                        cursor: 'pointer',
                        p: '.5em .8em',
                        borderRadius: '.5em',
                        ...(usePoints && {
                            backgroundColor: '#2E2E3A',
                        }),
                        ...(!usePoints && {
                            backgroundColor: 'transparent',
                        }),
                    }}
                >
                    <Typography
                        sx={{
                            transition: '.3s ease',
                            fontSize: '.9em',
                            fontWeight: '700',
                            ...(usePoints && {
                                color: '#fff',
                            }),
                            ...(!usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Начислить <span style={usePoints ? { color: '#F34213' } : { color: '#Fff5' }} > 50</span></Typography>
                </Box>

                <Box
                    onClick={() => setUsePoints(false)}
                    sx={{
                        transition: '.3s ease',
                        cursor: 'pointer',
                        p: '.5em .8em',
                        borderRadius: '.5em',
                        ...(!usePoints && {
                            backgroundColor: '#2E2E3A',
                        }),
                        ...(usePoints && {
                            backgroundColor: 'transparent',
                        }),
                    }}
                >
                    <Typography
                        sx={{
                            transition: '.3s ease',
                            fontSize: '.9em',
                            fontWeight: '700',
                            ...(!usePoints && {
                                color: '#fff',
                            }),
                            ...(usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Списать <span style={!usePoints ? { color: '#F34213' } : { color: '#fff5' }}>0</span></Typography>
                </Box>
            </Box>
        </Box >
    );
}

const ReviewContainer = () => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            sx={{
                mb: '.5em',
                p: '.5em .8em',
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                sx={{
                    fontSize: '1em',
                    fontWeight: '700',
                    pb: '.5em'
                }}
            >
                Отзывы
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em',
                    overflowX: 'scroll',
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => <ReviewElement key={nanoid()} src={'https://poizonshop-webapp.vercel.app/_next/static/media/chat-01.ac2d9903.png?w=1200&q=75'} />)}
            </Box>

            <Button
                onClick={() => { tg.openTelegramLink('https://t.me/reviews_12345') }}
                variant="outlined"
                size="large"
                sx={{
                    m: '.5em 0'
                }}
            >
                Открыть все отзывы
            </Button>
        </Box>
    );
}

const ReviewElement = ({ src }) => {
    return (
        <Box
            sx={{
                minWidth: '17em',
                maxWidth: '17em',
            }}
        >
            <img style={{ width: '100%' }} src={src} />
        </Box>
    );
}

const AddOnsContainer = () => {
    let tg = window.Telegram.WebApp;
    const { product } = useProductPage();

    return (
        <Box
            sx={{
                p: '.3em .8em 1em 1em',
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                gap: '1em',
                flexDirection: 'column',
            }}
        >
            <Box
                onClick={() => { tg.openLink(product?.shareInfo?.shareLinkUrl) }}
                sx={{
                    cursor: 'pointer',
                    p: '1em 0',
                    display: 'flex',
                    gap: '.5em',
                    alignItems: 'end', borderBottom: '1px solid #ffffff30',
                    pb: '.5em',
                }}
            >
                <OpenInNewIcon
                    sx={{
                        color: '#F34213',
                        fontSize: '1.2em'
                    }}
                />
                <Typography variant="caption">Открыть этот товар в Poizon</Typography>
            </Box>

            <Box
                onClick={() => {

                }}
                sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ffffff30',
                    pb: '.5em',
                    display: 'flex',
                    gap: '.5em',
                    alignItems: 'center',
                }}
            >
                <SendIcon
                    sx={{
                        color: '#F34213',
                        fontSize: '1.2em'
                    }}
                />
                <Typography variant="caption">Отправить заказ в чат оператору</Typography>
            </Box>
        </Box>
    );
}

export default ProductPage;