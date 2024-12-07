import { Box } from "@mui/material";

import PointBlock from "./PointBlock";
import ReferalBlock from "./ReferalBlock";
import StartShopingBLock from "./StartShopingBlock";

const BlocksContainer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
            }}
        >
            <Box
                sx={{
                    minWidth: '50%',
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