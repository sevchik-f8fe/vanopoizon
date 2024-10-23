import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { nanoid } from "nanoid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import { showShineMainBtn } from "../../utils/utilFuncs";
import { useBottomBoard } from "../../components/BottomBoard/store";
import { useCart } from "./store";

const CartPage = () => {
    const { setCurrentPage, setVisible } = useBottomBoard();
    const { products } = useCart();
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        setVisible(false);
        // tg.MainButton.show();
        showShineMainBtn(12000);
        setCurrentPage('cart');
    }, [])

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
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        pb: '.5em',
                        fontWeight: '900'
                    }}
                >Корзина</Typography>

            </Box>

            <Box
                sx={{
                    border: '1px solid #fff5',
                    p: '.5em',
                    mx: '.5em',
                    borderRadius: '1em'
                }}
            >
                <Box
                    onClick={() => navigate('/deliveryData')}
                    sx={{
                        minWidth: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1em',
                        cursor: 'pointer',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '.9em',
                            color: '#fff',
                            fontWeight: '500'
                        }}
                    >Пункт CDEK: шашлычка</Typography>

                    <ArrowOutwardIcon sx={{ color: '#F34213', fontSize: '1.2em' }} />
                </Box>
            </Box>

            {products.length <= 0 ? (
                <>
                    <Box
                        sx={{
                            p: '.5em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '20vh'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#fff6',
                                fontSize: '.9em',
                                fontWeight: '500'
                            }}
                        >В вашей корзине пусто ;(</Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.5em',
                            p: '.5em',
                            // backgroundColor: '#2E2E3A',
                            borderRadius: '1em 1em 0 0',
                        }}
                    >
                        {products.map((product) => <CartElement key={nanoid()} id={product.id} picture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRljwOll9YYO3ZIeoRk-aDUZb7wwu8iHAbo1g&s' price={product.price} title={product.title} link='/product' size={product.size} count={product.count} />)}
                    </Box>

                    <SplitBlock price={12000} />
                </>
            )
            }
        </Box >
    );
}

const CartElement = ({ picture, price, size, title, link, id, count }) => {
    const { removeElementFromCart, incProductCount, decProductCount } = useCart()

    return (
        <Box
            sx={{
                py: '.2em'
            }}
        >
            <Link to={link}>
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
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '1em',
                                fontWeight: '500'
                            }}
                        >{title}</Typography>
                        <Typography
                            sx={{
                                color: '#fff6',
                                fontSize: '.9em',
                                fontWeight: '500'
                            }}
                        >{price} &#8381;</Typography>
                        <Typography
                            sx={{
                                color: '#fff6',
                                fontSize: '.9em',
                                fontWeight: '500'
                            }}
                        >размер {size} (EU)</Typography>
                    </Box>
                </Box>
            </Link>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'center',
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
                        size="small"
                    >
                        <FavoriteBorderIcon
                            sx={{
                                fontSize: '1.2em',
                                color: '#F34213'
                            }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => removeElementFromCart(id)}
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
                        onClick={() => decProductCount(id)}
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
                        <Typography
                            sx={{
                                color: '#fffffE',
                                fontSize: '.9em',
                                fontWeight: '500',

                            }}
                        >{count}</Typography>
                    </Box>
                    <CustomButton
                        isDisabled={false}
                        onClick={() => incProductCount(id)}
                    >
                        +
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
}

const FastDeliveryBlock = () => {

}

const InsuranceBlock = () => {

}

const SplitBlock = ({ price }) => {
    const { useSplit, toggleUseSplit } = useCart();

    return (
        <Box
            sx={{
                p: '.5em',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                gap: '.5em',

            }}
        >
            <Box
                onClick={toggleUseSplit}
                sx={{
                    width: '50%',
                    cursor: 'pointer',
                    p: '.5em',
                    borderRadius: '1em',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    ...(useSplit && {
                        border: '1px solid #fff3',
                    }),
                    ...(!useSplit && {
                        border: '1px solid #fff',
                    }),
                }}
            >
                <CheckCircleIcon sx={{
                    position: 'absolute',
                    trabsition: '.1s ease',
                    right: '.5em',
                    top: '.5em',
                    borderRadius: '50%',
                    ...(useSplit && {
                        color: 'transparent',
                        border: '1px solid #fff3'
                    }),
                    ...(!useSplit && {
                        color: '#fff',
                    }),
                }} />

                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.2em',
                        fontWeight: '700',
                    }}
                >Не в сплит</Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '.9em',
                        fontWeight: '700',
                    }}
                >{price} &#8381;</Typography>
                <Typography
                    sx={{
                        color: '#fff6',
                        fontSize: '.75em',
                        fontWeight: '500',
                    }}
                >Вы оплатите сразу всю стоимость товаров</Typography>
            </Box>

            <Box
                onClick={toggleUseSplit}
                sx={{
                    width: '50%',
                    cursor: 'pointer',
                    p: '.5em',
                    borderRadius: '1em',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    ...(!useSplit && {
                        border: '1px solid #fff3',
                    }),
                    ...(useSplit && {
                        border: '1px solid #fff',
                    }),
                }}
            >
                <CheckCircleIcon sx={{
                    position: 'absolute',
                    trabsition: '.1s ease',
                    right: '.5em',
                    top: '.5em',
                    borderRadius: '50%',
                    ...(!useSplit && {
                        color: 'transparent',
                        border: '1px solid #fff3'
                    }),
                    ...(useSplit && {
                        color: '#fff',
                    }),
                }} />

                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.2em',
                        fontWeight: '700',
                    }}
                >В сплит</Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '.9em',
                        fontWeight: '700',
                    }}
                >Сейчас: {price / 2} &#8381;</Typography>
                <Typography
                    sx={{
                        color: '#fff6',
                        fontSize: '.75em',
                        fontWeight: '500',
                    }}
                >Вы оплатите сразу только половину стоимости товаров</Typography>
            </Box>
        </Box>
    );
}

const TotalPriceBlock = () => {

}

const CustomButton = ({ children, onClick, isDisabled }) => {
    return (
        <>
            <button
                disabled={isDisabled}
                onClick={onClick}
                style={(isDisabled) ? (
                    {
                        cursor: 'pointer',
                        border: '0',
                        borderRadius: '.5em',
                        backgroundColor: '#F3421310',
                        minWidth: '2em',
                        minHeight: '2em',
                        textAlign: 'center',
                        color: '#F3421350',
                        fontSize: '.9em',
                        fontWeight: '500',
                    }
                ) : (
                    {
                        cursor: 'pointer',
                        border: '0',
                        borderRadius: '.5em',
                        backgroundColor: '#F3421320',
                        minWidth: '2em',
                        minHeight: '2em',
                        textAlign: 'center',
                        color: '#F34213',
                        fontSize: '.9em',
                        fontWeight: '500',
                    }
                )}
            >
                {children}
            </button >
        </>
    );
}

export default CartPage;