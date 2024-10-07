import { createTheme } from "@mui/material";

import InterFont from "../assets/Inter-VariableFont_slnt,wght.ttf"

export const theme = createTheme({
    palette: {
        // ... ваши существующие цвета
    },
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
        MuiTypography: {
            styleOverrides: {
                // subtitle2: {
                //     color: 'var(--tg-theme-bg-color)', // Цвет текста
                //     backgroundColor: 'var(--tg-theme-text-color)', // Цвет фона
                //     borderRadius: '.6em', // Закругление углов
                //     padding: ' 0 .3em', // Отступы
                //     fontWeight: 'bold',
                //     fontSize: '.7em',
                // },
            },
        },
    },
});