import { Box, IconButton, Switch, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from "@mui/material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { nanoid } from "nanoid";

import shapka from "../assets/shapka_png.png";
import poizonLogo from "../assets/miniman.png"
import { goBackBtnHandle } from "../utils/utilFuncs";

const ProfilePage = () => {
    let tg = window.Telegram.WebApp;
    let user_photo = tg?.initDataUnsafe?.user?.photo_url || poizonLogo;
    let user_firstName = tg?.initDataUnsafe?.user?.first_name || 'Личный';
    let user_secondName = tg?.initDataUnsafe?.user?.last_name || '';

    tg.onEvent('backButtonClicked', goBackBtnHandle);

    return (
        <Box
            sx={{
                w: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    t: 0, l: 0, minWidth: '100%',
                    minHeight: '10em',
                    backgroundImage: `url(${shapka})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center 0',
                    boxShadow: '0px -86px 56px 16px rgba(32, 32, 41, 0.94) inset',
                }}
            >
            </Box>

            <Box
                sx={{
                    zIndex: '10',
                    w: '100%',
                    p: '1em',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '.5em',
                }}
            >
                <Avatar
                    sx={{
                        minWidth: '3em',
                        minHeight: '3em'
                    }}
                    src={user_photo}
                />
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.8em',
                        fontWeight: '900'
                    }}
                >
                    {user_firstName} {user_secondName}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1em',
                    }}
                >

                    <IconButton>
                        <FavoriteIcon sx={{ color: '#F34213' }} />
                    </IconButton>
                    <IconButton
                        variant="outlined"
                    >
                        <ShoppingCartIcon sx={{ color: '#F34213' }} />
                    </IconButton>
                </Box>

                <NotificationsContainer />

                <StatusContainer />

                <DataContainer />
            </Box>
        </Box >
    );
}

const NotificationsContainer = () => {
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 34,
        height: 24,
        padding: '4px 2px',
        display: 'flex',
        '& .MuiSwitch-switchBase': {
            padding: '3px 0',
            '&.Mui-checked': {
                transform: 'translateX(14px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#F34213',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 25 / 2,
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgba(255,255,255,.35)',
            }),
        },
    }));

    return (
        <Box
            sx={{
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '1.4em',
                    fontWeight: '900',
                    mb: '.5em',
                }}
            >
                Уведомления
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'center'
                    }}
                >
                    <LoyaltyIcon
                        sx={{
                            color: '#F34213',
                            fontSize: '2em',
                        }}
                    />

                    <Box>
                        <Typography
                            sx={{
                                fontSize: '.9em',
                                color: '#fff',
                                fontWeight: '500',
                            }}
                        >Акции</Typography>
                        <Typography
                            sx={{
                                fontSize: '.75em',
                                color: '#ffffff70',
                                fontWeight: '500',
                            }}
                        >Розыгрыши и бонусы</Typography>
                    </Box>
                </Box>

                <AntSwitch />
            </Box>
        </Box>
    );
}

const StatusContainer = () => {
    const rows = [
        { status: 'Новичок', points: '+50', orders: '0' },
        { status: 'Модник', points: '+150', orders: '3' },
        { status: 'Профи', points: '+250', orders: '10' },
        { status: 'Шопоголик', points: '+350', orders: '20' },
        { status: 'Всвеволод', points: '+500', orders: '30' },
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Box>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.4em',
                        fontWeight: '900',
                        mb: '.5em',
                    }}
                >
                    Статус: <span style={{ color: '#F34213' }}>Новичок</span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >
                    Ты получаешь <span style={{ color: '#F34213' }}>+50 баллов</span> за каждый заказ
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    backgroundColor: '#202029',
                    p: '.5em',
                    borderRadius: '.5em',
                    minWidth: '90%',
                    m: '1em 0',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >У тебя нет завершенных заказов в IVAN IVANOW SHOP</Typography>
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >Закажи и получи еще 3 товара, чтобы получить статус "Модник".</Typography>
            </Box>

            <TableContainer
                component={Box}
                size='small'
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                    aria-label="status table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                'td,th': { border: 0 }
                            }}
                        >
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                }}
                            >Статус</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >Баллов за заказ</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >Заказов</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={nanoid()}
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#ffffff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}
                                >
                                    {row.status}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontSize: '.9em',
                                        p: '.5em',
                                        color: '#F34213',
                                        fontWeight: '500',
                                    }}
                                >{row.points}</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}

                                    align="right"
                                >{row.orders}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const DataContainer = () => {
    const rows = [
        { title: 'Город', data: 'Не указано' },
        { title: 'ФИО', data: 'Не указано' },
        { title: 'Телефон', data: 'Не указано' },
        { title: 'Адрес CDEK', data: 'Не указано' },
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Box
                sx={{
                    mb: '1em'
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.4em',
                        fontWeight: '900',
                        mb: '.5em',
                    }}
                >
                    Данные доставки
                </Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >
                    Чтобы не вводить каждый раз после заказа. Но если что-то нужно будет заказать в другое место - не проблема.
                </Typography>
            </Box>

            <TableContainer
                component={Box}
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                >
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                                key={nanoid()}
                            >
                                <TableCell
                                    sx={{
                                        p: '.5em',
                                        fontSize: '.9em',
                                        color: '#ffffff',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                    }}
                                >{row.title}</TableCell>
                                <TableCell
                                    sx={{
                                        p: '.5em',
                                        fontSize: '.9em',
                                        color: '#ffffff50',
                                        textAlign: 'right',
                                        fontWeight: '500',
                                    }}
                                >{row.data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                sx={{
                    mt: '1em',
                    minWidth: '100%'
                }}
                variant="outlined"
                size="large"
            >
                Редактировать
            </Button>
        </Box>
    );
}

export default ProfilePage;