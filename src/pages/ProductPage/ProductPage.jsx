import { Box, Typography, IconButton, Skeleton, Button, Link, Switch, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import { useProductPage } from "./store";
import { showShineMainBtn } from "../../utils/utilFuncs";
import { useLocation } from "react-router-dom";
import { toRub } from "../../utils/utilFuncs";
import { sliceChn, toNormalPrice, imagesForCurrentColor } from "../../utils/utilFuncs";
import { useTheme, useMediaQuery } from "@mui/material";

const ProductPage = () => {
    const { setAccordion, setVariations, storeSpuId, setStoreSpuId, accordion, isSplit, useInsurance, setUseInsurance, setProduct, setPrices, product, currentProduct, setCurrentProductField } = useProductPage();
    let tg = window.Telegram.WebApp;
    const location = useLocation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const loadProductData = async () => {
            const calcPrice = (productData, pricesData) => {
                return (sizeId = currentProduct?.size) => {
                    return (colorId = currentProduct?.color) => {
                        const originProps = (arr, needValue) => {
                            const found = arr.find(elem => elem.level === needValue);
                            return found ? found.propertyValueId : null;
                        };

                        if (!sizeId && !colorId) {
                            return productData?.price?.item?.price || 'Нет в наличии';
                        } else if (!sizeId) {
                            console.log(productData?.saleProperties?.list)
                            const skusForCurrentColor = productData?.skus
                                .filter(elem => originProps(elem.properties, 1) == colorId)
                                .map(elem => ({ skuId: elem?.skuId, colorId: originProps(elem.properties, 1) }));

                            const currentPrices = skusForCurrentColor && skusForCurrentColor
                                .map(sku => {
                                    const skuId = sku?.skuId?.toString();
                                    const price = pricesData?.skus[skuId]?.prices;
                                    return price;
                                });

                            const rightCurrentPrice = currentPrices[0] && currentPrices[0]
                                .filter((elem) => elem?.tradeType != 95)
                                .map((elem) => elem?.price)[0]

                            return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
                        } else if (!colorId) {
                            const skusForCurrentSize = productData && productData?.skus
                                .filter(elem => originProps(elem.properties, 1) == sizeId)
                                .map(elem => ({ skuId: elem.skuId, sizeId: originProps(elem.properties, 1) }));

                            console.log(productData?.skus);

                            const currentPrices = skusForCurrentSize && skusForCurrentSize
                                .map(sku => {
                                    const skuId = sku.skuId.toString();
                                    const price = pricesData?.skus[skuId]?.prices;
                                    return price;
                                });

                            const rightCurrentPrice = currentPrices[0] && currentPrices[0]
                                .filter((elem) => elem?.tradeType != 95)
                                .map((elem) => elem?.price)[0]

                            return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
                        } else {
                            const skusForCurrentColor = productData?.skus
                                .filter(elem => originProps(elem.properties, 1) == colorId && originProps(elem.properties, 2) == sizeId)
                                .map(elem => ({ skuId: elem.skuId, colorId: originProps(elem.properties, 1), sizeId: originProps(elem.properties, 2) }));

                            const currentPrices = skusForCurrentColor && skusForCurrentColor
                                .map(sku => {
                                    const skuId = sku.skuId.toString();
                                    const price = pricesData?.skus[skuId]?.prices;
                                    return price;
                                });

                            const rightCurrentPrice = currentPrices && currentPrices[0] && currentPrices[0]
                                .filter((elem) => elem?.tradeType != 95)
                                .map((elem) => elem?.price)[0]

                            return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
                        }
                    }
                }
            }

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

                    setCurrentProductField('price', calcPrice(response?.data?.product, response?.data?.price)(sizes?.propertyValueId)(colors?.propertyValueId));
                })
                .catch(error => console.error('Ошибка: ', error));
        };

        tg.BackButton.show();
        showShineMainBtn(currentProduct?.price);

        if (storeSpuId != location.state.spu) {
            setPrices(null)
            setProduct(null);

            loadProductData();
        }
    }, []);

    return (
        <Box>
            {isSmallScreen ? (
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
                                    shareURL('https://core.telegram.org', 'Оййй бляяя');
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
                                        sx={{
                                            color: '#ffffff',
                                            fontSize: '1.8em',
                                            transition: '.3s ease',
                                            fontWeight: '900',
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

                                    <Typography
                                        sx={{
                                            fontSize: '.75em',
                                            fontWeight: '500',
                                            color: '#ffffff50',
                                        }}
                                    >
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
                                    <Typography
                                        sx={{
                                            color: '#fff',
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
                                            <Typography
                                                sx={{
                                                    color: '#fff',
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
                                        sx={{
                                            pl: '1em',
                                            color: '#fff',
                                            fontWeight: '500',
                                            fontSize: '.9em'
                                        }}
                                    >
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

                                    <Typography
                                        sx={{
                                            color: '#fff',
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
                            px: '2em',
                            pt: '1em'
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: '50%',
                                position: 'sticky',
                                top: '1em'
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
                                            shareURL('https://core.telegram.org', 'Оййй бляяя');
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
                                                sx={{
                                                    color: '#ffffff',
                                                    fontSize: '1.8em',
                                                    transition: '.3s ease',
                                                    fontWeight: '900',
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

                                            <Typography
                                                sx={{
                                                    fontSize: '.75em',
                                                    fontWeight: '500',
                                                    color: '#ffffff50',
                                                }}
                                            >
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

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
                                                            color: '#fff',
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
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
                                                            color: '#fff',
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
                                                            <Typography
                                                                sx={{
                                                                    color: '#fff',
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
                                                        sx={{
                                                            pl: '1em',
                                                            color: '#fff',
                                                            fontWeight: '500',
                                                            fontSize: '.9em'
                                                        }}
                                                    >
                                                        Если пиздец <span style={{ paddingLeft: '1em' }}>+ 3 400 &#8381;</span>
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </List>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                    <ReviewContainer />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </>
            )}
        </Box >
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
                minWidth: 'calc(100%)',
                ...(size == 'large' && {
                    minHeight: '17em',
                    maxHeight: '17em',
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
    const { product, prices, currentProduct, isSizes, isColors } = useProductPage();

    const calcPrice = (sizeId = currentProduct?.size) => {
        return function (colorId = currentProduct?.color) {
            const originProps = (arr, needValue) => {
                const found = arr.find(elem => elem.level === needValue);
                return found ? found.propertyValueId : null;
            };

            if (!sizeId && !colorId) {
                return productData?.price?.item?.price || 'Нет в наличии';
            } else if (!sizeId) {
                const skusForCurrentColor = product?.skus
                    .filter(elem => originProps(elem.properties, 1) == colorId)
                    .map(elem => ({ skuId: elem?.skuId, colorId: originProps(elem.properties, 1) }));

                const currentPrices = skusForCurrentColor && skusForCurrentColor
                    .map(sku => {
                        const skuId = sku.skuId.toString();
                        const price = prices?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices && currentPrices[0]
                    .filter((elem) => elem?.tradeType != 95)
                    .map((elem) => elem?.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            } else if (!colorId) {
                const skusForCurrentSize = product?.skus
                    .filter(elem => originProps(elem.properties, 1) == sizeId)
                    .map(elem => ({ skuId: elem.skuId, sizeId: originProps(elem.properties, 1) }));

                const currentPrices = skusForCurrentSize && skusForCurrentSize
                    .map(sku => {
                        const skuId = sku.skuId.toString();
                        const price = prices?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices && currentPrices[0]
                    .filter((elem) => elem.tradeType != 95)
                    .map((elem) => elem.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            } else {
                const skusForCurrentColor = product?.skus
                    .filter(elem => originProps(elem.properties, 1) == colorId && originProps(elem.properties, 2) == sizeId)
                    .map(elem => ({ skuId: elem.skuId, colorId: originProps(elem.properties, 1), sizeId: originProps(elem.properties, 2) }));

                const currentPrices = skusForCurrentColor && skusForCurrentColor
                    .map(sku => {
                        const skuId = sku.skuId.toString();
                        const price = prices?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices[0] && currentPrices[0]
                    .filter((elem) => elem?.tradeType != 95)
                    .map((elem) => elem?.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            }
        }
    }

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
            {isColors && <ColorsContainer calcPrice={calcPrice} />}
            {isSizes && <SizesContainer calcPrice={calcPrice} />}
        </Box>
    ) : (<></>);
}

const SizesContainer = ({ calcPrice }) => {
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
                        color: '#fff',
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
                    flexWrap: 'wrap'
                }}
            >
                {findSizes()?.map((elem) => <SizesElement key={nanoid()} calcPrice={calcPrice} size={elem?.size} sizeId={elem?.sizeId} />)}
            </Box>
        </>
    );
};

const SizesElement = ({ size, sizeId, calcPrice }) => {
    const { currentProduct, setCurrentProductField } = useProductPage();

    return (
        <Box
            onClick={() => {
                setCurrentProductField('size', sizeId)
                setCurrentProductField('price', calcPrice(sizeId)());
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
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '.9em',
                    fontWeight: '500'
                }}
            >{size}</Typography>
        </Box>
    );
};

const ColorsContainer = ({ calcPrice }) => {
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
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Цвет</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '.5em',
                    pb: '.5em',
                }}
            >
                {findColors().map((elem) => <ColorElement key={nanoid()} calcPrice={calcPrice} color={elem?.color} colorId={elem?.colorId} />)}
            </Box>
        </>
    );
}

const ColorElement = ({ color, colorId, calcPrice }) => {
    const { product, currentProduct, setCurrentProductField } = useProductPage();

    return (
        <Box
            onClick={() => {
                setCurrentProductField('color', colorId);
                setCurrentProductField('images', imagesForCurrentColor(product?.image?.spuImage?.images, colorId))
                setCurrentProductField('price', calcPrice()(colorId));
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
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '.9em',
                    fontWeight: '500'
                }}
            >{color}</Typography>
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
                p: '.5em .8em',
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
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
                p: '.5em .8em',
                borderRadius: '.5em .5em 0 0',
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
                <Typography
                    sx={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: '.9em'
                    }}
                >Открыть этот товар в Poizon</Typography>
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
                <Typography
                    sx={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: '.9em'
                    }}
                >Отправить заказ в чат оператору</Typography>
            </Box>
        </Box>
    );
}

export default ProductPage;