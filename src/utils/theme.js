import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Стили для всех кнопок Button
                },
                text: {
                    textTransform: 'none',
                    fontWeight: '500',
                    padding: '0 .4em',
                    // Стили для кнопок Button с variant="text"
                    color: 'var(--tg-theme-text-color)', // Цвет текста для кнопки
                    '&:hover': {
                        backgroundColor: 'var(--tg-theme-bg-color)', // Цвет фона при наведении курсора
                        opacity: 0.8, // Непрозрачность при наведении
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                label: {
                    color: 'var(--tg-theme-text-color)', // Цвет текста
                    fontSize: '16px', // Размер шрифта
                    fontWeight: '600',
                    color: 'white'
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#2E2E3A',
                        color: 'white',
                        borderRadius: '1em', // Скругление углов
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff50', // Используем цвет из темы
                                borderWidth: '1px',
                            },
                        },
                    },
                },
            },
        },
    },
});