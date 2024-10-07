import { Box } from "@mui/material";

import Navigation from "../components/Navigation";

const HomePage = () => {
    return (
        <Box
            sx={{
                w: '100%', p: '.5em',
            }}
        >
            <Navigation />
        </Box>
    );
}

export default HomePage;