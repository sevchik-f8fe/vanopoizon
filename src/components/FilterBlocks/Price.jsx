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
            <Typography variant="body1" sx={{ mb: '.5em' }}>Цена</Typography>

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
                                    <Typography variant="body2">от</Typography>
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
                                    <Typography variant="body2">до</Typography>
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