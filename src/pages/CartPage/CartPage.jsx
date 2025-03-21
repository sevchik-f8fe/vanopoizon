import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { nanoid } from "nanoid";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

import { showShineMainBtn, sliceChn, toNormalPrice, toRub } from "../../utils/utilFuncs";
import { useCart } from "./store";
import { useUserData } from "../../utils/store";
import { useFavorites } from "../FavoritePage/store";

const CartPage = () => {
    const { spuIds, isLoading, deliveryDataIsFilled, setDeliveryDataIsFilled, cart, setIsLoading, setCart } = useCart();
    const { user } = useUserData();

    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        const getData = async () => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getCartBySpuIds',
                { spuIds },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    console.log(res.data.cart[0].product)
                    setCart(res.data.cart);
                })
                .catch(err => console.log(`err: ${err}`))
                .finally(() => setIsLoading(false));
        }

        setDeliveryDataIsFilled((user?.delivery?.fullName?.length > 0 && user?.delivery?.phone?.length > 0 && user?.delivery?.deliveryType?.length > 0) && ((user?.delivery?.pvz?.fullAddress?.length > 0 && user?.delivery?.city?.name?.length > 0) || (user?.delivery?.fullAddress?.length > 0)))
        tg.BackButton.show();

        setIsLoading(true)
        getData();
    }, [])

    useEffect(() => {
        if ((user?.delivery?.fullName?.length > 0 && user?.delivery?.phone?.length > 0 && user?.delivery?.deliveryType?.length > 0) && ((user?.delivery?.pvz?.fullAddress?.length > 0 && user?.delivery?.city?.name?.length > 0) || (user?.delivery?.fullAddress?.length > 0)) && spuIds.length > 0) {
            showShineMainBtn(12000);
        }
    }, [spuIds])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <Box
                sx={{
                    p: '.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">Корзина</Typography>
            </Box>

            <Box
                sx={{
                    p: '.5em',
                    mx: '.5em',
                    borderRadius: '1em',
                    ...(deliveryDataIsFilled && {
                        border: '1px solid #fff5',
                    }),
                    ...(!deliveryDataIsFilled && {
                        border: '1px solid #DC4F51',
                    })
                }}
            >
                <Box
                    onClick={() => navigate('/deliveryData')}
                    sx={{
                        minWidth: '100%',
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        gap: '1em',
                        cursor: 'pointer',
                    }}
                >
                    <Box>
                        {deliveryDataIsFilled ? (
                            <>
                                <Typography variant="body1" sx={{ mb: '.2em' }}>
                                    Доставка {user?.delivery?.deliveryType == 'pickup' ? 'в пункт выдачи' : 'курьером'}</Typography>
                                <Typography variant="subtitle2">
                                    {user?.delivery?.deliveryType == 'pickup' ? user?.delivery?.pvz?.fullAddress : user?.delivery?.fullAddress}</Typography>
                            </>
                        ) : (
                            <Typography variant="caption" sx={{ color: '#DC4F51' }}>
                                Заполните информацию о доставке</Typography>
                        )}
                    </Box>
                    <ArrowOutwardIcon
                        sx={{
                            fontSize: '1.2em',
                            ...(deliveryDataIsFilled && {
                                color: '#F34213',
                            }),
                            ...(!deliveryDataIsFilled && {
                                color: '#DC4F51',
                            })
                        }} />
                </Box>
            </Box>

            {cart.length <= 0 ? (
                (isLoading) ? (<>Загрузка</>) : (
                    <Box
                        sx={{
                            p: '.5em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '10vh'
                        }}
                    >
                        <Typography variant="caption" sx={{ color: '#fff5' }}>В вашей корзине пусто ;(</Typography>
                    </Box>
                )
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.5em',
                            p: '1em .5em',
                        }}
                    >
                        {cart.map((elem) => <CartElement key={nanoid()} title={sliceChn(elem?.product?.detail?.title)} price={elem?.product?.detail?.authPrice} picture={elem?.product?.image?.spuImage?.images[0]?.url} spuId={elem?.info?.spuId} count={elem?.info?.count} size={elem?.info?.size} color={elem?.info?.color} />)}
                    </Box>
                    <UsePointsBlock />
                    <InsuranceBlock />
                    <TotalPriceBlock />
                </>
            )
            }
        </Box >
    );
}

