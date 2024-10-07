import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        // ... ваши существующие цвета
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
                    // Стили для Chip label
                    color: 'var(--tg-theme-text-color)', // Цвет текста
                    fontSize: '16px', // Размер шрифта
                    fontWeight: '500'
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                subtitle2: {
                    // Стили для Typography с variant="subtitle2"
                    color: 'var(--tg-theme-bg-color)', // Цвет текста
                    backgroundColor: 'var(--tg-theme-text-color)', // Цвет фона
                    borderRadius: '.6em', // Закругление углов
                    padding: ' 0 .3em', // Отступы
                    fontWeight: 'bold',
                    fontSize: '.7em',
                },
            },
        },
    },
    typography: {
        // ... ваши существующие стили шрифта
    },
});