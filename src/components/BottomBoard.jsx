import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme, useMediaQuery } from "@mui/material";

const BottomBoard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
                minWidth: '100%',
            }}
        >
            <Box
                sx={{
                    minWidth: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                }}
            >
                <Box
                    onClick={() => navigate('/profile')}
                    sx={{
                        backgroundColor: '#fff',
                        minHeight: 'calc(50% - 0.25em)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '.5em',
                        alignItems: 'center',
                        p: '.5em',
                        borderRadius: '1em'
                    }}
                >
                    <Typography variant='h3' sx={{ color: '#F34213', fontSize: '1.2em' }}>Профиль</Typography>

                    <PersonIcon
                        sx={{
                            fontSize: '1.5em',
                            color: '#F34213',
                        }}
                    />
                </Box>

                <Box
                    onClick={() => navigate('/news')}
                    sx={{
                        backgroundColor: '#fff',
                        minHeight: 'calc(50% - 0.25em)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '.5em',
                        alignItems: 'center',
                        p: '.5em',
                        borderRadius: '1em'
                    }}
                >
                    <Typography variant='h3' sx={{ color: '#F34213', fontSize: '1.2em' }}>Новости</Typography>

                    <ArticleIcon
                        sx={{
                            fontSize: '1.5em',
                            color: '#F34213',
                        }}
                    />
                </Box>
            </Box>

            <Box
                onClick={() => navigate('/cart')}
                sx={{
                    cursor: 'pointer',
                    backgroundColor: '#F34213',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    minWidth: 'calc(50% - .5em)',
                    justifyContent: 'space-between',
                    p: '1em',
                    borderRadius: '1em',
                }}
            >
                <Typography variant={'h3'} sx={{ fontSize: '1.2em' }}>Корзина</Typography>

                <Box
                    sx={{
                        minWidth: '3em',
                        maxWidth: '3em',
                        minHeight: '3em',
                        maxHeight: '3em',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        backgroundColor: '#fff',

                    }}
                >
                    <ShoppingCartIcon
                        sx={{
                            fontSize: '1.5em',
                            color: '#F34213',
                        }}
                    />
                </Box>
            </Box>
        </Box >
    );
}

export default BottomBoard;