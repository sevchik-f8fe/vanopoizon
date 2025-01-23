import { Box, Chip, Avatar, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from "react-router-dom";

import tgImg from "../assets/Telegram_2019_Logo.svg";
import poizonLogo from "../assets/miniman.png";

const Navigation = () => {
    return (
        <Link to={'/profile'}>
            <ProfileBtn />
        </Link>
    );
}

const ProfileBtn = () => {
    let tg = window.Telegram.WebApp;
    let user_photo = tg?.initDataUnsafe?.user?.photo_url || poizonLogo;
    let user_name = tg?.initDataUnsafe?.user?.first_name.split(' ')[0] || 'Профиль';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '.5em',
            }}
        >
            <Avatar
                sx={{
                    minWidth: '3em',
                    minHeight: '3em',
                }}
                src={user_photo}
            />

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
                    <Typography sx={{ fontWeight: '800' }} variant="h5">{user_name} </Typography>
                    <ArrowOutwardIcon fontSize="small" sx={{ color: 'white' }} />
                </Box>
            </Box>
        </Box>
    );
}

const ShopBtn = () => {
    let tg = window.Telegram.WebApp;

    return (
        <Chip
            onClick={() => { tg.openTelegramLink('https://t.me/IVANOV_SHOP') }}
            sx={{ cursor: 'pointer' }}
            avatar={<Avatar><img src={tgImg} /></Avatar>}
            label='@vano_poizon'
            variant="outlined"
        />
    );
}

export default Navigation;