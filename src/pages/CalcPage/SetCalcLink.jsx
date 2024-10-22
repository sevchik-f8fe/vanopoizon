import { useEffect } from "react";
import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { hapticFeedback } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";

import { useBottomBoard } from "../../components/BottomBoard/store";
import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_link.png";

const SetCalcLink = () => {
    const navigate = useNavigate();
    const { setCurrentPage, setVisible } = useBottomBoard();
    let tg = window.Telegram.WebApp;
    const { setLink, link } = useCalc()

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        tg.MainButton.hide();
        setCurrentPage('home');
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                height: '100vh'
            }}
        >
            <TextField
                autoFocus
                label="Ссылка на товар в Poizon"
                variant="filled"
                size="small"
                value={link.value}
                onChange={(e) => { setLink(e.target.value) }}
                InputLabelProps={{
                    style: { color: '#ffffff60' },
                }}
                sx={{
                    fontSize: '.9em',
                }}
            />
            <Typography
                sx={{
                    p: '0 .5em',
                    color: '#ffffff50',
                    fontSize: '.75em'
                }}
            >
                Шаг 1 из 3. Нажмите на товаре в Poizon кнопку "поделиться". Скопируйте ссылку и вставьте сюда. <Link sx={{ color: '#709ed9', textDecoration: 'none', cursor: 'pointer' }} onClick={() => { tg.openLink('http://www.smoltra.ru/klasific-tractora') }}>А как это сделать</Link>
            </Typography>
            <Box
                sx={{
                    p: '.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '2em',
                    flex: '1',
                    w: '100%',
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url(${calcImg})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '18em',
                        maxHeight: '18em',
                        maxWidth: '100%',
                        minWidth: '100%',
                    }}
                >
                </Box>
                <Button
                    onClick={() => {
                        if (link.length > 0 && link.startsWith('https://dw4.co/')) navigate('/calcSize');
                        else hapticFeedback.notificationOccurred('error');
                    }}
                    variant="outlined"
                    size="large"
                >Далее</Button>
            </Box>
        </Box>
    );
}

export default SetCalcLink;