import { Box, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBottomBoard } from "./store";
import { useNavigate } from "react-router-dom";

const BottomBoard = () => {
    const { setCurrentPage, currentPage } = useBottomBoard();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1em',
                p: '.5em',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
                backgroundColor: '#2E2E3A',
                borderRadius: '1em 1em 0 0',
                minWidth: '100%',
                zIndex: 100,
            }}
        >
            <IconButton
                onClick={() => {
                    navigate('/');
                }}
                size="small"
                sx={{
                    '&:hover': {
                        backgroundColor: '#fff1',
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
                                fontSize: '1.5em',
                                color: '#F34213',
                            }
                        ) : (
                            {
                                fontSize: '1.5em',
                                color: '#fff5',
                            }
                        )
                    }
                />
            </IconButton>
            <IconButton
                onClick={() => {
                    setCurrentPage('cart');
                    navigate('/cart');
                }}
                size="small"
                sx={{
                    '&:hover': {
                        backgroundColor: '#fff1',
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
                                fontSize: '1.5em',
                                color: '#F34213',
                            }
                        ) : (
                            {
                                fontSize: '1.5em',
                                color: '#fff5',
                            }
                        )
                    }
                />
            </IconButton>
            <IconButton
                sx={{
                    '&:hover': {
                        backgroundColor: '#fff1',
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
                                fontSize: '1.5em',
                                color: '#F34213',
                            }
                        ) : (
                            {
                                fontSize: '1.5em',
                                color: '#fff5',
                            }
                        )
                    }
                />
            </IconButton>
        </Box>
    );
}

export default BottomBoard;