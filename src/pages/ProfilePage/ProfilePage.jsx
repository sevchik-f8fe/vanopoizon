import { useEffect } from "react";
import { Box, Switch, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton } from "@mui/material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { nanoid } from "nanoid";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useNotifications } from "./store";

import shapka from "../../assets/shapka_png.png";
import poizonLogo from "../../assets/miniman.png"
import { useBottomBoard } from "../../components/BottomBoard/store";

const ProfilePage = () => {
    const navigate = useNavigate()
    const { setCurrentPage, setVisible } = useBottomBoard();
    let tg = window.Telegram.WebApp;
    let user_photo = tg?.initDataUnsafe?.user?.photo_url || poizonLogo;
    let user_firstName = tg?.initDataUnsafe?.user?.first_name || 'Личный';
    let user_secondName = tg?.initDataUnsafe?.user?.last_name || '';

    useEffect(() => {
        tg.BackButton.show();
        setVisible(true);
        tg.MainButton.hide();
        setCurrentPage('profile');
    }, [])

    return (
        <Box
            sx={{
                w: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                pb: '3em',
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
                        fontWeight: '900',
                    }}
                >
                    {user_firstName} {user_secondName}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '1em'
                    }}
                >
                    <IconButton
                        onClick={() => navigate('/favorite')}
                    >
                        <FavoriteIcon
                            sx={{ color: '#F34213' }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => navigate('/cart')}
                    >
                        <ShoppingCartIcon
                            sx={{ color: '#F34213' }}
                        />
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
    const { notificationsActive, setNotificationsActive } = useNotifications()

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
                                color: '#ffffff50',
                                fontWeight: '500',
                            }}
                        >Розыгрыши и бонусы</Typography>
                    </Box>
                </Box>

                <Switch
                    color="warning"
                    checked={notificationsActive}
                    onChange={(e) => setNotificationsActive(e.target.checked)}
                />
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
    const navigate = useNavigate();

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
                onClick={() => navigate('/deliveryData')}
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