import { Box, Typography, IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

const CatalogElement = ({ picture, price, title, spuId }) => {
    const navigate = useNavigate();

    return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
                sx={{
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
                    <FavoriteBorderIcon sx={{ color: '#F34213' }} />
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
                            <Typography
                                sx={{
                                    color: '#fff',
                                    fontSize: '1.2em',
                                    fontWeight: '700'
                                }}
                            >{price} &#8381;</Typography>
                        )}
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '.8em',
                            }}
                        >{title}</Typography>
                    </Box>
                </Box>

                <CustomButton
                    isDisabled={false}
                // onClick={()=>}
                >В корзину</CustomButton>
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