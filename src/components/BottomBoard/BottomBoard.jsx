import { Box, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBottomBoard } from "./store";
import { useNavigate } from "react-router-dom";

const BottomBoard = () => {
    const { setCurrentPage, currentPage, isVisible } = useBottomBoard();
    const navigate = useNavigate();

    return (
        <>
            {isVisible ? (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1em',
                        p: '.2em .5em .5em .5em',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#202029',
                        minWidth: '100%',
                        zIndex: 100,
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigate('/');
                        }}
                        size="small"
                        disabled={currentPage == 'home'}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:active': {
                                backgroundColor: '#fff4',
                            },
                        }}
                    >
                        <HomeIcon
                            sx={
                                (currentPage == 'home') ? (
                                    {
                                        fontSize: '1.3em',
                                        color: '#F34213',
                                    }
                                ) : (
                                    {
                                        fontSize: '1.3em',
                                        color: '#fff5',
                                    }
                                )
                            }
                        />
                    </IconButton>
                    <IconButton
                        disabled={currentPage == 'cart'}
                        onClick={() => {
                            setCurrentPage('cart');
                            navigate('/cart');
                        }}
                        size="small"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:active': {
                                backgroundColor: '#fff4',
                            },
                        }}
                    >
                        <ShoppingCartIcon
                            sx={
                                (currentPage == 'cart') ? (
                                    {
                                        fontSize: '1.3em',
                                        color: '#F34213',
                                    }
                                ) : (
                                    {
                                        fontSize: '1.3em',
                                        color: '#fff5',
                                    }
                                )
                            }
                        />
                    </IconButton>
                    <IconButton
                        disabled={currentPage == 'profile'}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:active': {
                                backgroundColor: '#fff4',
                            },
                        }}
                        onClick={() => {
                            navigate('/profile');
                        }}
                        size="small"
                    >
                        <PersonIcon
                            sx={
                                (currentPage == 'profile') ? (
                                    {
                                        fontSize: '1.3em',
                                        color: '#F34213',
                                    }
                                ) : (
                                    {
                                        fontSize: '1.3em',
                                        color: '#fff5',
                                    }
                                )
                            }
                        />
                    </IconButton>
                </Box>

            ) : (
                null
            )}
        </>
    );
}

export default BottomBoard;