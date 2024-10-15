import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { showMainBtn } from "../../utils/utilFuncs";

const BuyProductPage = () => {
    let tg = window.Telegram.WebApp;
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', function () {
        navigate(`/product`);
        showMainBtn('Перейти к оплате');
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