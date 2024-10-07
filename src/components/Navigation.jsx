import { Box, Chip, Avatar, Typography, Link } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Navigation = () => {
    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                w: '100%',
            }}
        >
            <ProfileBtn />
            <ShopBtn />
        </Box>
    );
}

const ProfileBtn = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '.2em'
            }}
        >
            <Avatar>NN</Avatar>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{

                        }}
                        variant="subtitle1"
                    >Name </Typography>
                    <ArrowOutwardIcon fontSize="small" />
                </Box>


                <Typography
                    variant="subtitle2"
                >status</Typography>
            </Box>
        </Box>
    );
}

const ShopBtn = () => {
    return (
        <Link href="#">
            <Chip
                sx={{ cursor: 'pointer' }}
                avatar={<Avatar alt="Natacha">TG</Avatar>}
                label='@vano_poizon'
                variant="filled"
            />
        </Link>

    );
}

export default Navigation;