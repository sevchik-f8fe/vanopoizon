import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { hapticFeedback } from "@telegram-apps/sdk";

import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_link.png";

const SetCalcLink = () => {
    let tg = window.Telegram.WebApp;
    const { nextPage, prevPage, setLink, link } = useCalc()

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
                label="Ссылка на товар в Poizon"
                variant="filled"
                size="small"
                value={link}
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5em'
                    }}
                >
                    <Button
                        onClick={() => {
                            if (link.length > 0 && link.startsWith('https://dw4.co/')) nextPage();
                            else {
                                if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('medium');
                            }
                        }}
                        variant="outlined"
                        size="large"
                    >Далее {toString(hapticFeedback?.isSupported())}</Button>
                    <Button
                        onClick={prevPage}
                        variant="text"
                        size="large"
                    >Назад</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SetCalcLink;