const CartElement = ({ color, size, spuId, count, picture, price, title }) => {
    const { removeFromCart, setProductCount } = useCart()
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const { user } = useUserData();

    const handleFavoriteClick = () => {
        if (favorites.some(item => item.spuId === spuId)) {
            removeFromFavorites(spuId, user._id);
        } else {
            addToFavorites({ spuId, photoUrl: picture, title }, user._id);
        }
    }

    return (
        <Box
            sx={{
                p: '.5em',
                borderRadius: '.5em',
                border: '1px solid #fff3'
            }}
        >
            <Link to={'/product'} state={{ spu: spuId }}>
                <Box
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '.5em',
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minWidth: 'calc(40% - .5em)',
                            borderRadius: '.5em',
                            minHeight: '5em',
                        }}
                    ></Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.2em',
                            p: '.2em 0'
                        }}
                    >
                        <Typography variant="h5">{title}, {spuId}</Typography>
                        <Typography variant="subtitle1">{toRub(price)} &#8381;</Typography>
                        {size && <Typography variant="subtitle1">размер {size} (EU)</Typography>}
                        {color && <Typography variant="subtitle1">{color}</Typography>}
                    </Box>
                </Box>
            </Link>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'end',
                    p: '.5em 0',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={() => handleFavoriteClick()}
                        size="small"
                    >
                        {favorites.some(item => item.spuId === spuId) ? (
                            <FavoriteIcon
                                sx={{
                                    fontSize: '1.2em',
                                    color: '#F34213'
                                }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{
                                    fontSize: '1.2em',
                                    color: '#F34213'
                                }}
                            />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            removeFromCart(spuId, size, color, user._id)
                        }}
                        size="small"
                    >
                        <DeleteIcon
                            sx={{
                                fontSize: '1.2em',
                                color: '#fff5'
                            }}
                        />
                    </IconButton>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'center',
                    }}
                >
                    <CustomButton
                        isDisabled={count <= 1}
                        onClick={() => {
                            setProductCount({ color, size, count, spuId }, count - 1, user._id)
                        }}
                    >
                        -
                    </CustomButton>
                    <Box
                        sx={{
                            borderRadius: '.5em',
                            backgroundColor: '#fffffe10',
                            minWidth: '2.2em',
                            minHeight: '2.2em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body1">{count}</Typography>
                    </Box>
                    <CustomButton
                        isDisabled={false}
                        onClick={() => {
                            setProductCount({ color, size, count, spuId }, count + 1, user._id)
                        }}
                    >
                        +
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
}

const InsuranceBlock = () => {
    const { useInsurance, toggleUseInsurance } = useCart();

    return (
        <Box
            onClick={toggleUseInsurance}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                cursor: 'pointer',
                p: '.5em',
                mx: '.5em',
                borderRadius: '1em',
                transition: '.1s ease',
                ...(!useInsurance && {
                    border: '1px solid #fff5',
                }),
                ...(useInsurance && {
                    border: '1px solid #fff',
                }),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em',
                    alignItems: 'center'
                }}
            >

                <HealthAndSafetyIcon
                    sx={{
                        transition: '.1s ease',
                        ...(!useInsurance && {
                            color: '#fff5',
                        }),
                        ...(useInsurance && {
                            color: '#fff',
                        }),
                    }}
                />

                <Typography
                    variant="caption"
                    sx={{
                        transition: '.1s ease',
                        ...(!useInsurance && {
                            color: '#fff5',
                        }),
                        ...(useInsurance && {
                            color: '#fff',
                        }),
                    }}
                >Страховка</Typography>
            </Box>

            <Typography
                variant="subtitle2"
                sx={{
                    transition: '.1s ease',
                    ...(!useInsurance && {
                        color: '#fff5',
                    }),
                    ...(useInsurance && {
                        color: '#fff',
                    }),
                }}
            >
                При получении не оригинала или потере при доставке, мы возместим всю стоимость товара в тройном размере.</Typography>
        </Box>
    );
}

const UsePointsBlock = () => {
    const { toggleUsePoints, usePoints } = useCart();

    return (
        <Box
            sx={{
                p: '.5em', mx: '.5em',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
                border: '1px solid #F34213',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.5em'
                }}
            >
                <LoyaltyIcon
                    sx={{
                        color: '#F34213',
                    }}
                />

                <Typography variant="caption" sx={{ color: '#F34213' }}>Баллы PoizonShop</Typography>
            </Box>

            <Box
                sx={{
                    p: '2px',
                    mt: '.5em',
                    backgroundColor: '#202029',
                    borderRadius: '.5em',
                    display: 'flex',
                    // justifyContent: 'space-between',
                    maxWidth: 'fit-content',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <Box
                    onClick={() => {
                        if (usePoints) toggleUsePoints();
                    }}
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
                        variant="caption"
                        sx={{
                            transition: '.3s ease',
                            ...(!usePoints && {
                                color: '#fff',
                            }),
                            ...(usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Начислить <span style={!usePoints ? { color: '#F34213' } : { color: '#Fff5' }} > 50</span></Typography>
                </Box>

                <Box
                    onClick={() => {
                        if (!usePoints) toggleUsePoints();
                    }}
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
                        variant="caption"
                        sx={{
                            transition: '.3s ease',
                            ...(usePoints && {
                                color: '#fff',
                            }),
                            ...(!usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Списать <span style={usePoints ? { color: '#F34213' } : { color: '#Fff5' }}>0</span></Typography>
                </Box>
            </Box>
        </Box >
    );
}

const TotalPriceBlock = () => {
    const { usePoints, useInsurance, useExpressDelivery } = useCart();

    return (
        <Box
            sx={{
                p: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <TotalPriceElement label='Стоимость товаров' price='12 000' isTotal={false} />
            {useExpressDelivery && <TotalPriceElement label='Express доставка' price='12 000' isTotal={false} />}
            {useInsurance && <TotalPriceElement label='Страховка' price='12 000' isTotal={false} />}
            {usePoints && <TotalPriceElement label='Скидка' price='12 000' isTotal={false} />}
            <TotalPriceElement label='Итого' price='12 000' isTotal={true} />
        </Box>
    );
}

const TotalPriceElement = ({ label, price, isTotal }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #fff3',
                pb: '.2em'
            }}
        >
            <Typography variant="subtitle2">{label}</Typography>
            <Typography
                variant="body1"
                sx={{
                    ...(isTotal && {
                        fontSize: '1.2em',
                    }),
                    ...(!isTotal && {
                        fontSize: '.9em',
                    }),
                }}
            >{price} &#8381;</Typography>
        </Box>
    );
}

const CustomButton = ({ children, onClick, isDisabled }) => {
    return (
        <>
            <button
                disabled={isDisabled}
                onClick={onClick}
                style={{
                    cursor: 'pointer',
                    border: '0',
                    borderRadius: '.5em',
                    minWidth: '2em',
                    minHeight: '2em',
                    textAlign: 'center',
                    fontSize: '.9em',
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

export default CartPage;