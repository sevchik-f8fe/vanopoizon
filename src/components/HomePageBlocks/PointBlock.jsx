import { Box, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { Link } from "react-router-dom";

const PointBlock = ({ points }) => {
    return (
        <Link
            sx={{
                textDecoration: 'none'
            }}
            to={`/points`}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    backgroundColor: '#2E2E3A',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    minWidth: '100%',
                    justifyContent: 'space-between',
                    p: '1em 1em .5em 1em',
                    borderRadius: '1em',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1em',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#F34213',
                            fontSize: '1.2em',
                            fontWeight: '900'
                        }}
                    >Баллы</Typography>
                    <ArrowOutwardIcon
                        sx={{
                            color: '#F34213',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5em',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '1.5em',
                            maxHeight: '1.5em',
                            minHeight: '1.5em',
                            minWidth: '1.5em',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CurrencyRubleIcon sx={{
                            color: '#F34213',
                            fontSize: '1.3em'
                        }} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                color: '#F34213',
                                fontSize: '2em',
                                fontWeight: '700'
                            }}
                        >{points || 0}</Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}

export default PointBlock;