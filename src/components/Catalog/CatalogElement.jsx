import { Box, Typography, IconButton } from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";

import { useProductPage } from "../../pages/ProductPage/store";

const CatalogElement = ({ picture, price, title }) => {
    const { setAccordion } = useProductPage();

    let tg = window.Telegram.WebApp;
    let backBtn = tg?.BackButton;
    let mainBtn = tg?.MainButton;

    return (
        <Box
            sx={{
                position: 'relative',
                minWidth: 'calc(50% - .25em)',
                maxWidth: 'calc(50%)',
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <IconButton
                size="small"
                sx={{
                    // backgroundColor: '#fff',
                    top: '0',
                    right: '0',
                    position: 'absolute',
                }}
            >
                {/* <FavoriteIcon sx={{ color: '#F34213' }} /> */}
                <FavoriteBorderIcon sx={{ color: '#F34213' }} />
            </IconButton>

            <Link
                onClick={() => {
                    mainBtn.show();
                    backBtn.show();
                    mainBtn.text = 'Перейти к оплате';
                    mainBtn.color = '#fff';
                    mainBtn.textColor = '#F34213';
                    mainBtn.position = 'bottom';
                    mainBtn.hasShineEffect = true;
                    setAccordion('productPage');
                }}
                to={`/product`}

            >
                <Box
                    sx={{
                        backgroundImage: `url(${picture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minWidth: '100%',
                        borderRadius: '1em',
                        minHeight: '8em',
                    }}
                >
                </Box>

                <Box
                    sx={{
                        p: '.5em',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'senter',
                        alignItems: 'start'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1.2em',
                            fontWeight: '700'
                        }}
                    >{price}<CurrencyRubleIcon
                            sx={{
                                color: '#fff',
                                fontSize: '.8em',
                            }}
                        /></Typography>
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.8em',
                        }}
                    >{title}</Typography>
                </Box>

                <Box
                    sx={{
                        m: '.5em',
                        backgroundColor: '#fff',
                        borderRadius: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            p: '.5em',
                            color: '#2E2E3A',
                            fontSize: '.8em',
                            fontWeight: '700'
                        }}
                    >Купить</Typography>
                </Box>
            </Link>
        </Box>
    );
}

export default CatalogElement;