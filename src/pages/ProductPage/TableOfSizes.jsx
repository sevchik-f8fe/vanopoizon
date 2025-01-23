import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect } from "react";

import { useProductPage } from "./store";

const TableOfSizes = () => {
    let tg = window.Telegram.WebApp;
    const { product } = useProductPage();

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, []);

    const takeHeadsFromArray = (arr) => arr.map((elem) => elem.sizeKey);

    const transformSizeArray = (arr) => {
        const result = [];
        const sizeValues = arr.map(item => item.sizeValue.split(','));

        for (let i = 0; i < Math.max(...sizeValues.map(arr => arr.length)); i++) {
            const row = {};

            arr.forEach((item, index) => {
                const sizeKey = item.sizeKey;
                row[sizeKey] = sizeValues[index][i] || '-'; // Используем null для отсутствующих значений
            });

            result.push(row);
        }
        return result;
    }

    return (
        <Box
            sx={{
                p: '.5em',
                pt: '4em'
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
                <Typography variant="h2" sx={{ p: '.5em' }}>Таблица размеров</Typography>
            </Box>

            <TableContainer
                component={Box}
                size='small'
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                    aria-label="size table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                'td,th': { border: 0 }
                            }}
                        >
                            {takeHeadsFromArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((header) => (
                                <TableCell
                                    sx={{
                                        p: '.5em',
                                        fontSize: '.9em',
                                        color: '#ffffff50',
                                        fontWeight: '600',
                                        textAlign: 'left',
                                    }}
                                    key={nanoid()}
                                >{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transformSizeArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((row) => (
                            <TableRow
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                                key={nanoid()}
                            >
                                {takeHeadsFromArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((header) => (
                                    <TableCell component="th"
                                        scope="row"
                                        align="left"
                                        sx={{
                                            fontSize: '.9em',
                                            color: '#ffffff',
                                            p: '.5em',
                                            fontWeight: '500',
                                        }} key={nanoid()}
                                    >{row[header]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 
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
                            {takeHeadsFromArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((elem) => <TableCell
                                key={nanoid()}
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                }}
                            >{elem}</TableCell>)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transformSizeArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((row) => (
                            <TableRow
                                key={nanoid()}
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                            >
                                {takeHeadsFromArray(product.sizeDto.sizeInfo.sizeTemplate.list).map((elem) => <TableCell
                                    key={nanoid()}
                                    component="th"
                                    scope="row"
                                    align="right"
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#ffffff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}
                                >{row[elem]}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Box>
    );
}

export default TableOfSizes;