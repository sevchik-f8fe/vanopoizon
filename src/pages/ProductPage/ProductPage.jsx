import { Box, Typography, IconButton, Button } from "@mui/material";
import { nanoid } from "nanoid";
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

import { showShineMainBtn } from "../../utils/utilFuncs";
import { useProductPage } from "./store";
import ContestContainer from "../../components/ContestContainer";
import ArcticleContainer from "../../components/Arcticles/ArticleContainer";
import TableOfSizes from "./TableOfSizes";

const ProductPage = () => {
    const navigate = useNavigate();
    const { currentPage, setCurrentPage } = useProductPage();
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
    //     <Box>
    //         <Box
    //             sx={{
    //                 backgroundColor: "#fff",
    //                 minWidth: '100%',
    //                 p: '.5em',
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     backgroundImage: `url(https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-bober-png-1.png)`,
    //                     backgroundSize: 'cover',
    //                     backgroundPosition: 'center',
    //                     backgroundRepeat: 'no-repeat',
    //                     minWidth: 'calc(100%)',
    //                     minHeight: '13em',
    //                 }}
    //             >
    //             </Box>

    //             <Typography
    //                 sx={{
    //                     mt: '.5em', mb: '1em',
    //                     color: '#202029',
    //                     fontSize: '1.5em',
    //                     fontWeight: '900'
    //                 }}
    //             >
    //                 Бобёр коричнеый б\у
    //             </Typography>
    //         </Box>

    //         <Box
    //             sx={{
    //                 position: 'relative',
    //                 top: '-1em',
    //                 borderRadius: '1em',
    //                 backgroundColor: '#2E2E3A',
    //                 p: '.5em .8em',
    //             }}
    //         >
    //             <Typography
    //                 sx={{
    //                     fontSize: '1.5em',
    //                     fontWeight: '700',
    //                     color: '#fff',
    //                     borderBottom: '1px solid #ffffff60',
    //                     pb: '.2em',
    //                 }}
    //             >
    //                 12 000 &#8381;
    //             </Typography>

    //             <SizesContainer />
    //             <SplitContainer />
    //         </Box>

    //         <ContestContainer />

    //         <Box
    //             sx={{
    //                 p: '.5em .8em',
    //                 m: '.5em 0',
    //                 borderRadius: '.5em',
    //                 backgroundColor: '#2E2E3A'
    //             }}
    //         >
    //             <Typography
    //                 sx={{
    //                     color: '#fff',
    //                     fontSize: '1em',
    //                     fontWeight: '700',
    //                     p: '.5em 0'
    //                 }}
    //             >
    //                 Полезная информация
    //             </Typography>
    //             <ArcticleContainer />
    //         </Box>

    //         <Box
    //             sx={{
    //                 p: '.5em .8em',
    //                 mb: '.5em',
    //                 borderRadius: '.5em',
    //                 backgroundColor: '#2E2E3A'
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '1em',
    //                         fontWeight: '700',
    //                         p: '.5em 0'
    //                     }}
    //                 >
    //                     Доставка
    //                 </Typography>

    //                 <IconButton
    //                     onClick={() => setAccordion('delivery')}
    //                 >
    //                     {(accordion.delivery === true) ? (
    //                         <ExpandLessIcon
    //                             sx={{
    //                                 color: '#fff',
    //                             }}
    //                         />
    //                     ) : (
    //                         <ExpandMoreIcon
    //                             sx={{
    //                                 color: '#fff'
    //                             }}
    //                         />
    //                     )}
    //                 </IconButton>
    //             </Box>
    //             {(accordion.delivery === true) && (
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '.9em',
    //                         fontWeight: '500',
    //                     }}
    //                 >
    //                     Среднее время доставки 20–25 дней. После оплаты вы сможете отслеживать статусы доставки и получать уведомления об их изменении.
    //                 </Typography>
    //             )}

    //         </Box>

    //         <Box
    //             sx={{
    //                 p: '.5em .8em',
    //                 mb: '.5em',
    //                 borderRadius: '.5em',
    //                 backgroundColor: '#2E2E3A'
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '1em',
    //                         fontWeight: '700',
    //                         p: '.5em 0'
    //                     }}
    //                 >
    //                     Страховка и безопасность
    //                 </Typography>
    //                 <IconButton
    //                     onClick={() => setAccordion('insurance')}
    //                 >
    //                     {(accordion.insurance === true) ? (
    //                         <ExpandLessIcon
    //                             sx={{
    //                                 color: '#fff',
    //                             }}
    //                         />
    //                     ) : (
    //                         <ExpandMoreIcon
    //                             sx={{
    //                                 color: '#fff'
    //                             }}
    //                         />
    //                     )}
    //                 </IconButton>
    //             </Box>

    //             {(accordion.insurance === true) && (
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '.9em',
    //                         fontWeight: '500',
    //                     }}
    //                 >
    //                     В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности.
    //                 </Typography>
    //             )}
    //         </Box>

    //         <Box
    //             sx={{
    //                 p: '.5em .8em',
    //                 mb: '.5em',
    //                 borderRadius: '.5em',
    //                 backgroundColor: '#2E2E3A'
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '1em',
    //                         fontWeight: '700',
    //                         p: '.5em 0'
    //                     }}
    //                 >
    //                     Строго оригинал
    //                 </Typography>
    //                 <IconButton
    //                     onClick={() => setAccordion('original')}
    //                 >
    //                     {(accordion.original === true) ? (
    //                         <ExpandLessIcon
    //                             sx={{
    //                                 color: '#fff',
    //                             }}
    //                         />
    //                     ) : (
    //                         <ExpandMoreIcon
    //                             sx={{
    //                                 color: '#fff'
    //                             }}
    //                         />
    //                     )}
    //                 </IconButton>
    //             </Box>

    //             {(accordion.original === true) && (
    //                 <Typography
    //                     sx={{
    //                         color: '#fff',
    //                         fontSize: '.9em',
    //                         fontWeight: '500',
    //                     }}
    //                 >
    //                     Мы гарантируем, что все купленные товары в Unicorn оригинальные и прошли проверку на подлинность. Если по каким-то причинам у вас на руках окажется подделка — мы вернем деньги в двойном размере.
    //                 </Typography>
    //             )}
    //         </Box>

    //         <ReviewContainer />
    //     </Box>
    // );
};

const ProductPageContainer = () => {
    const { setAccordion, accordion } = useProductPage();

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    minWidth: '100%',
                    p: '.5em',
                }}
            >
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
                        fontSize: '1.5em',
                        fontWeight: '900'
                    }}
                >
                    Бобёр коричнеый б\у
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    top: '-1em',
                    borderRadius: '1em',
                    backgroundColor: '#2E2E3A',
                    p: '.5em .8em',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.5em',
                        fontWeight: '700',
                        color: '#fff',
                        borderBottom: '1px solid #ffffff60',
                        pb: '.2em',
                    }}
                >
                    12 000 &#8381;
                </Typography>

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
        </Box>
    );
};

const SizesContainer = () => {
    const { currentPage, setCurrentPage } = useProductPage();
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
                        border: '1px solid #F34213',
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
                        border: '1px solid #ffffff60',
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

export default ProductPage;