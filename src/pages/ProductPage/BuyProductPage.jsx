import { Typography } from "@mui/material";
import { useProductPage } from "./store";

const BuyProductPage = () => {
    const { setAccordion } = useProductPage();
    let tg = window.Telegram.WebApp;

    tg.onEvent('backButtonClicked', function () {
        setAccordion('productPage');
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