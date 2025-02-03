import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import ArcticleContainer from "../../components/Arcticles/ArticleContainer";
import ContestContainer from "../../components/ContestContainer";
import { useArticles } from "./store";
import BigArticleContainer from "../../components/Arcticles/BigArticleContainer";

const NewsPage = () => {
    let tg = window.Telegram.WebApp;
    const { setArticles } = useArticles();

    useEffect(() => {
        const fetchGetArticles = async () => {
            await axios.get('https://vanopoizonserver.ru/admin_dashboard/getArticles', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response.data.articles)
                    setArticles(response.data.articles)
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchGetArticles();

        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
            }}
        >
            <Typography variant="h1" sx={{ p: '0em .5em' }}>
                Последние <br /> <span style={{ color: '#F34213' }}>Новости</span></Typography>

            <ArcticleContainer />
            <ContestContainer />

            <BigArticleContainer />
        </Box>
    );
}

export default NewsPage;