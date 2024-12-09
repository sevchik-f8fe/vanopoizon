import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { hapticFeedback } from "@telegram-apps/sdk";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";

import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_size.png";

const SetCalcSize = () => {
    const { size, setSize, setFieldError, link, nextButtonLoading, setNextButtonLoading } = useCalc();
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
        setNextButtonLoading(false)
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                height: '100vh',
                p: '.5em',
                pt: '5em'
            }}
        >
            <TextField
                autoFocus
                label="Размер"
                error={size.error.isError}
                helperText={size.error.isError && size.error.text}
                value={size.value}
                onChange={(e) => { setSize(e.target.value) }}
                variant="filled"
                size="small"
                InputLabelProps={{
                    style: { color: '#ffffff50' },
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
                <LoadingButton
                    onClick={async () => {
                        if (size.value.length > 0 && /^[0-9.]+$/.test(size.value)) {
                            setNextButtonLoading(true)

                            axios.post('http://89.104.69.92:3000/vanopoizon/api/getSpuByLink', { link: link.value }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => {
                                    navigate('/product', { state: { spu: response.data.spuId } })
                                })
                                .catch(error => console.error('Ошибка бля: ', error));
                        }
                        else {
                            setFieldError('size', 'Укажите размер');
                            hapticFeedback.notificationOccurred('error');
                        }
                    }}
                    loading={nextButtonLoading}
                    variant="text"
                    size="large"
                >Далее</LoadingButton>
            </Box>
        </Box>
    );
}

export default SetCalcSize;