import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { useFilters } from "../Catalog/store";
import { useEffect } from "react";
import { nanoid } from "nanoid";

const Fit = () => {
    const { values, setFieldValues, propsOfSearch } = useFilters();

    useEffect(() => {
        setFieldValues('fitId', propsOfSearch?.fitId?.value);
    }, []);

    const sortList = [
        { label: 'Унисекс', value: '1' },
        { label: 'Мужскую одежду', value: '2' },
        { label: 'Женскую одежду', value: '3' },
        { label: 'Для детей', value: '4' },
    ];

    return (
        <>
            <Typography
                sx={{
                    fontSize: '.8em',
                    color: '#fff',
                    fontWeight: '500',
                    mb: '.5em'
                }}
            >Показать</Typography>

            <RadioGroup
                sx={{
                    backgroundColor: '#709ed905',
                    p: '.5em',
                    borderRadius: '1em',
                }}
                value={values?.fitId || null}
                onChange={(e) => setFieldValues('fitId', e.target.value)}
            >
                {sortList.map(elem => (
                    <Box
                        key={nanoid()}
                        sx={{
                            ':not(:last-child)': {
                                borderBottom: '1px solid #fff3'
                            }
                        }}
                    >
                        <FormControlLabel
                            value={elem.value}
                            control={<Radio />}
                            label={elem.label}
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    color: '#fff',
                                    fontSize: '.9em',
                                    fontWeight: '500',
                                },
                                minWidth: '100%'
                            }}
                        />
                    </Box>
                ))}
            </RadioGroup>
        </>
    );
}

export default Fit;