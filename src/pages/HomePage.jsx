import { Box } from "@mui/material";

import Navigation from "../components/Navigation";
import SearchField from "../components/SearchField";

const HomePage = () => {
    return (
        <Box
            sx={{
                w: '100%', p: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <Navigation />

            <SearchField />
        </Box>
    );
}

export default HomePage;