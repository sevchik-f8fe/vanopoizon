import { Box, Typography, Button, TextField } from "@mui/material";
import { useCalc } from "./store";
import calcImg from "../../assets/calc_page_size.png";

const SetCalcSize = () => {
    const { prevPage, size, setSize } = useCalc();
    let tg = window.Telegram.WebApp;

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
                value={size}
                onChange={(e) => { setSize(e.target.value) }}
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
                Шаг 2 из 3: Выберите размер (EU). Чтобы подобрать правильный, загляните в размерную сетку.
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5em'
                    }}
                >
                    <Button
                        onClick={() => {
                            if (size.length > 0 && /^[0-9.]+$/.test(size)) console.log('ура');
                            else tg?.HapticFeedback?.error
                        }}
                        variant="outlined"
                        size="large"
                    >Далее</Button>
                    <Button
                        onClick={prevPage}
                        variant="text"
                        size="large"
                    >Назад</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SetCalcSize;