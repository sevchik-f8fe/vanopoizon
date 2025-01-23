import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import { useEffect } from "react";

const PointsPage = () => {
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                p: '4em .5em',
                pb: '3.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <PointsContainer />
            <DescriptionContainer />
            <HistoryContainer />
        </Box >
    );
}

const PointsContainer = () => {
    return (
        <Box
            sx={{
                p: '1em',
                borderRadius: '1em',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '700',
                        fontSize: '4em',
                        color: '#F34213',
                        lineHeight: '.8'
                    }}
                >0</Typography>
                <Typography
                    sx={{
                        fontSize: '1.3em',
                        fontWeight: '700',
                        color: '#F34213',
                    }}
                >баллов</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#F34213',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    p: '1em',
                }}
            >
                <CurrencyRubleIcon
                    sx={{
                        color: "#fff",
                        fontSize: '3em'
                    }}
                />
            </Box>
        </Box>
    );
}

const DescriptionContainer = () => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                p: '1em',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <Typography variant="caption" sx={{ mb: '1em' }}>
                Дальше ты будешь получать
                <span style={{ color: '#F34213' }}> +50 баллов</span> за каждый завершенный заказ. Подробная информация в <Link
                    sx={{
                        color: '#709ed9',
                        textDecoration: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/profile')}
                >твоём профиле</Link>.
            </Typography>
            <Typography
                sx={{
                    fontWeight: '500',
                    fontSize: '.9em'
                }}
            >
                При оформлении заказа ты можешь потратить накопленные баллы. 1 балл = 1<CurrencyRubleIcon sx={{ fontSize: '.9em' }} />.
            </Typography>
        </Box>
    );
}

const HistoryContainer = () => {
    return (
        <Box
            sx={{
                p: '1em',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <Typography variant="h4" sx={{ mb: '.5em' }}>История баллов</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '.9em',
                        fontWeight: '400',
                        color: '#ffffff50'
                    }}
                >Пока что у тебя не истории начислений баллов.</Typography>
            </Box>
        </Box>
    );
}

export default PointsPage;