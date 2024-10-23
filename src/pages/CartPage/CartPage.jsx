import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { nanoid } from "nanoid";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        borderBottom: '1px solid #fff5',
                        fontSize: '1.3em',
                        color: '#fff',
                        pb: '.5em',
                        fontWeight: '900'
                    }}
                >Корзина</Typography>

                <Box
                    onClick={() => navigate('/deliveryData')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1em',
                        pt: '.5em',
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

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    p: '.5em',
                    backgroundColor: '#2E2E3A',
                    borderRadius: '1em 1em 0 0',
                }}
            >
                {products.map((product) => <CartElement key={nanoid()} id={product.id} picture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRljwOll9YYO3ZIeoRk-aDUZb7wwu8iHAbo1g&s' price={product.price} title={product.title} link='/product' size={product.size} count={product.count} />)}
            </Box>
        </Box>
    );
}

const CartElement = ({ picture, price, size, title, link, id, count }) => {
    const { removeElementFromCart, incProductCount, decProductCount } = useCart()

    return (
        <Box
            sx={{
                // backgroundColor: '#202029'
                borderBottom: '1px solid #fff1',
                py: '.2em'
            }}
        >
            <Link to={link}>
                <Box
                    // onClick={navigate('/product')}
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
                                fontSize: '1.3em',
                                fontWeight: '700'
                            }}
                        >{price} &#8381;</Typography>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '.9em',
                                fontWeight: '500'
                            }}
                        >{title}</Typography>
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
                    <Button
                        onClick={() => decProductCount(id)}
                        variant="text"
                        size="small"
                        disabled={count <= 1}
                        sx={{
                            maxWidth: '3em',
                            minWidth: '3em',
                        }}
                    >-</Button>
                    <Box
                        sx={{
                            borderRadius: '.5em',
                            backgroundColor: '#333747',
                            p: '.3em .8em'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#709ed9',
                                fontSize: '.9em',
                                fontWeight: '500'

                            }}
                        >{count}</Typography>
                    </Box>
                    <Button
                        onClick={() => incProductCount(id)}
                        variant="text"
                        size="small"
                        sx={{
                            maxWidth: '3em',
                            minWidth: '3em',
                        }}
                    >+</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CartPage;