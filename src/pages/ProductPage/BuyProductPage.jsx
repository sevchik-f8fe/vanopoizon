import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useProductPage } from "./store";

const BuyProductPage = () => {
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    tg.onEvent('backButtonClicked', function () {
        navigate('/product');
        mainBtn.text = 'Перейти к оплате';
        mainBtn.color = '#fff';
        mainBtn.textColor = '#F34213';
        mainBtn.position = 'bottom';
        mainBtn.hasShineEffect = false;
    });

    return (
        <Typography
            sx={{
                p: '.5em',
                color: '#fff'
            }}
        >
            завтра сделаю :)
        </Typography>
    );
}

export default BuyProductPage;