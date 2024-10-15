import { Typography } from "@mui/material";

import { goBackBtnHandle, showMainBtn } from "../../utils/utilFuncs";

const BuyProductPage = () => {
    let tg = window.Telegram.WebApp;

    tg.onEvent('backButtonClicked', function () {
        goBackBtnHandle();
        showMainBtn();
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