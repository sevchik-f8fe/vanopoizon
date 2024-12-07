import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContestPage = () => {
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                p: '1em .5em',
                pt: '4.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                minHeight: '100%',
                background: 'linear-gradient(324deg, rgba(255,191,191,1) 0%, rgba(255,228,231,1) 57%, rgba(253,244,246,1) 100%)',
            }}
        >
            <Box
                sx={{
                    borderRadius: '1em',
                    border: '1px solid #f44336',
                    maxWidth: 'fit-content',
                    p: '.2em .5em',
                }}
            >
                <Typography
                    sx={{
                        color: '#f44336',
                        fontWeight: '500',
                        fontSize: '1em'
                    }}
                >1 - 31 октября</Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: '2.2em',
                    fontWeight: '900',
                    color: '#f44336',
                    lineHeight: '.98',
                }}
            >Бооооооольшой <br />розыгрыш <br />октября</Typography>

            <Typography
                sx={{
                    fontSize: '1em',
                    fontWeight: '600',
                    color: '#f44336',
                }}
            >Выполняй задания и повышай шансы выиграть приз</Typography>

            <Box
                sx={{
                    p: '1em .5em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.8em',
                        fontWeight: '700',
                        color: '#371f1f',
                        lineHeight: '1.1'
                    }}
                >Подпишись на <span style={{ color: '#f44336' }}>@vano_poizon</span></Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        fontWeight: '600',
                        color: '#371f1f90',
                    }}
                >Подарочный сертификат на 20к рублей, а также по 10 сертификатов на 1500, 1000 и 500 рублей</Typography>

                <Box
                    sx={{
                        backgroundColor: '#fff',
                        backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                        minHeight: '18em',
                        maxHeight: '18em',
                        minWidth: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '1em'
                    }}
                ></Box>

                <Box
                    sx={{
                        borderRadius: '1em',
                        cursor: 'pointer',
                        p: '.8em',
                        backgroundColor: '#f44336',
                        textAlign: 'center'
                    }}
                    onClick={() => tg.openTelegramLink('https://t.me/IVANOV_SHOP')}
                >
                    <Typography
                        sx={{
                            fontSize: '1em',
                            fontWeight: '600',
                            color: '#fff',
                        }}
                    >Перейти в @vano_poizon</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    p: '1em .5em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.8em',
                        fontWeight: '700',
                        color: '#371f1f',
                        lineHeight: '1.1'
                    }}
                >Сделай <span style={{ color: '#f44336' }}>любой заказ</span> <br /> 1 -31 октября</Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        fontWeight: '600',
                        color: '#371f1f90',
                    }}
                >Каждый заказ повышает шанс выиграть</Typography>

                <Box
                    sx={{
                        backgroundColor: '#fff',
                        backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                        minHeight: '18em',
                        maxHeight: '18em',
                        minWidth: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '1em'
                    }}
                ></Box>

                <Box
                    sx={{
                        borderRadius: '1em',
                        p: '.8em',
                        cursor: 'pointer',
                        backgroundColor: '#f44336',
                        textAlign: 'center'
                    }}
                    onClick={() => navigate('/')}
                >
                    <Typography
                        sx={{
                            fontSize: '1em',
                            fontWeight: '600',
                            color: '#fff',
                        }}
                    >За покупками</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    p: '1em .5em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.8em',
                        fontWeight: '700',
                        color: '#371f1f',
                        lineHeight: '1.1'
                    }}
                >Оставь <span style={{ color: '#f44336' }}>отзыв с фото</span></Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        fontWeight: '600',
                        color: '#371f1f90',
                    }}
                >Каждый отзыв повышает шанс выиграть</Typography>

                <Box
                    sx={{
                        backgroundColor: '#fff',
                        backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                        minHeight: '18em',
                        maxHeight: '18em',
                        minWidth: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '1em'
                    }}
                ></Box>

                <Box
                    sx={{
                        borderRadius: '1em',
                        p: '.8em',
                        backgroundColor: '#f44336',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => tg.openTelegramLink('https://t.me/@vano_poizon')}
                >
                    <Typography
                        sx={{
                            fontSize: '1em',
                            fontWeight: '600',
                            color: '#fff',
                        }}
                    >Оставить отзыв</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        backgroundImage: `url(https://cs4.pikabu.ru/post_img/2016/06/25/7/1466849861168796736.png)`,
                        minHeight: '18em',
                        p: '1em .5em',
                        maxHeight: '18em',
                        minWidth: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '1em 1em 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.8em',
                            fontWeight: '700',
                            color: '#fff',
                        }}
                    >Главный приз - прыжок с 207 метров!</Typography>
                    <Typography
                        sx={{
                            fontSize: '1em',
                            fontWeight: '600',
                            color: '#fff',
                        }}
                    >Билет в Cочи,
                        сопровождение в Скай Парк,
                        организация прыжка</Typography>
                </Box>

                <Box
                    sx={{
                        p: '1em .5em',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.3em',
                            fontWeight: '600',
                            color: '#371f1f',
                        }}
                    >Для участия – достаточно участвовать в любом из розыгрышей</Typography>
                    <Typography
                        sx={{
                            fontSize: '.9em',
                            fontWeight: '500',
                            color: '#371f1f80',
                        }}
                    >Сделать покупку в Октябре, оставить отзыв на товар или быть подписанным на @poizonshop</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundImage: `url(https://cs4.pikabu.ru/post_img/2016/06/25/7/1466849861168796736.png)`,
                    p: '1em .5em',
                    minHeight: '20em',
                    minWidth: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(180deg, rgba(55,31,31,0) 0%, rgba(255,255,255,1) 91%)'
                }}
            >
                <Box
                    sx={{
                        p: '1em .5em',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1em',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '1.8em',
                                fontWeight: '700',
                                color: '#371f1f',
                                lineHeight: 1,
                                pb: '.2em',
                            }}
                        >Подведение <br /> итогов</Typography>

                        <Typography
                            sx={{
                                fontSize: '.9em',
                                fontWeight: '600',
                                color: '#371f1f',
                            }}
                        >в Telegram-канале <br /> @vano_poizon</Typography>
                    </Box>

                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '3em',
                                fontWeight: '900',
                                color: '#371f1f',
                                lineHeight: '1'
                            }}
                        >01</Typography>

                        <Typography
                            sx={{
                                fontSize: '.9em',
                                fontWeight: '900',
                                color: '#371f1f',
                            }}
                        >ноября</Typography>
                    </Box>
                </Box>

                <Box
                    onClick={() => tg.openTelegramLink('https://t.me/IVANOV_SHOP')}
                    sx={{
                        cursor: 'pointer',
                        border: '2px solid #f44336',
                        borderRadius: '1em',
                        p: '.8em',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1em',
                            color: '#f44336',
                            fontWeight: '600'
                        }}
                    >Перейти в @vano_poizon</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ContestPage;