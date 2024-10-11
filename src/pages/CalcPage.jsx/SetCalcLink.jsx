import { Box, Typography, Button, TextField } from "@mui/material";
import { useCalc } from "./store";

import calcImg from "../../assets/calc_page_link.png";

const SetCalcLink = () => {
    const { page, nextPage } = useCalc()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                height: '100vh'
            }}
        >
            <TextField
                label="Ссылка на товар в Poizon"
                variant="filled"
                size="small"
                InputLabelProps={{
                    style: { color: '#ffffff60' },
                }}
                sx={{
                    fontSize: '.9em',
                }}
            />
            <Typography
                sx={{
                    p: '0 .5em',
                    color: '#ffffff50',
                    fontSize: '.75em'
                }}
            >
                Шаг 1 из 4. Нажмите на товаре в Poizon кнопку "поделиться". Скопируйте ссылку и вставьте сюда.
            </Typography>
            <Box
                sx={{
                    p: '.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '2em',
                    flex: '1',
                    w: '100%',
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url(${calcImg})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '18em',
                        maxHeight: '18em',
                        maxWidth: '100%',
                        minWidth: '100%',
                    }}
                >
                </Box>
                <Button
                    onClick={nextPage}
                    variant="outlined"
                    size="large"
                >Далее</Button>
            </Box>
        </Box>
    );
}

export default SetCalcLink;