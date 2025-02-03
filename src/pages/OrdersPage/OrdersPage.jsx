import { Box, Button, Typography } from "@mui/material";

import { useOrders } from "./store";
import { nanoid } from "nanoid";
import { copyOnCLickHandle } from "../../utils/utilFuncs";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const OrdersPage = () => {
    const { showDone, orders } = useOrders();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.5em'
            }}
        >
            <Typography variant="h6" sx={{ mb: '.5em' }}>Заказы</Typography>

            <FilterComponent />

            {!showDone ? (
                (orders.filter(elem => elem.status !== 'done').length > 0) ? (
                    orders
                        .filter(elem => elem.status !== 'done')
                        .map(elem => <OrderElement key={nanoid()} address={elem.address} orderId={elem.orderId} date={elem.date} status={elem.status} label={elem.label} products={elem.products} isMark={elem.isMark} deliveryType={elem.deliveryType} />)
                ) : (
                    <Typography variant="subtitle2">
                        У вас нет завершенных заказов в магазине IVAN IVANOV :(</Typography>
                )
            ) : (
                (orders.filter(elem => elem.status === 'done').length > 0) ? (
                    orders
                        .filter(elem => elem.status === 'done')
                        .map(elem => <OrderElement key={nanoid()} address={elem.address} orderId={elem.orderId} date={elem.date} status={elem.status} label={elem.label} products={elem.products} isMark={elem.isMark} deliveryType={elem.deliveryType} />)
                ) : (
                    <Typography variant="subtitle2">
                        У вас нет активных заказов в магазине IVAN IVANOV :(</Typography>
                )
            )}
        </Box>
    );
}

const FilterComponent = () => {
    const { showDone, setShowDone } = useOrders();

    return (
        <Box
            sx={{
                p: '2px',
                backgroundColor: '#2E2E3A',
                // backgroundColor: '#202029',
                borderRadius: '.5em',
                display: 'flex',
                alignItems: 'center',
                maxWidth: 'fit-content',
                gap: '1em',
            }}
        >
            <Box
                onClick={() => setShowDone(false)}
                sx={{
                    transition: '.3s ease',
                    cursor: 'pointer',
                    p: '.5em .8em',
                    borderRadius: '.5em',
                    ...(!showDone && {
                        backgroundColor: '#202029',
                    }),
                    ...(showDone && {
                        backgroundColor: 'transparent',
                    }),
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        transition: '.3s ease',
                        ...(!showDone && {
                            color: '#fff',
                        }),
                        ...(showDone && {
                            color: '#fff5',
                        }),
                    }}
                >В процессе</Typography>
            </Box>

            <Box
                onClick={() => setShowDone(true)}
                sx={{
                    transition: '.3s ease',
                    cursor: 'pointer',
                    p: '.5em .8em',
                    borderRadius: '.5em',
                    ...(showDone && {
                        backgroundColor: '#202029',
                    }),
                    ...(!showDone && {
                        backgroundColor: 'transparent',
                    }),
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        transition: '.3s ease',
                        ...(showDone && {
                            color: '#fff',
                        }),
                        ...(!showDone && {
                            color: '#fff5',
                        }),
                    }}
                >Завершённые</Typography>
            </Box>
        </Box>
    );
}

const OrderElement = ({ date, status, orderId, address, products, deliveryType, isMark, label }) => {
    const statusColors = {
        'atView': '#ffffff',
        'onWay': '#709ed9',
        'readyForDone': '#19DB40',
        'done': '#686A69',
    }

    const fullPrice = products.reduce((sum, elem) => sum + elem.price, 0)

    return (
        <Box
            sx={{
                p: '.5em',
                border: `1px solid ${statusColors[status]}50`,
                borderRadius: '.5em',
                minWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em'
            }}
        >
            <Box
                sx={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    gap: '1em',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ color: statusColors[status] }}
                >{label}</Typography>
                <Box
                    onClick={(e) => {
                        e.stopPropagation();
                        copyOnCLickHandle(orderId);
                    }}
                    sx={{
                        p: '.2em .4em',
                        borderRadius: '.5em',
                        backgroundColor: `${statusColors[status]}10`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1em',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body1" sx={{ color: `${statusColors[status]}70` }}>#{orderId}</Typography>

                    <ContentCopyIcon
                        sx={{
                            color: `${statusColors[status]}70`,
                            fontSize: '1em'
                        }}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    // alignItems: 'center'
                }}
            >
                <Typography variant="subtitle2" sx={{ color: '#fff8' }}>
                    Заказ от {date} на сумму {fullPrice} руб.</Typography>
                <Typography variant="body1">Доставка {deliveryType}, {address}</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        flexWrap: 'wrap'
                    }}
                >
                    {products.map(elem => <ProductElement key={nanoid()} price={elem.price} picture={elem.photoUrl} />)}
                </Box>
            </Box>

            {(!isMark && status === 'завершён') && <Button
            >
                Оценить заказ</Button>
            }
        </Box>
    );
}

const ProductElement = ({ spuId, picture, price }) => {
    return (
        <Box
            sx={{
                border: '1px solid #fff2',
                borderRadius: '.5em'
            }}
        >
            <Box
                sx={{
                    borderRadius: '.5em .5em 0 0',
                    backgroundImage: `url(${picture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '6em',
                    maxHeight: '6em',
                    minWidth: '7em',
                    maxWidth: '7em',
                }}
            ></Box>
            <Typography variant="subtitle2"
                sx={{
                    p: '.2em .5em',
                    color: '#fff8',
                }}
            >{price}</Typography>
        </Box>
    );
}

export default OrdersPage;