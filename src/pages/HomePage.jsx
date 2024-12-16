import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";
import CatalogContainer from "../components/Catalog/CatalogContainer";
import BottomBoard from "../components/BottomBoard";
import axios from "axios";
import { create } from "zustand";

const useAccess = create((set) => ({
    access: '!- - -!',
    setAccess: (value) => set((state) => {
        return { access: value }
    })
}))

const HomePage = () => {
    let tg = window.Telegram.WebApp;
    const { access, setAccess } = useAccess();

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
                    setAccess(`aaa: ${res?.data?.userId}, ${res?.data?.username}, ${res?.data?.pointCount}`)
                })
                .catch(err => setAccess(`err: ${err}`));
        }

        sendDataToValidate();
    }, []);

    return (
        <Box
            sx={{
                p: '3em .5em 3.5em .5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                justifyContent: 'center'
            }}
        >
            <Navigation />
            <BottomBoard />
            <CalculateBlock access={access} />
            <CatalogContainer />
        </Box>
    );
}

const CalculateBlock = ({ access }) => {
    let tg = window.Telegram.WebApp;

    const params = new URLSearchParams(tg.initData);
    const hash = params.get('hash');
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
                >{access}, сейф: {params}, {hash}</Typography>
                {/* >Рассчитать стоимость товара из Poizon</Typography> */}
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