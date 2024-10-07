import { Box } from "@mui/material";

import Navigation from "../components/Navigation";
import SearchField from "../components/SearchField";
import ArcticleContainer from "../components/Arcticles/ArticleContainer";

const HomePage = () => {
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

            <SearchField />

            <ArcticleContainer />
        </Box>
    );
}

export default HomePage;