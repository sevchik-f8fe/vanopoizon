import { Box, Chip, Avatar, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from "react-router-dom";
import { init, initData, parseInitData, backButton } from '@telegram-apps/sdk';
import { isTMA } from "@telegram-apps/sdk";

import tgImg from "../assets/Telegram_2019_Logo.svg";
import poizonLogo from "../assets/miniman.png";

const Navigation = () => {

    if (isTMA('simple')) init();

    return (
        <Box
            sx={{
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '1em',
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
    let tg, btnSup, userPhotoUrl, userFirstName;

    if (isTMA('simple')) {
        tg = parseInitData();
        btnSup = backButton.isSupported();

        userPhotoUrl = tg?.user?.photoUrl || poizonLogo;
        userFirstName = tg?.user?.firstName.split(' ')[0] || 'Профиль';

        backButton.mount();
    } else {
        btnSup = false;
        userPhotoUrl = poizonLogo;
        userFirstName = 'gg'
    }

    // let tg = window.Telegram.WebApp;
    // let backBtn = tg?.BackButton;
    // let user_photo = tg?.initDataUnsafe?.user?.photo_url || poizonLogo;
    // let user_name = tg?.initDataUnsafe?.user?.first_name.split(' ')[0] || 'Профиль';
    return (
        <Link
            to={`/profile`}
            onClick={() => {
                if (btnSup) backButton.show();
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '.5em',
                }}
            >
                {/* <Avatar src={user_photo} /> */}
                <Avatar src={userPhotoUrl} />

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
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                            variant="subtitle1"
                        // >{user_name} </Typography>
                        >{userFirstName} </Typography>
                        <ArrowOutwardIcon fontSize="small" sx={{ color: 'white' }} />
                    </Box>


                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: '#F34213', // Цвет текста
                            backgroundColor: '#fff', // Цвет фона
                            borderRadius: '.6em', // Закругление углов
                            padding: ' 0 .3em', // Отступы
                            fontWeight: 'bold',
                            fontSize: '.7em',
                        }}
                    >статус</Typography>
                </Box>
            </Box>
        </Link>
    );
}

const ShopBtn = () => {
    return (
        <a href="https://t.me/IVANOV_SHOP">
            <Chip
                sx={{ cursor: 'pointer' }}
                avatar={<Avatar alt="Natacha"><img src={tgImg} /></Avatar>}
                label='@vano_poizon'
                variant="outlined"
            />
        </a>

    );
}

export default Navigation;