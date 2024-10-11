import { Box, Typography, Button, TextField } from "@mui/material";
import calcImg from "../../assets/calc_page_price.png";

const SetCalcPrice = () => {
    // бля странно нахуя это надо
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
                label="Цена ¥"
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
                Шаг 3 из 4: Выберите размер и укажите цену в юанях с бирюзовой кнопки.
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

export default SetCalcPrice;