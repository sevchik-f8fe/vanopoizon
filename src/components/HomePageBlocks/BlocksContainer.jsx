import { Box } from "@mui/material";

import PointBlock from "./PointBlock";
import ReferalBlock from "./ReferalBlock";
import StartShopingBLock from "./StartShopingBlock";
import CalculateBlock from "./CalculateBlock";

const BlocksContainer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
                flexDirection: 'column',
                w: '100%',
                // p: '0 .5em 0 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em',
                    w: '100%',
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
            <CalculateBlock />
        </Box>
    );
}

export default BlocksContainer;