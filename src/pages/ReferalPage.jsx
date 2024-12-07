import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import Diversity1Icon from '@mui/icons-material/Diversity1';

import { copyOnCLickHandle } from "../utils/utilFuncs";

const ReferalPage = () => {
    const inputRef = useRef(null);
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    const rows = [
        { title: 'Переходов по ссылке', value: '0' },
        { title: 'Сделали заказов', value: '0' },
        { title: 'Всего баллов заработано', value: '0' },
    ];

    return (
        <Box
            sx={{
                p: '.5em',
                pb: '3.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#2E2E3A',
                    p: '1em',
                    borderRadius: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Diversity1Icon
                        sx={{
                            fontSize: '6em',
                            color: '#F34213',
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        color: '#fff',
                        fontWeight: '900',
                        fontSize: '1.5em'
                    }}
                >
                    Приглашай друзей! <br /> Дарим по <span style={{ color: '#F34213' }}>500 рублей</span> каждому!
                </Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '500'
                    }}
                >
                    Получи за каждое приглашение по твоей реферальной ссылке <span style={{ color: '#F34213' }}>500 баллов</span>. Также <span style={{ color: '#F34213' }}>500 баллов</span> получит твой друг.
                </Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: '500'
                    }}
                >
                    <span style={{ color: '#F34213' }}>1 балл</span> = 1 рубль. <br /> Баллами можно оплачивать до 100% покупок.
                </Typography>

                <Box
                    sx={{
                        backgroundColor: '#202029',
                        p: '1em',
                        borderRadius: '1em',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.9em',
                            fontWeight: '500'
                        }}
                    >
                        Баллы начисляются после того, как приглашённый пользователь совершит покупку.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#2E2E3A',
                    p: '1em',
                    borderRadius: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5em',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: '700'
                        }}
                    >
                        Твоя ссылка на приглашение
                    </Typography>
                    <Typography
                        ref={inputRef}
                        sx={{
                            color: '#709ed9',
                            fontWeight: '700',
                            fontSize: '1em'
                        }}
                    > https://t.me/</Typography>

                    <Button
                        onClick={() => { copyOnCLickHandle(inputRef.current.textContent) }}
                        variant="outlined"
                        size="large"
                    >
                        Скопировать
                    </Button>
                </Box>

                <Box
                    sx={{
                        backgroundColor: '#202029',
                        p: '1em',
                        borderRadius: '1em',
                    }}
                >
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
                                                p: '.2em',
                                                fontSize: '.9em',
                                                color: '#ffffff',
                                                textAlign: 'left',
                                                fontWeight: '500',
                                            }}
                                        >{row.title}</TableCell>
                                        <TableCell
                                            sx={{
                                                p: '.2em',
                                                fontSize: '.9em',
                                                color: '#fff',
                                                textAlign: 'right',
                                                fontWeight: '500',
                                            }}
                                        >{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box >
    );
}

export default ReferalPage;