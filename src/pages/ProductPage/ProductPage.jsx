import { Box, Typography, IconButton, Button, Link, Switch } from "@mui/material";
import { nanoid } from "nanoid";
import { shareURL } from '@telegram-apps/sdk';
import { useEffect } from "react";
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";

import { useBottomBoard } from "../../components/BottomBoard/store";
import { useProductPage } from "./store";
import ContestContainer from "../../components/ContestContainer";
import ArcticleContainer from "../../components/Arcticles/ArticleContainer";
import { showShineMainBtn } from "../../utils/utilFuncs";
import gliffIcon from "../../assets/high-voltage_icon.png";

const ProductPage = () => {
    const { setAccordion, accordion, isSplit, useExpressDelivery, setUseExpressDelivery, useInsurance, setUseInsurance } = useProductPage();
    const { setCurrentPage, setVisible } = useBottomBoard();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        showShineMainBtn(12000);
        setCurrentPage('home');
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: "#fff",
                    minWidth: '100%',
                    // p: '.2em',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        top: '1em',
                        right: '1em',
                        position: 'absolute',
                        zIndex: '20',
                        gap: '.5em',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            shareURL('https://core.telegram.org', 'Оййй бляяя');
                        }}
                        sx={{
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#fff',
                            },
                            '&:active': {
                                backgroundColor: '#fff9',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        <ShareIcon
                            sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#F34213',
                            }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#fff',
                            },
                            '&:active': {
                                backgroundColor: '#fff9',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        <FavoriteBorderIcon
                            sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#F34213'
                            }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#fff',
                            },
                            '&:active': {
                                backgroundColor: '#fff9',
                            },
                            maxWidth: '1.5em',
                            maxHeight: '1.5em'
                        }}
                    >
                        <AddShoppingCartIcon
                            sx={{
                                maxWidth: '.8em',
                                maxHeight: '.8em',
                                color: '#F34213'
                            }}
                        />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        backgroundImage: `url(https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-bober-png-1.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minWidth: 'calc(100%)',
                        minHeight: '13em',
                    }}
                >
                </Box>

                <Typography
                    sx={{
                        color: '#202029',
                        fontSize: '1.6em',
                        fontWeight: '900',
                        lineHeight: '1.2',
                        p: '.5em',
                    }}
                >
                    Бобёр коричнеый б\у <br />
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    top: '-.5em',
                    borderRadius: '1em',
                    backgroundColor: '#2E2E3A',
                    p: '.5em .8em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                }}
            >
                <Box
                    sx={{
                        pb: '.5em',
                        borderBottom: '1px solid #ffffff30',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontSize: '1.8em',
                            transition: '.3s ease',
                            fontWeight: '900',
                            ...(!isSplit && {
                                color: '#ffffff',
                            }),
                            ...(isSplit && {
                                color: '#ffffff50',
                            }),
                        }}
                    >
                        12 000 &#8381;
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: '.75em',
                            fontWeight: '500',
                            color: '#ffffff50',
                        }}
                    >
                        Оплачивая заказ, вы соглашаетесь с условиями <Link
                            sx={{
                                color: '#709ed9',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                            onClick={() => { tg.openLink('https://ru.wikipedia.org/wiki/%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B0') }}
                        >публичной оферты</Link>
                    </Typography>
                </Box>

                <SizesContainer />
                <SplitContainer />
                <UsePointsContainer />
            </Box>

            <ContestContainer />

            <Box
                sx={{
                    p: '.5em .8em',
                    m: '.5em 0',
                    borderRadius: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700',
                        p: '.5em 0'
                    }}
                >
                    Полезная информация
                </Typography>
                <ArcticleContainer />
            </Box>

            <Box
                sx={{
                    p: '.5em .8em',
                    mb: '.5em',
                    borderRadius: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: '700',
                            p: '.5em 0'
                        }}
                    >Доставка</Typography>

                    <IconButton
                        onClick={() => setAccordion('delivery')}
                    >
                        {(accordion.delivery === true) ? (
                            <ExpandLessIcon
                                sx={{
                                    color: '#fff',
                                }}
                            />
                        ) : (
                            <ExpandMoreIcon
                                sx={{
                                    color: '#fff'
                                }}
                            />
                        )}
                    </IconButton>
                </Box>
                {(accordion.delivery === true) && (
                    <>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '.9em',
                                fontWeight: '500',
                            }}
                        >
                            Среднее время доставки 20–25 дней. После оплаты вы сможете отслеживать статусы доставки и получать уведомления об их изменении.
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: '#202029',
                                borderRadius: '.5em',
                                p: '.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5em',
                                mt: '.5em'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '.2em',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundImage: `url(${gliffIcon})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            minWidth: '1.4em',
                                            minHeight: '1.4em',
                                            maxWidth: '1.4em',
                                            maxHeight: '1.4em',
                                        }}
                                    ></Box>

                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontWeight: '700',
                                            fontSize: '.9em'
                                        }}
                                    >
                                        Экспресс-доставка
                                    </Typography>
                                    <IconButton
                                        size="small"
                                    >
                                        <InfoIcon
                                            sx={{
                                                fontSize: '1.2em',
                                                color: '#709ed9'
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                <Switch
                                    checked={useExpressDelivery}
                                    onChange={(e) => setUseExpressDelivery(e.target.checked)}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    pl: '1em',
                                    color: '#fff',
                                    fontWeight: '500',
                                    fontSize: '.9em'
                                }}
                            >
                                Доставка за 9-12 дней <span style={{ paddingLeft: '1em' }}>+ 3 400 &#8381;</span>
                            </Typography>
                        </Box>
                    </>
                )}

            </Box>

            <Box
                sx={{
                    p: '.5em .8em',
                    mb: '.5em',
                    borderRadius: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '1em',
                                fontWeight: '700',
                                p: '.5em 0'
                            }}
                        >
                            Страховка и безопасность
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={() => setAccordion('insurance')}
                    >
                        {(accordion.insurance === true) ? (
                            <ExpandLessIcon
                                sx={{
                                    color: '#fff',
                                }}
                            />
                        ) : (
                            <ExpandMoreIcon
                                sx={{
                                    color: '#fff'
                                }}
                            />
                        )}
                    </IconButton>
                </Box>

                {(accordion.insurance === true) && (
                    <>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '.9em',
                                fontWeight: '500',
                            }}
                        >
                            В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности.
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: '#202029',
                                borderRadius: '.5em',
                                p: '.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5em',
                                mt: '.5em'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '.2em',
                                        alignItems: 'center',
                                    }}
                                >
                                    <HealthAndSafetyIcon
                                        sx={{
                                            fontSize: '1.5em',
                                            color: '#fff'
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontWeight: '700',
                                            fontSize: '.9em'
                                        }}
                                    >
                                        Страховка
                                    </Typography>
                                    <IconButton
                                        size="small"
                                    >
                                        <InfoIcon
                                            sx={{
                                                fontSize: '1.2em',
                                                color: '#709ed9'
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                <Switch
                                    checked={useInsurance}
                                    onChange={(e) => setUseInsurance(e.target.checked)}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    pl: '1em',
                                    color: '#fff',
                                    fontWeight: '500',
                                    fontSize: '.9em'
                                }}
                            >
                                Если пиздец <span style={{ paddingLeft: '1em' }}>+ 3 400 &#8381;</span>
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    p: '.5em .8em',
                    mb: '.5em',
                    borderRadius: '.5em',
                    backgroundColor: '#2E2E3A'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: '700',
                            p: '.5em 0'
                        }}
                    >
                        Строго оригинал
                    </Typography>
                    <IconButton
                        onClick={() => setAccordion('original')}
                    >
                        {(accordion.original === true) ? (
                            <ExpandLessIcon
                                sx={{
                                    color: '#fff',
                                }}
                            />
                        ) : (
                            <ExpandMoreIcon
                                sx={{
                                    color: '#fff'
                                }}
                            />
                        )}
                    </IconButton>
                </Box>

                {(accordion.original === true) && (
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >
                        Мы гарантируем, что все купленные товары в Unicorn оригинальные и прошли проверку на подлинность. Если по каким-то причинам у вас на руках окажется подделка — мы вернем деньги в двойном размере.
                    </Typography>
                )}
            </Box>

            <ReviewContainer />

            <AddOnsContainer />
        </Box>
    );
};

