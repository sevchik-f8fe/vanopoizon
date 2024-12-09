import { useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { nanoid } from "nanoid";

import { useCatalog } from "../../components/Catalog/store";
import { useFilters } from "./store";

const FilterPage = () => {
    let tg = window.Telegram.WebApp;
    const { setPropsOfSearch, setTypeOfSearch, setPage, setProducts } = useCatalog();

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                w: '100%', p: '.5em',
                pt: '2.5em',
                pb: '2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1em',
                justifyContent: 'space-between'
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        pb: '.5em',
                        fontWeight: '900',
                        maxWidth: 'fit-content'
                    }}
                >Фильтры</Typography>
            </Box>

            <PriceComponent />
            <BrandComponent />
            <CategoryComponent />
            <FirComponent />

            <Button
                onClick={() => {
                    window.history.back();
                    setProducts([]);
                    setPage(1);
                    // setTypeOfSearch('');
                    // setPropsOfSearch()
                }}
                sx={{
                    mt: '.5em',
                    minWidth: '100%'
                }}
                variant="text"
                size="large"
            >Применить</Button>
        </Box>
    );
}

const PriceComponent = () => {
    const { filters, setFilter } = useFilters();

    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '1em',
                    color: '#fff',
                    pb: '.5em',
                    fontWeight: '700'
                }}
            >Цена</Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em'
                }}
            >
                <TextField
                    value={filters?.min}
                    onChange={(e) => {
                        setFilter('min', e.target.value.replace(/[^0-9.]/g, ''))
                    }}
                    label="Минимальная"
                    placeholder="0"
                    size="small"
                    variant="outlined"
                />
                <TextField
                    value={filters?.max}
                    onChange={(e) => {
                        setFilter('max', e.target.value.replace(/[^0-9.]/g, ''))
                    }}
                    label="Максимальная"
                    placeholder="0"
                    size="small"
                    variant="outlined"
                />
            </Box>
        </Box>
    );
}

const BrandComponent = () => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '1em',
                    color: '#fff',
                    pb: '.5em',
                    fontWeight: '700'
                }}
            >Бренд</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'end',
                    gap: '.5em'
                }}
            >
                {['Nike', 'New Balance', 'Adidas', 'Nike', 'New Balance', 'Adidas'].map(elem => <CategoryBlock key={nanoid()} label={elem} />)}
                <Button
                    variant="text"
                    sx={{
                        borderRadius: '1em',
                        fontWeight: 500,
                        border: '1px solid #709ed9'
                    }}
                >
                    Развернуть
                </Button>
            </Box>
        </Box>
    )
}

const CategoryComponent = () => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '1em',
                    color: '#fff',
                    pb: '.5em',
                    fontWeight: '700'
                }}
            >Категория</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'end',
                    gap: '.5em'
                }}
            >
                {['Кроссовки', 'Джинсики', 'Ошейники', 'Кроссовки', 'Джинсики'].map(elem => <CategoryBlock key={nanoid()} label={elem} />)}
                <Button
                    variant="text"
                    sx={{
                        borderRadius: '1em',
                        fontWeight: 500,
                        border: '1px solid #709ed9'
                    }}
                >
                    Развернуть
                </Button>
            </Box>
        </Box>
    )
}

const FirComponent = () => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '1em',
                    color: '#fff',
                    pb: '.5em',
                    fontWeight: '700'
                }}
            >Пол</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'end',
                    gap: '.5em'
                }}
            >
                {['Мужской', 'Женский', 'Для мальчиков', 'Для девочек', 'Унисекс'].map(elem => <CategoryBlock key={nanoid()} label={elem} />)}
            </Box>
        </Box>
    )
}

const CategoryBlock = ({ itemId, label }) => {
    return (
        <Box
            sx={{
                cursor: 'pointer',
                p: '.5em .8em',
                border: '1px solid #fff3',
                borderRadius: '1em'
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '.9em',
                    fontWeight: 500
                }}
            >{label}</Typography>
        </Box>
    )
}

export default FilterPage;