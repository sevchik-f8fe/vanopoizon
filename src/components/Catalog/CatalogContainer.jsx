import { Box, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { nanoid } from "nanoid";

import SearchField from "../SearchField";
import CatalogElement from "./CatalogElement";

const CatalogContainer = () => {
    return (
        <Box
            id="catalog"
            sx={{
                w: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <CatalogHeader />
            <CatalogContent />

        </Box>
    );
}

const CatalogHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.6em',
                        fontWeight: '900'
                    }}
                >
                    Каталог
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em'
                    }}
                >
                    {/* <SearchIcon
                    sx={{
                        color: '#fff',
                        fontSize: '1.6em',
                    }}
                /> */}
                    <TuneIcon
                        sx={{
                            color: '#fff',
                            fontSize: '1.6em',
                        }}
                    />
                </Box>
            </Box>

            <SearchField />
        </Box>
    );
}

const CatalogContent = () => {
    // 20 товаров, потом - автозагрузка при прокрутке

    return (
        <Box
            sx={{
                minWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '.5em'
            }}
        >
            {[1, 2, 3, 4, 5, 6, 7].map((elem) => <CatalogElement key={nanoid()} price='12 000' title='Бобёр коричнеый б/у' picture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRljwOll9YYO3ZIeoRk-aDUZb7wwu8iHAbo1g&s' />)}
        </Box>
    );
}

export default CatalogContainer;