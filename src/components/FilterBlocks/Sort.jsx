import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import { useFilters } from "../Catalog/store";
import { nanoid } from "nanoid";

const Sort = () => {
    const { values, setFieldValues, propsOfSearch } = useFilters();

    useEffect(() => {
        setFieldValues('sort', { type: propsOfSearch?.sortType?.value, mode: propsOfSearch?.sortMode?.value });
    }, []);

    const sortList = [
        { label: 'Популярные', value: '1 0' },
        { label: 'Новинки', value: '3 0' },
        { label: 'Дешевле', value: '2 0' },
        { label: 'Дороже', value: '2 1' },
        { label: 'Рекомендуемые', value: '0 0' },
        { label: 'Релевантные', value: '101 0' },
    ];

    return (
        <>
            <Typography variant="body1">Показать сначала</Typography>

            <RadioGroup
                sx={{
                    backgroundColor: '#709ed905',
                    p: '.5em',
                    borderRadius: '1em'
                }}
                value={`${values.sort.type} ${values.sort.mode}` || null}
                onChange={(e) => {
                    let type = e.target.value.split(' ')[0];
                    let mode = e.target.value.split(' ')[1];

                    setFieldValues('sort', { type, mode })
                }}
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

export default Sort;