import { Box, Typography } from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import { Link } from "react-router-dom";

const ReferalBlock = () => {

    return (
        <Link
            sx={{
                textDecoration: 'none'
            }}
            to={`/referal`}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    minWidth: '100%',
                    justifyContent: 'space-between',
                    p: '1em',
                    borderRadius: '1em',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1em'
                    }}
                >
                    <Typography variant="h3">Зови друзей</Typography>
                    <ArrowOutwardIcon
                        sx={{ color: '#fff' }}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2">Дарим по <span style={{ color: '#F34213' }}>500</span><CurrencyRubleIcon sx={{ fontSize: '.9em', color: '#F34213', }} /> - тебе и приведенному другу</Typography>
                </Box>
            </Box>
        </Link>
    );
}

export default ReferalBlock;