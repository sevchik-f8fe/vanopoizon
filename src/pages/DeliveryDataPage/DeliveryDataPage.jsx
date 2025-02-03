import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { hapticFeedback } from "@telegram-apps/sdk";
import axios from "axios";
import { useTheme, useMediaQuery } from "@mui/material";

import { useDeliveryData } from "./store";
import pickupImg from "../../assets/cdek-self-pickup.png";
import courierImg from "../../assets/cdek-courier.png";
import { useUserData } from "../../utils/store";

const DeliveryDataPage = () => {
    let tg = window?.Telegram?.WebApp;
    const { deliveryData, setFieldValue, setFieldError, loading, setLoading } = useDeliveryData();
    const { user, setUser } = useUserData();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();

        const getUserDeliveryData = () => {
            (deliveryData?.fullName?.value?.length == 0 && user?.delivery?.fullName?.length > 0) && setFieldValue('fullName', user?.delivery?.fullName);
            (deliveryData?.phone?.value?.length < 3 && user?.delivery?.phone?.length > 0) && setFieldValue('phone', user?.delivery?.phone);
            (deliveryData?.pvz?.value?.smallAddress?.length == 0 && user?.delivery?.pvz?.smallAddress?.length > 0) && setFieldValue('pvz', user?.delivery?.pvz);
            (deliveryData?.fullAddress?.value?.length == 0 && user?.delivery?.fullAddress?.length > 0) && setFieldValue('fullAddress', user?.delivery?.fullAddress);
            (deliveryData?.city?.value?.name?.length == 0 && user?.delivery?.city?.name?.length > 0) && setFieldValue('city', user?.delivery?.city);
            user?.delivery?.deliveryType && setFieldValue('deliveryType', user?.delivery?.deliveryType);
        }

        getUserDeliveryData();
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isSmallScreen && 'space-between',
                gap: '1em',
                minHeight: isSmallScreen && '90vh',
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
                    <Typography variant="h6" sx={{ mb: '.5em' }}>Способы получения</Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '.2em',
                            alignItems: 'center',
                            overflowX: 'scroll',
                        }}
                    >
                        {[{ type: 'pickup', img: pickupImg }, { type: 'courier', img: courierImg }].map((elem) => <PickDeliveryBlock key={nanoid()} img={elem.img} type={elem.type} />)}
                    </Box>

                    {(deliveryData.deliveryType.value == 'pickup') ? (
                        <PickupBlock />
                    ) : (deliveryData.deliveryType.value == 'courier') ? (
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
                    <Typography variant="h6" sx={{ mb: '1em' }}>Данные получателя</Typography>

                    {isSmallScreen ? (
                        <>
                            <TextField
                                value={deliveryData.fullName.value}
                                helperText={deliveryData.fullName.error !== null && deliveryData.fullName.error}
                                error={deliveryData.fullName.error !== null}
                                onChange={(e) => setFieldValue('fullName', e.target.value)}
                                sx={{
                                    mb: '.8em',
                                    '& .MuiInput-root': {
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
                                value={deliveryData.phone.value}
                                onChange={(e) => {
                                    setFieldValue('phone', e.target.value.replace(/^([^+]|\+[^0-9])/, ''));
                                }}
                                error={deliveryData.phone.error !== null}
                                helperText={deliveryData.phone.error && deliveryData.phone.error}
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
                                placeholder="+7 (987) 654-32-10"
                                size={'small'}
                                variant={'outlined'}
                                label={'Номер телефона'}
                                type="tel"
                            />
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '1em'
                                }}
                            >
                                <TextField
                                    value={deliveryData.fullName.value}
                                    helperText={deliveryData.fullName.error !== null && deliveryData.fullName.error}
                                    error={deliveryData.fullName.error !== null}
                                    onChange={(e) => setFieldValue('fullName', e.target.value)}
                                    sx={{
                                        flex: !isSmallScreen && 1,
                                        mb: '.8em',
                                        '& .MuiInput-root': {
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
                                    value={deliveryData.phone.value}
                                    onChange={(e) => {
                                        setFieldValue('phone', e.target.value.replace(/^([^+]|\+[^0-9])/, ''));
                                    }}
                                    error={deliveryData.phone.error !== null}
                                    helperText={deliveryData.phone.error && deliveryData.phone.error}
                                    sx={{
                                        flex: !isSmallScreen && 1,
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
                                    placeholder="+7 (987) 654-32-10"
                                    size={'small'}
                                    variant={'outlined'}
                                    label={'Номер телефона'}
                                    type="tel"
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>

            <Button
                variant="outlined"
                size="large"
                sx={{
                    alignSelf: !isSmallScreen && 'end',
                    borderColor: '#a5d6a7',
                    color: '#a5d6a7',
                    '&:hover': {
                        borderColor: '#a5d6a7',
                    },
                }}
                disabled={loading}
                onClick={() => {
                    let mainFieldsAreFilled = (deliveryData.fullName.value.split(' ').length >= 2 && deliveryData.fullName.value.length >= 3) && (deliveryData.phone.value.length == 12 || deliveryData.phone.value.length == 14);

                    if (mainFieldsAreFilled) {
                        if (deliveryData.deliveryType.value == 'courier') {
                            if (deliveryData.fullAddress.value.length > 0) {
                                const saveCourierData = async () => {
                                    setLoading(true);

                                    await axios.post('https://vanopoizonserver.ru/vanopoizon/saveDeliveryData',
                                        {
                                            tg: tg?.initData,
                                            userId: user._id,
                                            phone: deliveryData.phone.value,
                                            fullName: deliveryData.fullName.value,
                                            deliveryType: deliveryData.deliveryType.value,
                                            pvz: {
                                                smallAddress: user.delivery.pvz.smallAddress,
                                                fullAddress: user.delivery.pvz.fullAddress
                                            },
                                            city: {
                                                name: user.delivery.city.name,
                                                code: user.delivery.city.code,
                                                coords: user.delivery.city.coords
                                            },
                                            fullAddress: deliveryData.fullAddress.value
                                        },
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

                                saveCourierData();
                            } else {
                                setFieldError('fullAddress', 'Укажите корректные данные');
                                hapticFeedback.notificationOccurred('error');
                            }
                        } else if (deliveryData.deliveryType.value == 'pickup') {
                            if (deliveryData.city.value.name.length > 0 && deliveryData.pvz.value.fullAddress.length > 0) {
                                const savePickupData = async () => {
                                    setLoading(true);

                                    await axios.post('https://vanopoizonserver.ru/vanopoizon/saveDeliveryData',
                                        {
                                            tg: tg?.initData,
                                            userId: user._id,
                                            phone: deliveryData.phone.value,
                                            fullName: deliveryData.fullName.value,
                                            deliveryType: deliveryData.deliveryType.value,
                                            pvz: {
                                                smallAddress: deliveryData.pvz.value.smallAddress,
                                                fullAddress: deliveryData.pvz.value.fullAddress
                                            },
                                            city: {
                                                name: deliveryData.city.value.name,
                                                code: deliveryData.city.value.code,
                                                coords: deliveryData.city.value.coords
                                            },
                                            fullAddress: user.delivery.fullAddress
                                        },
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

                                savePickupData();
                            } else if (deliveryData.city.value.name.length == 0) {
                                setFieldError('city', 'Укажите корректные данные');
                                hapticFeedback.notificationOccurred('error');
                            } else {
                                setFieldError('pvz', 'Укажите корректные данные');
                                hapticFeedback.notificationOccurred('error');
                            }
                        } else {
                            hapticFeedback.notificationOccurred('error');
                        }
                    } else if (deliveryData.fullName.value.split(' ').length < 2 || deliveryData.fullName.value.length < 3) {
                        setFieldError('name', 'Укажите корректные данные');
                        hapticFeedback.notificationOccurred('error')
                    } else if (deliveryData.phone.value.length !== 12 || deliveryData.phone.value.length !== 14) {
                        setFieldError('phoneNumber', 'Укажите корректные данные');
                        hapticFeedback.notificationOccurred('error')
                    }
                }}
            >Сохранить</Button>
        </Box >
    );
}

const PickupBlock = () => {
    const { deliveryData, setFieldValue, setFieldError } = useDeliveryData();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                minWidth: 'calc(100% - 1em)',
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: '1em'
            }}
        >
            <PickBlock
                notActiveTitle='Город'
                error={deliveryData.city.error}
                activeTitle={deliveryData?.city?.value?.name}
                onClick={() => navigate('/select')}
            />

            <PickBlock
                notActiveTitle='Пункт выдачи заказов'
                activeTitle={deliveryData?.pvz?.value?.smallAddress}
                error={deliveryData.pvz.error}
                onClick={() => {
                    if (deliveryData.city.value.name.length != 0) {
                        navigate('/geoSelect', { state: { cityCode: deliveryData.city.value.code, cityCoords: deliveryData.city.value.coords } })
                    } else {
                        hapticFeedback.notificationOccurred('error');
                    }
                }}
            />
        </Box>
    );
}

const DeliveryBlock = () => {
    const { deliveryData, setFieldValue, setFieldError } = useDeliveryData();

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
                value={deliveryData.fullAddress.value}
                error={deliveryData.fullAddress.error !== null}
                helperText={'119049, Россия, Москва, Ленинский проспект, дом 4, строение 1А, квартира 10'}
                FormHelperTextProps={{ sx: { fontWeight: 400, fontSize: '.8em', color: '#fff5' } }}
                onChange={(e) => { setFieldValue('fullAddress', e.target.value) }}
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
    const { deliveryData, setFieldValue } = useDeliveryData();

    return (
        <Box
            onClick={() => setFieldValue('deliveryType', type)}
            sx={{
                borderRadius: '1em',
                p: '.1em',
                transition: '.3s ease',
                '&:active': {
                    transform: 'scale(.96)',
                },
                ...(deliveryData.deliveryType.value == type && {
                    border: '2px solid #F34213',
                }),
                ...(deliveryData.deliveryType.value != type && {
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

const PickBlock = ({ activeTitle, notActiveTitle, onClick, error }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                p: '.3em .5em',
                flex: !isSmallScreen && 1
            }}
        >
            <Typography
                sx={{
                    fontSize: '.9em',
                    fontWeight: '400',
                    p: '.3em .5em',
                    ...(activeTitle?.length == 0 && {
                        color: '#fff5',
                    }),
                    ...(activeTitle?.length > 0 && {
                        color: '#fff',
                    })
                }}
            >{activeTitle?.length == 0 ? notActiveTitle : activeTitle}</Typography>
            <ExpandMoreIcon sx={{ color: '#fff3' }} />
        </Box>
    );
}

export default DeliveryDataPage;