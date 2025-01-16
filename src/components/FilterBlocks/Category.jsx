import { useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useFilters } from "../Catalog/store";
import { useCategories } from "./store";
import axios from "axios";
import { nanoid } from "nanoid";

const Caterogy = () => {

    const { values, searchValue, setSearchValue, setFieldValues, removeFieldValues, propsOfSearch } = useFilters();
    const { data, isLoading, setData, setIsLoading } = useCategories();

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);

            await axios.get('https://vanopoizonserver.ru/vanopoizon/api/getCategories',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    setData(response.data.categories);
                })
                .catch(error => console.error('Ошибка: ', error))
                .finally(() => setIsLoading(false))
        }

        if (data.length === 0) fetchCategories();

        setSearchValue('');
        setFieldValues('categoriesId', propsOfSearch?.categoryId?.value);
    }, []);


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
                                        setSearchValue('');
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
                {data
                    .filter(elem => elem.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .filter((elem, id) => id < 50)
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
                            key={nanoid()}
                            control={<Checkbox
                                checked={values?.categoriesId?.some(categorieId => categorieId === elem.id)}
                                onChange={() => {
                                    if (!values?.categoriesId?.some(categorieId => categorieId === elem.id)) {
                                        setFieldValues('categoriesId', [...values?.categoriesId, elem.id])
                                    } else {
                                        removeFieldValues('categoriesId', elem.id)
                                    }
                                }}
                            />}
                            label={elem.name}
                        />
                    ))}
            </Box>
        </Box>
    );
}

export default Caterogy;