import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { useFilters } from "../Catalog/store";
import { useEffect } from "react";

const Price = () => {
    const { values, setFieldValues, propsOfSearch } = useFilters();

    useEffect(() => {
        setFieldValues('highestPrice', propsOfSearch?.highestPrice?.value);
        setFieldValues('lowestPrice', propsOfSearch?.lowestPrice?.value)
    }, []);

    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '.8em',
                    color: '#fff',
                    fontWeight: '500',
                    mb: '.5em'
                }}
            >Цена</Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em'
                }}
            >
                <TextField
                    value={values.lowestPrice}
                    onChange={(e) => setFieldValues('lowestPrice', e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Typography sx={{ color: '#ffffff50', fontSize: '.8em' }} >от</Typography>
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                        flex: 1
                    }}
                />
                <TextField
                    value={values.highestPrice}
                    onChange={(e) => setFieldValues('highestPrice', e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Typography sx={{ color: '#ffffff50', fontSize: '.8em' }} >до</Typography>
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                        flex: 1
                    }}
                />
            </Box>
        </Box>
    );
}

export default Price;