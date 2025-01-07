import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

const Fit = () => {
    const sortList = [
        { label: 'Мужчин', value: '1' },
        { label: 'Женщин', value: '2' },
        { label: 'Детей', value: '3' },
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
            >Показать для</Typography>

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

export default Fit;