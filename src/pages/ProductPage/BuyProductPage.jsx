import { Typography } from "@mui/material";
import { useProductPage } from "./store";

const BuyProductPage = () => {
    const { setCurrentPage } = useProductPage();
    let tg = window.Telegram.WebApp;

    tg.onEvent('backButtonClicked', function () {
        setCurrentPage('productPage');
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