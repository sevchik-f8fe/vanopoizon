import { Box } from "@mui/material";

import PointBlock from "./PointBlock";
import ReferalBlock from "./ReferalBlock";
import StartShopingBLock from "./StartShopingBlock";

const BlocksContainer = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
                w: '100%',
                // backgroundColor: '#fff'
            }}
        >
            <Box
                sx={{
                    w: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em'
                }}
            >
                <PointBlock />
                <ReferalBlock />
            </Box>

            <StartShopingBLock />
        </Box>
    );
}

export default BlocksContainer;