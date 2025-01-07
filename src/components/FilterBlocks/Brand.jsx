import { Box, TextField, InputAdornment, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Brand = () => {
    const brandList = [
        { label: 'Nike', value: '1' },
        { label: 'Puma', value: '2' },
        { label: 'Adidas', value: '3' },
        { label: 'Times&Jump', value: '4' },
        { label: 'Grib', value: '15' },
        { label: 'Nike', value: '11' },
        { label: 'Puma', value: '12' },
        { label: 'Adidas', value: '13' },
        { label: 'Times&Jump', value: '14' },
        { label: 'Grib', value: '25' },
        { label: 'Nike', value: '21' },
        { label: 'Puma', value: '22' },
        { label: 'Adidas', value: '23' },
        { label: 'Times&Jump', value: '24' },
        { label: 'Grib', value: '35' },
        { label: 'Nike', value: '31' },
        { label: 'Puma', value: '32' },
        { label: 'Adidas', value: '33' },
        { label: 'Times&Jump', value: '34' },
        { label: 'Grib', value: '35' },
    ];

    return (
        <Box
            sx={{
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                backgroundColor: '#202029',
                p: '.5em',
                borderRadius: "1em"
            }}
        >
            <TextField
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#ffffff50' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setIsTyping(false);
                                        setMiniProductList([]);
                                        setFieldValue('');
                                    }}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#fff2',
                                        '&:hover': {
                                            backgroundColor: '#fff2',
                                        },
                                        '&:active': {
                                            backgroundColor: '#fff1'
                                        },
                                    }}
                                >
                                    <CloseIcon
                                        sx={{
                                            fontSize: '.9em',
                                            color: '#fff8'
                                        }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    },
                }}
                sx={{
                    flex: '1',
                }}
                placeholder="Поиск по списку"
                size="small"
                variant="outlined"
            />

            <Box
                sx={{
                    height: "60vh",
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {brandList.map(elem => (
                    <FormControlLabel
                        labelPlacement="start"
                        sx={{
                            justifyContent: 'space-between',
                            maxWidth: '90%',
                            '& .MuiFormControlLabel-label': {
                                color: '#fff',
                                fontSize: '.9em',
                                fontWeight: '500',
                            },
                        }}
                        control={<Checkbox />}
                        label={elem.label}
                        value={elem.value}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default Brand;