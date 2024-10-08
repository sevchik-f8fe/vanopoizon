import { Box, Typography } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const CalculateBlock = () => {
    return (
        <Box
            sx={{
                cursor: 'pointer',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                minWidth: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '.6em',
                gap: '1em',
                borderRadius: '1em',
            }}
        >
            <CalculateIcon
                sx={{
                    color: '#fff',
                    fontSize: '4em'
                }}
            />
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '1em',
                    fontWeight: '700'
                }}
            >Рассчитать стоимость товара из Poizon</Typography>
            <ArrowOutwardIcon
                sx={{
                    color: '#fff',
                }}
            />
        </Box>
    );
}

export default CalculateBlock;