import { Box, Typography } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from "react-router-dom";

const CalculateBlock = () => {
    let tg = window.Telegram.WebApp;
    let backBtn = tg?.BackButton;

    return (
        <Link
            to={`/calc`}
            onClick={() => {
                if (backBtn) backBtn.show();
            }}
        >
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
        </Link>
    );
}

export default CalculateBlock;