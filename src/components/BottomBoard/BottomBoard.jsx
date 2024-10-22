import { Box, IconButton, Typography } from "@mui/material";
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
                        p: '.5em .5em 0 .5em',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#202029',
                        minWidth: '100%',
                        zIndex: 100,
                        WebkitTransform: 'translate(0)',
                        transform: 'translate(0)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            gap: '1em',
                            mb: '.5em'
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
                    <Typography
                        sx={{
                            color: 'transparent',
                            lineHeight: '.5',
                            fontSize: '1em'
                        }}
                    >a</Typography>
                </Box>

            ) : (
                null
            )}
        </>
    );
}

export default BottomBoard;