import { Box, Typography, IconButton } from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";

const CatalogElement = ({ picture, price, title, link }) => {
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
                <FavoriteBorderIcon sx={{ color: '#F34213' }} />
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
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1.2em',
                            fontWeight: '700'
                        }}
                    >{price} &#8381;</Typography>
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.8em',
                        }}
                    >{title}</Typography>
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

export default CatalogElement;