const SizesContainer = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: '.5em 0',
                borderBottom: '1px solid #ffffff30'
            }}
        >
            <Box

                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'end'
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700'
                    }}
                >Размер (EU)</Typography>
                <Typography
                    onClick={() => {
                        navigate('/sizes');
                    }}
                    sx={{
                        cursor: 'pointer',
                        color: '#709ed9',
                        fontSize: '.75em',
                        fontWeight: '500'
                    }}
                >Таблица размеров</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.5em',
                    p: '.5em 0',
                    overflowX: 'scroll',
                }}
            >
                {[30, 31, 32, 33, 34, 35, 36, 37, 38, 39].map((elem) => <SizesElement key={nanoid()} size={elem} price='12 000' />)}
            </Box>
        </Box>
    );
};

const SizesElement = ({ size, price }) => {
    const { currentSize, setCurrentSize } = useProductPage();

    return (
        <Box
            onClick={() => { setCurrentSize(size) }}
            sx={{
                display: 'flex',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'center',
                p: '.5em',
                alignItems: 'center',
                borderRadius: '.5em',
                minWidth: 'fit-content',
                ...(currentSize == size && {
                    border: '1px solid #fff',
                }),
                ...(currentSize != size && {
                    border: '1px solid #ffffff30',
                }),
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '.9em',
                    fontWeight: '500'
                }}
            >{size}</Typography>
            <Typography
                sx={{
                    color: '#ffffff50',
                    fontSize: '.6em',
                    fontWeight: '400'
                }}
            >{price} &#8381;</Typography>
        </Box>
    );
};

