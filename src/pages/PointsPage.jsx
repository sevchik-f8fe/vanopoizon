import { Box, Typography } from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import { goBtnHandle } from "../utils/utilFuncs";

const PointsPage = () => {
    let tg = window.Telegram.WebApp;
    tg.onEvent('backButtonClicked', goBtnHandle(''));

    return (
        <Box
            sx={{
                p: '1em',
                w: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
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
    return (
        <Box
            sx={{
                p: '1em',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <Typography
                sx={{
                    fontWeight: '500',
                    color: '#fff',
                    fontSize: '.9em',
                    mb: '1em',
                }}
            >
                Дальше ты будешь получать
                <span style={{ color: '#F34213' }}> +50 баллов</span> за каждый завершенный заказ.
            </Typography>
            <Typography
                sx={{
                    fontWeight: '500',
                    color: '#fff',
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
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '1.2em',
                    fontWeight: '700',
                    mb: '.5em',
                }}
            >История баллов</Typography>

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