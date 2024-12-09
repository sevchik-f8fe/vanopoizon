import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import ArcticleContainer from "../../components/Arcticles/ArticleContainer";
import ContestContainer from "../../components/ContestContainer";

const NewsPage = () => {
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                p: '4.5em .5em 2em .5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
            }}
        >
            <Typography
                sx={{
                    fontSize: '2em',
                    color: '#fff',
                    p: '0em .5em',
                    fontWeight: '900'
                }}
            >Последние <br /> <span style={{ color: '#F34213' }}>Новости</span></Typography>

            <ArcticleContainer />
            <ContestContainer />
        </Box>
    );
}

export default NewsPage;