import { Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { HashLink } from 'react-router-hash-link';
import { viewport } from "@telegram-apps/sdk";

import Navigation from "../components/Navigation";
import ArcticleContainer from "../components/Arcticles/ArticleContainer";
import BlocksContainer from "../components/HomePageBlocks/BlocksContainer";
import ContestContainer from "../components/ContestContainer";
import CatalogContainer from "../components/Catalog/CatalogContainer";

const HomePage = () => {
    let tg = window.Telegram.WebApp;
    tg.BackButton.hide();
    tg.expand();

    return (
        <Box
            sx={{
                w: '100%', p: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
            }}
        >
            <Navigation />

            <HashLink smooth to='/#catalog'>
                <Box
                    sx={{
                        w: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '1em',
                        gap: '.5em',
                        backgroundColor: '#2e2e3a',
                        p: '.5em 1em',
                    }}
                >
                    <SearchIcon
                        sx={{
                            color: '#ffffff60',
                        }}
                    />

                    <Typography
                        sx={{
                            color: '#ffffff60',
                            fontSize: '1em',
                            fontWeight: '500',
                        }}
                    >Поиск в Poizon</Typography>
                </Box>
            </HashLink>

            <ArcticleContainer />
            <BlocksContainer />
            <ContestContainer />

            <CatalogContainer />
        </Box>
    );
}

export default HomePage;