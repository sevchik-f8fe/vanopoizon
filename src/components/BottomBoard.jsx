import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';

const BottomBoard = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
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
                        gap: '1em',
                        alignItems: 'center',
                        p: '.5em',
                        borderRadius: '1em'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#F34213',
                            fontSize: '1.2em',
                            fontWeight: '900'
                        }}
                    >Профиль</Typography>

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
                        gap: '1em',
                        alignItems: 'center',
                        p: '.5em',
                        borderRadius: '1em'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#F34213',
                            fontSize: '1.2em',
                            fontWeight: '900'
                        }}
                    >Новости</Typography>

                    <ArticleIcon
                        sx={{
                            fontSize: '1.5em',
                            color: '#F34213',
                        }}
                    />
                </Box>
            </Box>

            <Box
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
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.2em',
                        fontWeight: '900'
                    }}
                >Корзина</Typography>

                <Box
                    sx={{
                        minWidth: '4em',
                        maxWidth: '4em',
                        minHeight: '4em',
                        maxHeight: '4em',
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
        </Box>
    );
}

export default BottomBoard;