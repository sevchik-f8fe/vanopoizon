import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessPage = () => {
    const navigate = useNavigate();
    // getFavorites, addToFavorites, removeFromFavorites | userId, spuId, photoUrl, title
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2em',
                p: '3em 2em',
                backgroundColor: '#48d54b05'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5em'
                }}
            >
                <CheckCircleOutlineIcon
                    sx={{
                        color: '#48d54b',
                        fontSize: '4em'
                    }}
                />
                <Typography variant='body1'>Платеж успешно завершен. Спасибо за покупку!</Typography>
            </Box>

            <Button
                onClick={() => navigate('/')}
            >На главную</Button>
        </Box>
    );
}

export default SuccessPage;