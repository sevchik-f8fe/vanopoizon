import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import Navigation from "../components/Navigation";
import CatalogContainer from "../components/Catalog/CatalogContainer";
import BottomBoard from "../components/BottomBoard";
import axios from "axios";
import { useUserData } from "../utils/store";

const HomePage = () => {
    let tg = window.Telegram.WebApp;
    const { user, setUser } = useUserData();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        tg.ready();
        tg.BackButton.hide();
        tg.MainButton.hide();
        try {
            tg.requestFullscreen();
        } catch (error) {
            tg.expand();
            console.error('Ошибка при запросе полноэкранного режима:', error);
        }
        tg.disableVerticalSwipes();
        tg.enableClosingConfirmation();

        const sendDataToValidate = async () => {
            await axios.post('https://vanopoizonserver.ru/vanopoizon/auth',
                { tg: tg.initData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    setUser(res?.data?.user)
                })
                .catch(err => console.log(`err: ${err}`));
        }

        sendDataToValidate();
    }, []);

    return (
        <Box
            sx={{
                ...(isSmallScreen && {
                    flexDirection: 'column',
                    justifyContent: 'center',
                }),
                ...(!isSmallScreen && {
                    alignItems: 'start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }),
                p: '3em .5em 3.5em .5em',
                display: 'flex',
                gap: '1em',
            }}
        >
            {isSmallScreen ? (
                <>
                    <Navigation />
                    <BottomBoard />
                    <CalculateBlock access={access} />
                    <CatalogContainer />
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: '4em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1em',
                            alignItems: 'start',
                            maxWidth: '25%',
                        }}
                    >
                        <Navigation />
                        <BottomBoard />
                        <CalculateBlock access={access} />
                    </Box>

                    <CatalogContainer />
                </>
            )}
        </Box>
    );
}

const CalculateBlock = ({ access }) => {
    return (
        <Link
            to={`/calc`}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    minWidth: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '.6em',
                    gap: '1em',
                    borderRadius: '1em',
                }}
            >
                <CalculateIcon
                    sx={{
                        color: '#fff',
                        fontSize: '4em'
                    }}
                />
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Рассчитать стоимость товара из Poizon</Typography>
                <ArrowOutwardIcon
                    sx={{
                        color: '#fff',
                    }}
                />
            </Box>
        </Link>
    );
}

export default HomePage;