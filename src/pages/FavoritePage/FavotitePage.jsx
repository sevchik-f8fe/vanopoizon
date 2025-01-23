import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { nanoid } from "nanoid";

import { useFavorites } from "./store";

const FavoritePage = () => {
    const { products } = useFavorites();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

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
                <Box
                    sx={{
                        p: '.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '20vh'
                    }}
                >
                    <Typography variant="caption" sx={{ color: '#fff5' }}>У вас нет избранных товаров ;(</Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '.5em',
                        p: '.5em',
                        borderRadius: '1em 1em 0 0',
                    }}
                >
                    {products.map((product) => <FavoriteElement key={nanoid()} id={product.id} picture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRljwOll9YYO3ZIeoRk-aDUZb7wwu8iHAbo1g&s' price={product.price} title={product.title} link='/product' size={product.size} />)}
                </Box>
            )
            }
        </Box >
    );
}

const FavoriteElement = ({ picture, price, title, link, id }) => {
    const { removeElementFromFavorites } = useFavorites();

    return (
        <Box
            sx={{
                position: 'relative',
                minWidth: 'calc(50% - .25em)',
                maxWidth: 'calc(50%)',
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <IconButton
                size="small"
                onClick={() => { removeElementFromFavorites(id) }}
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

            <Link to={link}
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
                    <Typography variant="h4">{price} &#8381;</Typography>
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
                // onClick={()=>}
                >В корзину</CustomButton>
            </Box>
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