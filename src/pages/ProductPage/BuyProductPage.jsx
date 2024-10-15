import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { showMainBtn } from "../../utils/utilFuncs";

const BuyProductPage = () => {
    let tg = window.Telegram.WebApp;
    let { lastPathName } = useParams();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', function () {
        navigate(`/${lastPathName}`);
        if (lastPathName == 'product') showMainBtn('Перейти к оплате');
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