import { Box, Typography, IconButton, Button, Link } from "@mui/material";
import { nanoid } from "nanoid";
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { useProductPage } from "./store";
import ContestContainer from "../../components/ContestContainer";
import ArcticleContainer from "../../components/Arcticles/ArticleContainer";
import TableOfSizes from "./TableOfSizes";

const ProductPage = () => {
    const navigate = useNavigate();
    const { currentPage } = useProductPage();
    let tg = window.Telegram.WebApp;
    let mainBtn = tg?.MainButton;

    tg.onEvent('backButtonClicked', function () {
        navigate(-1);
        mainBtn.hide();
    });

    return (
        <>
            {currentPage == 'productPage' ? (
                <ProductPageContainer />
            ) : (
                <TableOfSizes />
            )}
        </>
    );
};

const ProductPageContainer = () => {
    const { setAccordion, accordion } = useProductPage();
    let tg = window.Telegram.WebApp;

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: "#fff",
                    minWidth: '100%',
                    p: '.5em',
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
                            tg.switchInlineQuery('ааааа бля')
                        }}
                        sx={{
                            backgroundColor: '#fff'
                        }}
                    >
                        <ShareIcon
                            sx={{
                                color: '#F34213',

                            }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: '#fff'
                        }}
                    >
                        <FavoriteBorderIcon
                            sx={{
                                color: '#F34213'
                            }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: '#fff'
                        }}
                    >
                        <AddShoppingCartIcon
                            sx={{
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
                        mt: '.5em', mb: '1em',
                        color: '#202029',
                        fontSize: '1.6em',
                        fontWeight: '900',
                        lineHeight: '1.2',
                    }}
                >
                    Бобёр коричнеый б\у <br />
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    top: '-1em',
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
                        borderBottom: '1px solid #ffffff60',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.8em',
                            fontWeight: '900',
                            color: '#fff',
                        }}
                    >
                        12 000 &#8381;
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: '.75em',
                            fontWeight: '500',
                            color: '#ffffff60',
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
                    >
                        Доставка
                    </Typography>

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
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >
                        Среднее время доставки 20–25 дней. После оплаты вы сможете отслеживать статусы доставки и получать уведомления об их изменении.
                    </Typography>
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
                        Страховка и безопасность
                    </Typography>
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
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >
                        В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности.
                    </Typography>
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
    const { setCurrentPage } = useProductPage();
    let tg = window.Telegram.WebApp;
    let backBtn = tg?.BackButton;
    let mainBtn = tg?.MainButton;

    return (
        <Box
            sx={{
                p: '.5em 0',
                borderBottom: '1px solid #ffffff60'
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
                        setCurrentPage('sizes')
                        mainBtn.hide();
                        backBtn.show();
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
            sx={
                (currentSize == size) ? (
                    {
                        display: 'flex',
                        cursor: 'pointer',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: '.5em',
                        alignItems: 'center',
                        borderRadius: '.5em',
                        minWidth: 'fit-content',
                        border: '1px solid #fff',
                    }
                ) : (
                    {
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: '.5em',
                        alignItems: 'center',
                        borderRadius: '.5em',
                        minWidth: 'fit-content',
                        border: '1px solid #ffffff20',
                    }
                )
            }
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

    return (
        <Box
            sx={{
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
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '700',
                        pb: '.5em'
                    }}
                >Можно оплатить в сплит</Typography>
                <IconButton
                    onClick={() => tg.openLink('https://mui.com/')}
                    size="small"
                >
                    <InfoIcon sx={{
                        color: '#709ed9',
                        fontSize: '1em'
                    }} />
                </IconButton>
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
                            color: '#ffffff60',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >Сейчас</Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontSize: '1.5em',
                            fontWeight: '700',
                        }}
                    >6 000 &#8381;</Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: '#ffffff60',
                            fontSize: '.9em',
                            fontWeight: '500',
                        }}
                    >Через 3 недели</Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontSize: '1.5em',
                            fontWeight: '700',
                        }}
                    >6 000 &#8381;</Typography>
                </Box>
            </Box>
        </Box>
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
                    alignItems: 'end', borderBottom: '1px solid #ffffff60',
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
                    borderBottom: '1px solid #ffffff60',
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