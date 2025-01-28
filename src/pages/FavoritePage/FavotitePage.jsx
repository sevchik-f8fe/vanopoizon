import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { nanoid } from "nanoid";
import axios from "axios";
import Grid from '@mui/material/Grid2';

import { useFavorites } from "./store";
import { useUserData } from "../../utils/store";
import { useCart } from "../CartPage/store";

const FavoritePage = () => {
    const { favorites, setFavorites } = useFavorites();
    const { user } = useUserData()
    let tg = window.Telegram.WebApp;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                pb: '2em',
                pt: '2em'
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
                <Typography variant="h6" sx={{ pb: '.5em' }}
                >Избранные</Typography>
            </Box>

            {products.length <= 0 ? (
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
                        <Typography variant="caption" sx={{ color: '#fff5' }}>У вас нет избранных товаров ;(</Typography>
                    </Box>
                )
            ) : (
                <Box
                    sx={{
                        minWidth: '100%',
                        flexGrow: 1,
                        p: '0 .5em'
                    }}
                >
                    <Grid sx={{ minWidth: '100%' }} container spacing={1}>
                        {products.map((product) => <FavoriteElement key={nanoid()} spuId={product.spuId} picture={product.photoUrl} title={product.title} />)}
                    </Grid>
                </Box>
            )
            }
        </Box >
    );
}

const FavoriteElement = ({ picture, title, spuId }) => {
    const { removeFromFavorites } = useFavorites();
    const { spuIds, addToCart, removeFromCart } = useCart();
    const { user } = useUserData();

    return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
                sx={{
                    minHeight: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '1em',
                    backgroundColor: '#2E2E3A',
                }}
            >
                <IconButton
                    size="small"
                    onClick={() => {
                        removeFromFavorites(spuId, user._id);
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#fff',
                        },
                        '&:active': {
                            backgroundColor: '#fff9',
                        },
                        top: '0',
                        right: '0',
                        position: 'absolute',
                    }}
                >
                    <FavoriteIcon sx={{ color: '#F34213' }} />
                </IconButton>

                <Link to={'/product'}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minWidth: '100%',
                            borderRadius: '1em',
                            minHeight: '7em',
                        }}
                    >
                    </Box>

                    <Box
                        sx={{
                            p: '.5em',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'senter',
                            alignItems: 'start'
                        }}
                    >
                        <Typography variant="body1">{title}</Typography>
                    </Box>
                </Link>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <CustomButton
                        isDisabled={false}
                    >{spuIds.some(item => item.spuId === spuId) ? 'Удалить' : 'В корзину'}</CustomButton>
                </Box>
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

export default FavoritePage;