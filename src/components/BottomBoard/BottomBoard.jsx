import { Box, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBottomBoard } from "./store";
import { useNavigate } from "react-router-dom";

const BottomBoard = () => {
    const { currentPage, isVisible } = useBottomBoard();
    const navigate = useNavigate();

    return (
        <>
            {isVisible ? (
                <Box
                    sx={{
                        p: '.2em .5em .5em .5em',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#202029',
                        minWidth: '100%',
                        zIndex: 100,
                        WebkitTransform: 'translate(0)',
                        transform: 'translate(0)',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '1em',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigate('/');
                        }}
                        size="small"
                        disabled={currentPage == 'home'}

                    >
                        <HomeIcon
                            sx={{
                                fontSize: '1.3em',
                                color: '#F34213',
                                ...(currentPage == 'home' && {
                                    color: '#F34213',
                                }),
                                ...(currentPage != 'home' && {
                                    color: '#fff5',
                                }),
                            }}
                        />
                    </IconButton>

                    <IconButton
                        disabled={currentPage == 'cart'}
                        onClick={() => {
                            navigate('/cart');
                        }}
                        size="small"

                    >
                        <ShoppingCartIcon
                            sx={{
                                fontSize: '1.3em',
                                ...(currentPage == 'cart' && {
                                    color: '#F34213',
                                }),
                                ...(currentPage != 'cart' && {
                                    color: '#fff5',
                                }),
                            }}
                        />
                    </IconButton>

                    <IconButton
                        disabled={currentPage == 'profile'}

                        onClick={() => {
                            navigate('/profile');
                        }}
                        size="small"
                    >
                        <PersonIcon
                            sx={{
                                fontSize: '1.3em',
                                ...(currentPage == 'profile' && {
                                    color: '#F34213',
                                }),
                                ...(currentPage != 'profile' && {
                                    color: '#fff5',
                                }),
                            }}
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