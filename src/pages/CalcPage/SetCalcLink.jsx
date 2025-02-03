import { useEffect } from "react";
import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { hapticFeedback } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";

import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_link.png";

const SetCalcLink = () => {
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;
    const { setLink, link, setFieldError, nextButtonLoading, setNextButtonLoading } = useCalc()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                minHeight: isSmallScreen && '90vh',
                maxHeight: '90vh',
            }}
        >
            <TextField
                autoFocus
                label="Ссылка на товар в Poizon"
                variant="outlined"
                size="small"
                error={link.error.isError}
                helperText={link.error.isError && link.error.text}
                value={link.value}
                onChange={(e) => { setLink(e.target.value) }}
                InputLabelProps={{
                    style: { color: '#ffffff50' },
                }}
                sx={{
                    fontSize: '.9em',
                }}
            />
            <Typography variant="subtitle2" sx={{ p: '0 .5em' }}>
                Нажмите на товаре в Poizon кнопку "поделиться". Скопируйте ссылку и вставьте сюда. <Link sx={{ color: '#709ed9', textDecoration: 'none', cursor: 'pointer' }} onClick={() => { tg.openLink('http://www.smoltra.ru/klasific-tractora') }}>А как это сделать</Link>
            </Typography>
            <Box
                sx={{
                    p: '.5em',
                    display: 'flex',
                    flexDirection: !isSmallScreen ? 'row' : 'column',
                    justifyContent: 'space-between',
                    alignItems: !isSmallScreen ? 'start' : 'stretch',
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
                        maxWidth: isSmallScreen ? '100%' : '70%',
                        minWidth: isSmallScreen ? '100%' : '70%',
                    }}
                >
                </Box>
                <LoadingButton
                    sx={{ flex: isSmallScreen ? '' : 1 }}
                    onClick={async () => {
                        if (link.value.length > 0 && link.value.startsWith('https://dw4.co/')) {
                            setNextButtonLoading(true)

                            axios.post('https://vanopoizonserver.ru/vanopoizon/api/getSpuByLink', { link: link.value }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => {
                                    navigate('/product', { state: { spu: response.data.spuId } })
                                })
                                .catch(error => console.error('Ошибка: ', error))
                                .finally(() => setNextButtonLoading(false));
                        }
                        else {
                            setFieldError('link', 'Укажите корректную ссылку');
                            hapticFeedback.notificationOccurred('error');
                        }
                    }}
                    loading={nextButtonLoading}
                    variant="text"
                    size="large"
                >Поиск</LoadingButton>
            </Box>
        </Box>
    );
}

export default SetCalcLink;