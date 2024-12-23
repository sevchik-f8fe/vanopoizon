import { Box, Button, Typography } from "@mui/material";

import { useOrders } from "./store";
import { nanoid } from "nanoid";

const OrdersPage = () => {
    const { showDone, orders } = useOrders();

    return (
        <Box
            sx={{
                p: '2em .5em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.5em'
            }}
        >
            <Typography
                sx={{
                    fontSize: '.9em',
                    color: '#fff',
                    mb: '.5em',
                    fontWeight: '900',
                }}
            >Заказы</Typography>

            <FilterComponent />

            {showDone ? (
                orders
                    .filter(elem => elem.status !== 'завершён')
                    .map(elem => <OrderElement key={nanoid()} orderId={elem.orderId} date={elem.date} status={elem.status} title={elem.title} photoUrl={elem.photoUrl} products={elem.products} isMark={elem.isMark} deliveryType={elem.deliveryType} />)
            ) : (
                orders
                    .filter(elem => elem.status === 'завершён')
                    .map(elem => <OrderElement key={nanoid()} orderId={elem.orderId} date={elem.date} status={elem.status} title={elem.title} photoUrl={elem.photoUrl} products={elem.products} isMark={elem.isMark} deliveryType={elem.deliveryType} />)
            )}
            {/* <Typography
                sx={{
                    color: '#fff5',
                    fontSize: '.75em',
                    fontWeight: '600',
                }}
            >У вас ещё нет заказов в магазине IVAN IVANOV :(</Typography> */}
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
                    sx={{
                        transition: '.3s ease',
                        fontSize: '.9em',
                        fontWeight: '700',
                        ...(showDone && {
                            color: '#fff',
                        }),
                        ...(!showDone && {
                            color: '#fff5',
                        }),
                    }}
                >В процессе</Typography>
            </Box>

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
                    sx={{
                        transition: '.3s ease',
                        fontSize: '.9em',
                        fontWeight: '700',
                        ...(!showDone && {
                            color: '#fff',
                        }),
                        ...(showDone && {
                            color: '#fff5',
                        }),
                    }}
                >Завершённые</Typography>
            </Box>
        </Box>
    );
}

const OrderElement = ({ date, status, orderId, products, deliveryType, isMark }) => {
    const statusColors = {
        'на рассмотрении': '#ffffff',
        'прибыл на склад в Китае': '#709ed9',
        'прибыл на склад в Москву': '#709ed9',
        'прибыл в ваш город': '#709ed9',
        'готов к выдаче': '#19DB40',
        'завершён': '#686A69',
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
                    sx={{
                        color: statusColors[status],
                        fontSize: '.9em',
                        fontWeight: '700',
                    }}
                >Заказ {status}</Typography>
                <Box
                    sx={{
                        p: '.1em .3em',
                        borderRadius: '.5em',
                        backgroundColor: `${statusColors[status]}10`
                    }}
                >
                    <Typography
                        sx={{
                            color: `${statusColors[status]}50`,
                            fontSize: '.8em',
                            fontWeight: '600',
                        }}
                    >#{orderId}</Typography>
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
                <Typography
                    sx={{
                        color: '#fff8',
                        fontSize: '.75em',
                        fontWeight: '500',
                    }}
                >Заказ от {date} на сумму {fullPrice} руб.</Typography>
                <Typography
                    sx={{
                        color: '#fff8',
                        fontSize: '.75em',
                        fontWeight: '500',
                    }}
                >Доставка {deliveryType}</Typography>

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
                border: '1px solid #fff3',
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
                    minHeight: '6em',
                    minWidth: '6em',
                    maxWidth: '6em',
                }}
            ></Box>
            <Typography
                sx={{
                    p: '.2em .5em',
                    color: '#fff8',
                    fontSize: '.75em',
                    fontWeight: '500',
                }}
            >{price}</Typography>
        </Box>
    );
}

export default OrdersPage;