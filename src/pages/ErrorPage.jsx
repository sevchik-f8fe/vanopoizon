import { Box, Typography, Button } from "@mui/material";

const ErrorPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '100vh',
                gap: '8em',
                backgroundColor: '#DC4F5105'
            }}
        >
            <Box
                sx={{
                    borderRadius: '0 0 .5em .5em',
                    backgroundColor: '#DC4F5120',
                    p: '.2em',
                    minWidth: '100%',
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ color: '#DC4F51' }}
                >Ошибка адресации</Typography>
            </Box>

            <Box
                sx={{
                    mx: '2em',
                    borderRadius: '1em',
                    border: '1px solid #fff',
                    backgroundColor: '#2E2E3A',
                    p: '.8em .5em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1em',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4">Ошибка :(</Typography>
                <Typography>Вы перешли по неизвестной внутренней ссылке. Хотите вернуться на предыдущую страницу?</Typography>

                <Button
                    onClick={() => {
                        window.history.back()
                    }}
                >Хочу</Button>
            </Box>

            <Box
                sx={{
                    p: '.5em'
                }}
            >
                <Typography sx={{ fontWeight: '400', fontSize: '.65em' }} variant="subtitle2">Если у вас остались вопросы или это окно появилось после ВАЖНОГО действия, то вы можете написать в чат руководителя: <a style={{ color: '#709ed9' }}>@vanopoizon</a></Typography>
            </Box>
        </Box>
    );
}

export default ErrorPage;