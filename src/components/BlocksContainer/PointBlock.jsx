import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { Link } from "react-router-dom";
import { useUserData } from "../../utils/store";

const PointBlock = () => {
    const user = useUserData();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                        variant="h3"
                        sx={{ color: '#F34213', fontSize: !isSmallScreen && '1.8em' }}
                    >Баллы</Typography>
                    <ArrowOutwardIcon sx={{ color: '#F34213' }} />
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
                            maxWidth: '2em',
                            maxHeight: '2em',
                            minHeight: '2em',
                            minWidth: '2em',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CurrencyRubleIcon sx={{ color: '#F34213', fontSize: '1.5em' }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{
                                color: '#F34213',
                                fontWeight: '700'
                            }}
                        >{user.pointCount || 0}</Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}

export default PointBlock;