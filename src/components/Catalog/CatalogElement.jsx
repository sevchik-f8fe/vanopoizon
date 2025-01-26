import { Box, Typography, IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useFavorites } from "../../pages/FavoritePage/store";
import { useUserData } from "../../utils/store";
import { useCart } from "../../pages/CartPage/store";

const CatalogElement = ({ picture, price, title, spuId }) => {
    let tg = window?.Telegram?.WebApp;
    const navigate = useNavigate();

    const { products, addToFavorites, removeFromFavorites } = useFavorites();
    const { removeFromCart, addToCart, spuIds } = useCart()
    const { user } = useUserData();

    const fetchAddToFavorites = async () => {
        await axios.post('https://vanopoizonserver.ru/vanopoizon/addToFavorites',
            {
                tg: tg?.initData,
                userId: user?._id,
                title,
                photoUrl: picture,
                spuId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => console.log('OK add fav'))
            .catch(err => console.log(`err: ${err}`))
    }

    const fetchRemoveFromFavorites = async () => {
        await axios.post('https://vanopoizonserver.ru/vanopoizon/removeFromFavorites',
            {
                tg: tg?.initData,
                userId: user._id,
                spuId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => console.log('OK r fav'))
            .catch(err => console.log(`err: ${err}`))
    }

    const fetchAddToCart = async () => {
        await axios.post('https://vanopoizonserver.ru/vanopoizon/addToCart',
            {
                tg: tg?.initData,
                userId: user?._id,
                spuId,
                count: 1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => console.log('OK add cart'))
            .catch(err => console.log(`err: ${err}`))
    }

    const fetchRemoveFromCart = async () => {
        await axios.post('https://vanopoizonserver.ru/vanopoizon/removeFromCart',
            {
                tg: tg?.initData,
                userId: user._id,
                spuId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => console.log('OK r cart'))
            .catch(err => console.log(`err: ${err}`))
    }

    const handleFavoriteClick = () => {
        if (products.some(item => item.spuId === spuId)) {
            removeFromFavorites(spuId);

            fetchRemoveFromFavorites();
        } else {
            addToFavorites({ title, spuId, photoUrl: picture });

            fetchAddToFavorites();
        }
    }

    const handleCartClick = () => {
        if (spuIds.some(item => item.spuId === spuId)) {
            removeFromCart(spuId);

            fetchRemoveFromCart();
        } else {
            addToCart({ spuId, count: 1 });

            fetchAddToCart();
        }
    }

    return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
                sx={{
                    minHeight: '100%',
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
                    onClick={() => handleFavoriteClick()}
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
                    {products.some(item => item.spuId === spuId) ? (
                        <FavoriteIcon sx={{ color: '#F34213' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ color: '#F34213' }} />
                    )}
                </IconButton>

                <Box
                    onClick={() => {
                        navigate('/product', { state: { spu: spuId } })
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minWidth: '100%',
                            borderRadius: '1em',
                            minHeight: '10em',
                        }}
                    >
                    </Box>

                    <Box
                        sx={{
                            p: '.5em',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start'
                        }}
                    >
                        {price && (
                            <Typography variant="h4">{price} &#8381;</Typography>
                        )}
                        <Typography variant="body1">{title}</Typography>
                    </Box>
                </Box>

                <CustomButton
                    isDisabled={false}
                    onClick={() => handleCartClick()}
                >{spuIds.some(item => item.spuId === spuId) ? 'Удалить' : 'В корзину'}</CustomButton>
            </Box>
        </Grid>
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

export default CatalogElement;