import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

const StartShopingBLock = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                cursor: 'pointer',
                backgroundColor: '#F34213',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                minWidth: 'calc(50% - .5em)',
                justifyContent: 'space-between',
                p: '1em',
                borderRadius: '1em',
            }}
        >
            <Typography variant="h3" sx={{ fontSize: !isSmallScreen && '1.8em', }}>Выбрать и заказать</Typography>
            <Box
                sx={{
                    minWidth: '4em',
                    maxWidth: '4em',
                    minHeight: '4em',
                    maxHeight: '4em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#fff',

                }}
            >
                <EastIcon sx={{ fontSize: '2em', color: '#F34213' }} />
            </Box>
        </Box>
    );
}

export default StartShopingBLock;