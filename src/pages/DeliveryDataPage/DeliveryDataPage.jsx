import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { nanoid } from "nanoid";

import { useBottomBoard } from "../../components/BottomBoard/store";
import { useDeliveryData } from "./store";
import cdekImg from "../../assets/cdek.png";

const DeliveryDataPage = () => {
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;
    const { setCurrentPage, setVisible } = useBottomBoard();
    const { phoneNumber, setFieldValue, name, activeDeliveryType, setFieldError } = useDeliveryData();

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        tg.MainButton.hide();
        setCurrentPage('profile');
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: '.5em',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                }}
            >
                <Typography
                    sx={{
                        mb: '1em',
                        fontWeight: '900',
                        color: '#fff',
                        fontSize: '1.8em'
                    }}
                >Данные доставки</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5em',
                        mb: '2em',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '900',
                            color: '#fff',
                            fontSize: '1em'
                        }}
                    >Способы получения</Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '.2em',
                            alignItems: 'center',
                            overflowX: 'scroll',
                        }}
                    >
                        {['pickup', 'delivery'].map((elem) => <PickDeliveryBlock key={nanoid()} img={cdekImg} type={elem} />)}
                    </Box>

                    {(activeDeliveryType == 'pickup') ? (
                        <PickupBlock />
                    ) : (activeDeliveryType == 'delivery') ? (
                        <DeliveryBlock />
                    ) : (
                        <></>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '900',
                            color: '#fff',
                            mb: '.5em',
                            fontSize: '1em',
                        }}
                    >Данные получателя</Typography>

                    <TextField
                        value={name.value}
                        error={name.error}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        sx={{
                            mb: '1em',
                            '& .MuiInput-root': {
                                color: '#fff',
                                fontWeight: '400',
                                fontSize: '.9em',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fff5',
                                fontSize: '.9em',
                                fontWeight: '400',
                            },
                        }}
                        variant="standard"
                        label="Фамилия, имя и отчество"
                    />

                    <TextField
                        value={phoneNumber.value}
                        error={phoneNumber.error}
                        onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                        sx={{
                            mb: '1em',
                            '& .MuiInput-root': {
                                color: '#fff',
                                fontWeight: '400',
                                fontSize: '.9em',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fff5',
                                fontSize: '.9em',
                                fontWeight: '400',
                            },
                        }}
                        variant="standard"
                        label="Номер телефона"
                    />
                </Box>
            </Box>

            <Button
                variant="outlined"
                size="large"
                sx={{
                    borderColor: '#a5d6a7',
                    color: '#a5d6a7',
                    '&:hover': {
                        borderColor: '#a5d6a7',
                    },
                }}
                onClick={() => { navigate('/profile') }}
            >Сохранить</Button>
        </Box>
    );
}

const PickupBlock = () => {
    const { city, cdekAddress, setSimpleFieldValue } = useDeliveryData();

    const pickupData = [
        {
            value: '1',
            label: 'шкиперка',
        },
        {
            value: '2',
            label: 'васька',
        },
        {
            value: '3',
            label: 'бончи',
        },
        {
            value: '4',
            label: 'BIG бончи',
        },
    ];

    return (
        <Box
            sx={{
                minWidth: 'calc(100% - 1em)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            <TextField
                value={city}
                onChange={(e) => { setSimpleFieldValue('city', e.target.value) }}
                sx={{
                    '& .MuiInput-root': {
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: '.9em',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff5',
                        fontSize: '.9em',
                        fontWeight: '400',
                    },
                }}
                select
                variant="standard"
                label="Город"
            >
                {pickupData.map((elem) => (
                    <MenuItem key={nanoid()} value={elem.value}>
                        {elem.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                value={cdekAddress}
                onChange={(e) => { setSimpleFieldValue('cdekAddress', e.target.value) }}
                variant="standard"
                select
                label="Пункт выдачи заказов"
                sx={{
                    '& .MuiInput-root': {
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: '.9em',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff5',
                        fontSize: '.9em',
                        fontWeight: '400',
                    },
                }}
            >
                {pickupData.map((elem) => (
                    <MenuItem key={nanoid()} value={elem.value}>
                        {elem.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}

const DeliveryBlock = () => {
    const { city, address, setSimpleFieldValue } = useDeliveryData();

    const pickupData = [
        {
            value: '1',
            label: 'шкиперка',
        },
        {
            value: '2',
            label: 'васька',
        },
        {
            value: '3',
            label: 'бончи',
        },
        {
            value: '4',
            label: 'BIG бончи',
        },
    ];

    return (
        <Box
            sx={{
                minWidth: 'calc(100% - 1em)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            <TextField
                sx={{
                    '& .MuiInput-root': {
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: '.9em',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff5',
                        fontSize: '.9em',
                        fontWeight: '400',
                    },
                }}
                value={city}
                onChange={(e) => { setSimpleFieldValue('city', e.target.value) }}
                select
                variant="standard"
                label="Город"
            >
                {pickupData.map((elem) => (
                    <MenuItem key={nanoid()} value={elem.value}>
                        {elem.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                value={address}
                onChange={(e) => { setSimpleFieldValue('address', e.target.value) }}
                sx={{
                    '& .MuiInput-root': {
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: '.9em',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff5',
                        fontSize: '.9em',
                        fontWeight: '400',
                    },
                }}
                variant="standard"
                label="Адрес"
            >
            </TextField>
        </Box>
    );
}

const PickDeliveryBlock = ({ img, type }) => {
    const { activeDeliveryType, setDeliveryType } = useDeliveryData();

    return (
        <Box
            onClick={() => setDeliveryType(type)}
            sx={(activeDeliveryType == type) ? (
                {
                    borderRadius: '1em',
                    p: '.1em',
                    transition: '.3s ease',
                    '&:active': {
                        transform: 'scale(.96)'
                    },
                    border: '2px solid #F34213'
                }
            ) : (
                {
                    borderRadius: '1em',
                    p: '.1em',
                    transition: '.3s ease',
                    '&:active': {
                        transform: 'scale(.96)'
                    },
                    border: '2px solid transparent'
                }
            )}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    borderRadius: '1em',
                    backgroundColor: 'white',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '5em',
                    minWidth: '8em',
                }}
            >
            </Box>
        </Box>
    );
}

export default DeliveryDataPage;