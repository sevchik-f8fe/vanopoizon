import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { showShineMainBtn } from "../../utils/utilFuncs";

const BuyProductPage = () => {
    let tg = window.Telegram.WebApp;
    const navigate = useNavigate();
    showShineMainBtn(12000);

    tg.onEvent('backButtonClicked', () => { navigate(-1) });

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