const SplitContainer = () => {
    let tg = window.Telegram.WebApp;
    const { setSplit, isSplit } = useProductPage();

    return (
        <Box
            sx={{
                borderBottom: '1px solid #ffffff30',
                p: '.5em 0',
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
                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'start',
                        justifyContent: 'start'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: '700',
                        }}
                    >Оплатить в сплит</Typography>

                    <IconButton
                        onClick={() => tg.openLink('https://mui.com/')}
                        size="small"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:active': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <InfoIcon sx={{
                            color: '#709ed9',
                            fontSize: '1em'
                        }} />
                    </IconButton>
                </Box>

                <Switch
                    checked={isSplit}
                    onChange={(e) => setSplit(e.target.checked)}
                />

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '3em',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            color: '#ffffff50',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >Сейчас</Typography>
                    <Typography
                        sx={{
                            fontSize: '1.5em',
                            transition: '.3s ease',
                            fontWeight: '900',
                            ...(isSplit && {
                                color: '#ffffff',
                            }),
                            ...(!isSplit && {
                                color: '#ffffff50',
                            }),
                        }}
                    >6 000 &#8381;</Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: '#ffffff50',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >Через 3 недели</Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontSize: '1.5em',
                            fontWeight: '900',
                            transition: '.3s ease',
                            ...(isSplit && {
                                color: '#ffffff',
                            }),
                            ...(!isSplit && {
                                color: '#ffffff50',
                            }),
                        }}
                    >6 000 &#8381;</Typography>
                </Box>
            </Box>
        </Box>
    );
}

