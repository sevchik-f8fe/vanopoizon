import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

const Sort = () => {
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
            <Typography
                sx={{
                    fontSize: '.8em',
                    color: '#fff',
                    fontWeight: '500',
                    mb: '.5em'
                }}
            >Показать сначала</Typography>

            <RadioGroup
                sx={{
                    backgroundColor: '#709ed905',
                    p: '.5em',
                    borderRadius: '1em'
                }}
            >
                {sortList.map(elem => (
                    <Box
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
                            }}
                        />
                    </Box>
                ))}
            </RadioGroup>
        </>
    );
}

export default Sort;