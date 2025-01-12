import { useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useFilters } from "../Catalog/store";

const Caterogy = () => {
    const { values, searchValue, setSearchValue, setFieldValues, propsOfSearch } = useFilters();

    useEffect(() => {
        setSearchValue('');
        setFieldValues('categoriesId', propsOfSearch?.categoriesId?.value);
    }, []);


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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                {brandList
                    .filter(elem => elem.label.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(elem => (
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
                            control={<Checkbox
                                checked={values?.categoriesId?.some(categorieId => categorieId === elem.value)}
                                onChange={() => {
                                    setFieldValues('categoriesId', [...values?.categoriesId, elem.value])
                                }}
                            />}
                            label={elem.label}
                        />
                    ))}
            </Box>
        </Box>
    );
}

export default Caterogy;