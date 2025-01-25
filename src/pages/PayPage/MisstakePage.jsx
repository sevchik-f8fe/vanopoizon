import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";

const MisstakePage = () => {
    const navigate = useNavigate();

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
                backgroundColor: '#DC4F5105'
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
                <ErrorOutlineIcon
                    sx={{
                        color: '#DC4F51',
                        fontSize: '4em'
                    }}
                />
                <Typography variant="body1">Произошел сбой в системе, платеж не завершен. Попробуйте снова или обратитесь в поддержку.</Typography>
            </Box>

            <Button
                onClick={() => navigate('/')}
            >На главную</Button>
        </Box>
    );
}

export default MisstakePage;