const UsePointsContainer = () => {
    const { setUsePoints, usePoints } = useProductPage();

    return (
        <Box
            sx={{
                p: '.5em 0',
            }}
        >
            <Typography
                sx={{
                    color: '#F34213',
                    fontSize: '1em',
                    fontWeight: '700',
                }}
            >
                Баллы PoizonShop
            </Typography>

            <Box
                sx={{
                    p: '2px',
                    mt: '.5em',
                    backgroundColor: '#202029',
                    borderRadius: '.5em',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 'fit-content',
                    gap: '1em',
                }}
            >
                <Box
                    onClick={() => setUsePoints(true)}
                    sx={{
                        transition: '.3s ease',
                        cursor: 'pointer',
                        p: '.5em .8em',
                        borderRadius: '.5em',
                        ...(usePoints && {
                            backgroundColor: '#2E2E3A',
                        }),
                        ...(!usePoints && {
                            backgroundColor: 'transparent',
                        }),
                    }}
                >
                    <Typography
                        sx={{
                            transition: '.3s ease',
                            fontSize: '.9em',
                            fontWeight: '700',
                            ...(usePoints && {
                                color: '#fff',
                            }),
                            ...(!usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Начислить <span style={usePoints ? { color: '#F34213' } : { color: '#Fff5' }} > 50</span></Typography>
                </Box>

                <Box
                    onClick={() => setUsePoints(false)}
                    sx={{
                        transition: '.3s ease',
                        cursor: 'pointer',
                        p: '.5em .8em',
                        borderRadius: '.5em',
                        ...(!usePoints && {
                            backgroundColor: '#2E2E3A',
                        }),
                        ...(usePoints && {
                            backgroundColor: 'transparent',
                        }),
                    }}
                >
                    <Typography
                        sx={{
                            transition: '.3s ease',
                            fontSize: '.9em',
                            fontWeight: '700',
                            ...(!usePoints && {
                                color: '#fff',
                            }),
                            ...(usePoints && {
                                color: '#fff5',
                            }),
                        }}
                    >Списать <span style={!usePoints ? { color: '#F34213' } : { color: '#fff5' }}>0</span></Typography>
                </Box>
            </Box>
        </Box >
    );
}

const ReviewContainer = () => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            sx={{
                mb: '.5em',
                p: '.5em .8em',
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '1em',
                    fontWeight: '700',
                    pb: '.5em'
                }}
            >
                Отзывы
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em',
                    overflowX: 'scroll',
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => <ReviewElement key={nanoid()} src={'https://poizonshop-webapp.vercel.app/_next/static/media/chat-01.ac2d9903.png?w=1200&q=75'} />)}
            </Box>

            <Button
                onClick={() => { tg.openTelegramLink('https://t.me/reviews_12345') }}
                variant="outlined"
                size="large"
                sx={{
                    m: '.5em 0'
                }}
            >
                Открыть все отзывы
            </Button>
        </Box>
    );
}

const ReviewElement = ({ src }) => {
    return (
        <Box
            sx={{
                minWidth: '70%',
                maxWidth: '70%',
            }}
        >
            <img style={{ width: '100%' }} src={src} />
        </Box>
    );
}

const AddOnsContainer = ({ linkPoizon }) => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            sx={{
                p: '.5em .8em',
                borderRadius: '.5em .5em 0 0',
                backgroundColor: '#2E2E3A',
                display: 'flex',
                gap: '1em',
                flexDirection: 'column',
            }}
        >
            <Box
                onClick={() => { tg.openLink(linkPoizon) }}
                sx={{
                    cursor: 'pointer',
                    p: '1em 0',
                    display: 'flex',
                    gap: '.5em',
                    alignItems: 'end', borderBottom: '1px solid #ffffff30',
                    pb: '.5em',
                }}
            >
                <OpenInNewIcon
                    sx={{
                        color: '#F34213',
                        fontSize: '1.2em'
                    }}
                />
                <Typography
                    sx={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: '.9em'
                    }}
                >Открыть этот товар в Poizon</Typography>
            </Box>

            <Box
                onClick={() => {

                }}
                sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ffffff30',
                    pb: '.5em',
                    display: 'flex',
                    gap: '.5em',
                    alignItems: 'center',
                }}
            >
                <SendIcon
                    sx={{
                        color: '#F34213',
                        fontSize: '1.2em'
                    }}
                />
                <Typography
                    sx={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: '.9em'
                    }}
                >Отправить заказ в чат оператору</Typography>
            </Box>
        </Box>
    );
}

export default ProductPage;