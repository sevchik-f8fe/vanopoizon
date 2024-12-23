import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { hapticFeedback } from "@telegram-apps/sdk";
import axios from "axios";

import { useDeliveryData } from "./store";
import pickupImg from "../../assets/cdek-self-pickup.png";
import courierImg from "../../assets/cdek-courier.png";
import { useNotifications } from "../ProfilePage/store";
import { useUserData } from "../../utils/store";

const DeliveryDataPage = () => {
    let tg = window.Telegram.WebApp;
    const { phoneNumber, setFieldValue, name, activeDeliveryType, setFieldError, cdekAddress, city, address, loading, setLoading } = useDeliveryData();
    const { setDeliveryData } = useNotifications();
    const { user, setUser } = useUserData();

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: '4em .5em 0 .5em',
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
                            mb: '.5em',
                            fontSize: '1em',
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
                        {[{ type: 'pickup', img: pickupImg }, { type: 'delivery', img: courierImg }].map((elem) => <PickDeliveryBlock key={nanoid()} img={elem.img} type={elem.type} />)}
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
                            mb: '1em',
                            fontSize: '1em',
                        }}
                    >Данные получателя</Typography>

                    <TextField
                        value={name.value}
                        helperText={name.error.isError && name.error.text}
                        error={name.error.isError}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        sx={{
                            mb: '.5em',
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
                        size="small"
                        variant="outlined"
                        label="Фамилия, имя и отчество"
                    />
                    <TextField
                        value={phoneNumber.value}
                        onChange={(e) => {
                            setFieldValue('phoneNumber', e.target.value.replace(/^([^+]|\+[^0-9])/, ''));
                        }}
                        error={phoneNumber.error.isError}
                        helperText={phoneNumber.error.isError && phoneNumber.error.text}
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
                        placeholder="+7 (116) 337-23-22"
                        size={'small'}
                        variant={'outlined'}
                        label={'Номер телефона'}
                        type="tel"
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
                disabled={loading}
                onClick={() => {
                    if (name.value.split(' ').length >= 2 && (phoneNumber.value.length == 12 || phoneNumber.value.length == 14)) {
                        const saveDeliveryData = async () => {
                            setLoading(true);

                            await axios.post('https://vanopoizonserver.ru/vanopoizon/saveDeliveryData',
                                { tg: tg.initData, userId: user._id, phone: phoneNumber.value, fullName: name.value, deliveryType: activeDeliveryType, pvz: cdekAddress.sddress, city: city.name, fullAddress: address },
                                // { phone: phoneNumber.value, fullName: name.value, deliveryType: activeDeliveryType, pvz: cdekAddress.sddress, city: city.name, fullAddress: address },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                })
                                .then(res => {
                                    setUser(res?.data?.user);
                                    window.history.back();
                                })
                                .catch(err => console.log(`err: ${err}`))
                                .finally(() => setLoading(false))
                        }

                        saveDeliveryData();

                        // setDeliveryData('name', name.value);
                        // setDeliveryData('phone', phoneNumber.value.replace(/\s/g, ''));

                        // if (city.name.length > 0) setDeliveryData('city', city.name);
                        // if (cdekAddress.address.length > 0) setDeliveryData('cdek', cdekAddress);
                    } else if (name.value.split(' ').length < 2) {
                        setFieldError('name', 'Укажите корректные данные');
                        hapticFeedback.notificationOccurred('error')
                    } else if (phoneNumber.value.length < 16) {
                        setFieldError('phoneNumber', 'Укажите корректный номер телефона');
                        hapticFeedback.notificationOccurred('error')
                    }
                }}
            >{user}, {user?._id}</Button>
        </Box >
    );
}

const PickupBlock = () => {
    const { city, cdekAddress } = useDeliveryData();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minWidth: 'calc(100% - 1em)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            <PickBlock
                notActiveTitle='Город'
                activeTitle={city.name}
                onClick={() => {
                    navigate('/select', {
                        state: {
                            field: 'city',
                        }
                    })
                }}
            />

            <PickBlock
                notActiveTitle='Пункт выдачи заказов'
                activeTitle={cdekAddress.address}
                onClick={() => {
                    if (city.name.length != 0) {
                        navigate('/geoSelect', { state: { cityCode: city.cityCode, cityCoords: city.cityCoords } })
                    } else {
                        hapticFeedback.notificationOccurred('error');
                    }
                }}
            />
        </Box>
    );
}

const DeliveryBlock = () => {
    const { city, address, setSimpleFieldValue } = useDeliveryData();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minWidth: 'calc(100% - 1em)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            <PickBlock
                notActiveTitle='Город'
                activeTitle={city.name}
                onClick={() => {
                    navigate('/select', {
                        state: {
                            field: 'city',
                        }
                    })
                }}
            />

            <TextField
                value={address}
                helperText={'Введите название улицы, номер дома, корпус, квартиру'}
                FormHelperTextProps={{ sx: { color: '#fff5' } }}
                onChange={(e) => { setSimpleFieldValue('address', e.target.value) }}
                disabled={city.name.length <= 0}
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
                size="small"
                variant="outlined"
                label="Адрес"
            />
        </Box>
    );
}

const PickDeliveryBlock = ({ img, type }) => {
    const { activeDeliveryType, setDeliveryType } = useDeliveryData();

    return (
        <Box
            onClick={() => setDeliveryType(type)}
            sx={{
                borderRadius: '1em',
                p: '.1em',
                transition: '.3s ease',
                '&:active': {
                    transform: 'scale(.96)',
                },
                ...(activeDeliveryType == type && {
                    border: '2px solid #F34213',
                }),
                ...(activeDeliveryType != type && {
                    border: '2px solid transparent'
                })
            }}
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

const PickBlock = ({ activeTitle, notActiveTitle, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
                cursor: 'pointer',
                p: '.3em .5em'
            }}
        >
            <Typography
                sx={{
                    fontSize: '.9em',
                    fontWeight: '400',
                    p: '.3em .5em',
                    ...(activeTitle.length == 0 && {
                        color: '#fff5',
                    }),
                    ...(activeTitle.length > 0 && {
                        color: '#fff',
                    })
                }}
            >{activeTitle.length == 0 ? notActiveTitle : activeTitle}</Typography>
            <ExpandMoreIcon sx={{ color: '#fff3' }} />
        </Box>
    );
}

export default DeliveryDataPage;