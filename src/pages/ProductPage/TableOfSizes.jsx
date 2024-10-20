import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useBottomBoard } from "../../components/BottomBoard/store";

const TableOfSizes = () => {
    let tg = window.Telegram.WebApp;
    const { setCurrentPage, setVisible } = useBottomBoard();

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        tg.MainButton.hide();
        setCurrentPage('home');
    }, []);


    const rows = [
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35.5', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '41.5' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
        { EU: '35', MM: '220', US: 'M3/W4.5', UK: '2.5', RU: '-' },
    ];

    return (
        <Box
            sx={{
                p: '.5em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        p: '.5em',
                        fontSize: '1.5em',
                        color: '#ffffff',
                        fontWeight: '900',
                    }}
                >
                    Таблица размеров
                </Typography>
            </Box>

            <TableContainer
                component={Box}
                size='small'
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                    aria-label="status table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                'td,th': { border: 0 }
                            }}
                        >
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                }}
                            >EU</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >MM</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >US</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >UK</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >RU</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={nanoid()}
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#ffffff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}
                                >
                                    {row.EU}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontSize: '.9em',
                                        p: '.5em',
                                        color: '#fff',
                                        fontWeight: '500',
                                    }}
                                >{row.MM}</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}

                                    align="right"
                                >{row.US}</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}

                                    align="right"
                                >{row.UK}</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}

                                    align="right"
                                >{row.RU}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TableOfSizes;