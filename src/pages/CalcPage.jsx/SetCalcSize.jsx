import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { hapticFeedback } from "@telegram-apps/sdk";
import { useBottomBoard } from "../../components/BottomBoard/store";

import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_size.png";

const SetCalcSize = () => {
    const { size, setSize } = useCalc();
    const navigate = useNavigate();
    const { setCurrentPage, setVisible } = useBottomBoard();
    let tg = window.Telegram.WebApp;

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
                label="Размер"
                value={size}
                onChange={(e) => { setSize(e.target.value) }}
                variant="filled"
                size="small"
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
                Шаг 2 из 3: Выберите размер (EU). Чтобы подобрать правильный, загляните в размерную сетку.
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
                        if (size.length > 0 && /^[0-9.]+$/.test(size)) navigate('/product');
                        else hapticFeedback.notificationOccurred('error');
                    }}
                    variant="outlined"
                    size="large"
                >Далее</Button>
            </Box>
        </Box>
    );
}

export default SetCalcSize;