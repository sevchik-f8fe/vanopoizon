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
                        p: '.2em .5em',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#202029',
                        minWidth: '100%',
                        zIndex: 100,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '1em',
                        WebkitTransform: 'translateZ(0)'
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