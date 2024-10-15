import { Box, Typography, Button, TextField } from "@mui/material";
import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_size.png";

const SetCalcSize = () => {
    const { nextPage } = useCalc()
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
                label="Размер"
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
                Шаг 2 из 4: Выберите размер. Чтобы подобрать правильный, загляните в размерную сетку.
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
                    variant="outlined"
                    size="large"
                >Далее</Button>
            </Box>
        </Box>
    );
}

export default SetCalcSize;